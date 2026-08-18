# Architecture

How the pieces fit together, and why they're arranged this way.

---

## The one-paragraph version

SolarPack-Web is a **single-page React app** with **no backend of its own**. It is compiled by
Vite into static HTML/CSS/JS and served by GitHub Pages at `www.solarpacknc.com`. Every piece
of dynamic data — team roster, blogs, sponsors, orders, schedules, files, user accounts — lives
in **Supabase** (hosted Postgres + Auth + object storage). The browser talks to Supabase
*directly* using the public "anon" key; the only thing standing between a visitor and the
database is Postgres **Row Level Security**. The one exception is race telemetry, which also
reads from a small **relay server** hosted on Render.

```
                        ┌─────────────────────────────────────────┐
                        │        Browser (React SPA)              │
                        │                                         │
   public visitor  ───▶ │  Public pages: Home, Team, Sponsors,    │
                        │  Blogs, Alumni, Donate, Telemetry       │
                        │                                         │
   signed-in member ──▶ │  /admin → AdminDashboard → 9 tabs       │
                        └──────────────┬──────────────────────────┘
                                       │
                     supabase-js, anon key, HTTPS
                                       │
              ┌────────────────────────▼─────────────────────────┐
              │                  SUPABASE                        │
              │                                                  │
              │  Auth       auth.users + JWT sessions            │
              │  Postgres   13 tables, RLS on all of them        │
              │  Storage    5 buckets (images, receipts, files)  │
              │  Realtime   change streams for schedule + laps   │
              └──────────────────────────────────────────────────┘

              ┌──────────────────────────────────────────────────┐
   car ─BLE─▶ │  iPad app  ──HTTP──▶  Relay (Render/Express)     │
              │                          │                       │
              │        website polls ────┘  writes w/ service    │
              │        GET /packet          role key ──▶ Supabase │
              └──────────────────────────────────────────────────┘
```

**Why no backend?** The team is small and turns over every year. A static site on GitHub Pages
costs nothing, never needs patching, and can't fall over. The tradeoff is that *all*
authorization has to live in the database as RLS policies — there is no server-side code you
can trust. Read [Authentication](authentication.md) with that in mind.

---

## Request lifecycle

### A visitor loads the Team page

1. GitHub Pages serves `index.html` (from `dist/`).
2. `index.html` loads the bundled JS, which boots React in [src/main.jsx](../src/main.jsx).
3. `main.jsx` wraps everything in `<BrowserRouter basename="/">` and renders
   [src/App.jsx](../src/App.jsx).
4. `App.jsx` matches `/team` → `<Layout><Team /></Layout>`.
5. [src/pages/Team.jsx](../src/pages/Team.jsx) calls `supabaseService.getTeamMembers()`.
6. `supabaseService` (a singleton in [src/utils/supabase.js](../src/utils/supabase.js)) issues
   `select * from team_members order by "order"` over HTTPS with the anon key.
7. Postgres checks the RLS `select` policy on `team_members` — public read is allowed — and
   returns rows.
8. Team.jsx renders the cards.

Note step 7: **the browser asked the database directly.** There is no API layer to add
validation in. If you want a rule enforced, it has to be an RLS policy or a database constraint.

### A leader edits a project

Same as above, except the request carries the user's JWT (managed by supabase-js and stored in
`localStorage`). The RLS `update` policy on `schedule_projects` requires an authenticated role,
so it succeeds. Meanwhile `ScheduleManager` holds an open **Realtime** subscription to
`schedule_projects` and `schedule_tasks`, so every *other* leader with the tab open sees the
change without refreshing.

### 404s and deep links on GitHub Pages

