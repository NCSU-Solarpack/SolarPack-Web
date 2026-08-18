# Team, Sponsors & Alumni

The three public-content managers. They're grouped here because they work almost identically:
a list, a form, drag-to-reorder, and an image upload.

| Tab | Component | Table | Bucket | Public page |
|---|---|---|---|---|
| Team | [TeamManager.jsx](../src/components/admin/TeamManager.jsx) | `team_members` | `team-images` | `/team` |
| Sponsors | [SponsorsManager.jsx](../src/components/admin/SponsorsManager.jsx) | `sponsors` | `sponsor-logos` | `/sponsors` |
| Alumni | [AlumniManager.jsx](../src/components/admin/AlumniManager.jsx) | `alumni` | — | `/alumni` |

**Everything you type here is public immediately.** There is no draft state — unlike blogs, these
tables have no `published` flag. Save it and it's live on solarpacknc.com within a page load.

---

## Team Members

Admin dashboard → **Team** tab → **Team Members** section.
Requires `edit_team` (**leader or director**).

### Fields

| Field | Notes |
|---|---|
| `name` | **Required** |
| `role` | **Required** — job title, e.g. "Aerodynamics Lead" |
| `image` | Headshot URL, set by the uploader |
| `bio` | Free text; shown in the modal on `/team` |
| `email` | Optional; published publicly |
| `linkedin` | Optional URL |
| `order` | Display order (drag to change) |
| `user_id` | Optional link to a website account |

### Doing things

**Add** → *Add Member*, fill the form, upload a headshot, save.

**Reorder** → drag the cards. Order is written to the `"order"` column and `/team` sorts by it, so
directors first is the usual convention. Dragging rewrites the `order` of every affected card in
one pass.

**Delete** → confirms, then removes the row **and** the headshot from storage.

