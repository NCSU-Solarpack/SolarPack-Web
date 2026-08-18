# Making Changes

A practical guide to editing this codebase: the git workflow, VS Code specifics, and copy-paste
recipes for the changes you're most likely to need.

Assumes you've finished [Getting Started](getting-started.md).

---

## Before you write code: is a code change even needed?

A lot of "can we change the website?" requests need no code at all.

| Request | Where it actually happens |
|---|---|
| Add/remove a team member, reorder the roster | [Team tab](content-managers.md#team-members) |
| Add a sponsor or change their tier | [Sponsors tab](content-managers.md#sponsors) |
| Add a graduating class | [Alumni tab](content-managers.md#alumni) |
| Publish news | [Blogs tab](blogs.md) |
| Anything about orders or schedules | [Orders](orders.md) / [Schedules](schedule.md) |
| Give someone access, change their role | [Members & Users](members-and-users.md) |
| **Change wording on Home, Contact, Donate, Privacy, App** | **code** |
| **Add a new page or dashboard tab** | **code** |
| **Change layout, colours, styling** | **code** |

If it's in Supabase, edit it in the dashboard. Only reach for code when the *structure* changes.

---

## The git workflow

`main` is what's deployed. Never commit straight to it for anything non-trivial.

```sh
# 1. Start from current main
git checkout main
git pull origin main

# 2. Branch — name it for what it does
git checkout -b add-2026-race-photos

# 3. Work, then check what you changed
git status
git diff

# 4. Commit in logical chunks
git add src/pages/Home.jsx
git commit -m "Update home hero copy for 2026 season"

# 5. Push
git push -u origin add-2026-race-photos
```

Then open a Pull Request on GitHub, describe what changed and why, and get a second pair of eyes
on it before merging. Merging to `main` triggers the [deploy](deployment.md).

### Doing this in VS Code instead of the terminal

The **Source Control** panel (`Ctrl/Cmd+Shift+G`) covers all of it:

- **Branch** — click the branch name in the bottom-left status bar → *Create new branch*.
- **Stage** — hover a changed file → **+**. Click the filename first to see a side-by-side diff.
- **Commit** — type the message in the box → `Cmd/Ctrl+Enter`.
- **Push** — *Sync Changes* in the status bar, or the `…` menu → Push.
- **Pull Request** — install the *GitHub Pull Requests* extension to open one without leaving the
  editor.

### Commit messages

Say what changed and why. `"Fix order status not updating after approval"` is useful in six
months; `"fix"`, `"updates"`, `"stuff"` are not. The repo's history has plenty of the latter —
don't add to it.

### If you're working alone and merging your own PRs

Still branch, still open the PR, still read your own diff on GitHub before merging. Reading your
change as a diff catches an astonishing amount — stray `console.log`s, a debug value left
hard-coded, a file you didn't mean to touch.

---

## Finding your way around

| Goal | Shortcut |
|---|---|
| Open a file by name | `Cmd/Ctrl+P` |
| Search all files | `Cmd/Ctrl+Shift+F` |
| Jump to a symbol in the file | `Cmd/Ctrl+Shift+O` |
| Go to definition | `F12` (or `Cmd/Ctrl+click`) |
| Find every use of something | `Shift+F12` |
| Command palette | `Cmd/Ctrl+Shift+P` |

**Start from the URL.** Whatever you're changing, find its route in
[src/App.jsx](../src/App.jsx), open that component, and work outward. Every page and tab is
reachable that way in two hops.

**Search is your friend in the big files.** `OrderManager.jsx` is 3691 lines — don't scroll it,
search it. `Cmd/Ctrl+F` for a label you can see in the UI ("Mark Purchased") and you'll land on the
code that renders it.

---

## Recipe: change text or styling on an existing page

The most common change there is.

1. Find the page in `src/pages/` (see the table in [Public Site](public-site.md#route-map)).
2. `Cmd/Ctrl+F` for the text you can see in the browser.
3. Edit the JSX. Styles are usually in an inline `<style>{`…`}</style>` block in the same file.
4. `npm run dev` — the browser hot-reloads on save.
5. **Check mobile** — devtools device toolbar. Breakpoints are mostly at 768px.
6. Commit and push.

Use the theme variables rather than hard-coded colours:

```css
color: var(--text);          /* not #ffffff */
background: var(--surface);  /* not #1a1a1a */
border-radius: var(--radius);
```

---

## Recipe: add a new public page

```jsx
// 1. src/pages/Awards.jsx
import { useEffect } from 'react'

export default function Awards() {
  useEffect(() => { document.title = 'Awards | SolarPack' }, [])

  return (
    <>
      <style>{`
        .awards { max-width: 1100px; margin: 0 auto; padding: 4rem 1.5rem; }
        .awards h1 { font-family: 'Bebas Neue', sans-serif; color: var(--accent); font-size: 3rem; }
        @media (max-width: 768px) { .awards { padding: 2rem 1rem; } }
      `}</style>
      <section className="awards">
        <h1>Awards</h1>
        <p>…</p>
      </section>
    </>
  )
}
```

```jsx
// 2. src/App.jsx — import at the top
import Awards from './pages/Awards'

//    …and add a Route inside the <Layout> block, BEFORE the catch-all "*" route
<Route path="/awards" element={<Awards />} />
```

```jsx
// 3. src/components/Header.jsx — add to navLinks (~line 126)
{ path: '/awards', label: 'Awards' },
```

Route order matters: `<Route path="*" element={<NotFound />} />` must stay last.

---

## Recipe: pull data from Supabase on a page

Never call `supabase-js` directly from a component — add a method to `supabaseService` so every
query goes through one place, gets the timeout wrapper, and is findable later.

```js
// src/utils/supabase.js — inside the SupabaseService class
async getAwards() {
  if (!this.client) throw new Error('Supabase not configured');
  this.ensureAuth();                       // background refresh, deliberately not awaited

  const { data, error } = await withTimeout(
    this.client.from('awards').select('*').order('year', { ascending: false }),
    REQUEST_TIMEOUT_MS,
    'getAwards'
  );

  if (error) throw error;
  return data || [];
}
```

```jsx
// in the page
const [awards, setAwards] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  supabaseService.getAwards()
    .then(setAwards)
    .catch(e => setError(e.message))
    .finally(() => setLoading(false))
}, [])

if (loading) return <div className="loading">Loading…</div>
if (error)   return <div className="error">Could not load awards: {error}</div>
```

**Always handle loading and error states.** Supabase can be slow or unreachable, and a page that
renders nothing with no explanation is the hardest kind of bug to report.

New table? Write the SQL into `schemas/`, run it in Supabase, **and add RLS policies** — a table
with RLS off is world-writable through the anon key, and one with RLS on and no policies is
unreadable. See [Supabase Setup](supabase.md#row-level-security).

---

## Recipe: add a field to an existing feature

Say you want a `warranty_expires` date on orders. **Four places, and missing any one fails
silently:**

```sql
-- 1. In the Supabase SQL editor
alter table orders add column warranty_expires date;
```

Then mirror it into [schemas/supabase-orders-schema.sql](../schemas/supabase-orders-schema.sql) so
the file stays truthful.

```js
// 2. transformOrderFromDB() in src/utils/supabase.js — DB → UI
deliveryInfo: {
  ...,
  warrantyExpires: dbOrder.warranty_expires,
}

// 3. transformOrderToDB() — UI → DB.  MISSING THIS MEANS IT NEVER SAVES,
//    with no error at all.
warranty_expires: order.deliveryInfo?.warrantyExpires || null,
```

```jsx
// 4. The form and the detail view in OrderManager.jsx
<input type="date" value={form.warrantyExpires} onChange={...} />
```

The same four-step pattern applies to projects, tasks, team members and blogs — every entity has a
`transformXFromDB` / `transformXToDB` pair, and both halves need editing. This is the number one
source of "I added a field and it doesn't work" in this codebase.

---

## Recipe: add a new admin tab

1. **Create the manager.** Copy
   [SponsorsManager.jsx](../src/components/admin/SponsorsManager.jsx) — it's the smallest complete
   example of the standard pattern (load, sync status, alerts, optimistic save, visibility
   refresh).

2. **Register it** in [AdminDashboard.jsx](../src/components/AdminDashboard.jsx):

```jsx
import InventoryManager from './admin/InventoryManager';
import { Boxes } from 'lucide-react';

// in the tabs array (~line 69)
{ id: 'inventory', label: 'Inventory', icon: Boxes, permission: 'view_inventory' },

// in renderTabContent()
case 'inventory': return <InventoryManager ref={inventoryManagerRef} />;
```

3. **Add the permissions** in [src/utils/auth.js](../src/utils/auth.js#L14-L18) — add
   `'view_inventory'` to every level that should see it, `'edit_inventory'` to leader and director.

4. **Create the table with RLS policies**, and gate writes on `is_approved_admin()` if it should be
   leader-only:

```sql
create table inventory (
  id bigserial primary key,
  name text not null,
  quantity integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table inventory enable row level security;

create policy "read inventory" on inventory
  for select to authenticated using (true);

create policy "admins write inventory" on inventory
  for all to authenticated
  using (is_approved_admin()) with check (is_approved_admin());
```

Remember: the permission check in `auth.js` only hides buttons. The RLS policy is the actual rule.

---

## Recipe: documenting a big file you had to understand

If you spend an hour working out what a 2000-line file does, leave a header comment so the next
person doesn't repeat it:

```jsx
/**
 * OrderManager — the Orders tab of the admin dashboard.
 *
 * Two-stage approval: technical director (do we need it?) then project director
 * (can we afford it?). A successful sponsorship skips stage two entirely.
 * See docs/orders.md for the full state machine.
 *
 * Layout:
 *   ~100–650   PDF/ZIP export helpers (jsPDF, jszip)
 *   ~640–720   migrateOrderStructure — remaps legacy statuses in memory only
 *   ~758–940   updateOrderStatus — the state machine, branches on statusUpdate.type
 *   ~990–1130  submit / edit / delete
 *   ~1330+     status labels, colours, filters
 *   ~1500+     JSX
 */
```

Line numbers drift, so keep them approximate and describe the *shape*. Point at the doc for detail
rather than duplicating it — one source of truth ages better than two.

---

## Testing your change

There is **no automated test suite and no working linter.** Testing is entirely manual, so be
systematic:

```sh
npm run build     # exactly what CI runs — catches import errors dev mode tolerates
npm run preview   # http://localhost:4173 — what users actually get
```

`npm run lint` exists in `package.json` but the repo has no ESLint config file, so it errors out
rather than linting anything. CI doesn't run it either. **Nothing is checking your code but you.**

Then click through:

| Check | Why |
|---|---|
| The thing you changed, doing the happy path | obvious |
| The failure path — bad input, empty state, network off | most bugs live here |
| **As a member, not just as a director** | permission-gated UI breaks differently per role |
| Mobile width | the nav and grids have 768px breakpoints |
| Browser console | React warnings usually mean a real bug |
| A page you *didn't* touch | shared components have wide blast radius |

Test with two accounts if you touched anything permission-related. It's the only way to catch
"works for me because I'm a director."

---

## Habits that will save you

- **Small commits.** One logical change each. Easy to review, easy to revert.
- **Read your own diff** on GitHub before merging.
- **Match the surrounding style.** This codebase mixes inline `<style>` blocks and imported CSS,
  Font Awesome and lucide icons. Follow whatever the file you're in already does — don't convert.
- **Don't reformat files you're editing.** With no Prettier config, format-on-save rewrites
  everything and buries your actual change in a 400-line diff.
- **Never commit `.env`.** It's gitignored; keep it that way.
- **Ask before schema changes.** Adding a column is safe. Renaming or dropping one breaks the live
  site instantly, because the frontend queries the database directly.
- **Back up before anything destructive.** `create table orders_backup_20260817 as select * from orders;`
  costs nothing.

---

## Related docs

- [Getting Started](getting-started.md) — environment setup
- [Architecture](architecture.md) — how it all fits together
- [Deployment](deployment.md) — shipping it
- [Troubleshooting](troubleshooting.md) — when it breaks
