# Clipboard

A code-gated shared scratchpad at **`/clipboard`** — paste formatted text on one device, open the
same code on another, and it's there. Built for moving notes and snippets between a shop
computer, a phone, and a laptop without email or a login.

- Page: [src/pages/Clipboard.jsx](../src/pages/Clipboard.jsx) (1027 lines)
- Schema: [supabase-clipboard-schema.sql](../schemas/supabase-clipboard-schema.sql)
- Tables: `clipboard_spaces`, `clipboard_items`

**No sign-in required.** The route sits outside `<Layout>` and outside the auth gate — it's a
standalone full-page tool with its own styling and its own `document.title`.

---

## Using it

1. Go to `/clipboard`.
2. Either **enter a code** you already share with someone, or click **Generate** for a random one
   in the form `SP-A1B2-C3D4-E5F6`.
3. **Open** it. Everything saved under that code appears, newest first.
4. Type or paste into the editor and **Save**.
5. On the other device, open the same code.

Codes are normalised before use: trimmed, whitespace collapsed to `-`, and upper-cased. So
`sp a1b2 c3d4` and `SP-A1B2-C3D4` are the same space. Minimum 6 characters.

**Closing** clears the code from the page. There's no session — reopening means typing the code
again.

---

## How the access model works

This is the unusual part, and worth understanding before you rely on it.

**The server never sees your code.** The browser computes

```
SHA-256("solarpack-clipboard:" + NORMALIZED-CODE)
```

with the Web Crypto API and sends only that 64-character hex hash. `clipboard_items.access_hash`
stores the hash; the plaintext code exists only in the heads of the people using it.

**The tables are unreachable directly.** The schema does:

```sql
REVOKE ALL ON clipboard_spaces  FROM anon, authenticated;
REVOKE ALL ON clipboard_items   FROM anon, authenticated;
```

so neither anonymous nor signed-in clients can `select` from them at all. The only way in is three
`SECURITY DEFINER` functions, each of which requires an access hash of at least 32 characters and
scopes every operation to it:

| Function | Does |
|---|---|
| `get_clipboard_items(hash)` | returns that space's items, newest first |
| `save_clipboard_item(hash, id, title, html, text)` | insert if `id` is null, else update — and only if the row's hash matches |
| `delete_clipboard_item(hash, id)` | delete, hash-scoped |

The `id`-plus-`hash` matching means knowing an item's UUID gets you nothing without the code.

### What this does and doesn't protect

**It does**: keep codes off the server, prevent enumeration of other people's spaces, and require
no accounts.

**It doesn't**:

- **Guessable codes are the whole security boundary.** A generated code is 48 bits of randomness —
  fine. A code someone types by hand, like `SOLARPACK`, is trivially guessable, and anyone who
  guesses it reads everything in that space. The 6-character minimum is not meaningful protection.
- **No expiry.** Content stays until someone deletes it. There's no TTL and no cleanup job.
- **No rate limiting.** Nothing stops a script from trying codes.
- **Not encrypted at rest.** Anyone with Supabase dashboard access reads every clipboard in
  plaintext, hash or no hash.

**Treat it as convenient, not confidential.** Don't paste passwords, keys, or anything you'd mind a
stranger reading. For a periodic cleanup:

```sql
delete from clipboard_items where updated_at < now() - interval '90 days';
delete from clipboard_spaces
where access_hash not in (select access_hash from clipboard_items);
```

---

## The editor

A `contentEditable` rich-text area with a formatting toolbar — bold, italic, underline,
strikethrough, headings, ordered and unordered lists, alignment, links, and clear-formatting.

**It is text only. Images are stripped.** `sanitizeHtml()` runs over everything on paste, on save,
and on load, and it removes these tags outright:

```
AUDIO CANVAS EMBED FORM IFRAME IMG INPUT OBJECT PICTURE SCRIPT SOURCE STYLE SVG TEXTAREA VIDEO
```

So pasting a screenshot pastes nothing. Use the [Files](files.md) tab for images.

The sanitizer is genuinely thorough, which is what makes a no-login shared space safe to open:

- Only an allow-list of formatting tags survives (`P`, `SPAN`, `H1`–`H6`, `UL`/`OL`/`LI`, `TABLE`
  and friends, `STRONG`, `EM`, `CODE`, `PRE`, …). Unknown tags are **unwrapped** — their children
  are kept, the tag itself is dropped — so content isn't lost to an unrecognised wrapper.
- Every `on*` attribute is removed, so no inline event handlers.
- `style` is filtered to an allow-list of ~15 harmless properties (colour, font, alignment,
  spacing). Everything else goes.
- `href` on links is checked by `isSafeHref()`, and safe links get `target="_blank"`.

Each item stores both `content_html` (rendered) and `content_text` (plain text via
`getTextFromHtml`). Untitled items save as `"Untitled"` — the SQL coalesces a blank title. Items
sort by `updated_at`, newest first.

---

## Discoverability

`/clipboard` is **not in the site navigation** — check the nav list in
[Header.jsx](../src/components/Header.jsx#L126-L134) and you won't find it. It's known by URL
only. That's not a security measure (the route is public and the JS bundle contains it), just a
sign that it's an internal utility rather than a public feature.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| "Use a longer code" | Under 6 characters after normalisation | Use a longer one, or Generate |
| Opened a code, it's empty | Nothing has ever been saved under it — a typo silently creates a new empty space | Re-check the code character by character |
| Content differs between devices | Different codes (normalisation makes case/spacing irrelevant, but not typos) | Compare the codes exactly |
| `Invalid clipboard code` error | The hash reaching the function was under 32 chars — usually Web Crypto unavailable | `crypto.subtle` requires a **secure context**: HTTPS or `localhost`. It fails over plain HTTP on a LAN IP |
| Save fails | Functions missing or `GRANT EXECUTE` not applied | Re-run [supabase-clipboard-schema.sql](../schemas/supabase-clipboard-schema.sql) |
| Pasted a screenshot, nothing appeared | `IMG` is stripped by the sanitizer — text only by design | Share images through the [Files](files.md) tab |
| Pasted content lost its styling | Only an allow-list of tags and CSS properties survives | Expected; re-apply formatting with the toolbar |
| Lost a code | Unrecoverable by design — the server only has the hash | The content is effectively gone |

---

## Related docs

- [Supabase Setup](supabase.md#database-functions) — the `SECURITY DEFINER` functions
- [Database Reference](database-reference.md#clipboard-tables) — columns
- [Public Site](public-site.md) — the other unauthenticated routes
