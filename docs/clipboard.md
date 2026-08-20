# Clipboard

A code-gated shared scratchpad at **`/clipboard`** for moving formatted text or a temporary file
between devices without an account.

- Page: [src/pages/Clipboard.jsx](../src/pages/Clipboard.jsx)
- Client service: [src/utils/supabase.js](../src/utils/supabase.js)
- Schema and Storage bucket: [supabase-clipboard-schema.sql](../schemas/supabase-clipboard-schema.sql)
- Expiry worker: [cleanup-clipboard-files](../supabase/functions/cleanup-clipboard-files/index.ts)
- Tables: `clipboard_spaces`, `clipboard_items`
- Storage bucket: `clipboard-files` (public, random non-enumerable object paths, 100 MB per file)

**No sign-in required.** The route sits outside `<Layout>` and the auth gate. It is a standalone,
URL-only utility and does not appear in site navigation.

---

## Using it

1. Go to `/clipboard`.
2. Enter a shared code, or click **Generate random code**.
3. Open it. Saved items appear newest first.
4. For text, type or paste into the editor and click **Save**.
5. For a file, start with an empty editor and drag exactly one file onto it. Upload begins
   immediately; there is intentionally no upload button.
6. Select a saved file and click **Download**.

A clipboard item is always one of these:

- A rich-text clip with no file.
- One file with no text. Its name, size, type, and expiry are shown in the UI.

Dropping a file is blocked while the editor contains text. A successful file drop clears the
text draft and title, uploads the object, and saves a file-only item. Files of any MIME type are
accepted up to 100 MB. The progress view shows uploaded bytes, percentage, elapsed time, and an
estimated time remaining.

Files stop appearing and downloading from the clipboard at `expires_at`, exactly 24 hours after
their metadata is saved. The scheduled cleanup worker permanently removes the Storage object and
database row on its next run.

Codes are normalized before use: trimmed, whitespace collapsed to `-`, and upper-cased. The
minimum length is six characters. Closing clears the code from the page.

---

## Access model

The browser computes:

```text
SHA-256("solarpack-clipboard:" + NORMALIZED-CODE)
```

The server never receives the plaintext code. `clipboard_items.access_hash` stores only the
64-character hash.

The clipboard tables revoke direct access from `anon` and `authenticated`. Reads and writes go
through hash-scoped `SECURITY DEFINER` functions:

| Function | Does |
|---|---|
| `get_clipboard_items(hash)` | Returns text items and unexpired files for one hash |
| `save_clipboard_item(hash, id, title, html, text)` | Inserts or updates a text-only item |
| `save_clipboard_file(hash, name, path, size, type)` | Inserts one file-only item with a server-generated 24-hour expiry |
| `delete_clipboard_item(hash, id)` | Deletes hash-scoped metadata |

The file object path is `clipboard/<64-char hash>/<random UUID>/<safe filename>`. The public bucket
does not need a broad `SELECT` policy, so users cannot list it through the Storage API. A file URL
is public if it leaks; the hash and random UUID make URLs impractical to guess.

This is convenient, not confidential:

- A hand-typed code is guessable. Generated codes have 48 bits of randomness.
- Files are public to anyone who has their full download URL until cleanup runs.
- There is no rate limiting or upload quota per code.
- Clipboard text is not encrypted at rest.

Do not use it for passwords, keys, or sensitive data.

---

## Supabase setup

### 1. Apply the schema

Run [supabase-clipboard-schema.sql](../schemas/supabase-clipboard-schema.sql) in the Supabase SQL
Editor. It upgrades an existing text-only installation in place, creates the `clipboard-files`
bucket, installs its policies, and replaces the clipboard RPC return shapes.

The site and schema must be released together. A new frontend against the old functions will fail
to save file metadata.

### 2. Deploy the cleanup worker

Create a long random secret, then deploy the included Edge Function:

```sh
npx supabase secrets set CLIPBOARD_CLEANUP_SECRET=<long-random-secret>
npx supabase functions deploy cleanup-clipboard-files --no-verify-jwt
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided automatically inside hosted Supabase
Edge Functions. Never put the service-role key in the browser or Vite environment.

### 3. Schedule it every minute

Enable **Cron** and **pg_net** in the Supabase Dashboard. Store the function URL and the same
cleanup secret in Vault, then schedule the call:

```sql
select vault.create_secret(
  'https://YOUR_PROJECT_REF.supabase.co/functions/v1/cleanup-clipboard-files',
  'clipboard_cleanup_url'
);

select vault.create_secret(
  'THE_SAME_LONG_RANDOM_SECRET',
  'clipboard_cleanup_secret'
);

select cron.schedule(
  'cleanup-clipboard-files',
  '* * * * *',
  $$
  select net.http_post(
    url := (
      select decrypted_secret
      from vault.decrypted_secrets
      where name = 'clipboard_cleanup_url'
    ),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (
        select decrypted_secret
        from vault.decrypted_secrets
        where name = 'clipboard_cleanup_secret'
      )
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 10000
  );
  $$
);
```

The worker deletes at most 1,000 expired objects per invocation. It calls the Storage API before
deleting rows; do not delete from `storage.objects` with SQL because that would orphan the bytes.
Check **Integrations → Cron → History** and Edge Function logs after setup.

---

## Text editor and sanitization

The rich-text editor supports bold, italic, underline, lists, alignment, links, tables, headings,
and clear-formatting. `sanitizeHtml()` runs on paste, save, and load.

It removes active/embedded elements (`SCRIPT`, `IFRAME`, `IMG`, `SVG`, `VIDEO`, and others), all
`on*` attributes, unsafe link protocols, and CSS outside a small allow-list. Pasted screenshots do
not become inline images; drag the image file into an empty editor instead.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| “Use a longer code” | Code is under six normalized characters | Use a longer code or Generate |
| `Invalid clipboard code` | Web Crypto is unavailable | Use HTTPS or `localhost`, not plain HTTP on a LAN IP |
| Text save fails | RPC schema is missing or stale | Re-run the schema and confirm PostgREST reloaded |
| File upload returns `Bucket not found` | New schema has not created `clipboard-files` | Run the schema |
| File upload gets an RLS error | Storage policies are missing, or the deployed path format differs | Re-run the schema and use the current frontend |
| Drop says to clear text | File and text cannot share an item | Start a new blank clip or clear the editor |
| File remains in Storage after 24 hours | Cleanup function or Cron job is not running | Check Cron history, function logs, and both Vault secrets |
| File is hidden but its URL briefly works | Cleanup has not reached its next one-minute run | Expected; verify the next Cron run deletes it |
| Lost code | The server stores only its hash | The content is unrecoverable by design |

---

## Related docs

- [Supabase Setup](supabase.md)
- [Database Reference](database-reference.md#clipboard-tables)
- [Public Site](public-site.md)
