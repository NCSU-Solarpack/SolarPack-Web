/**
 * Clipboard — the code-gated shared scratchpad at /clipboard.
 *
 * Documentation: docs/clipboard.md
 *
 *  • NO SIGN-IN. This route sits outside <Layout> and outside the auth gate, and
 *    it is deliberately absent from the site navigation (URL-only).
 *  • The server NEVER sees the user's code. The browser sends only
 *    SHA-256("solarpack-clipboard:" + NORMALIZED-CODE); that hash is the entire
 *    access key. Requires a secure context (HTTPS or localhost) — crypto.subtle
 *    is unavailable over plain HTTP on a LAN IP, which shows up as
 *    "Invalid clipboard code".
 *  • The tables have REVOKE ALL from anon/authenticated. The only way in is three
 *    SECURITY DEFINER functions, each requiring a >=32-char hash. See
 *    schemas/supabase-clipboard-schema.sql.
 *  • Clips are EITHER sanitized rich text OR one temporary file, never both.
 *    Files are drag/drop only, live in the clipboard-files Storage bucket, and
 *    expire after 24 hours. The scheduled cleanup Edge Function removes bytes.
 *
 * ⚠ A hand-typed code is the whole security boundary, and there is no rate
 *   limiting. Convenient, not confidential.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  Clipboard as ClipboardIcon,
  Copy,
  Download,
  Eraser,
  Eye,
  EyeOff,
  File as FileIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  LogOut,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
  Underline,
  UploadCloud
} from 'lucide-react'
import { supabaseService } from '../utils/supabase'

const createEmptyDraft = () => ({
  local_key: `draft-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  id: null,
  title: '',
  content_html: '',
  content_text: '',
  item_type: 'text',
  file_name: null,
  file_path: null,
  file_size: null,
  file_type: null,
  expires_at: null
})

const formatBytes = (bytes = 0) => {
  if (!Number.isFinite(Number(bytes)) || Number(bytes) <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const unitIndex = Math.min(Math.floor(Math.log(Number(bytes)) / Math.log(1024)), units.length - 1)
  const value = Number(bytes) / (1024 ** unitIndex)
  return `${value >= 10 || unitIndex === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`
}

const formatDuration = (seconds = 0) => {
  const rounded = Math.max(0, Math.round(seconds))
  if (rounded < 60) return `${rounded}s`
  return `${Math.floor(rounded / 60)}m ${rounded % 60}s`
}

const formatTimeRemaining = (expiresAt, now = Date.now()) => {
  const remaining = new Date(expiresAt).getTime() - now
  if (!Number.isFinite(remaining) || remaining <= 0) return 'expired'
  const minutes = Math.max(1, Math.ceil(remaining / 60000))
  if (minutes < 60) return `${minutes}m left`
  const hours = Math.floor(minutes / 60)
  const leftoverMinutes = minutes % 60
  return leftoverMinutes ? `${hours}h ${leftoverMinutes}m left` : `${hours}h left`
}

const allowedTags = new Set([
  'A', 'B', 'BLOCKQUOTE', 'BR', 'CODE', 'DIV', 'EM', 'FONT', 'H1', 'H2', 'H3',
  'H4', 'H5', 'H6', 'HR', 'I', 'LI', 'OL', 'P', 'PRE', 'S', 'SPAN', 'STRONG',
  'SUB', 'SUP', 'TABLE', 'TBODY', 'TD', 'TFOOT', 'TH', 'THEAD', 'TR', 'U', 'UL'
])

const removableTags = new Set([
  'AUDIO', 'CANVAS', 'EMBED', 'FORM', 'IFRAME', 'IMG', 'INPUT', 'OBJECT',
  'PICTURE', 'SCRIPT', 'SOURCE', 'STYLE', 'SVG', 'TEXTAREA', 'VIDEO'
])

const allowedStyleProps = new Set([
  'background-color',
  'color',
  'font-family',
  'font-size',
  'font-style',
  'font-weight',
  'letter-spacing',
  'line-height',
  'margin-left',
  'text-align',
  'text-decoration',
  'text-indent',
  'text-transform',
  'white-space'
])

const normalizeCode = (code) => code.trim().replace(/\s+/g, '-').toUpperCase()

const bytesToHex = (buffer) => Array.from(new Uint8Array(buffer))
  .map(byte => byte.toString(16).padStart(2, '0'))
  .join('')

const hashCode = async (code) => {
  const normalized = normalizeCode(code)
  const data = new TextEncoder().encode(`solarpack-clipboard:${normalized}`)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return bytesToHex(digest)
}

const getTextFromHtml = (html) => {
  const node = document.createElement('div')
  node.innerHTML = html || ''
  return (node.textContent || node.innerText || '').trim()
}

const createTitle = (html) => {
  const text = getTextFromHtml(html)
  if (!text) return 'Untitled'
  return text.length > 44 ? `${text.slice(0, 44).trim()}...` : text
}

const sanitizeStyle = (styleValue = '') => {
  return styleValue
    .split(';')
    .map(rule => {
      const [rawProp, ...rawValue] = rule.split(':')
      if (!rawProp || rawValue.length === 0) return ''

      const prop = rawProp.trim().toLowerCase()
      const value = rawValue.join(':').trim()

      if (!allowedStyleProps.has(prop)) return ''
      if (/url\s*\(|expression\s*\(|@import/i.test(value)) return ''

      return `${prop}: ${value}`
    })
    .filter(Boolean)
    .join('; ')
}

const isSafeHref = (href = '') => {
  if (!href) return false
  return /^(https?:|mailto:|tel:|#|\/)/i.test(href)
}

const sanitizeHtml = (html = '') => {
  const template = document.createElement('template')
  template.innerHTML = html

  const cleanNode = (node) => {
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName

        if (removableTags.has(tag)) {
          child.remove()
          return
        }

        if (!allowedTags.has(tag)) {
          const parent = child.parentNode
          while (child.firstChild) parent.insertBefore(child.firstChild, child)
          child.remove()
          return
        }

        Array.from(child.attributes).forEach(attr => {
          const name = attr.name.toLowerCase()
          const value = attr.value

          if (name.startsWith('on')) {
            child.removeAttribute(attr.name)
            return
          }

          if (name === 'style') {
            const nextStyle = sanitizeStyle(value)
            if (nextStyle) child.setAttribute('style', nextStyle)
            else child.removeAttribute('style')
            return
          }

          if (tag === 'A' && name === 'href') {
            if (isSafeHref(value)) {
              child.setAttribute('target', '_blank')
              child.setAttribute('rel', 'noopener noreferrer')
            } else {
              child.removeAttribute(attr.name)
            }
            return
          }

          if (['colspan', 'rowspan'].includes(name) && /^(?:[1-9]|1[0-2])$/.test(value)) {
            return
          }

          child.removeAttribute(attr.name)
        })

        cleanNode(child)
      } else if (child.nodeType === Node.COMMENT_NODE) {
        child.remove()
      }
    })
  }

  cleanNode(template.content)
  return template.innerHTML
}

const insertHtmlAtCursor = (html) => {
  document.execCommand('insertHTML', false, html)
}

const generateCode = () => {
  const bytes = new Uint8Array(6)
  window.crypto.getRandomValues(bytes)
  const hex = bytesToHex(bytes).toUpperCase()
  return `SP-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`
}

const Clipboard = () => {
  const editorRef = useRef(null)
  const dragDepthRef = useRef(0)
  const [codeInput, setCodeInput] = useState('')
  const [activeCode, setActiveCode] = useState('')
  const [accessHash, setAccessHash] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [items, setItems] = useState([])
  const [draft, setDraft] = useState(() => createEmptyDraft())
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(null)
  const [now, setNow] = useState(() => Date.now())

  const isOpen = Boolean(accessHash)
  const selectedId = draft.id || draft.local_key || 'new'
  const isFileDraft = draft.item_type === 'file'
  const isUploading = Boolean(uploadProgress)
  const isFileExpired = isFileDraft && new Date(draft.expires_at).getTime() <= now

  const sortedItems = useMemo(() => {
    return items
      .filter(item => item.item_type !== 'file' || new Date(item.expires_at).getTime() > now)
      .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0))
  }, [items, now])

  useEffect(() => {
    document.title = 'Clipboard'
    document.body.classList.add('clipboard-standalone-body')

    return () => {
      document.body.classList.remove('clipboard-standalone-body')
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (editorRef.current && draft.item_type !== 'file' && document.activeElement !== editorRef.current) {
      editorRef.current.innerHTML = draft.content_html || ''
    }
  }, [draft.id, draft.item_type])

  const loadItems = async (hash = accessHash) => {
    if (!hash) return
    setIsLoading(true)
    setMessage('')

    try {
      const nextItems = (await supabaseService.getClipboardItems(hash)).map(item => ({
        ...item,
        item_type: item.item_type || 'text',
        content_html: sanitizeHtml(item.content_html || ''),
        content_text: item.content_text || getTextFromHtml(item.content_html || '')
      }))
      setItems(nextItems)
      setDraft(nextItems[0] || createEmptyDraft())
      setMessage(nextItems.length ? 'Synced' : 'Blank code. Save a clip to start it.')
    } catch (error) {
      console.error('Clipboard load failed:', error)
      setMessage(error.message || 'Could not open')
    } finally {
      setIsLoading(false)
    }
  }

  const openCode = async (code = codeInput) => {
    const normalized = normalizeCode(code)
    if (normalized.length < 6) {
      setMessage('Use a longer code')
      return
    }

    const nextHash = await hashCode(normalized)
    setActiveCode(normalized)
    setAccessHash(nextHash)
    setCodeInput('')
    await loadItems(nextHash)
  }

  const createCode = async () => {
    const nextCode = generateCode()
    setCodeInput(nextCode)
    setShowCode(true)
    setMessage('Random code generated. Open it to start.')
  }

  const closeCode = () => {
    setAccessHash('')
    setActiveCode('')
    setItems([])
    setDraft(createEmptyDraft())
    setUploadProgress(null)
    setIsDraggingFile(false)
    dragDepthRef.current = 0
    setMessage('')
  }

  const selectItem = (item) => {
    if (isUploading) return
    setDraft(item)
    setCopied(false)
  }

  const newItem = () => {
    if (isUploading) return
    const nextDraft = createEmptyDraft()
    setDraft(nextDraft)
    if (editorRef.current) {
      editorRef.current.innerHTML = ''
    }
    setCopied(false)
    setTimeout(() => editorRef.current?.focus(), 0)
  }

  const requestDeleteDraft = () => {
    const hasContent = Boolean(draft.id || draft.title.trim() || getTextFromHtml(editorRef.current?.innerHTML || ''))
    if (!hasContent) return
    setShowDeleteConfirm(true)
  }

  const syncDraftFromEditor = () => {
    if (draft.item_type === 'file') return draft
    const html = sanitizeHtml(editorRef.current?.innerHTML || '')
    const text = getTextFromHtml(html)
    const nextDraft = {
      ...draft,
      title: draft.title.trim() || createTitle(html),
      content_html: html,
      content_text: text
    }
    setDraft(nextDraft)
    return nextDraft
  }

  const saveDraft = async () => {
    if (!accessHash || draft.item_type === 'file' || isUploading) return

    const nextDraft = syncDraftFromEditor()
    const wasNewItem = !nextDraft.id
    if (!nextDraft.content_text) {
      setMessage('Nothing to save')
      return
    }

    setIsSaving(true)
    setMessage('')

    try {
      const saved = await supabaseService.saveClipboardItem(accessHash, nextDraft)
      setItems(prev => {
        const exists = prev.some(item => item.id === saved.id)
        if (exists) return prev.map(item => item.id === saved.id ? saved : item)
        return [saved, ...prev]
      })
      if (wasNewItem) {
        const blankDraft = createEmptyDraft()
        setDraft(blankDraft)
        if (editorRef.current) {
          editorRef.current.innerHTML = ''
        }
        setMessage('Saved')
      } else {
        setDraft(saved)
        setMessage('Synced')
      }
    } catch (error) {
      console.error('Clipboard save failed:', error)
      setMessage(error.message || 'Save failed')
    } finally {
      setIsSaving(false)
    }
  }

  const deleteDraft = async () => {
    setShowDeleteConfirm(false)

    if (!accessHash || !draft.id) {
      newItem()
      setMessage('Cleared')
      return
    }

    setIsSaving(true)

    try {
      if (draft.item_type === 'file' && draft.file_path) {
        await supabaseService.removeClipboardFile(draft.file_path)
      }
      await supabaseService.deleteClipboardItem(accessHash, draft.id)
      const nextItems = items.filter(item => item.id !== draft.id)
      setItems(nextItems)
      setDraft(nextItems[0] || createEmptyDraft())
      setMessage('Removed')
    } catch (error) {
      console.error('Clipboard delete failed:', error)
      setMessage(error.message || 'Delete failed')
    } finally {
      setIsSaving(false)
    }
  }

  const runCommand = (command, value = null) => {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    syncDraftFromEditor()
  }

  const addLink = () => {
    const url = window.prompt('Link')
    if (url) runCommand('createLink', url)
  }

  const clearFormatting = () => {
    const editor = editorRef.current
    if (!editor) return

    const plainText = editor.innerText || getTextFromHtml(editor.innerHTML)
    editor.textContent = plainText
    syncDraftFromEditor()
    editor.focus()
  }

  const handlePaste = (event) => {
    event.preventDefault()
    const clipboard = event.clipboardData
    const html = clipboard.getData('text/html')
    const text = clipboard.getData('text/plain')

    if (html) {
      insertHtmlAtCursor(sanitizeHtml(html))
    } else if (text) {
      insertHtmlAtCursor(text.replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char])).replace(/\n/g, '<br>'))
    }

    syncDraftFromEditor()
  }

  const uploadDroppedFile = async (file) => {
    if (!file || !accessHash || isUploading) return
    if (draft.item_type === 'file') {
      setMessage('Start a new clip before dropping another file')
      return
    }

    const editorText = getTextFromHtml(editorRef.current?.innerHTML || '')
    if (editorText) {
      setMessage('Clear the text before dropping a file')
      return
    }

    const startedAt = performance.now()
    let uploadedPath = ''
    const blankDraft = createEmptyDraft()
    setDraft(blankDraft)
    if (editorRef.current) editorRef.current.innerHTML = ''
    setIsSaving(true)
    setMessage('')
    setUploadProgress({
      name: file.name,
      size: file.size,
      loaded: 0,
      percent: 0,
      elapsed: 0,
      eta: null,
      phase: 'uploading'
    })

    try {
      uploadedPath = await supabaseService.uploadClipboardFile(accessHash, file, (loaded, total) => {
        const elapsed = Math.max((performance.now() - startedAt) / 1000, 0.01)
        const speed = loaded / elapsed
        setUploadProgress(prev => ({
          ...prev,
          loaded,
          percent: total ? Math.min(100, Math.round((loaded / total) * 100)) : 0,
          elapsed,
          eta: speed > 0 && total > loaded ? (total - loaded) / speed : 0
        }))
      })

      setUploadProgress(prev => ({ ...prev, percent: 100, phase: 'saving' }))
      const saved = await supabaseService.saveClipboardFile(accessHash, file, uploadedPath)
      setItems(prev => [saved, ...prev])
      setDraft(saved)
      setMessage('Uploaded. This file will be deleted 24 hours after upload.')
    } catch (error) {
      if (uploadedPath) {
        try {
          await supabaseService.removeClipboardFile(uploadedPath)
        } catch (cleanupError) {
          console.error('Clipboard upload cleanup failed:', cleanupError)
        }
      }
      console.error('Clipboard file upload failed:', error)
      setDraft(createEmptyDraft())
      setMessage(error.message || 'Upload failed')
    } finally {
      setUploadProgress(null)
      setIsSaving(false)
    }
  }

  const hasDraggedFiles = (event) => Array.from(event.dataTransfer?.types || []).includes('Files')

  const handleDragEnter = (event) => {
    if (!hasDraggedFiles(event)) return
    event.preventDefault()
    dragDepthRef.current += 1
    setIsDraggingFile(true)
  }

  const handleDragOver = (event) => {
    if (!hasDraggedFiles(event)) return
    event.preventDefault()
    event.dataTransfer.dropEffect = draft.content_text || isFileDraft || isUploading ? 'none' : 'copy'
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1)
    if (dragDepthRef.current === 0) setIsDraggingFile(false)
  }

  const handleDrop = (event) => {
    if (!hasDraggedFiles(event)) return
    event.preventDefault()
    dragDepthRef.current = 0
    setIsDraggingFile(false)
    const files = Array.from(event.dataTransfer.files || [])
    if (files.length !== 1) {
      setMessage('Drop one file at a time')
      return
    }
    uploadDroppedFile(files[0])
  }

  const downloadDraft = () => {
    if (!draft.file_path) return
    const link = document.createElement('a')
    link.href = supabaseService.getClipboardFileDownloadUrl(draft.file_path, draft.file_name || true)
    link.download = draft.file_name || 'download'
    link.rel = 'noopener'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const copyDraft = async () => {
    const nextDraft = syncDraftFromEditor()
    if (!nextDraft.content_text) return

    try {
      if (window.ClipboardItem) {
        const item = new window.ClipboardItem({
          'text/html': new Blob([nextDraft.content_html], { type: 'text/html' }),
          'text/plain': new Blob([nextDraft.content_text], { type: 'text/plain' })
        })
        await navigator.clipboard.write([item])
      } else {
        await navigator.clipboard.writeText(nextDraft.content_text)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (error) {
      console.error('Clipboard copy failed:', error)
      setMessage('Copy failed')
    }
  }

  const copyCode = async () => {
    if (!activeCode) return
    await navigator.clipboard.writeText(activeCode)
    setMessage('Code copied')
  }

  return (
    <div className="clipboard-page">
      <style>{`
        body.clipboard-standalone-body {
          padding-top: 0;
          background: #000;
        }

        .clipboard-page {
          min-height: 100vh;
          width: 100%;
          color: #fff;
          background: #000;
          padding: 0 1rem;
        }

        .clipboard-shell {
          max-width: 1120px;
          margin: 0 auto;
          padding: 2rem 0 4rem;
        }

        .clipboard-lock {
          max-width: 440px;
          margin: 10vh auto 0;
          border: 1px solid #fff;
          background: #000;
          padding: 1rem;
        }

        .clipboard-lock h1,
        .clipboard-heading h1 {
          font-family: "DM Sans", Arial, sans-serif;
          font-size: 1.05rem;
          letter-spacing: 0;
          margin: 0;
          text-align: left;
          color: #fff;
        }

        .clipboard-lock-note {
          margin-top: 0.7rem;
          color: #aaa;
          font-size: 0.86rem;
          line-height: 1.35;
        }

        .clipboard-lock-form {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .clipboard-input {
          min-width: 0;
          height: 2.6rem;
          border: 1px solid #fff;
          background: #000;
          color: #fff;
          border-radius: 0;
          padding: 0 0.85rem;
          font: inherit;
          line-height: 1;
        }

        .clipboard-input::placeholder {
          color: #999;
        }

        .clipboard-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          height: 2.6rem;
          min-height: 2.6rem;
          border: 1px solid #fff;
          border-radius: 0;
          background: #fff;
          color: #000;
          padding: 0.6rem 0.9rem;
          font: inherit;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
        }

        .clipboard-btn.secondary {
          background: #000;
          color: #fff;
        }

        .clipboard-btn.icon {
          width: 2.6rem;
          padding: 0;
        }

        .clipboard-btn:disabled {
          cursor: wait;
          opacity: 0.6;
        }

        .clipboard-lock-actions {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .clipboard-lock-actions .clipboard-btn:first-child {
          flex: 1;
        }

        .clipboard-status {
          min-height: 1.25rem;
          margin-top: 0.85rem;
          color: #ccc;
          font-size: 0.9rem;
        }

        .clipboard-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #fff;
          padding-bottom: 0.75rem;
        }

        .clipboard-heading-left,
        .clipboard-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .clipboard-heading-left {
          min-height: 2.6rem;
        }

        .clipboard-heading-left h1 {
          height: 2.6rem;
          display: inline-flex;
          align-items: center;
        }

        .clipboard-heading-left .clipboard-btn,
        .clipboard-heading-left .clipboard-code {
          flex: 0 0 auto;
        }

        .clipboard-code {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          height: 2.6rem;
          min-height: 2.6rem;
          border: 1px solid #fff;
          padding: 0 0.75rem;
          color: #fff;
          font-family: "Courier New", monospace;
          font-size: 0.86rem;
          line-height: 1;
        }

        .clipboard-grid {
          display: grid;
          grid-template-columns: minmax(220px, 300px) minmax(0, 1fr);
          gap: 1rem;
          min-height: 62vh;
        }

        .clipboard-list,
        .clipboard-editor-panel {
          border: 1px solid #fff;
          background: #000;
        }

        .clipboard-list {
          overflow: auto;
        }

        .clipboard-list-item {
          width: 100%;
          display: block;
          border: 0;
          border-bottom: 1px solid #333;
          background: #000;
          color: #fff;
          padding: 0.85rem;
          text-align: left;
          cursor: pointer;
        }

        .clipboard-list-item.active {
          background: #fff;
          color: #000;
        }

        .clipboard-list-title {
          display: block;
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }

        .clipboard-list-meta {
          display: block;
          margin-top: 0.3rem;
          color: inherit;
          opacity: 0.7;
          font-size: 0.78rem;
        }

        .clipboard-empty {
          color: #999;
          padding: 1rem;
        }

        .clipboard-loading {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          color: #ccc;
          padding: 1rem;
        }

        .clipboard-loading.centered {
          min-height: 240px;
          justify-content: center;
          border: 1px solid #fff;
          background: #000;
        }

        .clipboard-spinner {
          width: 1rem;
          height: 1rem;
          border: 1px solid #555;
          border-top-color: #fff;
          border-radius: 50%;
          animation: clipboard-spin 700ms linear infinite;
          flex: 0 0 auto;
        }

        @keyframes clipboard-spin {
          to { transform: rotate(360deg); }
        }

        .clipboard-editor-panel {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .clipboard-title-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.75rem;
          border-bottom: 1px solid #fff;
          padding: 0.75rem;
        }

        .clipboard-title-row .clipboard-input {
          height: 2.6rem;
          border: 1px solid #fff;
          padding: 0 0.75rem;
        }

        .clipboard-title-row .clipboard-input:read-only {
          color: #ccc;
          cursor: default;
        }

        .clipboard-title-row .clipboard-actions {
          gap: 0.65rem;
          justify-content: flex-end;
        }

        .clipboard-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          padding: 0.55rem;
          border-bottom: 1px solid #fff;
        }

        .clipboard-tool {
          width: 2.25rem;
          height: 2.25rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #fff;
          background: #000;
          color: #fff;
          cursor: pointer;
        }

        .clipboard-editor {
          flex: 1;
          min-height: 420px;
          padding: 1rem;
          color: #fff;
          outline: none;
          overflow: auto;
          line-height: 1.55;
          white-space: pre-wrap;
        }

        .clipboard-drop-surface {
          position: relative;
          display: flex;
          flex: 1;
          min-height: 420px;
          min-width: 0;
        }

        .clipboard-drop-surface.blocked {
          cursor: not-allowed;
        }

        .clipboard-drop-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          border: 2px dashed #fff;
          background: rgba(0, 0, 0, 0.94);
          color: #fff;
          text-align: center;
          pointer-events: none;
        }

        .clipboard-drop-overlay.blocked {
          border-color: #777;
          color: #aaa;
        }

        .clipboard-drop-overlay strong {
          font-size: 1rem;
        }

        .clipboard-drop-overlay span {
          max-width: 30rem;
          color: inherit;
          font-size: 0.84rem;
        }

        .clipboard-editor:empty::before {
          content: 'Paste text here, or drop a file';
          color: #777;
        }

        .clipboard-editor a {
          color: #fff;
          text-decoration: underline;
        }

        .clipboard-editor table {
          border-collapse: collapse;
          max-width: 100%;
        }

        .clipboard-editor td,
        .clipboard-editor th {
          border: 1px solid #777;
          padding: 0.35rem;
        }

        .clipboard-file-view,
        .clipboard-upload-view {
          width: 100%;
          min-height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
        }

        .clipboard-file-card,
        .clipboard-upload-card {
          width: min(100%, 520px);
          border: 1px solid #fff;
          padding: 1rem;
        }

        .clipboard-file-card-head,
        .clipboard-upload-card-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-width: 0;
        }

        .clipboard-file-card-head svg,
        .clipboard-upload-card-head svg {
          flex: 0 0 auto;
        }

        .clipboard-file-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }

        .clipboard-file-detail,
        .clipboard-upload-detail {
          margin-top: 0.65rem;
          color: #aaa;
          font-size: 0.84rem;
          line-height: 1.45;
        }

        .clipboard-progress-track {
          height: 0.75rem;
          margin-top: 1rem;
          border: 1px solid #fff;
          background: #000;
          overflow: hidden;
        }

        .clipboard-progress-fill {
          height: 100%;
          background: #fff;
          transition: width 160ms linear;
        }

        .clipboard-progress-row {
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
          margin-top: 0.55rem;
          color: #ccc;
          font-size: 0.8rem;
        }

        .clipboard-list-title-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          min-width: 0;
        }

        .clipboard-list-title-row svg {
          flex: 0 0 auto;
        }

        .clipboard-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.82);
          padding: 1rem;
        }

        .clipboard-modal {
          width: min(100%, 380px);
          border: 1px solid #fff;
          background: #000;
          color: #fff;
          padding: 1rem;
          box-shadow: 0 0 0 1px #000;
        }

        .clipboard-modal h2 {
          margin: 0;
          color: #fff;
          font: 700 1rem/1.2 "DM Sans", Arial, sans-serif;
          letter-spacing: 0;
          text-align: left;
        }

        .clipboard-modal p {
          margin: 0.8rem 0 0;
          color: #ccc;
          line-height: 1.45;
        }

        .clipboard-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.65rem;
          margin-top: 1rem;
        }

        .clipboard-btn.danger {
          background: #fff;
          color: #000;
        }

        @media (max-width: 780px) {
          .clipboard-shell {
            padding-top: 1rem;
          }

          .clipboard-heading,
          .clipboard-title-row {
            grid-template-columns: 1fr;
          }

          .clipboard-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .clipboard-grid {
            grid-template-columns: 1fr;
          }

          .clipboard-list {
            max-height: 220px;
          }

          .clipboard-lock-form {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {!isOpen ? (
        <section className="clipboard-lock" aria-labelledby="clipboard-lock-title">
          <h1 id="clipboard-lock-title">Clipboard</h1>
          <form
            className="clipboard-lock-form"
            onSubmit={(event) => {
              event.preventDefault()
              openCode()
            }}
          >
            <input
              className="clipboard-input"
              type={showCode ? 'text' : 'password'}
              value={codeInput}
              onChange={event => setCodeInput(event.target.value)}
              placeholder="Code"
              autoComplete="off"
            />
            <button className="clipboard-btn" type="submit" disabled={isLoading}>
              Open / start
            </button>
          </form>
          <div className="clipboard-lock-note">
            Same code opens the same clipboard. A new code starts blank.
          </div>
          <div className="clipboard-lock-actions">
            <button className="clipboard-btn secondary" type="button" onClick={createCode}>
              <Plus size={16} /> Generate random code
            </button>
            <button className="clipboard-btn secondary icon" type="button" onClick={() => setShowCode(value => !value)} title={showCode ? 'Hide code' : 'Show code'}>
              {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="clipboard-status">
            {isLoading ? (
              <span className="clipboard-loading">
                <span className="clipboard-spinner" aria-hidden="true"></span>
                Opening
              </span>
            ) : message}
          </div>
        </section>
      ) : (
        <section className="clipboard-shell">
          <div className="clipboard-heading">
            <div className="clipboard-heading-left">
              <ClipboardIcon size={19} />
              <h1>Clipboard</h1>
              <span className="clipboard-code">{showCode ? activeCode : '********'} </span>
              <button className="clipboard-btn secondary icon" type="button" onClick={() => setShowCode(value => !value)} title={showCode ? 'Hide code' : 'Show code'}>
                {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button className="clipboard-btn secondary icon" type="button" onClick={copyCode} title="Copy code">
                <Copy size={16} />
              </button>
            </div>
            <div className="clipboard-actions">
              <button className="clipboard-btn secondary icon" type="button" onClick={() => loadItems()} title="Refresh" disabled={isLoading || isUploading}>
                <RefreshCcw size={16} />
              </button>
              <button className="clipboard-btn secondary" type="button" onClick={newItem} disabled={isUploading}>
                <Plus size={16} /> New
              </button>
              <button className="clipboard-btn secondary icon" type="button" onClick={closeCode} title="Close" disabled={isUploading}>
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {isLoading && sortedItems.length === 0 ? (
            <div className="clipboard-loading centered" role="status" aria-live="polite">
              <span className="clipboard-spinner" aria-hidden="true"></span>
              Loading clips
            </div>
          ) : (
            <div className="clipboard-grid">
              <aside className="clipboard-list" aria-label="Saved clips">
                {isLoading ? (
                  <div className="clipboard-loading" role="status" aria-live="polite">
                    <span className="clipboard-spinner" aria-hidden="true"></span>
                    Refreshing
                  </div>
                ) : sortedItems.length === 0 ? (
                <div className="clipboard-empty">Empty</div>
              ) : sortedItems.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className={`clipboard-list-item ${selectedId === item.id ? 'active' : ''}`}
                  onClick={() => selectItem(item)}
                >
                  <span className="clipboard-list-title-row">
                    {item.item_type === 'file' && <FileIcon size={14} aria-hidden="true" />}
                    <span className="clipboard-list-title">{item.title || 'Untitled'}</span>
                  </span>
                  <span className="clipboard-list-meta">
                    {item.item_type === 'file'
                      ? `${formatBytes(item.file_size)} · ${formatTimeRemaining(item.expires_at, now)}`
                      : (item.updated_at ? new Date(item.updated_at).toLocaleString() : '')}
                  </span>
                </button>
              ))}
              </aside>

              <div className="clipboard-editor-panel">
              <div className="clipboard-title-row">
                <input
                  className="clipboard-input"
                  value={draft.title}
                  onChange={event => setDraft(prev => ({ ...prev, title: event.target.value }))}
                  placeholder={isUploading ? 'Uploading file' : 'Title'}
                  readOnly={isFileDraft || isUploading}
                />
                <div className="clipboard-actions">
                  {isFileDraft ? (
                    <button className="clipboard-btn" type="button" onClick={downloadDraft} disabled={isSaving || isFileExpired}>
                      <Download size={16} /> {isFileExpired ? 'Expired' : 'Download'}
                    </button>
                  ) : !isUploading && (
                    <button className="clipboard-btn secondary icon" type="button" onClick={copyDraft} title="Copy">
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  )}
                  {!isUploading && (
                    <button className="clipboard-btn secondary icon" type="button" onClick={requestDeleteDraft} title="Delete" disabled={isSaving}>
                      <Trash2 size={16} />
                    </button>
                  )}
                  {!isFileDraft && !isUploading && (
                    <button className="clipboard-btn" type="button" onClick={saveDraft} disabled={isSaving}>
                      <Save size={16} /> {isSaving ? 'Saving' : 'Save'}
                    </button>
                  )}
                </div>
              </div>

              {!isFileDraft && !isUploading && (
                <div className="clipboard-toolbar" aria-label="Formatting">
                  <button className="clipboard-tool" type="button" onClick={() => runCommand('bold')} title="Bold"><Bold size={15} /></button>
                  <button className="clipboard-tool" type="button" onClick={() => runCommand('italic')} title="Italic"><Italic size={15} /></button>
                  <button className="clipboard-tool" type="button" onClick={() => runCommand('underline')} title="Underline"><Underline size={15} /></button>
                  <button className="clipboard-tool" type="button" onClick={() => runCommand('justifyLeft')} title="Left"><AlignLeft size={15} /></button>
                  <button className="clipboard-tool" type="button" onClick={() => runCommand('justifyCenter')} title="Center"><AlignCenter size={15} /></button>
                  <button className="clipboard-tool" type="button" onClick={() => runCommand('justifyRight')} title="Right"><AlignRight size={15} /></button>
                  <button className="clipboard-tool" type="button" onClick={() => runCommand('insertUnorderedList')} title="Bullets"><List size={15} /></button>
                  <button className="clipboard-tool" type="button" onClick={() => runCommand('insertOrderedList')} title="Numbers"><ListOrdered size={15} /></button>
                  <button className="clipboard-tool" type="button" onClick={addLink} title="Link"><LinkIcon size={15} /></button>
                  <button className="clipboard-tool" type="button" onClick={clearFormatting} title="Clear formatting"><Eraser size={15} /></button>
                </div>
              )}

              <div
                className={`clipboard-drop-surface ${draft.content_text || isFileDraft || isUploading ? 'blocked' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {uploadProgress ? (
                  <div className="clipboard-upload-view" role="status" aria-live="polite">
                    <div className="clipboard-upload-card">
                      <div className="clipboard-upload-card-head">
                        <UploadCloud size={22} aria-hidden="true" />
                        <span className="clipboard-file-name">{uploadProgress.name}</span>
                      </div>
                      <div className="clipboard-upload-detail">
                        {formatBytes(uploadProgress.size)} · {uploadProgress.phase === 'saving' ? 'Finishing upload' : 'Uploading'}
                      </div>
                      <div className="clipboard-progress-track" aria-hidden="true">
                        <div className="clipboard-progress-fill" style={{ width: `${uploadProgress.percent}%` }} />
                      </div>
                      <div className="clipboard-progress-row">
                        <span>{uploadProgress.percent}% · {formatBytes(uploadProgress.loaded)}</span>
                        <span>
                          {formatDuration(uploadProgress.elapsed)} elapsed
                          {uploadProgress.eta > 0 ? ` · ${formatDuration(uploadProgress.eta)} left` : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : isFileDraft ? (
                  <div className="clipboard-file-view">
                    <div className="clipboard-file-card">
                      <div className="clipboard-file-card-head">
                        <FileIcon size={24} aria-hidden="true" />
                        <span className="clipboard-file-name">{draft.file_name}</span>
                      </div>
                      <div className="clipboard-file-detail">
                        {formatBytes(draft.file_size)} · {draft.file_type || 'Unknown type'}<br />
                        Automatically deletes in {formatTimeRemaining(draft.expires_at, now).replace(' left', '')}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={editorRef}
                    className="clipboard-editor"
                    contentEditable={!isSaving}
                    suppressContentEditableWarning
                    onInput={syncDraftFromEditor}
                    onBlur={syncDraftFromEditor}
                    onPaste={handlePaste}
                  />
                )}

                {isDraggingFile && !uploadProgress && (
                  <div className={`clipboard-drop-overlay ${draft.content_text || isFileDraft ? 'blocked' : ''}`}>
                    <UploadCloud size={30} aria-hidden="true" />
                    <strong>{draft.content_text || isFileDraft ? 'File drop unavailable' : 'Drop to upload'}</strong>
                    <span>
                      {draft.content_text
                        ? 'Clear the text first. A clip can contain text or one file, never both.'
                        : isFileDraft
                          ? 'Start a new clip before dropping another file.'
                          : 'Any file type, up to 100 MB. It will be deleted after 24 hours.'}
                    </span>
                  </div>
                )}
              </div>
              </div>
            </div>
          )}

          <div className="clipboard-status">{isLoading ? 'Syncing' : message}</div>
        </section>
      )}

      {showDeleteConfirm && (
        <div className="clipboard-modal-backdrop" role="presentation" onMouseDown={() => setShowDeleteConfirm(false)}>
          <div
            className="clipboard-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="clipboard-delete-title"
            onMouseDown={event => event.stopPropagation()}
          >
            <h2 id="clipboard-delete-title">{draft.id ? `Delete ${isFileDraft ? 'file' : 'clip'}` : 'Clear draft'}</h2>
            <p>
              {draft.id
                ? `Remove "${draft.title || 'Untitled'}" from this clipboard${isFileDraft ? ' and delete the uploaded file' : ''}?`
                : 'Clear the current unsaved text?'}
            </p>
            <div className="clipboard-modal-actions">
              <button className="clipboard-btn secondary" type="button" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className="clipboard-btn danger" type="button" onClick={deleteDraft} disabled={isSaving}>
                <Trash2 size={16} /> {draft.id ? 'Delete' : 'Clear'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Clipboard
