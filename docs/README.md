# SolarPack-Web Documentation

Full documentation for the NC State SolarPack website and admin portal.
The [root README](../README.md) is the overview; these are the details.

---

## Start here

| If you're… | Read |
|---|---|
| **New to the project** | [Getting Started](getting-started.md) → [Architecture](architecture.md) |
| **Just need to update content** (roster, sponsors, blogs) | [Admin Dashboard](admin-dashboard.md) → [Content Managers](content-managers.md) |
| **Taking over as the maintainer** | [Security & Handover](security-and-handover.md) → [Architecture](architecture.md) → [Supabase Setup](supabase.md) |
| **Fixing something broken** | [Troubleshooting](troubleshooting.md) |
| **About to write code** | [Making Changes](making-changes.md) |

---

## Setup & development

| Doc | Covers |
|---|---|
| [Getting Started](getting-started.md) | Node, VS Code, cloning, `.env`, running it, getting an admin account |
| [Architecture](architecture.md) | How the app is put together, request lifecycle, directory map, shared patterns, known rough edges |
| [Making Changes](making-changes.md) | Git workflow, VS Code, and copy-paste recipes for common changes |
| [Deployment](deployment.md) | GitHub Actions, secrets, the custom domain, rollback |
| [Troubleshooting](troubleshooting.md) | Symptom-first index of things that go wrong |

## Backend

| Doc | Covers |
|---|---|
| [Supabase Setup](supabase.md) | Signing in, keys, running the schemas, buckets, RLS, backups, common SQL |
| [Database Reference](database-reference.md) | Every table, column, constraint and policy |
| [Authentication](authentication.md) | Sign-up → approval flow, the three roles, permissions, sessions |
| [Credentials](credentials.md) | The shared team login. **The only file here with a password** |

## Admin dashboard features

| Doc | Covers |
|---|---|
| [Admin Dashboard](admin-dashboard.md) | The nine tabs, permissions, Overview, Settings, shared behaviour |
| [Members & Users](members-and-users.md) | Approving sign-ups, roles, removing people, accounts vs. public cards |
| [Orders](orders.md) | The two-stage procurement workflow, purchase groups, receipts, exports |
| [Schedules](schedule.md) | Projects, tasks, the nine subteams, calendar, realtime editing |
| [Content Managers](content-managers.md) | Team roster, sponsors and tiers, alumni |
| [Blogs](blogs.md) | The section editor, images, publishing |
| [Files](files.md) | The shared file browser and the protected "Website Data" zone |

## Public site & extras

| Doc | Covers |
|---|---|
| [Public Site](public-site.md) | Every public page, where its content comes from, editing them |
| [Race Telemetry](race-telemetry.md) | The live `/telemetry` dashboard, pit controls, the relay |
| [Clipboard](clipboard.md) | The code-gated shared scratchpad at `/clipboard` |

## Operations

| Doc | Covers |
|---|---|
| [Security & Handover](security-and-handover.md) | Known gaps, the security model, and the end-of-year handover checklist |

---

## Common tasks

| Task | Where |
|---|---|
| Add a team member | [Content Managers → Team](content-managers.md#team-members) |
| Add a sponsor | [Content Managers → Sponsors](content-managers.md#sponsors) |
| Add a graduating class | [Content Managers → Alumni](content-managers.md#alumni) |
| Publish a blog post | [Blogs](blogs.md#writing-a-post) |
| Approve a new user | [Members & Users](members-and-users.md#approving-new-sign-ups) |
| Make someone a director | [Members & Users](members-and-users.md#changing-someones-role) |
| Submit / approve an order | [Orders](orders.md#using-it) |
| Export order records | [Orders](orders.md#downloading-records) |
| Add a project or task | [Schedules](schedule.md#using-it) |
| Run a race session | [Race Telemetry](race-telemetry.md#using-it-in-the-pit) |
| Change text on a public page | [Making Changes](making-changes.md#recipe-change-text-or-styling-on-an-existing-page) |
| Add a new page | [Making Changes](making-changes.md#recipe-add-a-new-public-page) |
| Add a new admin tab | [Making Changes](making-changes.md#recipe-add-a-new-admin-tab) |
| Add a database field | [Making Changes](making-changes.md#recipe-add-a-field-to-an-existing-feature) |
| Deploy | [Deployment](deployment.md) — push to `main` |
| Back up the database | [Supabase Setup](supabase.md#backups) |
| Rotate credentials | [Credentials](credentials.md#rotating-everything) |

---

## Keeping these docs honest

Documentation that lies is worse than none. Two rules:

1. **Update the doc in the same PR as the code.** Not later.
2. **Fix anything you find that's wrong**, even if it isn't yours. A stale doc costs the next person
   an afternoon.

This set replaced a `docs/README.md` that described a static-HTML version of the site
(`alumni.html`, `blogs/index.json`) that hadn't existed for years. Don't let it drift that far
again.

If you're unsure whether something belongs here or in a code comment: **how it works** goes in the
docs; **why this line is weird** goes in the code.
