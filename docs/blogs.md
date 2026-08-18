# Blogs

Writing, editing and publishing posts for `/blogs`. The only content type in the app with a
draft/published distinction.

- Admin UI: [src/components/admin/BlogManager.jsx](../src/components/admin/BlogManager.jsx) (1069 lines)
- Public page: [src/pages/Blogs.jsx](../src/pages/Blogs.jsx)
- Data layer: [src/utils/supabase.js](../src/utils/supabase.js) lines 1796–2047
- Table: `blogs` · Bucket: `blog-images`

Requires `edit_announcements` (**leader or director**) to write; everyone can view the tab.

---

## The table

```
blogs
  id          uuid      default gen_random_uuid()
  title       text      not null
  author      text      not null
  body        text      not null   ← assembled HTML
  image_url   text                 ← hero image
  link_url    text                 ← optional call-to-action link
  link_text   text                 ← label for that link
  published   boolean   default false
  created_at  timestamptz
  updated_at  timestamptz          ← auto-bumped by trigger
```

`published` is what separates a draft from a live post. The RLS policies enforce it:

| Policy | Effect |
|---|---|
| `Public can view published blogs` | anonymous visitors see `published = true` only |
| `Authenticated users can view all blogs` | signed-in users see drafts too |
| insert / update / delete | any authenticated user |

So an unpublished draft is genuinely invisible to the public — not merely hidden by the UI. That's
a real guarantee, unlike most of this app's permission checks.

---

## Writing a post

Blogs tab → **New Blog Post**.

| Field | Required | Notes |
|---|:--:|---|
| Title | ✅ | |
| Author | ✅ | Free text — a name, not an account link |
| Body sections | ✅ | At least one non-empty section |
| Hero image | | Shown on the card and at the top of the post |
| Link URL + text | | Optional CTA, e.g. "Read the full report" |

### The section editor

The body isn't one big textarea — it's an ordered list of **sections**, each either:

- **Text** — a `contentEditable` rich-text block. Bold, italics, lists, headings all work; paste
  from a document mostly survives.
- **Image** — an uploaded image rendered full-width between text blocks.

You can add, delete and reorder sections. This exists so a post can interleave prose and photos
without anyone hand-writing HTML.

### How sections become `body`

On save, `assembleBodyHtml()` concatenates the sections into one HTML string:

- text section → its HTML verbatim
- image section → `<p><img src="..."/></p>`

**Sections are not stored separately.** The database gets a single `body` string. When you re-open
a post to edit it, `parseBodyToSections()` walks the HTML with `DOMParser` and reconstructs the
section list: any element that is a lone `<img>` becomes an image section, everything else
accumulates into text sections.

That round-trip is lossy at the edges. An image wrapped in something unusual, or HTML pasted from
elsewhere with unexpected nesting, may come back as one big text block on the next edit. The
content is never lost — the HTML is preserved — but the section boundaries can shift. If you edit
a post repeatedly and the structure drifts, that's the cause.

### Image uploads

Two kinds, both into `blog-images`, both capped at **5 MB** client-side:

| | Method | Naming |
|---|---|---|
| Hero | `uploadBlogImage(file, blogId)` | by blog id |
| Inline | `uploadBlogInlineImage(file, blogId)` | unique per image |

**New posts are created in two steps**, which is worth knowing when debugging: the row is inserted
first with an empty `body` to obtain an id, then images upload against that id, then the row is
updated with the assembled HTML. So a failure mid-save can leave an empty post behind — just
delete it and retry.

Deleting a post cleans up its images via `deleteBlogImage()` / `deleteBlogInlineImage()`.
Removing an inline image from a section during an edit also deletes it from storage immediately —
so **undoing that removal won't bring the image back**; you'll need to re-upload.

---

## Publishing

Each post in the list has a publish toggle. Publishing is instant — it flips `published` and the
post appears on `/blogs` on the next page load. Unpublishing is equally instant and is the fastest
way to pull something that shouldn't have gone out.

Drafts stay visible to signed-in users in the admin list, marked as unpublished.

There is **no scheduling**. If you need a post to go out at a specific time, publish it manually
then.

---

## How it looks to visitors

[/blogs](../src/pages/Blogs.jsx) calls `getPublishedBlogs()` (`published = true`, newest first) and
renders cards. Each card shows the hero image, title, author, and an excerpt built by
`createExcerpt()` — which strips HTML tags and truncates, so the excerpt is plain text regardless
of formatting.

Clicking a card opens the full post in a modal with `body` rendered as HTML.

> **`body` is injected with `dangerouslySetInnerHTML`.** That's necessary for the rich-text editor
> to work, but it means anyone who can write a blog post can inject arbitrary HTML — and since the
> RLS insert/update policies allow **any authenticated user**, that's any approved member, not just
> leaders. Sanitising on render (e.g. `dompurify`) would close it. Tracked in
> [Security & Handover](security-and-handover.md).

`react-markdown` and `remark-gfm` are dependencies but the blog pipeline is HTML, not Markdown —
they're used elsewhere/left over. Don't write Markdown into a section expecting it to render.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| **New Blog Post** missing | Needs `edit_announcements` (leader+) | Ask a leader |
| Post not on `/blogs` | Not published | Toggle publish in the manager |
| Draft visible to you but not others | Correct — RLS hides unpublished posts from anonymous visitors | Working as intended |
| "Please fill in all required fields" | Title, author, or all sections empty | A whitespace-only section counts as empty |
| Image upload rejected | Over 5 MB | Compress it |
| Sections merged into one block after re-editing | `parseBodyToSections` couldn't identify boundaries | Re-split them manually; content is intact |
| Deleted an inline image by accident | Storage deletion is immediate, no undo | Re-upload |
| Empty post appeared in the list | Save failed between the create and update steps | Delete it and retry |
| Formatting looks wrong after pasting | `contentEditable` kept the source's markup | Paste as plain text (`Cmd/Ctrl+Shift+V`), then format |
| Excerpt shows raw text with no formatting | By design — `createExcerpt` strips HTML | Working as intended |

---

## Related docs

- [Public Site](public-site.md#team-alumni-sponsors-blogs) — the visitor-facing page
- [Database Reference](database-reference.md#blogs) — columns and policies
- [Admin Dashboard](admin-dashboard.md) — shared manager behaviour
