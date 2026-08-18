# Database Reference

Every table, its columns, constraints, and access rules. The SQL that creates them is in
[schemas/](../schemas/).

> **The schema files are a best-effort snapshot, not migrations.** Several were exported from the
> Supabase dashboard after being edited there, some lack the RLS policies that are actually live,
> and there's no ordering metadata or down-scripts. When it matters, check the live database:
> `npx supabase db dump -f live-schema.sql`.

**Quick facts**

- 13 tables + `auth.users` (Supabase-managed)
- All IDs are `bigserial` except `blogs`, `clipboard_items`, `user_roles`, `race_tracks` and
  `race_sessions`, which use `uuid`
- `"order"` needs quoting everywhere — it's a SQL reserved word
- Timestamps are `timestamptz`; most tables auto-bump `updated_at` by trigger

---

## user_roles

Role and approval status for every account. The most security-relevant table in the database.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | `gen_random_uuid()` |
| `user_id` | uuid | **unique**, FK → `auth.users(id)` `on delete cascade` |
| `email` | text | **unique** |
| `level` | text | CHECK: `member` \| `leader` \| `director`, default `member` |
| `approval_status` | text | CHECK: `pending` \| `approved` \| `rejected`, default `pending` |
| `approved_by` | uuid | FK → `auth.users(id)` `on delete set null`. Also stamped on rejection |
| `approved_at` | timestamptz | |
| `first_name`, `last_name`, `phone_number` | text | Editable by the user in Settings |
| `specific_role` | text | Display title only, e.g. "Aero Lead" — **grants nothing** |
| `created_at`, `updated_at` | timestamptz | trigger `update_user_role_timestamp()` |

Indexes on `user_id` and `email`.

**RLS**

| Policy | Rule |
|---|---|
| Users can read own row | `auth.uid() = user_id` |
| Users can insert own row | `auth.uid() = user_id` |
| Users can update own row | `auth.uid() = user_id` |
| Admins can read all rows | `is_approved_admin()` |
| Admins can update all rows | `is_approved_admin()` |
| Directors can delete rows | `is_approved_director()` |

> `Users can update own row` has **no column restriction** — a user can set their own `level` to
> `director`. Fix with a `WITH CHECK` pinning `level` and `approval_status`. See
> [Security & Handover](security-and-handover.md).

The helper functions are `SECURITY DEFINER` to avoid infinite RLS recursion. Don't inline them.

---

## team_members

Public roster on `/team`.

| Column | Type | Notes |
|---|---|---|
| `id` | bigserial PK | |
| `name`, `role` | text | **not null** |
| `image` | text | public URL in `team-images` |
| `bio`, `email`, `linkedin` | text | all published publicly |
| `"order"` | integer | display order, drag-set |
| `user_id` | uuid | FK → `user_roles(user_id)` `on delete set null` — optional account link |
| `created_at`, `updated_at` | timestamptz | |

