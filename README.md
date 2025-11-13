# SolarPack-Web

A modern web application for the NC State SolarPack team, providing public information, team management, blog publishing, sponsor recognition, and more. Built with React and Vite, with Supabase as the backend.

---

## Table of Contents
- [Project Overview](#project-overview)
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

---

## Pages

### Home (`src/pages/Home.jsx`)
The landing page for SolarPack. Shows:
- Team introduction and mission
- Progress tracker for projects (uses Supabase data)
- Upcoming projects (auto-fetched and sorted)
- Call-to-action for donations

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
	- Real-time subscriptions can be enabled for instant updates (optional).

### Example Table: Blogs
| Column         | Type      | Description                       |
|--------------- |---------- |-----------------------------------|
| id             | UUID      | Primary key                       |
| title          | TEXT      | Blog post title                   |
| author         | TEXT      | Author name                       |
| body           | TEXT      | Blog content                      |
| image_url      | TEXT      | Header image (optional)           |
| published      | BOOLEAN   | Visibility flag                   |
| created_at     | TIMESTAMP | Creation time                     |
| updated_at     | TIMESTAMP | Last update time                  |

### Example Table: Orders
| Column                | Type      | Description                       |
|---------------------- |---------- |-----------------------------------|
| id                    | BIGSERIAL | Primary key                       |
| material_name         | TEXT      | Name of material                  |
| submitter_name        | TEXT      | Who submitted the order           |
| total_cost            | NUMERIC   | Total cost                        |
| ...                   | ...       | See schema for full details       |

### Security & Access
- **Public Data:** Some tables (e.g., published blogs, sponsors) are readable by anyone.
- **Admin Data:** Most tables require authentication for write access. Policies are enforced in Supabase.

### File Storage
- Files are uploaded to named buckets (e.g., `team-images`, `order-receipts`).
- Public URLs are generated and stored in the database for easy retrieval.

### Extending the Database
- Add new tables or columns in the Supabase dashboard or via SQL migrations.
- Update the `supabaseService` methods to support new data as needed.

### Supabase Tables

#### Blogs (`blogs`)
- `id` (UUID, PK)
- `title` (TEXT)
- `author` (TEXT)
- `body` (TEXT)
- `image_url` (TEXT)
- `link_url` (TEXT)
- `link_text` (TEXT)
- `published` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMP)

Policies:
- Public can read published blogs
- Authenticated users can read/insert/update/delete all blogs

#### Orders (`orders`)
- `id` (bigserial, PK)
- `submission_timestamp` (timestamp)
- `subteam`, `submitter_name`, `submitter_email`, `created_by` (TEXT)
- `material_name`, `specifications`, `material_link`, `supplier`, `supplier_contact` (TEXT)
- `unit_price`, `quantity`, `subtotal`, `shipping_cost`, `taxes`, `fees`, `total_cost`, `actual_cost` (NUMERIC)
- `purpose`, `priority`, `urgency` (TEXT)
- Approval, sponsorship, purchase, delivery, and receipt fields (see schema for full list)

#### Schedule Management
- **Teams** (`schedule_teams`): id, name, color, description, created_at, updated_at
- **Projects** (`schedule_projects`): id, title, description, team, priority, status, dates, hours, progress, assigned_to, notes, weekly_notes, created_by
- **Tasks** (`schedule_tasks`): id, project_id, title, description, dates, hours, status, priority, assigned_to, progress

All tables use row-level security and policies for access control.

### Data Flow
- All dynamic data is loaded from Supabase using the `supabaseService` utility.
- Admin tools use real-time sync and status indicators for collaborative editing.

### Adding/Updating Data
- Use the admin dashboard to add, edit, or delete blogs, orders, schedules, sponsors, alumni, and team members.
- All changes are synced to Supabase and reflected in the UI in real time.
