# Authentication

How signing in works, what the three roles can do, and how the approval gate is enforced.

Implemented in [src/utils/auth.js](../src/utils/auth.js) (the `authService` singleton) on top of
the auth section of [src/utils/supabase.js](../src/utils/supabase.js) (lines 2048–2423).

---

## The flow, end to end

```
   /login  ──── Sign Up ────▶  supabase.auth.signUp()
                                      │
                                      ├─ creates row in auth.users
                                      ├─ app immediately signs them in (no email confirmation)
                                      └─ upserts user_roles row:
                                              level = 'member'
                                              approval_status = 'pending'
                                      │
                              /pending-approval   ◀── they are stuck here
                                      │
                    a DIRECTOR opens /admin → Team tab → Pending Approvals
                                      │
                            approveUser(userId, approverId, level)
                                      │
                              approval_status = 'approved'
                                      │
                          /pending-approval re-checks → /admin
                                      │
                              full dashboard, filtered by role
```

Two independent gates: **are you signed in** (a valid Supabase session) and **are you approved**
(`user_roles.approval_status = 'approved'`). `authService.isAuthenticated()` requires *both*:

```js
isAuthenticated() {
  return this.currentUser !== null && this.currentUser.approval_status === 'approved';
}
```

That's deliberate — a signed-in but unapproved user is authenticated as far as Supabase is
concerned, but the app treats them as having no access at all.

### Email confirmation is off, on purpose

`Login.jsx` calls `signUp`, and if Supabase returns no session (which happens when confirmation
is enabled) it immediately calls `signIn` with the same credentials to get one. The approval
step is the real gate, so email confirmation would just add friction.

Consequences:
- **Turning "Confirm email" back on in Supabase breaks signup** — it appears to hang.
- [ConfirmEmail.jsx](../src/components/ConfirmEmail.jsx) and
  `supabaseService.verifyOTP()` / `resendConfirmationEmail()` still exist but nothing routes to
  them. Dead code.
- Nothing verifies that a signup email is real. The director approving the account is the check.
  **Approve only people you recognize.**

---

## The three roles

