# Race Pit Telemetry

A live, public-facing pit dashboard at **`/telemetry`** for watching the SolarPack
car during a race: live map + location tracking, speed/power/battery gauges,
automatic lap timing, and full session history with charts and replay.

Fans and sponsors can watch live; **pit crew (leader/director)** can start/stop
sessions and set the track's start/finish line from the pit.

## Architecture

```
 Car ── BLE ──▶  iPad/iPhone app (SolarPack-App)
                     │  POST /packet every 0.5s  (now includes GPS `location`)
                     ▼
             Relay server (Render, Express)  ──── writes with SERVICE ROLE key ───▶  Supabase
                     │  GET /packet (live, lowest latency)                          ├─ live_telemetry  (realtime UPDATE)
                     │                                                              ├─ race_telemetry  (history ~1 Hz)
                     ▼                                                              └─ race_laps       (auto-detected)
             Website /telemetry  ◀── realtime laps/sessions + history reads ────────┘
                     ▲  polls relay GET /packet (1 Hz) for live gauges + map
                     └─ pit crew writes race_tracks / race_sessions (RLS: is_pit_crew)
```

- **Live gauges + map**: the browser polls the relay `GET /packet` (works even
  with no session, including the built-in simulator).
- **Laps + session state**: Supabase realtime. The relay runs authoritative
  server-side lap detection (same geofence algorithm as the app's Navigation
  page) using the pit-set start/finish line.
- **History / replay**: read from `race_telemetry` + `race_laps`.

## One-time setup

### 1. Supabase schema
Run `schemas/supabase-race-telemetry-schema.sql` in the Supabase SQL editor.
It creates `race_tracks`, `race_sessions`, `live_telemetry`, `race_telemetry`,
`race_laps`, the `is_pit_crew()` helper, RLS policies (public read / pit-crew
write), and adds the live tables to the `supabase_realtime` publication.

### 2. Website env (`.env`)
```
VITE_SUPABASE_URL=...            # already set
VITE_SUPABASE_ANON_KEY=...       # already set
VITE_TELEMETRY_RELAY_URL=https://solarpack-app-server-alyv.onrender.com   # optional; this is the default
```

### 3. Relay server (Render)
The relay (`SolarPack-App/app-firmware/server`) now bridges packets into Supabase.
- `cd server && npm install` (pulls in `@supabase/supabase-js`).
- Set environment variables on Render:
  ```
  SUPABASE_URL=...
  SUPABASE_SERVICE_ROLE_KEY=...   # service role, NOT the anon key — server-side only
  ```
- Without these the relay runs in **relay-only** mode (no DB writes) exactly as before.

### 4. App
No config needed — the app now streams device GPS into the telemetry packet
automatically while connected (Bluetooth mode). It asks for location permission
on first connect.

## Using it in the pit

