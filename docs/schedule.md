# Schedules & Projects

Project and task tracking across the nine subteams, with an overview dashboard, a calendar, and a
detailed project list. This is also the source of the progress bar on the public home page.

- UI: [src/components/admin/ScheduleManager.jsx](../src/components/admin/ScheduleManager.jsx) (2126 lines)
- Data layer: [src/utils/supabase.js](../src/utils/supabase.js) lines 1054–1394
- Tables: `schedule_teams`, `schedule_projects`, `schedule_tasks` — [supabase-schedule-schema.sql](../schemas/supabase-schedule-schema.sql)

---

## The data model

```
schedule_teams          the 9 subteams, seeded by the schema, id is a text slug
      │
      └── schedule_projects        team, title, dates, status, priority, progress,
              │                    assigned_to, notes, weekly_notes
              │
              └── schedule_tasks   project_id, title, dates, status, priority,
                                   assigned_to, progress, notes
```

Two levels only — projects contain tasks, tasks contain nothing. Deleting a project cascades to
its tasks (`on delete cascade`).

### The nine subteams

Seeded by [supabase-schedule-schema.sql](../schemas/supabase-schedule-schema.sql#L222-L232) with a
colour each, used consistently throughout the UI:

| id | Name | Colour |
|---|---|---|
| `director` | Project Director | `#6366f1` |
| `technical-director` | Technical Director | `#8b5cf6` |
| `aerodynamics` | Aerodynamics | `#06b6d4` |
| `high-voltage` | High Voltage | `#ef4444` |
| `low-voltage` | Low Voltage | `#f59e0b` |
| `systems-architecture` | Systems Architecture | `#10b981` |
| `structures` | Structures | `#14b8a6` |
| `vehicle-dynamics` | Vehicle Dynamics | `#f97316` |
| `business` | Business | `#84cc16` |

`ScheduleManager` normalises `technical-director` and `project-director` into a single
**Director** bucket for display (`normalizeTeamId`), so director-level work doesn't fragment across
two columns.

To add a subteam, insert a row into `schedule_teams` — the `id` must be a URL-safe slug, and
`schedule_projects.team` is a foreign key onto it.

### Statuses

**Projects**: `planning` · `in-progress` · `completed` · `on-hold` · `cancelled`

**Tasks**: `in-progress` · `completed` · `blocked` · `cancelled`

Tasks have `blocked` (projects don't) and no `planning`/`on-hold`. Note the database CHECK on
`schedule_projects.status` also allows `pending`, and on `schedule_tasks.status` also allows
`pending` — but neither appears in the UI's constant lists, so a `pending` row set via SQL will
render but can't be selected from the dropdown.

**Priorities** (both levels): `low` · `medium` · `high` · `critical`.

### Progress

`progress` is 0–100, CHECK-constrained. Setting a status to `completed` auto-sets progress to 100;
`cancelled` also counts as 100 for display purposes. Otherwise it's manual.

The Home page reads this: `/` computes overall completion from `schedule_projects` and shows it in
the [ProgressTracker](../src/components/ProgressTracker.jsx), plus an "upcoming projects" carousel.
**Project data is public** — the RLS policy on these tables allows public reads, so anything you
type into a project title is visible to anyone who looks at the API. Don't put anything sensitive
in there.

---

## The three views

Switch with the tabs at the top of the Schedules tab.

### Overview

Per-team summary cards: total / completed / active project counts, and aggregate stats across all
teams. Fastest way to see who's behind.

### Calendar

Month or week view of everything due, colour-coded by team. Clicking a day opens the list of items
due that day. Filterable by team.

### Projects

The working view: the full project list with expandable tasks.

**Filters**: team, status.

**Sort**: Priority (the default), Due Date ↑/↓, Title A→Z / Z→A, Status.

The default **Priority** sort is smarter than a plain field sort and worth understanding, because
the ordering looks arbitrary until you know the rules:

1. **Overdue items first**, always.
2. Then active items before completed/cancelled ones.
3. Within active: soonest due date first.
4. Ties broken by priority (critical → high → medium → low).
5. Then alphabetically by title.
6. Completed/cancelled sink to the bottom, most recent first.

An item counts as overdue when its due date has passed and its status isn't `completed` or
`cancelled`.

---

## Using it

Viewing needs `view_schedules` (everyone). Editing needs `edit_schedules` (**leader or director**).
Members see the data with the controls disabled and get an explanatory message if they try.

### Creating a project

Projects view → **Add Project**. Every one of these is required and validated before saving:

`title` · `priority` · `status` · `assignedTo` · `startDate` · `dueDate` · `team`

Optional: description, estimated hours, notes.

The database also enforces `start_date <= due_date` (`CONSTRAINT valid_dates`), so an inverted date
range fails at the DB even if it slips past the form.

### Adding tasks

Expand a project → **Add Task**. Same required fields as a project (minus `team`, which is
inherited) and the same date constraint. Tasks are edited and deleted inline.

### Changing status inline

Both projects and tasks have a [StatusDropdown](../src/components/StatusDropdown.jsx) directly in
the list — no need to open the edit form. It updates optimistically, then writes just that field
through `updateProjectFields()` / `updateTaskFields()`.

### Weekly notes

Each project has a `weekly_notes` field with an inline
[InlineNotesEditor](../src/components/InlineNotesEditor.jsx) that **saves on blur** — click away
and it's written. Intended for the running "what happened this week" log that gets read out in
team meetings.

Distinct from `notes`, which is the project's static description-ish notes field.

### Deleting

Deleting a project deletes all its tasks (DB cascade), and the confirmation dialog says so.
There's no undo and no soft delete — if you might want it back, set the status to `cancelled`
instead.

---

## Realtime collaboration

This is the one manager on **Supabase Realtime** rather than polling:

```js
subscriptionsRef.current.projects = supabaseService.subscribeToTable('schedule_projects', handleDataChange);
subscriptionsRef.current.tasks    = supabaseService.subscribeToTable('schedule_tasks',    handleDataChange);
```

Any change by anyone re-fetches the schedule for everyone with the tab open. Subscriptions are
torn down on unmount and re-established on tab refocus, since a throttled background tab kills the
websocket.

If realtime updates stop arriving, the usual cause is that the tables aren't in the
`supabase_realtime` publication:

```sql
alter publication supabase_realtime add table public.schedule_projects;
alter publication supabase_realtime add table public.schedule_tasks;
```

A subscription to an unpublished table fails silently — no error, just nothing.

---

## Field name mapping

The DB is `snake_case`, the UI is `camelCase`. Converted by `transformProjectFromDB` /
`transformProjectToDB` and `transformTaskFromDB` / `transformTaskToDB`
([supabase.js:1286–1394](../src/utils/supabase.js#L1286)).

| Database | UI |
|---|---|
| `start_date` | `startDate` |
| `due_date` | `dueDate` |
| `assigned_to` | `assignedTo` |
| `estimated_hours` | `estimatedHours` |
| `actual_hours` | `actualHours` |
| `weekly_notes` | `weeklyNotes` |
| `project_id` | `projectId` |

**Adding a column means editing both functions in the pair.** Miss the `ToDB` half and the field
silently never saves.

---

## Handy SQL

The schema ships three views:

```sql
select * from schedule_projects_summary;   -- projects + task counts + avg task progress
select * from schedule_overdue_projects;   -- past due, not completed/cancelled
select * from schedule_overdue_tasks;      -- same for tasks, with project title/team
```

```sql
-- workload per team
select team, count(*) filter (where status = 'in-progress') as active,
             count(*) filter (where status = 'completed')   as done
from schedule_projects group by team order by active desc;

-- everything due in the next two weeks
select title, team, due_date, assigned_to, status
from schedule_projects
where due_date between current_date and current_date + 14
  and status not in ('completed', 'cancelled')
order by due_date;

-- bulk-close last year's work
update schedule_projects
set status = 'completed', progress = 100
where due_date < '2026-01-01' and status = 'in-progress';
```

> `schedule_events` appears in the schema file entirely commented out — an abandoned calendar-events
> feature. The calendar view renders project and task due dates only. If you want real events
> (meetings, tests), uncomment that block and build the UI.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Add/Edit buttons disabled | You're a `member`; `edit_schedules` is leader+ | Ask a leader |
| "Please fill in all required fields" | One of the seven required project fields is blank | The message names it |
| Save fails with a constraint error | `start_date > due_date` | Fix the dates |
| Changes by others don't appear | Realtime subscription dropped, or tables not in the publication | Refocus the tab (auto re-subscribes); check the publication |
| Project shows under "Director" but was filed under Technical Director | `normalizeTeamId` merges the two director teams | Working as intended |
| Ordering looks random | Default Priority sort has overdue-first + completed-last rules | See the sort rules above, or pick a simpler sort |
| Home page progress bar looks wrong | It's computed from *all* projects, including cancelled ones | Check `/` against the Overview tab |
| A status exists in the DB but isn't selectable | `pending` is allowed by the CHECK but absent from the UI constants | Add it to `PROJECT_STATUSES`/`TASK_STATUSES` or change the row |

---

## Related docs

- [Admin Dashboard](admin-dashboard.md) — shared manager behaviour
- [Database Reference](database-reference.md#schedule-tables) — full columns and constraints
- [Public Site](public-site.md#home) — how the Home page consumes this data
