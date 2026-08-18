# Managing Members & Users

Approving new sign-ups, changing roles, removing people who leave, and the difference between a
*user account* and a *public team member*.

The UI lives in the **Team** tab of the admin dashboard, which stacks two collapsible sections:
**User Management** ([UserManager.jsx](../src/components/admin/UserManager.jsx)) and **Team
Members** ([TeamManager.jsx](../src/components/admin/TeamManager.jsx)).

---

## Two different things called "team member"

This trips up everyone. They are separate records:

| | **User account** | **Public team member** |
|---|---|---|
| Table | `auth.users` + `user_roles` | `team_members` |
| Created by | The person signing up at `/login` | A leader adding a card in the Team tab |
| Purpose | Lets someone sign in and use the dashboard | Shows a name, photo and bio on `/team` |
| Managed in | Team tab → **User Management** | Team tab → **Team Members** |
| Deleting it | Revokes access | Removes them from the public page |

Someone can exist as one, the other, or both. A first-year who signs up to see the schedule has a
user account and no public card. A graduated lead can stay on the public page with their account
revoked.

**They can be linked.** `team_members.user_id` is a nullable foreign key to `user_roles.user_id`.
When you link them (`TeamManager` offers a dropdown of accounts from
`getUsersForTeamAssignment()`), editing the card's **role** text also writes
`user_roles.specific_role` via `updateUserSpecificRole()`, so the person's dashboard shows their
title. Linking is optional and purely cosmetic — it grants nothing.

---

## Approving new sign-ups

Every new account is `approval_status = 'pending'` and `level = 'member'`, and sees only
`/pending-approval` until someone acts.

**Who can approve:** the *UI* shows the section to leaders and directors
(`canManageUsers` in `TeamManagementView` checks `level === 'director' || level === 'leader'`),
and the *database* allows it for either, since the `Admins can update all rows` policy on
`user_roles` uses `is_approved_admin()` (leader **or** director). Note this is looser than the
`manage_users` permission, which is director-only and gates `authService.updateUserRole()`.

### Steps

1. Sign in at `/admin`.
2. Open the **Team** tab.
3. Expand **User Management**, then the **Pending** sub-tab. The count badge tells you how many
   are waiting.
4. Each row shows Name, Email, Requested date, an **Assign Role** dropdown, and Approve / Reject.
5. Pick the level — `member` unless they need edit rights — and click **Approve**.

That writes:

```sql
update user_roles
set approval_status = 'approved',
    approved_by = <your user_id>,
    approved_at = now(),
    level = <chosen level>
where user_id = <their user_id>;
```

The person can reload `/pending-approval` and they're in; no sign-out needed.

