# SolarPack-Web

A modern web application for the NC State SolarPack team, providing public information, team management, blog publishing, sponsor recognition, and more. Built with React and Vite, with Supabase as the backend.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Authentication](#authentication)
- [Pages](#pages)
- [Components](#components)
- [Admin Components](#admin-components)
- [Setup & Installation](#setup--installation)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Contribution Guidelines](#contribution-guidelines)
- [API & Data Schema](#api--data-schema)

---

## Project Overview
SolarPack-Web is the official website and management portal for the NC State SolarPack solar vehicle team. It features:
- Public-facing pages for team info, blogs, sponsors, and donations
- Admin tools for managing alumni, blogs, orders, schedules, sponsors, and team members
- Real-time data integration with Supabase
- **Secure authentication with Supabase Auth** (email/password, verification, password reset)

---

## Authentication

### 🔐 Supabase Authentication System

The application uses **Supabase Authentication** for secure user management with role-based access control.

#### User Roles
- **Member** (Default): View-only access to most content
- **Leader**: Can edit schedules, team, sponsors, alumni, and submit orders
- **Director**: Full administrative access, can manage users and approve orders

#### Features
- ✅ Email/password sign up and sign in
- ✅ Email verification with OTP codes
- ✅ Forgot password / password reset
- ✅ Secure session management with auto-refresh
- ✅ Role-based permissions
- ✅ Protected admin routes

#### Quick Setup
1. **Configure Supabase** (see [SUPABASE_AUTH_SETUP.md](./SUPABASE_AUTH_SETUP.md))
2. **Set environment variables** in `.env`:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. **Run database schema**: Execute `supabase-user-roles-schema.sql` in Supabase SQL Editor
4. **Create first director**: Sign up through UI, then promote via SQL:
   ```sql
   UPDATE user_roles SET level = 'director' WHERE email = 'your@email.com';
   ```

#### Auth Components
- `Login.jsx` - Email/password login with sign up toggle
- `ConfirmEmail.jsx` - Email verification with OTP
- `ForgotPassword.jsx` - Password reset request
- `ResetPassword.jsx` - Set new password

📚 **Full Documentation**: See [SUPABASE_AUTH_SETUP.md](./SUPABASE_AUTH_SETUP.md) for complete setup guide

---

## Pages

### Home (`src/pages/Home.jsx`)
The landing page for SolarPack. Shows:
- Team introduction and mission
- Progress tracker for projects (uses Supabase data)
- Upcoming projects (auto-fetched and sorted)
- Call-to-action for donations

<img width="2525" height="1333" alt="Screenshot 2025-11-13 190304" src="https://github.com/user-attachments/assets/b6fb781d-0a7e-4a73-8b08-460bf18d015f" />

### Alumni (`src/pages/Alumni.jsx`)
Displays a two-column list of alumni by semester, loaded from Supabase. Handles loading and error states. Newest alumni appear at the top left.

### App (`src/pages/App.jsx`)
Documents the iPad app's main screens, with images and feature lists for each page (Home, BMS, Motor Controller, Charging, Low Voltage, etc.).

### Blogs (`src/pages/Blogs.jsx`)
Lists published blog posts from Supabase. Allows users to open and read full blog posts in a modal. Handles loading and error states.

### Contact (`src/pages/Contact.jsx`)
Contact information for the team, including email and social links. Styled for clarity and accessibility.

### Donate (`src/pages/Donate.jsx`)
Donation page with preset and custom amounts. Integrates with PayPal for donations. Handles input validation and shows/hides PayPal button as needed.

### NotFound (`src/pages/NotFound.jsx`)
Custom 404 page with navigation options back to Home or Contact. Styled for a friendly user experience.

### PrivacyPolicy (`src/pages/PrivacyPolicy.jsx`)
Accordion-style privacy policy with effective date, section toggles, and clear legal language. All content is inline and styled for readability.

### Sponsors (`src/pages/Sponsors.jsx`)
Displays sponsor tiers and sponsors within each tier, loaded from Supabase. Handles loading and error states. Each tier is styled distinctly.

### Team (`src/pages/Team.jsx`)
Shows all current team members, loaded from Supabase. Members are sorted by order. Clicking a member opens a modal with their full bio and details. Handles loading and error states.

---

## Components

### Admin (`src/components/Admin.jsx`)
Handles authentication and routing for the admin dashboard. Shows login form or dashboard based on authentication state.

### AdminDashboard (`src/components/AdminDashboard.jsx`)
Main admin interface. Tabbed dashboard for managing team, schedule, alumni, sponsors, orders, and blogs. Handles session extension and tab state via URL.

<img width="2514" height="1326" alt="Screenshot 2025-11-13 190443" src="https://github.com/user-attachments/assets/eca7c499-557a-49f7-8a04-57482135ce56" />

### Alert (`src/components/Alert.jsx`)
Custom modal alert/confirm dialog. Used for user notifications, confirmations, and error messages. Supports info, warning, error, and success types.

### Header (`src/components/Header.jsx`)
Responsive navigation bar. Handles authentication status, login modal, and navigation links. Integrates with `authService` for login/logout.

### InlineNotesEditor (`src/components/InlineNotesEditor.jsx`)
Editable textarea for inline note editing. Supports auto-save on blur, confirm control, and async save callbacks. Used in admin tools for notes.

### Layout (`src/components/Layout.jsx`)
Wraps all pages with a consistent header, main content area, and footer.

### Login (`src/components/Login.jsx`)
Password-based login form for admin access. Handles authentication and error display.

### ProgressTracker (`src/components/ProgressTracker.jsx`)
Visual progress bar for project completion. Used on the Home page to show overall project progress.

### StatusDropdown (`src/components/StatusDropdown.jsx`)
Inline dropdown for selecting project/task status. Used in admin schedule management. Supports custom colors and disabled/read-only mode.

### SyncStatusBadge (`src/components/SyncStatusBadge.jsx`)
Minimal UI badge showing Supabase sync status (synced, saving, new data). Used in admin tools for real-time feedback.

### SyncStatusIndicator (`src/components/SyncStatusIndicator.jsx`)
Detailed sync status indicator for Supabase data. Shows up-to-date, changes detected, saving, and error states. Used in admin and data-heavy views.

---

## Admin Components

### AlumniManager (`src/components/admin/AlumniManager.jsx`)
Admin tool for managing alumni by semester. Supports adding, editing, deleting, and reordering semesters and leadership. Real-time sync with Supabase and visual sync status.

### BlogManager (`src/components/admin/BlogManager.jsx`)
Admin tool for managing blog posts. Supports creating, editing, publishing, and deleting blogs. Handles image uploads and real-time sync with Supabase.

### OrderManager (`src/components/admin/OrderManager.jsx`)
Comprehensive order management for team purchases. Features filtering, editing, approval workflows, PDF/receipt uploads, and export. Real-time sync with Supabase.

### ScheduleManager (`src/components/admin/ScheduleManager.jsx`)
Admin tool for managing project schedules. Supports adding/editing projects, tasks, calendar views, and inline notes. Integrates with Supabase for real-time updates.

### SponsorsManager (`src/components/admin/SponsorsManager.jsx`)
Admin tool for managing sponsor tiers and sponsors. Supports adding, editing, deleting sponsors, and logo uploads. Real-time sync with Supabase.

### TeamManager (`src/components/admin/TeamManager.jsx`)
Admin tool for managing team members. Supports adding, editing, deleting, and reordering members, as well as image uploads. Real-time sync with Supabase.

---

## Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation Steps
1. Clone the repository:
	```sh
	git clone https://github.com/NCSU-Solarpack/SolarPack-Web.git
	cd SolarPack-Web
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Configure environment variables:
	- Create a `.env` file in the project root if needed for Supabase or other secrets.
	- Example:
	  ```env
	  VITE_SUPABASE_URL=your-supabase-url
	  VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
	  ```

4. (Optional) Update `public/data/` with initial JSON data if running locally without Supabase.

---

## Running the App

To start the development server:

```sh
npm run dev
```

This will launch the app at `http://localhost:5173` (or the port shown in your terminal).

For a production build:

```sh
npm run build
npm run preview
```

This will build the app and serve the static files locally for testing.

---

## Deployment

### Static Hosting (Recommended)
1. Build the app:
	```sh
	npm run build
	```
2. Deploy the contents of the `dist/` folder to your static host (e.g., Netlify, Vercel, GitHub Pages, or your own server).
3. Ensure your host supports SPA fallback (serving `index.html` for unknown routes).

### Environment Variables
Set your Supabase credentials and any other secrets as environment variables on your host.

### Custom Domain
If using a custom domain, update the `CNAME` file in `public/` and root as needed.

---

## Contribution Guidelines

1. Fork the repository and create a new branch for your feature or fix.
2. Write clear, descriptive commit messages.
3. Ensure your code passes linting and builds successfully.
4. Open a pull request with a detailed description of your changes.
5. For major changes, open an issue first to discuss your proposal.

---

## Contribution Guidelines

<!-- Contribution guidelines will be added here. -->

---

## API & Data Schema

---

## How the Supabase Database Works

### Overview
Supabase is an open-source backend-as-a-service that provides a hosted Postgres database, real-time APIs, authentication, and file storage. In SolarPack-Web, Supabase is used as the single source of truth for all dynamic data, replacing static JSON or GitHub-based storage.

### Key Features Used
- **Postgres Database:** All tables (team, alumni, blogs, sponsors, orders, schedules) are managed in a relational schema. Each table supports full CRUD operations.
- **Row-Level Security (RLS):** Policies are defined to control who can read or write to each table. For example, only published blogs are public, while admin users can manage all data.
- **Storage Buckets:** Images and files (e.g., receipts, headshots, sponsor logos) are uploaded to Supabase Storage and linked to database records via public URLs.
- **Real-Time Subscriptions:** The app can subscribe to changes in tables for instant updates (used in admin tools for collaborative editing).

### Data Flow
1. **Fetching Data:**
	- The frontend uses the `supabaseService` singleton to fetch data from tables (e.g., `getTeamMembers`, `getAlumni`, `getBlogs`).
	- Data is returned as arrays of objects, often sorted or grouped for UI needs.
2. **Saving Data:**
	- Admin tools call `save*` or `update*` methods to upsert (insert or update) records. Deletions are handled with `delete*` methods.
	- File uploads (images, PDFs) are handled by dedicated methods that store files in buckets and update the DB with the public URL.
3. **Sync & Polling:**
	- Custom hooks (`useSupabaseSyncStatus`) poll the database for changes, hash the data, and notify users if new data is available.
	# SolarPack-Web

	Comprehensive documentation for SolarPack-Web: a React + Vite frontend backed by Supabase. This README focuses on the repository, the Supabase SQL templates included in `supabase-*.sql` files, setup and migration suggestions, security considerations (RLS & storage policies), and how the schemas map to the frontend admin components.

	Notes:
	- This repo includes a set of SQL templates (prefixed with `supabase-`) intended to be run in your Supabase project (or locally against a compatible Postgres instance).
	- The app reads runtime config from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in development and production builds.

	---

	## Quick Links
	- `supabase-blogs-schema.sql` — blogs table + storage policy template
	- `supabase-orders-schema.sql` — detailed orders table for procurement tracking
	- `supabase-schedule-schema.sql` — schedule teams, projects, tasks
	- `supabase-sponsors-schema.sql` — sponsors table
	- `supabase-team-schema.sql` — team members table

	---

	**Table of Contents**
	- Project summary
	- Supabase SQL file summaries
	- Setup: Supabase project + extensions
	- Storage buckets & policies
	- Row-Level Security (RLS) guidance
	- Migration & seeding instructions
	- Mapping DB tables → frontend components
	- Operational notes: backups, service keys, and troubleshooting

	---

	## Project Summary

	SolarPack-Web is the team site and lightweight management portal for NC State SolarPack. The frontend is in `src/` and includes admin UIs in `src/components/admin/*` which interact with Supabase tables defined in the SQL files. The admin UI expects certain tables, columns, and simple storage buckets for file uploads.

	---

	## Supabase SQL Files — What’s Included

	Each `supabase-*.sql` file sets up a domain-specific schema, indexes, triggers, and example RLS/storage policies. A short summary:

	- `supabase-blogs-schema.sql`:
		- Creates `blogs` table (UUID PK via `gen_random_uuid()`), publish flag, timestamps, an update trigger, and indexes.
		- Includes instructions for creating a `blog-images` storage bucket and example storage policies for public read and authenticated upload/update/delete.
		- Important: `gen_random_uuid()` requires the `pgcrypto` extension or `pgcrypto`/`pg_stat_statements` depending on Postgres version — see Setup.

	- `supabase-orders-schema.sql`:
		- Large `orders` table with fields for submission, approval workflow, sponsorship tracking, purchase/delivery metadata, receipt handling, and timestamps.
		- Adds indexes, check constraints for enum-like fields, a trigger to update `updated_at`, and example grants.
		- Note: Uses `bigserial` primary key and references sequence names (e.g., `orders_id_seq`) — be careful when importing into an existing DB to preserve sequence ownership.

	- `supabase-schedule-schema.sql`:
		- `schedule_teams`, `schedule_projects`, `schedule_tasks` tables with colors, priorities, statuses, triggers to update `updated_at` and sample seeded `schedule_teams` rows.
		- Includes helpful views: `schedule_projects_summary`, `schedule_overdue_projects`, `schedule_overdue_tasks`.
		- RLS policies are enabled in the file with permissive examples for public read + authenticated write — tailor these for your org.

	- `supabase-sponsors-schema.sql`:
		- Simple `sponsors` table with ordering and timestamps.

	- `supabase-team-schema.sql`:
		- Simple `team_members` table for team roster with ordering, bios, images, and timestamps.

	---

	## Recommended Supabase Project Setup (step-by-step)

	1. Create a new Supabase project at https://app.supabase.com.
	2. In the SQL editor, enable needed extensions (if not already enabled):

	```sql
	CREATE EXTENSION IF NOT EXISTS pgcrypto;
	```

	3. Run the SQL files in this order to ensure dependent objects exist:
		- `supabase-team-schema.sql`
		- `supabase-sponsors-schema.sql`
		- `supabase-blogs-schema.sql`
		- `supabase-schedule-schema.sql`
		- `supabase-orders-schema.sql`

	4. Create storage buckets referenced by the SQL templates (example names used in templates):
		- `blog-images` (public)
		- `team-images` (public or authenticated depending on privacy)
		- `order-receipts` (usually private; serve via signed URLs)

	5. Add RLS policies and review the ones in the SQL templates. Do not assume templates are production-secure — they are useful defaults.

	6. Create environment variables for the frontend:

	```
	VITE_SUPABASE_URL=https://<your-project>.supabase.co
	VITE_SUPABASE_ANON_KEY=<anon-public-key>
	```

	Optional (server-side operations only):

	```
	SUPABASE_SERVICE_ROLE_KEY=<service-role-key>  # keep secret. Only use on trusted servers.
	```

	---

	## Storage Buckets & Policy Recommendations

	- Blog images: the `supabase-blogs-schema.sql` suggests a public `blog-images` bucket. Public buckets are easiest for a static site, but if you want controlled access, create a private bucket and use signed URLs returned by Supabase.
	- Order receipts: create `order-receipts` as private. Store a boolean `receipt_uploaded` and the file metadata in the `orders` table; use signed URLs when admins need to view or download receipts.
	- Allowed MIME types & file size: keep limits (e.g., 5MB for blog images) in the client upload code and enforce checks in serverless functions or policies where feasible.

	Example storage policy (public read on `blog-images`):

	```sql
	INSERT INTO storage.buckets (id, name, public)
	VALUES ('blog-images', 'blog-images', true)
	ON CONFLICT (id) DO NOTHING;

	CREATE POLICY "Public can read blog images"
	ON storage.objects FOR SELECT
	TO public
	USING (bucket_id = 'blog-images');
	```

	---

	## Row-Level Security (RLS) — Practical Guidance

	- The templates enable RLS for many tables. RLS is powerful but must be configured carefully.
	- Use `authenticated` role to allow logged-in users (via Supabase Auth) to insert/update/delete where appropriate. For admin-only operations, do not grant broad `authenticated` rights — instead, restrict to users with specific claims or use server-side service role requests.
	- Example: If only a small set of users should be admins, store an `is_admin` flag in a `profiles` table and use policies like:

	```sql
	CREATE POLICY "Admins can modify blogs" ON blogs
	FOR ALL
	TO authenticated
	USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));
	```

	- Be careful with `GRANT ALL TO authenticated` in templates — that's convenient for development but unsafe for production.

	---

	## Authentication (How Auth Works Today & Recommended Migration)

	This project currently contains two approaches to authentication and access control. Future maintainers should understand both, remove any insecure client-side logic before production, and migrate to Supabase Auth + a `profiles` table for role-based policies.

	- `src/utils/auth.js` (current, client-side):
	  - A lightweight, purely client-side auth implementation that:
	    - Uses hard-coded password hashes derived from `hashPassword(password, salt)`.
	    - Stores `PASSWORD_HASHES` inside the repo (default passwords are present and must be changed).
	    - Persists the logged-in user in `localStorage` (`solarpack_auth`) with a 24-hour expiry.
	    - Exposes helper methods: `authenticate(password)`, `logout()`, `isAuthenticated()`, `hasPermission(permission)`, `extendSession()`.

	  Risks & limitations:
	  - Passwords and hashes are client-side and visible in source — this is NOT secure.
	  - There is no server-side enforcement; any user can spoof `localStorage` to obtain higher privileges.
	  - No password reset, no audit trail, and no secure identity binding to database rows.

	- `src/utils/supabase.js` (recommended):
	  - The Supabase service client is initialized with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
	  - Contains optional auth helpers: `signIn(email, password)`, `signOut()`, and `getUser()` which call Supabase Auth endpoints.
	  - When using Supabase Auth, you should pair it with a `profiles` table (or user metadata) for role claims and then enforce roles with RLS policies.

	Recommended migration path (safe, step-by-step):

	1. Enable Supabase Auth (email/password) in your Supabase project settings.
	2. Create a `profiles` table to map `auth.uid()` to application roles and metadata. Example SQL:

	```sql
	CREATE TABLE IF NOT EXISTS profiles (
	  id uuid PRIMARY KEY,
	  email text,
	  full_name text,
	  is_admin boolean DEFAULT false,
	  role text DEFAULT 'member',
	  created_at timestamptz DEFAULT now()
	);

	-- Automatically insert into profiles when a new user signs up (using an auth webhook or a trigger on auth.users via Supabase functions)
	```

	3. Create admin users securely:
	  - Preferred: invite or sign-up users via the Supabase Auth UI/API.
	  - To mark a user as admin, insert or update their profile row using their `auth.uid()` (get the uid from the Supabase Auth user record):

	```sql
	-- replace '<user-uid>' with the actual auth.uid()
	INSERT INTO profiles (id, email, is_admin, role)
	VALUES ('<user-uid>', 'admin@example.edu', true, 'director')
	ON CONFLICT (id) DO UPDATE SET is_admin = true, role = 'director';
	```

	4. Update RLS policies to reference `profiles` instead of broad `authenticated` grants. Example RLS policy allowing only admins to modify `blogs`:

	```sql
	CREATE POLICY "Admins can modify blogs" ON blogs
	  FOR ALL
	  TO authenticated
	  USING (
	    EXISTS (
	      SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true
	    )
	  );
	```

	5. Update frontend code:
	  - Replace uses of the client-side `authService` with Supabase Auth calls (prefer `supabase.auth.signInWithPassword` and `supabase.auth.getUser`).
	  - Use `supabase.auth.onAuthStateChange` to react to sign-in/sign-out events and fetch the user's `profiles` row to get their `role`/permissions.
	  - Protect admin routes by checking `profiles.is_admin` (or `role`) before rendering admin UIs.

	6. Secure storage buckets using RLS and policies that check `auth.role()` or `profiles` claims where appropriate. For private data (e.g., `order-receipts`), prefer private buckets and use signed URLs to grant temporary access.

	7. Remove or disable the client-side `authService` once Supabase Auth is fully integrated. Keep a backup branch if you need a rollback path.

	Example client-side pattern after migration (pseudo-code):

	```javascript
	import { supabaseService } from './src/utils/supabase';

	// Listen for auth changes
	supabaseService.client.auth.onAuthStateChange(async (event, session) => {
	  if (session?.user) {
	    const { data: profile } = await supabaseService.client
	      .from('profiles')
	      .select('*')
	      .eq('id', session.user.id)
	      .single();
	    // Store profile in app state and gate admin UI based on profile.is_admin
	  } else {
	    // Clear profile/app auth state
	  }
	});
	```

	Notes about keys and server-side needs:
	- Never expose the Supabase **service_role** key to the browser. Use it only on trusted backends for privileged tasks (e.g., admin-only data exports, background jobs).
	- The `VITE_SUPABASE_ANON_KEY` is safe for client usage but respects RLS; ensure RLS policies are correctly configured to prevent unauthorized writes.

	If you'd like, I can:
	- Replace the client-side `authService` with a migration-ready wrapper that proxies to Supabase Auth and falls back gracefully during transition.
	- Add SQL migration scripts to create the `profiles` table and example admin seed rows.

**Development Auth Passwords (DO NOT use in production)**

- **Director:** `director@pack`
- **Leader:** `solarteamlead!`
- **Member:** `solarpack@ncsu`

These are the default, client-side passwords used by the in-repo `src/utils/auth.js` helper for local development only. The app hashes these values before comparing; however, keeping passwords or hashes in source is insecure — see the security note below.

**Email Notifications (Resend)**

- We will use `https://resend.com/` for outbound email notifications (transactional emails, alerts, and admin notifications).
- Sign-in for the Resend account used in development/testing: email `solarpacknc@ncsu.edu` and password `FunintheSun!`.

**Security Notice / Recommendation**

- These credentials are checked into the repository for convenience in this development snapshot. This is insecure for production or shared/public repositories.
- Recommended actions before publishing or deploying:
  - Move service credentials (Supabase service role key, Resend API key, SMTP credentials, etc.) into environment variables and read them at runtime (e.g., `.env`, CI/CD secrets, or platform secret storage).
  - Remove hard-coded passwords from `src/utils/auth.js` and replace the client-side auth with Supabase Auth + a `profiles` table and proper RLS policies.
  - Rotate any credentials that were committed here and treat them as compromised if this repository becomes public.



	## Migration & Seeding

	Options:

	- Supabase Dashboard SQL editor: copy-paste each file and run.
	- `psql` (local Postgres): run `psql -h host -U user -d db -f supabase-blogs-schema.sql`.
	- Supabase CLI (recommended for a repeatable workflow):

	```powershell
	supabase login; supabase link --project-ref <project_ref>; supabase db reset; supabase db push --file supabase-blogs-schema.sql
	```

	Seeding:
	- `supabase-schedule-schema.sql` includes an `INSERT` for `schedule_teams` — that's a convenient seed. You can add more seed SQL files and keep them in a `supabase/seeds/` folder.

	Important migration notes:
	- When importing into an existing database, review sequences (e.g., `orders_id_seq`) and ensure `OWNED BY` is set correctly. If you manually create the sequence, use `setval()` to update the next value.
	- Keep destructive statements out of automated deploys. Prefer additive migrations.

	---

	## How DB Tables Map to Frontend Components

	- Blogs (`blogs`) → `src/components/admin/BlogManager.jsx` and `src/pages/Blogs.jsx`.
		- BlogManager: create/edit/publish, image uploads use `blog-images` bucket.
	- Team members (`team_members`) → `src/components/admin/TeamManager.jsx` and `src/pages/Team.jsx`.
		- Images stored in `team-images` or similar bucket; `order` determines display order.
	- Sponsors (`sponsors`) → `src/components/admin/SponsorsManager.jsx` and `src/pages/Sponsors.jsx`.
		- `tier` groups sponsors; `order` controls display priority.
	- Orders (`orders`) → `src/components/admin/OrderManager.jsx`.
		- Full procurement lifecycle fields match fields in the manager UI (approval statuses, receipt uploads, tracking numbers).
		- Use private bucket + signed URLs for receipts in production.
	- Schedule (`schedule_*`) → `src/components/admin/ScheduleManager.jsx` and pages that show projects/tasks.
		- `schedule_projects_summary` view is handy for UI aggregations.

	---

	## Security & Operational Best Practices

	- Do not expose the Supabase service role key in the frontend. Use it only on secure backend processes.
	- Lock down RLS policies for write operations in production — least privilege principle.
	- Limit public buckets where possible; prefer signed URLs for non-public files.
	- Monitor database performance: indexes included in the templates are a good start. Add or refine indexes based on slow queries from production logs.

	Backups & restore:
	- Use Supabase backups feature (or `pg_dump`) regularly for production data.
	- Test restores periodically to ensure backup integrity.

	---

	## Common Troubleshooting

	- gen_random_uuid() error: ensure `pgcrypto` extension installed.
	- Sequence mismatch after import: run `SELECT setval('orders_id_seq', (SELECT COALESCE(MAX(id),0) FROM public.orders));`
	- Missing storage bucket: create it manually and re-run storage policy SQL.
	- RLS blocking requests: test queries in the SQL editor logged in as the same role (public vs authenticated) and temporarily disable RLS to confirm if policy is the blocker.

	---

	## Developer Quick Start

	1. Clone repo and install:

	```powershell
	git clone https://github.com/NCSU-Solarpack/SolarPack-Web.git; cd "SolarPack-Web"; npm install
	```

	2. Create a Supabase project and run sql templates (see Setup section). Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`.

	3. Start dev server:

	```powershell
	npm run dev
	```

	4. Admin area: visit `/admin` and authenticate with your Supabase user.

	---

	## Where to go from here

	- Harden RLS policies for production; consider a `profiles` table for admin role claims.
	- Add CI/CD migration steps using the Supabase CLI for repeatable deployments.
	- Move sensitive server-side logic (e.g., exporting bulk orders, scheduled backups) behind a secure server that uses the service role key.

	If you'd like, I can also:
	- Add a `supabase/README.md` that contains step-by-step CLI commands for running these SQL files and seeding data.
	- Generate a `supabase/seed.sql` with sample rows for all small tables.

	---

	Copyright: NC State SolarPack
