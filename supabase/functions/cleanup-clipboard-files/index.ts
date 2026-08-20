import { createClient } from 'npm:@supabase/supabase-js@2'

const json = (body: Record<string, unknown>, status = 200) => new Response(
  JSON.stringify(body),
  { status, headers: { 'content-type': 'application/json' } }
)

Deno.serve(async request => {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const cleanupSecret = Deno.env.get('CLIPBOARD_CLEANUP_SECRET')
  if (!cleanupSecret) return json({ error: 'Cleanup secret is not configured' }, 503)
  if (request.headers.get('authorization') !== `Bearer ${cleanupSecret}`) {
    return json({ error: 'Unauthorized' }, 401)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: 'Supabase environment is not configured' }, 503)
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })

  try {
    const { data: expired, error: selectError } = await supabase
      .from('clipboard_items')
      .select('id, file_path')
      .eq('item_type', 'file')
      .lte('expires_at', new Date().toISOString())
      .not('file_path', 'is', null)
      .limit(1000)

    if (selectError) throw selectError
    if (!expired?.length) return json({ deleted: 0 })

    const filePaths = expired.map(item => item.file_path).filter(Boolean) as string[]
    const { error: storageError } = await supabase.storage
      .from('clipboard-files')
      .remove(filePaths)
    if (storageError) throw storageError

    const { error: deleteError } = await supabase
      .from('clipboard_items')
      .delete()
      .in('id', expired.map(item => item.id))
    if (deleteError) throw deleteError

    return json({ deleted: expired.length })
  } catch (error) {
    console.error('Clipboard cleanup failed', error)
    return json({ error: error instanceof Error ? error.message : 'Cleanup failed' }, 500)
  }
})