**RLS: not defined in the schema file.** Verify in the dashboard —
see [Supabase Setup](supabase.md#tightening-a-table-to-leaderdirector) for the policies to add.

---

## sponsors

| Column | Type | Notes |
|---|---|---|
| `id` | bigserial PK | |
| `tier` | text | **not null**. Free text, not an enum |
| `name` | text | **not null** |
| `logo` | text | public URL in `sponsor-logos` |
| `website` | text | |
| `"order"` | integer | within the tier |
| `created_at`, `updated_at` | timestamptz | |

`tier` must exactly match one of `Platinum Sponsors` · `Gold Sponsors` · `Silver Sponsors` ·
`Bronze Sponsors` — those four strings are hard-coded in `SponsorsManager`. A typo creates a tier
the public page renders but the admin UI can't see. See
[Content Managers](content-managers.md#tiers).

**RLS: not defined in the schema file.**

---

## alumni

One row **per semester**, people stored as JSONB.

| Column | Type | Notes |
|---|---|---|
| `id` | bigserial PK | |
| `semester` | text | **not null**, e.g. `"Spring 2026"` |
| `leadership` | jsonb | default `[]` — `[{ role, name }, …]` |
| `"order"` | integer | display order |
| `created_at`, `updated_at` | timestamptz | |

Query into the JSONB with containment:

```sql
select semester from alumni where leadership @> '[{"name": "Jane Doe"}]';
```

**RLS: not defined in the schema file.**

---

## blogs

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | `gen_random_uuid()` — needs `pgcrypto` |
| `title`, `author`, `body` | text | **not null**. `body` is assembled HTML |
| `image_url` | text | hero image in `blog-images` |
| `link_url`, `link_text` | text | optional CTA |
| `published` | boolean | default `false` |
| `created_at`, `updated_at` | timestamptz | trigger `update_blogs_updated_at()` |

Indexes on `created_at desc` and `published`.

**RLS**

| Policy | Rule |
|---|---|
| Public can view published blogs | `published = true` |
| Authenticated users can view all blogs | `to authenticated` |
| Authenticated insert / update / delete | `to authenticated` |

Drafts are genuinely invisible to anonymous visitors — this is real enforcement, not just UI.
But writes are open to **any** authenticated user, not just leaders.

---

## orders

~70 columns covering the whole procurement lifecycle. Full workflow in [Orders](orders.md).

**Submission** — `id` (bigserial), `submission_timestamp`, `subteam`, `submitter_name`,
`submitter_email`, `created_by`

**Material** — `material_name` (**not null**), `specifications`, `material_link`, `supplier`,
`supplier_contact`

**Cost** — `unit_price`, `quantity`, `subtotal`, `shipping_cost`, `taxes`, `fees`, `total_cost`
(all `numeric(10,2)` except quantity)

**Project** — `purpose`, `priority`, `urgency`, `needed_by_date`

**Technical approval** — `tech_approval_status`, `tech_approved_by`, `tech_approval_date`,
`tech_comments`, `tech_denial_reason`

**Project-director approval** — `project_approval_status`, `project_approved_by`,
`project_approval_date`, `project_comments`, `project_denial_reason`

**Sponsorship** — `can_be_sponsored`, `sponsor_contact_name`, `sponsor_contact_email`,
`sponsor_company`, `sponsorship_requested`, `sponsorship_request_date`, `sponsorship_successful`,
`sponsorship_response`, `sponsorship_response_date`, `sponsorship_search_status`

**Purchase** — `purchased`, `purchase_date`, `purchase_order_number`, `actual_cost`,
`purchased_by`, `purchase_group_id`, `purchase_group_primary`, `purchase_group_receipt_file`

**Delivery** — `expected_arrival_date`, `actual_arrival_date`, `delivered_to_subteam`,
`delivery_confirmed_by`, `delivery_notes`, `tracking_number`

**Documentation** — `receipt_uploaded`, `receipt_file_name`, `receipt_upload_date`,
`receipt_uploaded_by`, `additional_documents` (jsonb)

**Returns** *(no UI — edit in Supabase directly)* — `returned`, `return_date`, `return_reason`,
`return_authorized_by`, `refund_amount`, `refund_processed`

**State** — `status`, `last_updated`, `created_at`, `updated_at`

### Constraints

| Column | Allowed values |
|---|---|
| `status` | `pending_technical_approval`, `pending_project_approval`, `approved`, `denied`, `purchased`, `shipped`, `delivered`, `completed`, `cancelled`, `returned` |
| `tech_approval_status`, `project_approval_status` | `pending`, `approved`, `denied`, `on_hold` |
| `sponsorship_search_status` | `not_started`, `in_progress`, `successful`, `failed`, `not_applicable` |
| `priority` | `low`, `medium`, `high`, `critical` |
| `urgency` | `flexible`, `moderate`, `urgent`, `critical` |

The UI only ever sets a subset of the `status` values, and old rows may carry legacy statuses
(`pending_approval`, `awaiting_sponsorship`, `approved_for_purchase`, `in_transit`,
`pending_purchase_approval`) that are remapped **in memory only** — never written back. Filter for
both spellings when querying directly.

Indexes on `status`, `subteam`, `submitter_email`, `created_at`, both approval statuses, and
`purchase_group_id`. Trigger `update_orders_updated_at` → `update_updated_at_column()` (defined in
the schedule schema — run that file first).

**RLS: not defined in the schema file.**

---

## Schedule tables

Details in [Schedules](schedule.md).

### schedule_teams

| Column | Type | Notes |
|---|---|---|
| `id` | text PK | slug, e.g. `high-voltage` |
| `name` | text | **not null** |
| `color` | text | **not null**, hex |
| `description` | text | |
| `created_at`, `updated_at` | timestamptz | |

Seeded with nine rows by the schema file (`on conflict do update`, so re-running is safe).

### schedule_projects

| Column | Type | Notes |
|---|---|---|
| `id` | bigserial PK | |
| `title` | text | **not null** |
| `description` | text | |
| `team` | text | **not null**, FK → `schedule_teams(id)` `on delete cascade` |
| `priority` | text | CHECK: `low`\|`medium`\|`high`\|`critical`, default `medium` |
| `status` | text | CHECK: `planning`\|`pending`\|`in-progress`\|`completed`\|`on-hold`\|`cancelled` |
| `start_date`, `due_date` | date | **not null**, CHECK `start_date <= due_date` |
| `estimated_hours`, `actual_hours` | integer | default 0 |
| `progress` | integer | CHECK 0–100 |
| `assigned_to` | text | **not null** — a name string, not a FK |
| `notes` | text | static notes |
| `weekly_notes` | text | the running weekly log |
| `created_by` | text | |
| `created_at`, `updated_at` | timestamptz | |

### schedule_tasks

Same shape, plus `project_id` (FK → `schedule_projects(id)` `on delete cascade`) and a different
status CHECK: `pending` \| `in-progress` \| `completed` \| `blocked` \| `cancelled`.

Note `pending` is allowed by both CHECKs but absent from the UI's status lists — a row set to
`pending` via SQL renders but can't be selected in a dropdown.

### schedule_events

**Entirely commented out** in the schema file. An abandoned calendar-events feature.

### Views

```sql
schedule_projects_summary   -- projects + task_count, completed_tasks, avg_task_progress
schedule_overdue_projects   -- due_date < today and not completed/cancelled
schedule_overdue_tasks      -- same for tasks, joined to project title and team
```

**RLS**: public `select` on all three tables; insert/update/delete for any `authenticated` user.

---

## Clipboard tables

Details in [Clipboard](clipboard.md).

### clipboard_spaces

| Column | Type | Notes |
|---|---|---|
| `access_hash` | text PK | CHECK `char_length >= 32` — SHA-256 of the user's code |
| `created_at`, `updated_at` | timestamptz | |

### clipboard_items

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | `gen_random_uuid()` |
| `access_hash` | text | **not null**, FK → `clipboard_spaces` `on delete cascade` |
| `title` | text | default `''`, coalesced to `"Untitled"` on save |
| `content_html` | text | sanitised HTML — images stripped |
| `content_text` | text | plain-text copy |
| `created_at`, `updated_at` | timestamptz | |

Index on `(access_hash, updated_at desc)`.

**Access model**: `REVOKE ALL` from `anon` and `authenticated` — the tables are unreachable
directly. The only way in is three `SECURITY DEFINER` functions, each requiring a ≥32-char hash:
`get_clipboard_items`, `save_clipboard_item`, `delete_clipboard_item`.

---

## Race telemetry tables

Details in [Race Telemetry](race-telemetry.md).

### race_tracks

`id` (uuid PK) · `name` · `start_lat` / `start_lon` · `center_lat` / `center_lon` ·
`lap_radius_m` (default **15**) · `min_lap_time_s` (default **20**) · `created_by` (FK auth.users) ·
timestamps

### race_sessions

`id` (uuid PK) · `name` · `track_id` (FK `race_tracks`, `on delete set null`) ·
`status` CHECK `idle`\|`running`\|`paused`\|`stopped` · `is_active` boolean ·
`started_at` / `ended_at` · `notes` · `created_by` · timestamps

**Partial unique index** `race_sessions_single_active` on `(is_active) where is_active = true` —
at most one active session can exist at a time, enforced by the database.

### live_telemetry

One row per session (`session_id` is the PK), upserted by the relay every tick. Hot columns bound
directly in the UI: `lat`, `lon`, `heading`, `gps_speed_mps`, `accuracy_m`, `speed_mph`,
`pack_soc`, `battery_voltage`, `battery_watts`, `current_draw`, `solar_watts`, `motor_temp_f`,
`inverter_temp_f`, `rpm`, `fault` — plus `payload` (jsonb) holding the full ~70-field packet.

### race_telemetry

Append-only history, ~1 Hz. `id` (bigserial) · `session_id` · `ts` · `captured_at` · the same hot
columns · `payload`. Index on `(session_id, ts desc)`.

### race_laps

`id` (bigserial) · `session_id` · `lap_number` · `lap_time_s` · `distance_m` · `avg_speed_mps` ·
`top_speed_mps` · `energy_wh` · `solar_wh` · `started_at` / `ended_at` ·
`source` CHECK `auto`\|`manual`. Unique on `(session_id, lap_number)`.

**RLS**: public `select` on all five. `race_tracks` and `race_sessions` are writable by
`is_pit_crew()` (approved leader/director). The three data tables have **no write policy at all** —
only the relay's `service_role` key can write them, so clients can't forge telemetry.

**Realtime publication**: `live_telemetry`, `race_laps`, `race_sessions`.

---

## Storage buckets

| Bucket | Public | Limit | Contents |
|---|---|---|---|
| `team-images` | ✅ | 5 MB (client-side) | headshots, named by member id |
| `sponsor-logos` | ✅ | 5 MB (client-side) | logos, named by sponsor id |
| `blog-images` | ✅ | 5 MB (client-side) | hero + inline blog images |
| `order-receipts` | ✅ | — | `<orderId>.pdf`, PDF only |
| `file-storage` | ✅ | **50 MB, MIME allow-list** | general team files |

> `order-receipts` being public with predictable filenames means receipts are enumerable. See
> [Security & Handover](security-and-handover.md).

---

## Database functions

| Function | Purpose |
|---|---|
| `is_approved_admin()` | approved leader or director — `user_roles` RLS |
| `is_approved_director()` | approved director — `user_roles` delete |
| `is_pit_crew()` | approved leader or director — telemetry RLS |
| `get_clipboard_items(hash)` | clipboard read |
| `save_clipboard_item(hash, id, title, html, text)` | clipboard upsert |
| `delete_clipboard_item(hash, id)` | clipboard delete |
| `update_updated_at_column()` | generic `updated_at` trigger |
| `update_blogs_updated_at()` | blogs trigger |
| `update_clipboard_updated_at()` | clipboard trigger |
| `update_user_role_timestamp()` | user_roles trigger — **referenced but not defined in the schema files**; create it manually on a fresh project |

All the permission helpers are `SECURITY DEFINER` deliberately.

---

## Field-name mapping

The database is `snake_case`; the React state is `camelCase` and nested. Conversion happens in
paired functions in [src/utils/supabase.js](../src/utils/supabase.js):

| Entity | DB → UI | UI → DB |
|---|---|---|
| Project | `transformProjectFromDB` | `transformProjectToDB` |
| Task | `transformTaskFromDB` | `transformTaskToDB` |
| Order | `transformOrderFromDB` | `transformOrderToDB` |

**Adding a column requires editing both halves.** Miss the `ToDB` side and the field silently never
saves — no error, the write just omits it.

---

## Related docs

- [Supabase Setup](supabase.md) — provisioning, RLS, backups
- [Security & Handover](security-and-handover.md) — known gaps
- [Orders](orders.md) · [Schedules](schedule.md) · [Blogs](blogs.md) · [Clipboard](clipboard.md) ·
  [Race Telemetry](race-telemetry.md)
