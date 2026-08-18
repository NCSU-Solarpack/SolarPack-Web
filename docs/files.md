# Files

A file browser inside the admin dashboard — upload, organise, preview and share team documents
without leaving the site. Backed by Supabase Storage.

- UI: [src/components/admin/FilesManager.jsx](../src/components/admin/FilesManager.jsx) (1431 lines)
- Bucket: `file-storage` — [supabase-file-storage-schema.sql](../schemas/supabase-file-storage-schema.sql)

**Every approved user can use this tab** — it declares no `permission`, and `canManageFiles`
accepts member, leader and director alike. It's the team's shared drive.

---

## What you can do

| Action | How |
|---|---|
| Browse | Double-click folders; breadcrumbs and **Up** to navigate back |
| Upload | **Upload** button, or drag files anywhere onto the view |
| New folder | **New Folder** |
| Rename | Right-click → Rename |
| Delete | Right-click → Delete, or select several and delete together |
| Download | Right-click → Download |
| Preview | Double-click images, video and audio |
| Search | The search box filters the current folder |
| Switch layout | Grid / list toggle |
| Multi-select | Click to select, `Ctrl/Cmd+click` to add |

Right-click anywhere for the context menu.

---

## Limits

Set on the bucket in [supabase-file-storage-schema.sql](../schemas/supabase-file-storage-schema.sql):

- **50 MB per file** (`file_size_limit: 52428800`)
- **A MIME allow-list.** Uploading a type that isn't on it fails with a storage error:

  images (jpeg, png, gif, webp, svg) · pdf · Word (doc, docx) · Excel (xls, xlsx) ·
  PowerPoint (ppt, pptx) · txt · csv · zip · mp4 · webm · mp3 · wav

To allow another type, edit `allowed_mime_types` on the bucket in Supabase → Storage →
file-storage → Settings, and update the schema file to match.

File **icons** are chosen separately, by extension, from the `FILE_TYPES` map at the top of
`FilesManager.jsx`. An allowed type with no icon mapping just gets a generic file icon — harmless.

---

## Folders aren't real

Supabase Storage is flat key-value; "folders" are `/` in object keys. So creating an empty folder
requires a placeholder object, and this manager writes a hidden **`.keep`** file to hold the folder
open.

Consequences:

- `.keep` files exist but are filtered out of the display (as is anything starting with `.`).
- Deleting a folder means enumerating and deleting every object under it. `collectAllFilePaths()`
  recurses to gather them all, then deletes in one call — so **deleting a folder deletes
  everything inside it, permanently, with no recycle bin.** The confirmation is the only safety net.
- Renaming a *file* is download → re-upload under the new name → delete the old. Slow for large
  files, and it breaks any URL previously shared for that file.

---

## The "Website Data" folder

The root shows a virtual folder called **Website Data** that isn't in `file-storage` at all — it's
a read-only window onto the four buckets the rest of the site writes to:

| Folder | Bucket | Written by |
|---|---|---|
| Order Receipts | `order-receipts` | [Orders](orders.md) |
| Blog Images | `blog-images` | [Blogs](blogs.md) |
| Sponsor Logos | `sponsor-logos` | [Sponsors](content-managers.md#sponsors) |
| Team Images | `team-images` | [Team](content-managers.md#team-members) |

You can browse, preview and download from these, but the upload/rename/delete controls are hidden
(`isProtectedZone`). That's deliberate: deleting a headshot here would leave a broken image on
`/team` with nothing in the UI to explain why.

**Manage these files through their own tabs instead** — deleting a team member removes their photo,
deleting a blog removes its images, and so on.

> This protection is **UI-only.** The buckets are public and the storage policies allow any
> authenticated user to write to them; the hidden buttons are a convention, not a control. Two
> real issues follow from this:
>
> - **`order-receipts` is public and enumerable.** Files are named `<orderId>.pdf`, so anyone who
>   can guess an ID can fetch a receipt with purchase amounts on it. Making it private plus signed
>   URLs is the fix — see [Security & Handover](security-and-handover.md).
> - **Any authenticated user can delete from these buckets** with a direct API call, regardless of
>   role.

---

## Previews

Images, video and audio preview in a modal.

**PDF preview is disabled** — `const ALLOW_PDF_PREVIEW = false;` at the top of the file. The
machinery is still there (`pdfjs-dist` renders page 1 to a canvas), but it's switched off. PDFs
download instead. Flipping the flag to `true` re-enables it; expect to test it, since it was
presumably turned off for a reason.

---

## Practical notes

- **Files are public.** The bucket is `public: true`, so anything with a URL is readable by anyone
  who has it. Fine for CAD exports and meeting notes; **not** for anything containing personal data
  or unreleased sponsor agreements.
- **Storage counts against your Supabase plan.** The free tier is ~1 GB. A few hundred MB of raw
  video will fill it and start failing uploads across the whole site, including headshots and
  receipts. Check usage in Supabase → Settings → Usage, and prune big files.
- **No versioning.** Uploading over an existing name replaces it, and the old contents are gone.
- **Agree a folder convention** and put it in a `README.txt` at the root — e.g.
  `/Aero`, `/HighVoltage`, `/Business/Sponsorship`, `/Race2026`. Without one, a shared drive turns
  into a pile within a semester.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Upload fails silently | MIME type not on the allow-list | Check the list above; add the type to the bucket if it's legitimate |
| Upload fails on a big file | Over the 50 MB per-file cap | Compress, split, or link to Drive instead |
| All uploads suddenly fail | Bucket storage quota exhausted | Supabase → Settings → Usage; delete large files |
| Can't delete something in Website Data | Read-only zone by design | Delete it from its own tab (Orders/Blogs/Sponsors/Team) |
| Folder appears empty but won't delete | It contains only hidden `.keep`/dot files | Deleting the folder still works; it removes them |
| PDF downloads instead of previewing | `ALLOW_PDF_PREVIEW = false` | Intentional; flip the flag to re-enable |
| Renamed a file and a shared link broke | Rename = re-upload under a new key | Re-share the new URL |
| "Not authenticated" on upload | Session went stale in a background tab | Reload the page |

---

## Related docs

- [Supabase Setup](supabase.md#5-storage-buckets) — buckets and policies
- [Orders](orders.md#receipts-and-storage) — the receipts bucket
- [Security & Handover](security-and-handover.md) — the public-bucket issues