Defined at the top of [src/utils/auth.js](../src/utils/auth.js#L7-L19).

| Level | Intended for | Gets |
|---|---|---|
| `member` | Everyone on the team | Read-only dashboard + submit their own orders |
| `leader` | Subteam leads | Edit schedules, team, sponsors, alumni, blogs; operate pit telemetry |
| `director` | Project / technical directors | Everything, plus approve orders and manage users |

### Permission matrix

`hasPermission(name)` is a flat string lookup against the `PERMISSIONS` map — no inheritance, each
level lists its permissions in full.

| Permission | member | leader | director |
|---|:--:|:--:|:--:|
| `view_schedules` | ✅ | ✅ | ✅ |
| `view_team` | ✅ | ✅ | ✅ |
| `view_announcements` | ✅ | ✅ | ✅ |
| `view_sponsors` | ✅ | ✅ | ✅ |
| `view_alumni` | ✅ | ✅ | ✅ |
| `view_orders` | ✅ | ✅ | ✅ |
| `edit_schedules` | | ✅ | ✅ |
| `edit_team` | | ✅ | ✅ |
| `edit_sponsors` | | ✅ | ✅ |
| `edit_alumni` | | ✅ | ✅ |
| `edit_announcements` | | ✅ | ✅ |
| `submit_orders` | | ✅ | ✅ |
| `control_telemetry` | | ✅ | ✅ |
| `edit_orders` | | | ✅ |
| `approve_orders` | | | ✅ |
| `manage_users` | | | ✅ |

Worth noticing:

- **Members can't submit orders** (`submit_orders` is leader+), even though they can view them.
  If members should be able to raise their own purchase requests, add `submit_orders` to the
  member array — and then tighten the `orders` RLS policy so they can only insert rows for
  themselves.
- **Only directors can edit an order after submission** (`edit_orders`) or approve one.
- `specific_role` on `user_roles` (e.g. "Aero Lead") is **display text only** — it grants nothing.
  Roles are `level`, full stop.

### Using permissions in code

```js
import { authService } from '../utils/auth';

if (authService.hasPermission('edit_schedules')) { /* show the Edit button */ }

const level = authService.getLevel();          // 'member' | 'leader' | 'director' | null
const user  = authService.getUser();           // full object, or null
```

`getUser()` returns:

```js
{
  id, email, level, permissions: [...],
  first_name, last_name, phone_number,
  specific_role, joined_at,
  approval_status, approved_at, approved_by,
  emailConfirmed
}
```

### ⚠️ Permissions are UI-only

`hasPermission()` runs **in the browser**. It decides which buttons render. It is not security —
anyone can open devtools and call `supabaseService` directly, and their JWT is a valid
`authenticated` JWT.

Real enforcement is Row Level Security in Postgres, and today most tables only check
"is authenticated", not "is a leader". That means **any approved member can write to blogs and
schedule tables** with a hand-crafted request, regardless of what the UI shows them. The
`is_approved_admin()` and `is_pit_crew()` helpers exist to fix this; they're currently only wired
into `user_roles` and the telemetry tables. See
[Security & Handover](security-and-handover.md#1-rls-is-coarser-than-the-ui) for the policies to add.

---

## Sessions

Supabase issues a JWT (~1 hour) plus a refresh token, and `supabase-js` persists both in
`localStorage` and refreshes them automatically. Closing the tab doesn't sign you out; the session
survives until the refresh token expires or you sign out.

Three layers of hardening sit on top, all because admins leave the dashboard open for hours in a
background tab:

**1. Every query has a 15-second timeout.** `withTimeout()` in `supabase.js`. A throttled
background tab can leave a `fetch` hanging indefinitely; the timeout makes it reject so the UI can
retry rather than spin forever.

**2. Token refresh is non-blocking and only when stale.** `ensureAuthSession()` returns
immediately unless a refresh is actually flagged and the token expires within 60 seconds, and a
`authRefreshInProgress` flag prevents concurrent refreshes. Queries never `await` it.

**3. Re-verification on refocus.** `supabaseService` emits `visibility_restored`, `focus_restored`
and `online` events; `authService` responds with `_refreshUserDataInBackground()` — a
fire-and-forget re-check with a 5-second timeout that only notifies the UI if the state genuinely
changed. `AdminDashboard` additionally calls `authService.extendSession()` on click/keypress.

**Why the `TOKEN_REFRESHED` event is ignored:** it fires roughly hourly. If it triggered a UI
notification, every manager would re-render and users would lose in-progress form edits for no
reason. `auth.js` handles `SIGNED_IN`, `INITIAL_SESSION` and `SIGNED_OUT`, and deliberately does
nothing on `TOKEN_REFRESHED` when a user is already loaded. `_notifyListeners()` further
de-duplicates using a `isAuth:userId` signature.

### Subscribing to auth state

```js
useEffect(() => {
  const unsubscribe = authService.onAuthStateChange((isAuthenticated, user) => {
    // ...
  });
  return unsubscribe;
}, []);
```

**Always `await authService.waitForInit()` before reading auth state on mount.** Restoring the
session from `localStorage` is asynchronous; check too early and you'll see `null` and wrongly
render a login screen. This is the single most common auth bug in this codebase.

```js
useEffect(() => {
  (async () => {
    await authService.waitForInit();
    setLevel(authService.getLevel());
  })();
}, []);
```

---

## The pages involved

| Route | Component | Purpose |
|---|---|---|
| `/login` | [Login.jsx](../src/components/Login.jsx) | Sign in / sign up (one form, `mode` toggle) |
| `/admin` | [Admin.jsx](../src/components/Admin.jsx) | Gate: waits for init, redirects pending/rejected, renders `Login` or `AdminDashboard` |
| `/pending-approval` | [PendingApproval.jsx](../src/components/PendingApproval.jsx) | Holding page; re-checks status and forwards on approval |
| `/forgot-password` | [ForgotPassword.jsx](../src/components/ForgotPassword.jsx) | Sends the reset email |
| `/reset-password` | [ResetPassword.jsx](../src/components/ResetPassword.jsx) | Sets a new password from the emailed link |

`/admin` re-checks approval status on **every** auth state change, not just on mount — so a
director revoking someone mid-session bounces them out on the next auth event.

### Password reset

1. `/forgot-password` → `authService.requestPasswordReset(email)` →
   `supabase.auth.resetPasswordForEmail()`.
2. Supabase mails a link containing a recovery token.
3. The link opens `/reset-password`, where the token in the URL puts supabase-js into a recovery
   session, and `updatePassword(newPassword)` completes it.

**This only works if the redirect URL is allow-listed** in Supabase →
Authentication → URL Configuration. Both `http://localhost:5173/reset-password` and
`https://www.solarpacknc.com/reset-password` need to be there or the link silently fails.

---

## `user_roles`, the table behind all of this

```
user_id          uuid   → auth.users(id), on delete cascade, unique
email            text   unique
level            text   'member' | 'leader' | 'director'
approval_status  text   'pending' | 'approved' | 'rejected'
approved_by      uuid   → auth.users(id)
approved_at      timestamptz
first_name, last_name, phone_number, specific_role
created_at, updated_at
```

Both `level` and `approval_status` have CHECK constraints, so a typo in a manual SQL update
errors instead of silently creating an unrecognized state.

### RLS on `user_roles` — the one place roles are truly enforced

| Policy | Effect |
|---|---|
| `Users can read own row` | `auth.uid() = user_id` |
| `Users can insert own row` | `auth.uid() = user_id` — signup |
| `Users can update own row` | `auth.uid() = user_id` — used by Settings |
| `Admins can read all rows` | `is_approved_admin()` |
| `Admins can update all rows` | `is_approved_admin()` |
| `Directors can delete rows` | `is_approved_director()` |

`is_approved_admin()` and `is_approved_director()` are `SECURITY DEFINER` **because a policy on
`user_roles` that queries `user_roles` would recurse infinitely.** Running as the function owner
skips RLS inside the function body only. Don't try to "simplify" them into inline subqueries.

**Note the gap:** `Users can update own row` allows a user to update *any* column of their own
row — including `level` and `approval_status`. An approved member could promote themselves to
director with a single API call. The fix is a `WITH CHECK` that pins the sensitive columns, or
moving profile edits behind a `SECURITY DEFINER` function. Tracked in
[Security & Handover](security-and-handover.md).

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Signup appears to hang | "Confirm email" is enabled in Supabase | Authentication → Providers → Email → turn Confirm email **off** |
| Stuck on `/pending-approval` after being approved | Local user data is stale | The page re-checks on load; hard-refresh, or sign out and back in |
| Reset email never arrives | Supabase's built-in mailer is rate-limited (a few per hour) and often lands in spam | Check spam; for real volume configure a custom SMTP provider |
| Reset link opens but fails | Redirect URL not allow-listed | Add `/reset-password` for both localhost and prod in URL Configuration |
| Login screen flashes then dashboard appears | Auth state read before `waitForInit()` resolved | `await authService.waitForInit()` first |
| Signed out unexpectedly after leaving a tab open | Refresh token expired, or a refresh failed while throttled | Expected; sign back in. Persisting means checking Logs → Auth |
| `Supabase not configured` in the console | `.env` missing or not `VITE_`-prefixed | See [Getting Started](getting-started.md#5-create-your-env-file) |
| A director can't see Pending Approvals | Their own `user_roles` row isn't `level='director'` + `approval_status='approved'` | `is_approved_admin()` requires both. Fix with SQL |

---

## Related docs

- [Members & Users](members-and-users.md) — approving, promoting, removing people
- [Supabase Setup](supabase.md) — Auth provider configuration and RLS
- [Database Reference](database-reference.md) — `user_roles` in full
- [Security & Handover](security-and-handover.md) — the known authorization gaps
