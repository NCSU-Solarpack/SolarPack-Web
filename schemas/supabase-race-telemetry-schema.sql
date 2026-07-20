-- ============================================================================
-- SolarPack Race Pit Telemetry schema
-- ----------------------------------------------------------------------------
-- Backbone for the live pit-telemetry section of the website.
--
--   race_tracks     – reusable track definitions (start/finish line + lap rules)
--   race_sessions   – a practice/qualifying/race session the car reports into
--   live_telemetry  – ONE latest snapshot per session (realtime UPDATE target)
--   race_telemetry  – append-only downsampled history (charts / session review)
--   race_laps       – auto/manual detected laps with timing + energy stats
--
-- Access model: PUBLIC read (fans/sponsors can watch), gated writes.
--   * Live/history/lap rows are written by the relay server using the Supabase
--     SERVICE ROLE key, which bypasses RLS entirely.
--   * Track + session config is written from the website by logged-in pit crew
--     (user_roles.level in ('leader','director'), approved). See policies below.
-- ============================================================================

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Helper: is the current auth user approved pit crew (leader/director)?
-- ----------------------------------------------------------------------------
create or replace function public.is_pit_crew()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid()
      and ur.approval_status = 'approved'
      and ur.level in ('leader', 'director')
  );
$$;

-- ----------------------------------------------------------------------------
-- race_tracks
-- ----------------------------------------------------------------------------
create table if not exists public.race_tracks (
  id            uuid not null default gen_random_uuid(),
  name          text not null default 'Untitled Track',
  start_lat     double precision null,
  start_lon     double precision null,
  center_lat    double precision null,
  center_lon    double precision null,
  lap_radius_m  double precision not null default 15,   -- start/finish geofence radius
  min_lap_time_s double precision not null default 20,  -- debounce between laps
  created_by    uuid null references auth.users (id) on delete set null,
  created_at    timestamp with time zone not null default now(),
  updated_at    timestamp with time zone not null default now(),
  constraint race_tracks_pkey primary key (id)
) tablespace pg_default;

-- ----------------------------------------------------------------------------
-- race_sessions
-- ----------------------------------------------------------------------------
create table if not exists public.race_sessions (
  id          uuid not null default gen_random_uuid(),
  name        text not null default 'Session',
  track_id    uuid null references public.race_tracks (id) on delete set null,
  status      text not null default 'idle'
              check (status in ('idle', 'running', 'paused', 'stopped')),
  is_active   boolean not null default false,  -- the session the car reports into
  started_at  timestamp with time zone null,
  ended_at    timestamp with time zone null,
  notes       text null,
  created_by  uuid null references auth.users (id) on delete set null,
  created_at  timestamp with time zone not null default now(),
  updated_at  timestamp with time zone not null default now(),
  constraint race_sessions_pkey primary key (id)
) tablespace pg_default;

-- At most one active session at a time.
create unique index if not exists race_sessions_single_active
  on public.race_sessions (is_active)
  where is_active = true;

create index if not exists race_sessions_created_at_idx
  on public.race_sessions (created_at desc);

-- ----------------------------------------------------------------------------
-- live_telemetry  (one row per session, upserted by the relay every tick)
-- ----------------------------------------------------------------------------
create table if not exists public.live_telemetry (
  session_id      uuid not null references public.race_sessions (id) on delete cascade,
  updated_at      timestamp with time zone not null default now(),
  captured_at     bigint null,          -- ms epoch from the car packet
  -- hot columns (indexed / directly bound in the UI)
  lat             double precision null,
  lon             double precision null,
  heading         double precision null,
  gps_speed_mps   double precision null,
  accuracy_m      double precision null,
  speed_mph       double precision null,
  pack_soc        double precision null,
  battery_voltage double precision null,
  battery_watts   double precision null,
  current_draw    double precision null,
  solar_watts     double precision null,
  motor_temp_f    double precision null,
  inverter_temp_f double precision null,
  rpm             double precision null,
  fault           boolean not null default false,
  payload         jsonb null,           -- full ~70 field packet
  constraint live_telemetry_pkey primary key (session_id)
) tablespace pg_default;

-- ----------------------------------------------------------------------------
-- race_telemetry  (append-only history, ~1 Hz downsample)
-- ----------------------------------------------------------------------------
create table if not exists public.race_telemetry (
  id              bigserial not null,
  session_id      uuid null references public.race_sessions (id) on delete cascade,
  ts              timestamp with time zone not null default now(),
  captured_at     bigint null,
  lat             double precision null,
  lon             double precision null,
  speed_mph       double precision null,
  pack_soc        double precision null,
  battery_voltage double precision null,
  battery_watts   double precision null,
  current_draw    double precision null,
  solar_watts     double precision null,
  motor_temp_f    double precision null,
  inverter_temp_f double precision null,
  rpm             double precision null,
  payload         jsonb null,
  constraint race_telemetry_pkey primary key (id)
) tablespace pg_default;

create index if not exists race_telemetry_session_ts_idx
  on public.race_telemetry (session_id, ts desc);

-- ----------------------------------------------------------------------------
-- race_laps
-- ----------------------------------------------------------------------------
create table if not exists public.race_laps (
  id            bigserial not null,
  session_id    uuid not null references public.race_sessions (id) on delete cascade,
  lap_number    integer not null,
  lap_time_s    double precision null,
  distance_m    double precision null,
  avg_speed_mps double precision null,
  top_speed_mps double precision null,
  energy_wh     double precision null,   -- battery energy consumed this lap
  solar_wh      double precision null,   -- solar energy harvested this lap
  started_at    timestamp with time zone null,
  ended_at      timestamp with time zone null,
  source        text not null default 'auto' check (source in ('auto', 'manual')),
  created_at    timestamp with time zone not null default now(),
  constraint race_laps_pkey primary key (id),
  constraint race_laps_session_lap_unique unique (session_id, lap_number)
) tablespace pg_default;

create index if not exists race_laps_session_idx
  on public.race_laps (session_id, lap_number);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.race_tracks    enable row level security;
alter table public.race_sessions  enable row level security;
alter table public.live_telemetry enable row level security;
alter table public.race_telemetry enable row level security;
alter table public.race_laps      enable row level security;

-- Public (anon + authenticated) can READ everything.
create policy "race_tracks_read"    on public.race_tracks    for select using (true);
create policy "race_sessions_read"  on public.race_sessions  for select using (true);
create policy "live_telemetry_read" on public.live_telemetry for select using (true);
create policy "race_telemetry_read" on public.race_telemetry for select using (true);
create policy "race_laps_read"      on public.race_laps      for select using (true);

-- Pit crew (leader/director, approved) can manage tracks + sessions from the site.
create policy "race_tracks_write" on public.race_tracks
  for all to authenticated
  using (public.is_pit_crew()) with check (public.is_pit_crew());

create policy "race_sessions_write" on public.race_sessions
  for all to authenticated
  using (public.is_pit_crew()) with check (public.is_pit_crew());

-- Telemetry/lap tables are written only by the relay (service role bypasses RLS).
-- No INSERT/UPDATE policies for anon/authenticated => clients cannot forge data.

-- ============================================================================
-- Realtime: broadcast live snapshots, lap completions, and session changes.
-- ============================================================================
alter publication supabase_realtime add table public.live_telemetry;
alter publication supabase_realtime add table public.race_laps;
alter publication supabase_realtime add table public.race_sessions;
