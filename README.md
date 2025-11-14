# SolarPack-Web

A modern web application for the **NC State SolarPack** team, providing public information, team management, blog publishing, sponsor recognition, and more.

- **Frontend:** React + Vite  
- **Backend:** Supabase (Postgres, Auth, Storage)  
- **Live Site:** **[solarpacknc.com](https://solarpacknc.com)**  
- **Supabase Dashboard:** **[Supabase Project](https://supabase.com/dashboard/project/dlbqvrsmvgjrynytmlsk)**

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
  - [Pages](#pages)
  - [Shared Components](#shared-components)
  - [Admin Components](#admin-components)
- [Supabase Backend & Data Schema](#supabase-backend--data-schema)
  - [Overview](#overview)
  - [SQL Schema Files](#sql-schema-files)
  - [Storage Buckets](#storage-buckets)
  - [Row-Level Security (RLS)](#row-level-security-rls)
  - [Authentication](#authentication)
  - [DB Tables → Frontend Mapping](#db-tables--frontend-mapping)
  - [Migration & Seeding](#migration--seeding)
- [Deployment](#deployment)
- [Contribution Guidelines](#contribution-guidelines)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Project Overview

**SolarPack-Web** is the official website and lightweight management portal for the NC State SolarPack solar vehicle team. It provides:

- **Public-facing content**
  - Team introduction and mission
  - Project progress and schedules
  - Blog posts and news
  - Sponsors and donation information

- **Admin tools**
  - Management of team members, alumni, schedules, sponsors, blog posts, and purchase orders
  - Real-time updates via Supabase
  - Basic authentication and session management

- **Backend integration**
  - All dynamic data stored in Supabase Postgres
  - Optional Supabase Auth for secure, role-based admin access
  - Supabase Storage for images and file uploads

**Live Site:** **[solarpacknc.com](https://solarpacknc.com)**

---

## Tech Stack

**Frontend**

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- React Router
- CSS modules / custom styling

**Backend / Data**

- [Supabase](https://supabase.com/)
  - Postgres database
  - Supabase Auth (recommended for production)
  - Supabase Storage (images, receipts, etc.)
  - Row-Level Security (RLS) policies

**Tooling**

- Node.js + npm
- GitHub for version control
- Static hosting (e.g., Netlify, Vercel, CloudFront, etc.)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v16+** (v18+ recommended)
- [npm](https://www.npmjs.com/) (bundled with Node)
- A Supabase project (optional but recommended for full functionality)

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/NCSU-Solarpack/SolarPack-Web.git
   cd SolarPack-Web
Install dependencies

sh
Copy code
npm install
Configure environment variables

Create a .env file in the project root:

env
Copy code
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
If you just want to test the UI, you can mock or disable Supabase calls, but most pages expect live data.

(Optional) Local JSON fallback

If you want to run without Supabase, you can preload some JSON into public/data/ and wire the frontend to read from those files instead of Supabase (not the default behavior).

Running the App
Start the development server:

sh
Copy code
npm run dev
By default Vite will serve the app at:

http://localhost:5173

For a production build and local preview:

sh
Copy code
npm run build
npm run preview
This builds the app to dist/ and serves it locally for testing.

Environment Variables
The app expects the following environment variables (at minimum):

env
Copy code
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
Never expose the Supabase SERVICE_ROLE_KEY in the frontend. That key is for trusted backend services only.

Project Structure
High-level structure (simplified):

text
Copy code
SolarPack-Web/
  src/
    components/
      admin/
        AlumniManager.jsx
        BlogManager.jsx
        OrderManager.jsx
        ScheduleManager.jsx
        SponsorsManager.jsx
        TeamManager.jsx
      Admin.jsx
      AdminDashboard.jsx
      Alert.jsx
      Header.jsx
      InlineNotesEditor.jsx
      Layout.jsx
      Login.jsx
      ProgressTracker.jsx
      StatusDropdown.jsx
      SyncStatusBadge.jsx
      SyncStatusIndicator.jsx
    pages/
      Home.jsx
      Alumni.jsx
      App.jsx
      Blogs.jsx
      Contact.jsx
      Donate.jsx
      NotFound.jsx
      PrivacyPolicy.jsx
      Sponsors.jsx
      Team.jsx
    utils/
      supabase.js
      auth.js      # legacy client-side auth (see Auth section)
  public/
    index.html
    data/         # optional JSON seeding
Pages
Home (src/pages/Home.jsx)
The main landing page for SolarPack. It includes:

Team introduction and mission

Progress tracker for projects (Supabase-backed)

Upcoming projects (auto-fetched & sorted)

Clear call-to-action for donations

<img width="2525" height="1333" alt="Screenshot 2025-11-13 190304" src="https://github.com/user-attachments/assets/b6fb781d-0a7e-4a73-8b08-460bf18d015f" />
Alumni (src/pages/Alumni.jsx)
Two-column layout of alumni grouped by semester

Data loaded from Supabase

Newest alumni appear in the top-left

Handles loading and error states gracefully

App (src/pages/App.jsx)
Describes the SolarPack iPad app that interfaces with the car, including:

Screens for Home, BMS, Motor Controller, Charging, Low Voltage, etc.

Feature lists for each screen

Screenshot gallery / inline images to document the UI

Blogs (src/pages/Blogs.jsx)
Lists published blog posts from the blogs table

Clicking a blog opens it in a modal for full reading

Handles loading states, empty states, and errors

Contact (src/pages/Contact.jsx)
Centralized team contact information

Email and social media links

A11y-friendly layout and clear formatting

Donate (src/pages/Donate.jsx)
Donation page with preset amounts and custom amount input

Integrates with PayPal (or other providers)

Validates input and toggles PayPal button visibility appropriately

NotFound (src/pages/NotFound.jsx)
Custom 404 page

Friendly copy and clear navigation back to Home or Contact

Styled to match the rest of the brand

PrivacyPolicy (src/pages/PrivacyPolicy.jsx)
Accordion-style privacy policy

Effective date and clearly separated sections

Scrollable, readable on mobile, and uses plain language where possible

Sponsors (src/pages/Sponsors.jsx)
Displays sponsor tiers (e.g., Platinum, Gold, Silver, etc.)

Sponsors grouped and styled by tier

Data loaded from Supabase sponsors table

Handles loading and error states

Team (src/pages/Team.jsx)
Lists current team members

Members sorted by order field

Clicking a member opens a modal with full bio and details

Data loaded from Supabase team_members table

Handles loading and error states

Shared Components
Admin (src/components/Admin.jsx)
High-level wrapper for the admin area

Handles authentication and routing for the admin dashboard

Shows login form or dashboard based on auth state

AdminDashboard (src/components/AdminDashboard.jsx)
Main admin interface

Tabbed layout for:

Team

Schedule

Alumni

Sponsors

Orders

Blogs

Tab state synced to URL so links can target specific tools

Handles session extension and logout

<img width="2514" height="1326" alt="Screenshot 2025-11-13 190443" src="https://github.com/user-attachments/assets/eca7c499-557a-49f7-8a04-57482135ce56" />
Alert (src/components/Alert.jsx)
Custom modal dialog used across the app for:

Info messages

Confirmation prompts

Error messages

Supports multiple variants (info, warning, error, success)

Header (src/components/Header.jsx)
Responsive navigation bar

Displays main nav links (Home, Team, Sponsors, Blogs, Donate, etc.)

Integrates with auth to show login/logout/admin link

Uses authService/Supabase to reflect current auth state

InlineNotesEditor (src/components/InlineNotesEditor.jsx)
Inline textarea-style editor

Auto-save on blur or explicit confirm button

Used for admin notes on projects, tasks, and orders

Accepts async onSave callback

Layout (src/components/Layout.jsx)
Main shell that wraps all pages

Includes header, content container, and footer

Central place for global styles / layout changes

Login (src/components/Login.jsx)
Admin login form

Handles password validation and error display

Currently wired to client-side authService (see Authentication for production recommendations)

ProgressTracker (src/components/ProgressTracker.jsx)
Visual indicator of project completion

Used on the Home page to display overall progress

Configurable label / percentage

StatusDropdown (src/components/StatusDropdown.jsx)
Dropdown component to select status values (e.g., project/task/order status)

Used heavily in schedule and order management UIs

Supports custom coloring, disabled state, and tooltips

SyncStatusBadge (src/components/SyncStatusBadge.jsx)
Tiny badge summarizing Supabase sync status:

Synced

Saving

New data available

Error

Used for lightweight status feedback in admin views

SyncStatusIndicator (src/components/SyncStatusIndicator.jsx)
More detailed sync widget for data-heavy views

Shows last sync time, changes detected, saving state, and errors

Often coupled with polling hooks and hashing of response data

Admin Components
All admin components live under src/components/admin/. They are tightly coupled to specific Supabase tables and views.

AlumniManager (src/components/admin/AlumniManager.jsx)
CRUD UI for alumni records grouped by semester

Supports:

Creating semesters

Adding/editing/deleting alumni entries and leadership roles

Reordering items

Real-time sync with Supabase plus visual sync status indicators

BlogManager (src/components/admin/BlogManager.jsx)
Full blog management interface:

Create and edit posts

Draft vs published states

Delete posts

Handles image uploads to blog-images bucket

Sync status and error handling integrated into UI

OrderManager (src/components/admin/OrderManager.jsx)
Comprehensive interface for tracking team orders:

Submission and approval workflow

Sponsorship vs team-funded fields

Tracking numbers, received dates, receipts

Filtering, searching, and exporting

Uses orders table and (optionally) order-receipts storage bucket

Designed for use by team leads and treasurer roles

ScheduleManager (src/components/admin/ScheduleManager.jsx)
Multi-level schedule management:

Teams

Projects

Tasks

Supports color coding, priorities, statuses, and inline notes

Integrates with Supabase views (e.g., schedule_projects_summary) for summaries

Real-time updates to keep everyone in sync

SponsorsManager (src/components/admin/SponsorsManager.jsx)
UI for managing sponsor data:

Tier names and descriptions

Sponsor records (name, logo, link, tier, order)

Logo uploads to storage

Admins can reorder sponsors and tiers to control page layout

TeamManager (src/components/admin/TeamManager.jsx)
Manages team roster:

Name, role, subteam, order, bio, image

Add, edit, delete members

Reorder members for page display

Images stored in a dedicated storage bucket (e.g. team-images)

Supabase Backend & Data Schema
Overview
Supabase is used as the single source of truth for SolarPack-Web:

Postgres for relational data (team, alumni, blogs, sponsors, orders, schedules)

Storage buckets for images and files

Optional Supabase Auth for secure admin access

Row-Level Security (RLS) to control who can read/write what

The repo includes SQL templates prefixed with supabase-*.sql that define all required tables and some example policies.

SQL Schema Files
Located at the repository root (or in a supabase/ folder, depending on your setup):

supabase-team-schema.sql

Defines team_members table:

Name, role, subteam, bio, image URL, order, created/updated timestamps

Used by Team.jsx + TeamManager.jsx

supabase-sponsors-schema.sql

Defines sponsors table:

Name, tier, logo URL, external URL, order, created/updated timestamps

Used by Sponsors.jsx + SponsorsManager.jsx

supabase-blogs-schema.sql

Defines blogs table:

UUID primary key via gen_random_uuid()

Title, slug, content, published flag, published_at

created_at / updated_at timestamps

Requires pgcrypto extension for gen_random_uuid()

Includes instructions for a blog-images storage bucket

supabase-schedule-schema.sql

Defines:

schedule_teams

schedule_projects

schedule_tasks

Adds useful views:

schedule_projects_summary

schedule_overdue_projects

schedule_overdue_tasks

Includes example seeded rows for schedule_teams

supabase-orders-schema.sql

Defines orders table with a detailed procurement workflow:

Funding source, description, vendor, cost, approval status

Shipping info, tracking, received date, receipt metadata

created_at / updated_at timestamps

Uses bigserial primary key and a linked sequence

Intended for use with OrderManager.jsx and private storage buckets

Storage Buckets
Recommended buckets (names can be changed if you also update code):

blog-images — public bucket for blog images

team-images — public or authenticated bucket for team member headshots

order-receipts — private bucket for purchase receipts (access via signed URLs)

Example SQL for public blog-images bucket:

sql
Copy code
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read blog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');
For private files (like receipts), make the bucket private and serve files via signed URLs instead of public URLs.

Row-Level Security (RLS)
RLS is critical for keeping data safe:

Each table should have RLS enabled.

Policies must be explicitly written to allow:

Public read access (where appropriate, e.g. published blogs)

Authenticated write access for admin users only

Avoid broad GRANT ALL TO authenticated in production.

Example RLS pattern using profiles table for admin roles:

sql
Copy code
-- Example profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY,
  email text,
  full_name text,
  is_admin boolean DEFAULT false,
  role text DEFAULT 'member',
  created_at timestamptz DEFAULT now()
);

-- Policy: only admins can modify blogs
CREATE POLICY "Admins can modify blogs"
ON blogs
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
      AND p.is_admin = true
  )
);
Authentication
There are two approaches present in the codebase:

1. Legacy Client-Side Auth (src/utils/auth.js)
Simple client-only auth:

Hard-coded password hashes in the frontend

Session stored in localStorage with 24-hour expiry

Methods:

authenticate(password)

logout()

isAuthenticated()

extendSession()

Not secure for production, as everything is visible in the browser.

2. Recommended: Supabase Auth
Uses Supabase’s built-in auth:

Email/password, SSO, etc.

Suggested migration path:

Enable Supabase Auth in project settings.

Create profiles table keyed by auth.uid().

Mark admin users with is_admin = true.

Update RLS policies to check profiles.is_admin.

Update frontend to use supabase.auth.signInWithPassword, supabase.auth.getUser, and onAuthStateChange instead of authService.

Remove or disable the legacy client-side auth once migration is complete.

Example client pattern after migration (pseudo-code):

js
Copy code
import { supabaseService } from './utils/supabase';

supabaseService.client.auth.onAuthStateChange(async (event, session) => {
  if (session?.user) {
    const { data: profile } = await supabaseService.client
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    // Store profile in app state, gate admin UI based on profile.is_admin / role
  } else {
    // Clear auth state
  }
});
DB Tables → Frontend Mapping
team_members

Frontend:

src/pages/Team.jsx

src/components/admin/TeamManager.jsx

Fields:

name, role, subteam, bio, image_url, order, timestamps

sponsors

Frontend:

src/pages/Sponsors.jsx

src/components/admin/SponsorsManager.jsx

Fields:

name, tier, logo_url, website_url, order, timestamps

blogs

Frontend:

src/pages/Blogs.jsx

src/components/admin/BlogManager.jsx

Fields:

id (UUID), title, slug, content, published, published_at, timestamps

Storage:

Images in blog-images bucket

orders

Frontend:

src/components/admin/OrderManager.jsx

Fields:

Request details, approvals, sponsorship flags, cost, tracking, receipt_uploaded, timestamps

Storage:

Receipts in private order-receipts bucket via signed URLs

schedule_teams, schedule_projects, schedule_tasks

Frontend:

src/components/admin/ScheduleManager.jsx

Any schedule/roadmap views

Views:

schedule_projects_summary

schedule_overdue_projects

schedule_overdue_tasks

<img width="2484" height="898" alt="Screenshot 2025-11-13 191128" src="https://github.com/user-attachments/assets/3e6a6b69-0068-48a1-97bb-ee7a4ba0d952" />
Migration & Seeding
Recommended Supabase setup:

Create a Supabase project at app.supabase.com.

Enable required extensions (in SQL Editor):

sql
Copy code
CREATE EXTENSION IF NOT EXISTS pgcrypto;
Run SQL files in this order:

supabase-team-schema.sql

supabase-sponsors-schema.sql

supabase-blogs-schema.sql

supabase-schedule-schema.sql

supabase-orders-schema.sql

Create storage buckets:

blog-images (public)

team-images (public or authenticated)

order-receipts (private)

Configure RLS policies (start from the templates, then harden for production).

Connect frontend with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.

Seeding

supabase-schedule-schema.sql already includes sample schedule_teams rows.

You can add additional seed SQL files and keep them in a supabase/seeds/ directory.

Deployment
Static Hosting (Recommended)
Build the app

sh
Copy code
npm run build
Deploy the contents of dist/ to your hosting provider:

Netlify

Vercel

GitHub Pages

CloudFront / S3

Any static file server

Enable SPA fallback:

Configure your host to serve index.html for unknown routes (needed for React Router).

Environment Variables in Production
Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your hosting provider’s environment settings.

Do not expose the Supabase service role key in the frontend environment.

Custom Domain
Point your domain (e.g., solarpacknc.com) to your hosting provider.

If needed, add/update a CNAME file or DNS records according to provider docs.

Contribution Guidelines
Contributions from team members and collaborators are welcome.

Fork the repo and create a feature branch:

sh
Copy code
git checkout -b feature/my-change
Make your changes, keeping the following in mind:

Match existing code style and formatting

Avoid committing secrets or environment variables

Keep UI consistent with existing components

Run the app and ensure it builds and functions:

sh
Copy code
npm run dev
npm run build
Write clear commit messages and a descriptive PR:

What you changed

Why you changed it

Any migration / setup steps required

Open a Pull Request to the main repo.

For large changes, open an issue first to discuss the design.

Troubleshooting
Common issues and quick checks:

gen_random_uuid() not found

Ensure pgcrypto extension is enabled:

sql
Copy code
CREATE EXTENSION IF NOT EXISTS pgcrypto;
Sequence / ID errors on orders table

If sequence is out of sync:

sql
Copy code
SELECT setval('orders_id_seq', (SELECT COALESCE(MAX(id), 0) FROM public.orders));
Missing images or 404s for uploaded files

Verify that the storage bucket exists and that the path/filename matches what’s in the DB.

Check storage policies for public vs private access.

RLS blocking valid operations

Temporarily disable RLS on a table to verify:

sql
Copy code
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
If the query works with RLS disabled, fix the policies rather than leaving RLS off.

Auth not working as expected

If using legacy authService, remember it’s client-only and not secure.

Recommended: migrate to Supabase Auth and profiles-based policies.

License
Unless otherwise specified in a separate LICENSE file, this project is intended for use by the NC State SolarPack team and collaborators.

© NC State SolarPack