GitHub Pages doesn't know about client-side routes, so `www.solarpacknc.com/team` would 404 on a
hard refresh. The workaround is the [spa-github-pages](https://github.com/rafgraph/spa-github-pages)
trick: [public/404.html](../public/404.html) catches the miss, rewrites the path into a query
string, and redirects to `/`; an inline script at the top of
[index.html](../index.html) unpacks it back into the real path with `history.replaceState`
before React boots. **If you ever change hosts, both halves of that hack can be deleted.**

---

## Directory map

### `src/pages/` — one file per URL

| File | Route | Notes |
|---|---|---|
| [Home.jsx](../src/pages/Home.jsx) | `/` | Hero, live project progress from `schedule_projects`, upcoming-projects carousel |
| [App.jsx](../src/pages/App.jsx) | `/app` | Static showcase of the iPad app's screens |
| [Team.jsx](../src/pages/Team.jsx) | `/team` | Roster from `team_members`, modal bios |
| [Alumni.jsx](../src/pages/Alumni.jsx) | `/alumni` | Two-column list grouped by semester |
| [Sponsors.jsx](../src/pages/Sponsors.jsx) | `/sponsors` | Grouped by tier |
| [Blogs.jsx](../src/pages/Blogs.jsx) | `/blogs` | Published posts only, opens in a modal |
| [Donate.jsx](../src/pages/Donate.jsx) | `/donate` | Preset/custom amounts, hands off to PayPal |
| [Contact.jsx](../src/pages/Contact.jsx) | `/contact` | Static contact info |
| [PrivacyPolicy.jsx](../src/pages/PrivacyPolicy.jsx) | `/privacy-policy` | Accordion, all content inline |
| [RacePitTelemetry.jsx](../src/pages/RacePitTelemetry.jsx) | `/telemetry` | Live race dashboard, 4 tabs |
| [Clipboard.jsx](../src/pages/Clipboard.jsx) | `/clipboard` | Code-gated shared scratchpad, **outside** `<Layout>` |
| [NotFound.jsx](../src/pages/NotFound.jsx) | `*` | 404 |

`src/pages/App.jsx` is the **iPad-app showcase page** and is a different file from
`src/App.jsx`, the **router**. Easy to confuse; check the path.

### `src/components/` — shared UI and the admin shell

| File | Role |
|---|---|
| [Layout.jsx](../src/components/Layout.jsx) | Header + main + footer wrapper for public pages |
| [Header.jsx](../src/components/Header.jsx) | Nav bar, auth state, account menu |
| [Admin.jsx](../src/components/Admin.jsx) | Gate for `/admin`: waits for auth init, bounces pending/rejected users, shows `Login` or `AdminDashboard` |
| [AdminDashboard.jsx](../src/components/AdminDashboard.jsx) | Tab bar, overview cards, permission filtering, session keep-alive |
| [Login.jsx](../src/components/Login.jsx) | Combined sign-in / sign-up form |
| [ForgotPassword.jsx](../src/components/ForgotPassword.jsx) / [ResetPassword.jsx](../src/components/ResetPassword.jsx) | Password reset pair |
| [PendingApproval.jsx](../src/components/PendingApproval.jsx) | Holding page for unapproved accounts |
| [ConfirmEmail.jsx](../src/components/ConfirmEmail.jsx) | **Orphaned** — email confirmation was removed; no route points here |
| [Alert.jsx](../src/components/Alert.jsx) | The modal used for all confirms/errors, driven by `AlertContext` |
| [StatusDropdown.jsx](../src/components/StatusDropdown.jsx) | Inline status picker used in the schedule |
| [InlineNotesEditor.jsx](../src/components/InlineNotesEditor.jsx) | Save-on-blur textarea for weekly notes |
| [ProgressTracker.jsx](../src/components/ProgressTracker.jsx) | The Home page progress bar |
| [SyncStatusBadge.jsx](../src/components/SyncStatusBadge.jsx) / [SyncStatusIndicator.jsx](../src/components/SyncStatusIndicator.jsx) | "Synced / Saving / New data available" chrome |

### `src/components/admin/` — one manager per dashboard tab

| File | Tab | Lines | Doc |
|---|---|---|---|
| [OrderManager.jsx](../src/components/admin/OrderManager.jsx) | Orders | 3691 | [orders.md](orders.md) |
| [ScheduleManager.jsx](../src/components/admin/ScheduleManager.jsx) | Schedules | 2126 | [schedule.md](schedule.md) |
| [FilesManager.jsx](../src/components/admin/FilesManager.jsx) | Files | 1431 | [files.md](files.md) |
| [BlogManager.jsx](../src/components/admin/BlogManager.jsx) | Blogs | 1069 | [blogs.md](blogs.md) |
| [TeamManager.jsx](../src/components/admin/TeamManager.jsx) | Team | 1030 | [content-managers.md](content-managers.md) |
| [SponsorsManager.jsx](../src/components/admin/SponsorsManager.jsx) | Sponsors | 866 | [content-managers.md](content-managers.md) |
| [AlumniManager.jsx](../src/components/admin/AlumniManager.jsx) | Alumni | 759 | [content-managers.md](content-managers.md) |
| [UserManager.jsx](../src/components/admin/UserManager.jsx) | (inside Team) | 475 | [members-and-users.md](members-and-users.md) |
| [Settings.jsx](../src/components/admin/Settings.jsx) | Settings | 216 | [admin-dashboard.md](admin-dashboard.md) |

Every manager follows the same shape, so once you can read one you can read all of them:

```jsx
const XManager = forwardRef((props, ref) => {
  const [data, setData] = useState([]);                    // 1. local copy of the table
  const { status, startSaving, finishSaving } =             // 2. sync-status chrome
    useSupabaseSyncStatus(() => supabaseService.getX());
  const { showError, showConfirm } = useAlert();            // 3. modal dialogs

  useEffect(() => { loadX(); }, []);                       // 4. initial fetch
  useEffect(() => { /* re-fetch on tab visibility */ }, []);// 5. refresh when tab refocuses

  useImperativeHandle(ref, () => ({ /* counts for the   */ // 6. expose stats to the
    getStats: () => ...                                    //    dashboard Overview cards
  }));

  const handleSave = async () => {                         // 7. optimistic update, then write
    startSaving();
    setData(next);
    await supabaseService.saveX(item);
    finishSaving();
  };
});
```

Item 6 is why `AdminDashboard` keeps a `useRef` per manager — the Overview tab reads counts out
of the mounted managers rather than re-querying.

### `src/utils/` — the two files that matter most

**[supabase.js](../src/utils/supabase.js)** (2740 lines) — a single `SupabaseService` class,
exported as the `supabaseService` singleton. *Every* database and storage call in the app goes
through it. Sections, in file order:

| Lines | Section |
|---|---|
| 1–520 | Client creation, connection tracking, `withTimeout`, auth-refresh plumbing, receipt uploads |
| 534–775 | Team members (+ image upload, user linking) |
| 777–886 | Alumni semesters |
| 889–1053 | Sponsors (+ logo upload) |
| 1054–1394 | Schedule: teams, projects, tasks, and the DB↔UI field transforms |
| 1395–1766 | Orders: fetch, create, update, delete, and the big `transformOrder*` mappers |
| 1767–1795 | Realtime `subscribeToTable` / `unsubscribe` |
| 1796–2047 | Blogs (+ hero and inline image upload) |
| 2048–2423 | Auth: sign up/in/out, roles, approvals, password reset, session |
| 2424–2497 | Clipboard RPC wrappers |
| 2498–2738 | Race telemetry: tracks, sessions, laps, history, live subscriptions |

Three cross-cutting details worth knowing before you touch this file:

- **`withTimeout(promise, 15000)`** wraps essentially every query. Chrome throttles background
  tabs, and a throttled `fetch` can hang forever; the timeout makes it fail fast so the UI can
  retry instead of spinning. Keep new queries wrapped.
- **The client is created exactly once** and never recreated. `let supabase = null` at module
  scope. Creating a second client breaks auth session sharing and duplicates realtime
  subscriptions.
- **`ensureAuth()` / `ensureAuthSession()` are deliberately non-blocking.** They fire a token
  refresh in the background but never make a query wait on it. That's why you'll see
  `this.ensureAuth();` with no `await` at the top of methods.

**[auth.js](../src/utils/auth.js)** (604 lines) — the `AuthService` singleton. Wraps
`supabaseService`'s auth calls and adds the role/permission layer, the approval-status gate, a
listener registry, and background session verification on tab refocus. Full detail in
[Authentication](authentication.md).

> **Historical note:** older README text described a client-side password system with hard-coded
> hashes in `localStorage`. That is gone. `auth.js` today is entirely Supabase Auth. If you find
> a stale doc or comment mentioning `PASSWORD_HASHES` or `solarpack_auth`, it's wrong.

### `src/hooks/`

- **[useSupabaseSyncStatus.js](../src/hooks/useSupabaseSyncStatus.js)** — polls the table every
  2s, hashes the result, and compares against a hash of what's on screen. If they differ it
  reports `'new-data'` so the UI can offer a refresh instead of clobbering the user's edits.
  Also handles tab-visibility reconnects and retries. This is *polling*, not realtime — cheap
  and predictable, and it deliberately pauses while saving.
- **[useSyncStatus.js](../src/hooks/useSyncStatus.js)** — the older GitHub-era version. Kept for
  compatibility; prefer the Supabase one.

### `src/contexts/AlertContext.jsx`

Provides `useAlert()` → `{ showError, showSuccess, showConfirm, showWarning }`. These return
promises, so `if (await showConfirm('Delete?')) { ... }` reads naturally. Mounted once by
`AppRouter`, so it's available everywhere. **Use it instead of `window.alert`/`window.confirm`** —
the native dialogs look wrong against the dark theme and block the event loop.

### `src/config/dataSource.js`

**Mostly dead code.** A leftover from the GitHub-JSON era. It still reads
`process.env.REACT_APP_*` (Create React App naming, which Vite doesn't even populate) and has
`useSupabase: false`. Nothing meaningful imports it. Safe to delete once you've grepped to
confirm.

### `schemas/`

SQL to create every table, policy, trigger, view and bucket. These are **not** migrations — no
ordering metadata, no down-scripts, and several were exported back out of the Supabase dashboard
after being edited there. Treat them as "the current shape of the database, best effort."
See [Supabase Setup](supabase.md) and [Database Reference](database-reference.md).

### `public/` vs `dist/`

- `public/` — copied verbatim into the build. Reference these with absolute paths (`/images/foo.png`),
  not imports.
- `dist/` — build output. **It is committed to git** (40 files tracked). See
  [Deployment](deployment.md#why-dist-is-committed) for why that's confusing and what to do.

---

## Cross-cutting patterns

### Styling: CSS variables + inline `<style>` blocks

The theme lives as CSS custom properties in [index.html](../index.html):

```css
--bg: #0a0a0a;  --surface: #1a1a1a;  --text: #ffffff;
--subtxt: #a0a0a0;  --accent: #e31b23;  --radius: 12px;  --speed: 240ms;
```

`--accent` is NC State red. **Use the variables**, don't hard-code hex values, or your component
will look wrong if the palette ever changes.

Beyond that, styling is inconsistent by history:
- Some components import a `.css` file (`Header.css`, `OrderManager.css`, `FilesManager.css`, …).
- Many render a literal `<style>{`...`}</style>` block inside their JSX (`AdminDashboard`,
  `Settings`, `Clipboard`, most pages).

Both work. Match whatever the file you're editing already does rather than converting it.

### Fonts and icons come from CDNs

`index.html` pulls **Bebas Neue** + **Inter** from Google Fonts and **Font Awesome 6.4** from
cdnjs. Headings use Bebas Neue; body copy uses Inter. Font Awesome is used via
`<i className="fa-solid fa-folder" />` (mostly in `FilesManager`), while newer components use
**lucide-react** imports. Both idioms are live in the codebase.

### Data-shape transforms: `snake_case` ↔ `camelCase`

Postgres columns are `snake_case`; the React state is `camelCase` and often nested. `supabase.js`
does the translation in explicit paired functions:

| DB → UI | UI → DB |
|---|---|
| `transformProjectFromDB` | `transformProjectToDB` |
| `transformTaskFromDB` | `transformTaskToDB` |
| `transformOrderFromDB` | `transformOrderToDB` |

**If you add a column you must edit both halves of the pair**, or the field will read as
`undefined` or silently fail to save. This is the single most common source of "my new field
doesn't persist" bugs. Orders are the worst offender: `transformOrderFromDB` flattens ~70 columns
into five nested objects (`submissionDetails`, `materialDetails`, `costBreakdown`,
`approvalWorkflow`, `sponsorshipInfo`, `documentation`).

### Realtime vs polling

Both are in use, on purpose:

| Mechanism | Used by | Why |
|---|---|---|
| Supabase Realtime | `ScheduleManager` (projects/tasks), telemetry laps + sessions | Multiple people editing simultaneously; instant matters |
| `useSupabaseSyncStatus` polling (2s) | Orders, Blogs, Team, Sponsors, Alumni | Simpler; avoids clobbering in-progress form edits |
| `fetch` polling (1s) | Live telemetry gauges via the relay | Lowest latency path, works with no DB session at all |

Only `live_telemetry`, `race_laps`, and `race_sessions` are in the `supabase_realtime`
publication (plus the schedule tables). Subscribing to a table that isn't published will
silently deliver nothing — a confusing failure mode. Check
[schemas/supabase-race-telemetry-schema.sql](../schemas/supabase-race-telemetry-schema.sql)
for the `alter publication` lines.

### Tab-visibility handling is everywhere

You'll find this in nearly every manager:

```js
document.addEventListener('visibilitychange', handleVisibilityChange);
```

Chrome aggressively throttles background tabs: timers stop, sockets die, JWTs go stale. Since
admins leave the dashboard open for hours, every manager re-fetches on refocus and
`auth.js` re-verifies the session in the background. If you add a long-lived data view, copy
the pattern.

---

## Known rough edges

Documented so you don't rediscover them the hard way.

| Thing | Detail |
|---|---|
| `package.json` → `migrate:schedule` | Points at `migrate-schedule-data.js`, **which doesn't exist**. Running it errors. Remove the script or restore the file. |
| `src/config/dataSource.js` | Dead config, wrong env-var prefix. |
| `src/components/ConfirmEmail.jsx` | No route renders it; email confirmation was removed from the flow. |
| `dist/` committed | Build output in git alongside a CI job that also builds. Easy to ship a stale bundle. |
| `schedule_events` table | Fully commented out in the schema; a calendar-events feature that was started and abandoned. |
| Legacy order statuses | `pending_approval`, `awaiting_sponsorship`, `approved_for_purchase`, `in_transit`, `pending_purchase_approval` still appear in `getStatusText`/`getStatusColor` and in `migrateOrderStructure`. Old rows may still carry them. |
| Two sync-status hooks | `useSyncStatus` (GitHub era) and `useSupabaseSyncStatus`. Use the latter. |
| `npm run lint` | Defined in `package.json` but the repo has **no ESLint config file**, so it errors out. CI never runs it either — nothing is linting this codebase. |
| `docs/README.md` history | Previously described a static-HTML version of this site that no longer exists. |

---

## Related docs

- [Supabase Setup](supabase.md) — provisioning, keys, buckets, RLS
- [Database Reference](database-reference.md) — every table, column and policy
- [Authentication](authentication.md) — the sign-in and approval flow in depth
- [Making Changes](making-changes.md) — recipes for common edits
- [Deployment](deployment.md) — how code gets to production
