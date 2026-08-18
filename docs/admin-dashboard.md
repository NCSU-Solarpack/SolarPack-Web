# Admin Dashboard

The internal tool at **`/admin`**: nine tabs covering schedules, purchasing, files, blogs,
sponsors, the roster, alumni, and account settings.

Shell: [Admin.jsx](../src/components/Admin.jsx) (the gate) →
[AdminDashboard.jsx](../src/components/AdminDashboard.jsx) (tabs + overview) → one manager
component per tab.

---

## Getting in

1. Go to `/admin` (or `/login`).
2. Sign in. First time? [Sign up and get approved](members-and-users.md#approving-new-sign-ups).
3. `Admin.jsx` waits for `authService.waitForInit()`, then:
   - not signed in → renders the login form,
   - signed in but `pending` or `rejected` → redirects to `/pending-approval`,
   - signed in and approved → renders the dashboard.

It re-checks on **every** auth state change, so a revoked account is ejected mid-session.

---

## The tabs

Defined at [AdminDashboard.jsx:69-79](../src/components/AdminDashboard.jsx#L69-L79). Each tab
declares a permission; `availableTabs` filters the list so you only see what your role allows.

| Tab | Permission | member | leader | director | Doc |
|---|---|:--:|:--:|:--:|---|
| **Overview** | `view_schedules` | ✅ | ✅ | ✅ | below |
| **Schedules** | `view_schedules` | ✅ | ✅ | ✅ | [schedule.md](schedule.md) |
| **Orders** | `view_orders` | ✅ | ✅ | ✅ | [orders.md](orders.md) |
| **Files** | *(none)* | ✅ | ✅ | ✅ | [files.md](files.md) |
| **Blogs** | `view_announcements` | ✅ | ✅ | ✅ | [blogs.md](blogs.md) |
| **Sponsors** | `view_sponsors` | ✅ | ✅ | ✅ | [content-managers.md](content-managers.md) |
| **Team** | `view_team` | ✅ | ✅ | ✅ | [content-managers.md](content-managers.md), [members-and-users.md](members-and-users.md) |
| **Alumni** | `view_alumni` | ✅ | ✅ | ✅ | [content-managers.md](content-managers.md) |
| **Settings** | *(none)* | ✅ | ✅ | ✅ | below |

Every role sees every tab — members are read-only *within* each tab, where the Add/Edit/Delete
buttons are gated on `edit_*` permissions. Tabs with no `permission` (Files, Settings) show to any
authenticated user.

**Tabs are URL-addressable**: `/admin?tab=orders` deep-links straight in, and switching tabs
updates the query string, so you can bookmark and share views.

> Reminder: this filtering is cosmetic. Enforcement is Row Level Security in Postgres, which today
> mostly checks "is authenticated" rather than role. See
> [Security & Handover](security-and-handover.md#1-rls-is-coarser-than-the-ui).

---

## Overview tab

The landing view. Four clickable stat cards, quick actions, and upcoming deadlines.

**Stat cards** — click any to jump to its tab:

| Card | Source |
|---|---|
| Active Projects | `schedule_projects` not completed/cancelled |
| Pending Orders | orders awaiting either approval stage |
| Team Leads | `team_members` row count |
| Total Alumni | alumni entries across semesters |

These read from the *mounted manager components* through refs rather than re-querying — that's why
`AdminDashboard` keeps a `useRef` per manager and passes them down. If a stat shows `...`
forever, its manager failed to load; check the console.

**Quick Actions** — one-click "create" shortcuts that navigate to a tab *and* open its form, each
gated on the matching permission:

| Action | Needs |
|---|---|
| New Project | `edit_schedules` |
| Submit Order | `submit_orders` |
| New Blog Post | `edit_announcements` (or level `leader`) |
| Add Sponsor | `edit_sponsors` |
| Add Team Member | `edit_team` |
| Add Alumni | `edit_alumni` |

Implemented via `useImperativeHandle` — e.g. `orderManagerRef.current.handleSubmitOrder()` opens
the order form after the tab switches.

**Upcoming Deadlines** — the next projects by due date, clickable through to Schedules.

---

## Settings tab

Your own profile: edit `first_name`, `last_name`, `phone_number`. Email, level, join date and
`specific_role` are read-only. Saves via `updateUserProfile()`, then reloads local auth data so
the header updates immediately.

This is a *personal* settings page — there are no site-wide settings in the app. Site-wide
configuration lives in the Supabase dashboard and in GitHub Actions secrets.

---

## Things that behave the same in every tab

Learn these once and every manager makes sense.

### The sync status badge

Top-right of most managers: **Synced** / **Saving…** / **New data available** / **Error**.

Driven by [useSupabaseSyncStatus](../src/hooks/useSupabaseSyncStatus.js), which polls the table
every 2 seconds, hashes the result, and compares it to a hash of what's on your screen. If someone
else changed something, you get a *prompt* rather than a surprise overwrite — click it to pull
their changes in. Polling pauses while you're saving so your own write doesn't look like a
conflict.

"New data available" is information, not an error. It means someone else edited the same table.

### Optimistic updates

Managers update local state first, then write to Supabase. The UI feels instant, but a failed
write means what you see is briefly wrong. Managers show an error dialog and re-fetch when that
happens — **if you see an error, reload before trusting the screen.**

### Modal dialogs

All confirms/errors go through `useAlert()` from
[AlertContext](../src/contexts/AlertContext.jsx) — themed, promise-based modals, not
`window.confirm`. Destructive actions always confirm first.

### Refresh on tab refocus

Every manager listens for `visibilitychange` and re-fetches when you come back, because Chrome
throttles background tabs and stalls sockets and timers. Leaving the dashboard open all day is
supported; that's why the code is full of visibility handling.

### Session keep-alive

`AdminDashboard` calls `authService.extendSession()` on click and keypress, so an active user isn't
logged out mid-edit.

---

## Adding a new tab

Four edits, all in [AdminDashboard.jsx](../src/components/AdminDashboard.jsx):

1. **Build the manager** in `src/components/admin/YourManager.jsx`. Copy the smallest existing one
   ([SponsorsManager.jsx](../src/components/admin/SponsorsManager.jsx)) for the standard shape.
2. **Import it** at the top of `AdminDashboard.jsx`, plus an icon from `lucide-react`.
3. **Add to the `tabs` array**:
   ```js
   { id: 'inventory', label: 'Inventory', icon: Boxes, permission: 'view_inventory' },
   ```
   Omit `permission` to show it to every authenticated user.
4. **Add a `case` to `renderTabContent()`**:
   ```js
   case 'inventory': return <InventoryManager ref={inventoryManagerRef} />;
   ```

If it needs a new permission string, add it to the `PERMISSIONS` map in
[src/utils/auth.js](../src/utils/auth.js#L14-L18) for each level that should have it. If it needs
a new table, write the SQL into `schemas/`, run it in Supabase, **and add RLS policies** — a table
without policies is either wide open or completely unreadable.

Step-by-step walkthrough in [Making Changes](making-changes.md#recipe-add-a-new-admin-tab).

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Redirected to `/pending-approval` | Not approved yet | [Get approved](members-and-users.md#approving-new-sign-ups) |
| A tab is missing | Your role lacks its permission | Check the matrix above; ask a director |
| Everything shows a spinner | `.env` missing or wrong | [Getting Started](getting-started.md#5-create-your-env-file) |
| Stat card stuck on `...` | That manager failed to load | Open the console; usually a failed query or RLS denial |
| "New data available" won't clear | Someone else is actively editing | Click it to pull their changes |
| Buttons visible but saves fail | UI permission and RLS policy disagree | Check Supabase → Logs → Postgres |
| Logged out after leaving a tab open | Refresh token expired | Expected; sign back in |

More in [Troubleshooting](troubleshooting.md).

---

## Related docs

- [Authentication](authentication.md) — roles and permissions
- [Architecture](architecture.md#srccomponentsadmin--one-manager-per-dashboard-tab) — the shared manager pattern
- [Making Changes](making-changes.md) — how to edit safely