1. Sign in as pit crew (`/login`, leader or director role).
2. Open `/telemetry` → **Live** tab.
3. Under **Pit Controls**:
   - Create/select a **Track**.
   - Set the **Start/Finish line** — either **Use car position** (drops it at the
     car's current GPS) or **Pick on map** (click the map).
   - Adjust **lap radius** (geofence, default 15 m) and **min lap time** (default 20 s).
   - Create a **Session** and press **Start**.
4. Laps auto-record each time the car re-crosses the start/finish line and appear
   live in the lap board (with time, distance, avg speed, energy). Press **Stop** to
   end the session — it's then available under the **History** tab for review, charts,
   route replay, and CSV export.

### Demo without a car
`POST /simulation/start` on the relay drives a simulated car around a 150 m loop
(centered near Charlotte, NC) with GPS — set a start/finish line near that loop
and start a running session to see auto laps.

## Notes
- The old standalone dashboard served at the relay root (`server/public/index.html`)
  is superseded by this section. It can be retired or left as a lightweight fallback.

## Permissions

| Who | Can |
|---|---|
| Anyone (no sign-in) | View `/telemetry` — live map, gauges, laps, history |
| Leader / Director | All of the above, plus **Pit Controls**: create tracks, set the start/finish line, create and run sessions |

Gated by the `control_telemetry` permission ([auth.js](../src/utils/auth.js#L14-L18)), checked in
the UI by [usePitAuth.js](../src/components/telemetry/usePitAuth.js) and enforced in the database
by the `is_pit_crew()` RLS policies on `race_tracks` and `race_sessions`. This is one of the few
places where the UI check and the database rule genuinely agree.

The telemetry data tables (`live_telemetry`, `race_telemetry`, `race_laps`) have **no client write
policy at all** — only the relay's `service_role` key can write them, so nobody can forge lap times
from a browser.

## Code map

| File | Role |
|---|---|
| [RacePitTelemetry.jsx](../src/pages/RacePitTelemetry.jsx) | Page shell, the four tabs, live/stale/fault banner |
| [useTelemetry.js](../src/components/telemetry/useTelemetry.js) | `useLivePacket` (1 Hz relay poll + GPS trail), `useActiveSession`, `useSessionLaps`, `useLiveSeries`, `lapStats` |
| [usePitAuth.js](../src/components/telemetry/usePitAuth.js) | Whether the current user may operate pit controls |
| [LiveView.jsx](../src/components/telemetry/LiveView.jsx) | Live tab: map, gauges, lap board, pit controls |
| [LiveMap.jsx](../src/components/telemetry/LiveMap.jsx) | Leaflet map, car marker, breadcrumb trail |
| [PitControls.jsx](../src/components/telemetry/PitControls.jsx) | Track/session management (pit crew only) |
| [LapBoard.jsx](../src/components/telemetry/LapBoard.jsx) | Live lap list and derived stats |
| [PowerView.jsx](../src/components/telemetry/PowerView.jsx) / [BatteryView.jsx](../src/components/telemetry/BatteryView.jsx) | Recharts gauges and charts |
| [HistoryView.jsx](../src/components/telemetry/HistoryView.jsx) | Past sessions, charts, route replay, CSV export |
| [format.js](../src/components/telemetry/format.js) | `RELAY_URL`, `STALE_MS`, unit conversion, fault detection |
| [widgets.jsx](../src/components/telemetry/widgets.jsx) | Shared gauge/stat components |

Data-layer methods are in [supabase.js](../src/utils/supabase.js) lines 2498–2738.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| "Waiting for car" forever | Relay unreachable, or nothing is publishing packets | Open `<RELAY_URL>/packet` directly in a browser. If that's empty, the app isn't connected or the relay is asleep — Render free tier cold-starts take ~30 s |
| Live gauges work but no laps appear | No start/finish line set, or no **running** session | Pit Controls → set the line, create a session, press Start |
| Pit Controls not visible | Needs `control_telemetry` (leader/director, approved) | Sign in with the right role |
| Laps trigger in the wrong place, or double-count | Geofence tuning | Adjust **lap radius** (default 15 m) and **min lap time** (default 20 s) |
| Laps never trigger | Radius too small for GPS accuracy | Increase the lap radius; phone GPS is typically ±5–10 m |
| History empty for a finished session | The relay writes history — without `SUPABASE_SERVICE_ROLE_KEY` it runs relay-only | Set the env var on Render and restart |
| "At most one active session" error | The partial unique index allows only one `is_active = true` row | Stop the existing session first |
| Map tiles don't load | Leaflet tiles come from an external CDN | Check the network tab; a blocked CDN breaks the map but not the gauges |

## Related docs

- [Database Reference → Race telemetry tables](database-reference.md#race-telemetry-tables)
- [Authentication](authentication.md) — the `control_telemetry` permission
- [Supabase Setup](supabase.md) — the service role key and realtime publication
- [Public Site](public-site.md) — the rest of the public routes