**Link to an account** → the dropdown lists website accounts from
`getUsersForTeamAssignment()`. Linking also pushes the card's `role` text into
`user_roles.specific_role`, so the person's dashboard shows their title. It grants no permissions —
see [Members & Users](members-and-users.md#two-different-things-called-team-member) for why
accounts and cards are separate.

### Headshots

- 5 MB limit, enforced client-side in `handleImageSelect`.
- Uploaded to `team-images`, named by member id, `upsert: true`.
- **Square crops look best** — the cards are square and a portrait photo gets centre-cropped.
- Replacing an image overwrites the same object, so a CDN cache may serve the old one for a few
  minutes. Hard-refresh to check.

---

## Sponsors

Admin dashboard → **Sponsors** tab. Requires `edit_sponsors` (**leader or director**).

### Tiers

Four tiers are always rendered, even when empty:

| Tier | Icon |
|---|---|
| `Platinum Sponsors` | 🏆 |
| `Gold Sponsors` | 🥇 |
| `Silver Sponsors` | 🥈 |
| `Bronze Sponsors` | 🥉 |

`tier` is a **plain text column**, not an enum or foreign key. The four names are a hard-coded
array in `SponsorsManager` (`allTiers`), and `getTierIcon()` picks the icon by substring match on
the lowercased name. Consequences:

- A typo (`"Gold Sponsor"`, singular) creates a **fifth tier** that renders on `/sponsors` but is
  invisible in the manager, which only iterates the four known names. If a sponsor "disappears"
  from the admin UI but shows on the public page, this is why — fix with SQL:
  ```sql
  update sponsors set tier = 'Gold Sponsors' where tier = 'Gold Sponsor';
  ```
- To add a real fifth tier, add it to the `allTiers` array in
  [SponsorsManager.jsx](../src/components/admin/SponsorsManager.jsx#L266). The icon falls back to a
  default unless the name contains one of the four keywords.

### Fields

`tier` (required) · `name` (required) · `logo` (uploaded) · `website` · `order`

`getSponsors()` groups the flat table into `{ tier, sponsors: [...] }` for the UI, ordered by
`"order"` within each tier.

### Logos

- 5 MB limit, `sponsor-logos` bucket, named by sponsor id.
- **Transparent PNG or SVG on a dark background.** The site is dark (`--bg: #0a0a0a`), so a logo
  with a baked-in white background shows as a white rectangle.
- Deleting a sponsor deletes its logo from storage too.

Sponsors are a real obligation — tier placement is usually written into the sponsorship agreement.
Check with the business subteam before moving anyone between tiers.

---

## Alumni

Admin dashboard → **Alumni** tab. Requires `edit_alumni` (**leader or director**).

### Structure

Alumni are stored **per semester**, not per person. One row per semester, with the people in a
JSONB array:

```
alumni
  id          bigserial
  semester    text        e.g. "Spring 2026"
  leadership  jsonb       [{ role: "Project Director", name: "Jane Doe" }, ...]
  order       integer     display order
```

`/alumni` renders newest-first in two columns, so the most recent graduating class appears
top-left.

### Doing things

**Add a semester** → *Add Semester*, name it (`"Fall 2026"` — keep the format consistent, it's just
text), then add `{role, name}` rows.

**Edit** → click the semester; add, edit, remove entries inline. Saves the whole JSONB array at
once.

**Reorder** → drag semesters. Persisted through `saveAlumniOrder()`, which rewrites the `order` of
every semester in one call.

**Delete** → uses `deleteAlumniSemesterSafe()`, which deletes by `id` and falls back to matching on
the semester name if the id is missing (older rows). Permanent — the confirmation says so.

### Why JSONB?

A semester's leadership list is only ever read and written as a whole, never queried by person, so
a normalised `alumni_people` table would buy nothing. The tradeoff: you can't ask "which semesters
was Jane in?" in SQL without JSONB operators:

```sql
select semester from alumni
where leadership @> '[{"name": "Jane Doe"}]';
```

---

## What they share

All three follow the standard manager pattern described in
[Architecture](architecture.md#srccomponentsadmin--one-manager-per-dashboard-tab):

- **Sync status badge** — 2-second polling via `useSupabaseSyncStatus`; tells you when someone else
  has changed the same table instead of silently overwriting them.
- **Optimistic updates** — the UI changes first, then the write goes out. If you see an error
  dialog, reload before trusting the screen.
- **Refresh on tab refocus** — `visibilitychange` re-fetches.
- **Themed confirm dialogs** via `useAlert()`, never `window.confirm`.
- **5 MB client-side image limit** in Team and Sponsors. There is no server-side size check beyond
  the bucket's own configuration — a determined user could bypass it.

### Ordering, in general

`"order"` is a quoted identifier in every query because `order` is a SQL reserved word. If you
write a query by hand and it throws a syntax error near `order`, that's why:

```sql
select * from team_members order by "order" asc;
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Buttons disabled | You're a `member`; these need `edit_*` (leader+) | Ask a leader |
| Public page doesn't show a change | Browser or CDN cache | Hard-refresh (`Cmd/Ctrl+Shift+R`) |
| Image uploaded but shows the old one | Same-name overwrite still cached | Wait a few minutes, hard-refresh |
| Image upload rejected | Over 5 MB | Compress it |
| Logo appears as a white box | Non-transparent background against the dark theme | Use a transparent PNG or SVG |
| A sponsor is on `/sponsors` but not in the manager | `tier` doesn't match one of the four exact names | Fix the `tier` value with SQL |
| Drag-reorder doesn't stick | The `order` write failed | Check the console; reload and retry |
| Alumni semester won't delete | Legacy row with no usable `id` | `deleteAlumniSemesterSafe` falls back to the name; if it still fails, delete in the Supabase table editor |
| Deleted a member, their photo is still in storage | Delete succeeded, storage cleanup failed | Remove it manually in Supabase → Storage |

---

## Related docs

- [Members & Users](members-and-users.md) — accounts vs. public cards
- [Public Site](public-site.md) — how these render for visitors
- [Database Reference](database-reference.md) — full columns
- [Admin Dashboard](admin-dashboard.md) — shared behaviour
