# Transition to Supabase - Migration Guide

## Overview
This document tracks the migration from GitHub Pages JSON storage to Supabase real-time database.

## What's Being Changed

### ❌ Removing (GitHub-based storage):
1. **GitHub Service** (`src/utils/github.js`) - No longer pushing data to GitHub repo
2. **GitHub API polling** - No more waiting 30-60 seconds for deployments
3. **Sync Status Polling** - Checking if GitHub Pages deployed changes
4. **GitHub Settings Component** - No need for GitHub tokens for data storage
5. **GitHub Raw/API data fetching** - Replaced with Supabase queries

### ✅ Keeping:
- All JSON data files in `public/data/` as reference/backup
- The front-end pages (Home, Team, Alumni, etc.) - just updating data source
- Admin authentication system
- Admin dashboard structure

### 🆕 Adding (Supabase):
1. **Supabase Client** - Real-time database connection
2. **Supabase Service** (`src/utils/supabase.js`) - CRUD operations  
3. **Environment Configuration** - Supabase URL and anon key
4. **Real-time subscriptions** (optional) - Live updates across tabs/users

## Benefits of Supabase

1. **Instant Updates** - No deployment wait times
2. **Real-time Capabilities** - See changes immediately
3. **Better Performance** - Database queries vs file fetching
4. **Free Tier** - 500MB database, 50,000 monthly active users
5. **Authentication Built-in** - Can replace custom auth system
6. **Row Level Security** - Fine-grained permissions

## Migration Steps

### Phase 1: Remove GitHub Integration ✅
- [x] Remove `githubService` imports from admin components  
- [x] Remove `triggerRebuild()` calls
- [x] Remove GitHub polling/sync status logic
- [x] Simplify data loading to prepare for Supabase

### Phase 2: Setup Supabase
- [ ] Create Supabase project (free tier)
- [ ] Create database tables matching JSON structure
- [ ] Set up Row Level Security policies
- [ ] Install `@supabase/supabase-js` package
- [ ] Configure environment variables

### Phase 3: Implement Supabase Integration
- [ ] Create `src/utils/supabase.js` service
- [ ] Update admin components to use Supabase
- [ ] Update front-end pages to fetch from Supabase
- [ ] Test all CRUD operations
- [ ] Migrate existing JSON data to Supabase

### Phase 4: Clean Up
- [ ] Remove unused GitHub-related files
- [ ] Update documentation
- [ ] Test authentication flow
- [ ] Deploy updated application

## Current Status
**Phase 1 in progress** - Removing GitHub integration

## Next Steps
1. Finish removing GitHub service dependencies
2. Set up Supabase project
3. Design database schema