> **Nothing verifies the email address.** Confirmation is disabled (see
> [Authentication](authentication.md#email-confirmation-is-off-on-purpose)), so an approval is the
> only check that a sign-up is a real team member. **Only approve people you recognize.** If you
> don't know the name, ask in the team channel first.

### Rejecting

**Reject** sets `approval_status = 'rejected'` and stamps `approved_by`/`approved_at` with your
id and the time (the column is reused for both outcomes — a small naming wart). The row and the
`auth.users` record survive, so the same email can't just sign up again into a clean state, and
you keep a record that the request was refused.

---

## Changing someone's role

Team tab → **User Management** → **Approved** sub-tab. The Role column is a dropdown; changing it
calls `supabaseService.updateUserRole(userId, newLevel)`, which is a plain update to
`user_roles.level`.

`authService.updateUserRole()` guards on the `manage_users` permission (directors only), and the
`UserManager` component also offers explicit **Promote** / **Demote** buttons that walk the ladder
`member → leader → director`.

The change takes effect for that user the next time their user data loads — on their next
sign-in, or when their tab refocuses and `_refreshUserDataInBackground()` runs. It is not pushed
instantly. If it needs to be immediate, ask them to reload.

### By SQL, when the UI won't cooperate

```sql
-- promote
update user_roles set level = 'director' where email = 'someone@ncsu.edu';

-- who has what
select email, level, approval_status, first_name, last_name, created_at
from user_roles order by level, email;
```

Both `level` and `approval_status` are CHECK-constrained, so a typo errors rather than creating a
broken state.

---

## Removing someone who leaves

Pick based on whether you want their history preserved.

### Recommended — revoke, keep the record

```sql
update user_roles set approval_status = 'rejected' where email = 'graduate@ncsu.edu';
```

They can still sign in but `isAuthenticated()` returns false, so `/admin` bounces them to
`/pending-approval`. Orders they submitted keep their name attached. This is almost always what
you want.

### Full deletion

Supabase dashboard → **Authentication → Users** → find them → **Delete user**. The
`on delete cascade` on `user_roles.user_id` removes their role row too.

`team_members.user_id` is `on delete set null`, so their public card survives with the link
cleared. Orders reference submitters by *email text*, not a foreign key, so order history is
unaffected either way.

### End-of-year sweep

```sql
-- everyone who hasn't been active this year, review before running anything destructive
select email, level, approval_status, created_at
from user_roles
where approval_status = 'approved'
order by created_at;
```

Demote graduating leaders to `member` or reject them; make sure **at least two current people
hold `director`** before anyone with it leaves. Then work through
[Security & Handover](security-and-handover.md#handover-checklist).

---

## Managing the public roster

Team tab → **Team Members**. Requires `edit_team` (leader or director).

| Action | How |
|---|---|
| Add | **Add Member** → fill name, role, bio, email, LinkedIn, upload a headshot |
| Edit | Click a member's card |
| Reorder | **Drag and drop** the cards — order is persisted to the `"order"` column, and `/team` sorts by it |
| Delete | Delete on the card; confirms first, and also deletes the headshot from storage |
| Link to an account | The account dropdown in the edit form |

**Headshots**: 5 MB limit enforced client-side, uploaded to the `team-images` bucket, named by
member id. Square images crop best. Replacing an image overwrites the old object (`upsert: true`),
so the CDN may serve a cached copy for a few minutes — a hard refresh clears it.

**Ordering matters** — this is the roster visitors see. Directors first is the usual convention.

More detail in [Content Managers](content-managers.md#team-members).

---

## Account settings (what each person controls themselves)

The **Settings** tab ([Settings.jsx](../src/components/admin/Settings.jsx)) lets any signed-in user
edit their own `first_name`, `last_name`, and `phone_number`, and shows their email, level, join
date and `specific_role` read-only.

It writes through `updateUserProfile()`, permitted by the `Users can update own row` RLS policy.

> **That policy is too broad.** It allows a user to update *any* column of their own row —
> including `level` and `approval_status`. An approved member could self-promote to director with
> one API call from the browser console. The fix is a `WITH CHECK` clause pinning those columns,
> or routing profile edits through a `SECURITY DEFINER` function. Tracked in
> [Security & Handover](security-and-handover.md).

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Pending Approvals section missing | Your own row isn't approved leader/director | `is_approved_admin()` needs `level` in (leader, director) **and** `approval_status='approved'`. Check with SQL |
| Pending list is empty but someone says they signed up | Their signup failed before the `user_roles` insert | Check Authentication → Users. If they're in `auth.users` with no `user_roles` row, insert one manually (below) |
| Approved user still sees the pending page | Cached local user data | Reload; the page re-checks on mount. Otherwise sign out and back in |
| Role change didn't take effect | User data only reloads on sign-in or tab refocus | Ask them to reload |
| Name column blank in the user list | `first_name`/`last_name` never populated — signup metadata upsert can fail under RLS | They can fill it in on the Settings tab, or set it via SQL |
| Can't delete a user in Supabase | You're signed in as a non-owner | Use the shared owner account — see [Credentials](credentials.md) |

Repairing a missing `user_roles` row:

```sql
-- get the uuid from Authentication → Users
insert into user_roles (user_id, email, level, approval_status)
values ('<uuid>', 'them@ncsu.edu', 'member', 'pending')
on conflict (user_id) do nothing;
```

---

## Related docs

- [Authentication](authentication.md) — roles, permissions, sessions
- [Admin Dashboard](admin-dashboard.md) — the rest of the tabs
- [Content Managers](content-managers.md) — the public roster, alumni, sponsors
- [Database Reference](database-reference.md) — `user_roles` and `team_members` in full
