import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Flag, MapPin, Crosshair, Play, Pause, Square, Plus } from 'lucide-react';
import { supabaseService } from '../../utils/supabase';
import { Card } from './widgets';

export default function PitControls({
  canControl,
  session,
  track,
  carPos,
  settingMarker,
  setSettingMarker,
  workingTrackId,
  setWorkingTrackId,
}) {
  const [tracks, setTracks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [newSessionName, setNewSessionName] = useState('');
  const [radius, setRadius] = useState(track?.lap_radius_m ?? 15);
  const [minLap, setMinLap] = useState(track?.min_lap_time_s ?? 20);

  const refreshLists = useCallback(async () => {
    try {
      const [t, s] = await Promise.all([supabaseService.getTracks(), supabaseService.getSessions(30)]);
      setTracks(t);
      setSessions(s);
    } catch { /* public read may still work; ignore */ }
  }, []);

  useEffect(() => { if (canControl) refreshLists(); }, [canControl, refreshLists]);
  useEffect(() => { setRadius(track?.lap_radius_m ?? 15); setMinLap(track?.min_lap_time_s ?? 20); }, [track?.id, track?.lap_radius_m, track?.min_lap_time_s]);

  const workingTrack = tracks.find((t) => t.id === workingTrackId) || track || null;

  const run = useCallback(async (label, fn) => {
    setBusy(true); setMsg(null);
    try { await fn(); setMsg({ ok: true, text: `${label} ✓` }); await refreshLists(); }
    catch (e) { setMsg({ ok: false, text: e?.message || `${label} failed` }); }
    finally { setBusy(false); setTimeout(() => setMsg(null), 3500); }
  }, [refreshLists]);

  if (!canControl) {
    return (
      <Card title="Pit Controls" icon={Lock}>
        <div className="tlm-lock">
          <Lock size={16} />
          <span>Pit crew sign-in required to run sessions and set track markers.</span>
        </div>
        <div style={{ marginTop: '0.8rem' }}>
          <Link to="/login" className="tlm-btn primary sm">Pit Crew Login</Link>
        </div>
      </Card>
    );
  }

  const status = session?.status || 'idle';
  const startDisabled = busy || !workingTrack?.start_lat;

  const createTrack = () => run('Track created', async () => {
    const name = prompt('Track name?', 'New Track') || 'New Track';
    const t = await supabaseService.saveTrack({ name, lap_radius_m: 15, min_lap_time_s: 20 });
    setWorkingTrackId(t.id);
  });

  const saveStartFromCar = () => run('Start/finish set from car', async () => {
    if (!carPos) throw new Error('No live car position');
    let id = workingTrackId;
    if (!id) { const t = await supabaseService.saveTrack({ name: 'Track', lap_radius_m: radius, min_lap_time_s: minLap }); id = t.id; setWorkingTrackId(id); }
    await supabaseService.saveTrack({ id, start_lat: carPos.lat, start_lon: carPos.lon, center_lat: carPos.lat, center_lon: carPos.lon });
  });

  const saveTuning = () => run('Lap rules saved', async () => {
    if (!workingTrackId) throw new Error('Select a track first');
    await supabaseService.saveTrack({ id: workingTrackId, lap_radius_m: Number(radius), min_lap_time_s: Number(minLap) });
  });

  const createSession = () => run('Session created', async () => {
    const s = await supabaseService.createSession({ name: newSessionName || `Session ${new Date().toLocaleDateString()}`, track_id: workingTrackId || null });
    setNewSessionName('');
    await supabaseService.updateSession(s.id, {}); // touch
  });

  const startSession = (id) => run('Session started', async () => {
    if (workingTrackId) await supabaseService.updateSession(id, { track_id: workingTrackId });
    await supabaseService.startSession(id);
  });

  return (
    <Card title="Pit Controls" icon={Flag}>
      <div className="tlm-controls">
        {/* Track */}
        <div className="field">
          <label>Track</label>
          <div className="tlm-row" style={{ gap: '0.5rem' }}>
            <select className="tlm-select" value={workingTrackId || ''} onChange={(e) => setWorkingTrackId(e.target.value || null)}>
              <option value="">Select track…</option>
              {tracks.map((t) => (
                <option key={t.id} value={t.id}>{t.name}{t.start_lat ? ' 🏁' : ''}</option>
              ))}
            </select>
            <button className="tlm-btn sm" onClick={createTrack} disabled={busy}><Plus size={14} /> New</button>
          </div>
        </div>

        {/* Start/finish line */}
        <div className="field">
          <label>Start / Finish Line</label>
          <div className="tlm-btns">
            <button className="tlm-btn sm" onClick={saveStartFromCar} disabled={busy || !carPos}>
              <Crosshair size={14} /> Use car position
            </button>
            <button className={`tlm-btn sm ${settingMarker ? 'primary' : ''}`} onClick={() => setSettingMarker((v) => !v)} disabled={busy}>
              <MapPin size={14} /> {settingMarker ? 'Click map…' : 'Pick on map'}
            </button>
          </div>
          <span className="sub" style={{ fontSize: '0.78rem', color: 'var(--tlm-sub)' }}>
            {workingTrack?.start_lat
              ? `Set: ${workingTrack.start_lat.toFixed(5)}, ${workingTrack.start_lon.toFixed(5)}`
              : 'Not set — laps auto-trigger when the car re-crosses this point.'}
          </span>
        </div>

        {/* Lap rules */}
        <div className="tlm-row">
          <div className="field" style={{ flex: 1 }}>
            <label>Lap radius (m)</label>
            <input className="tlm-input" type="number" min="3" max="200" value={radius} onChange={(e) => setRadius(e.target.value)} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Min lap (s)</label>
            <input className="tlm-input" type="number" min="1" max="600" value={minLap} onChange={(e) => setMinLap(e.target.value)} />
          </div>
        </div>
        <button className="tlm-btn sm ghost" onClick={saveTuning} disabled={busy || !workingTrackId}>Save lap rules</button>

        <hr style={{ border: 0, borderTop: '1px solid var(--tlm-line)', margin: '0.2rem 0' }} />

        {/* Session */}
        <div className="field">
          <label>Session</label>
          <div className="tlm-row" style={{ gap: '0.5rem' }}>
            <input className="tlm-input" placeholder="New session name…" value={newSessionName} onChange={(e) => setNewSessionName(e.target.value)} />
            <button className="tlm-btn sm" onClick={createSession} disabled={busy}><Plus size={14} /> New</button>
          </div>
        </div>

        {session ? (
          <div className="tlm-btns">
            {status === 'running' && (
              <button className="tlm-btn warn" onClick={() => run('Paused', () => supabaseService.pauseSession(session.id))} disabled={busy}><Pause size={16} /> Pause</button>
            )}
            {status === 'paused' && (
              <button className="tlm-btn good" onClick={() => run('Resumed', () => supabaseService.resumeSession(session.id))} disabled={busy}><Play size={16} /> Resume</button>
            )}
            <button className="tlm-btn primary" onClick={() => run('Stopped', () => supabaseService.stopSession(session.id))} disabled={busy}><Square size={16} /> Stop &amp; end</button>
          </div>
        ) : (
          <div className="field">
            <label>Start an existing session</label>
            <div className="tlm-row" style={{ gap: '0.5rem' }}>
              <select className="tlm-select" id="tlm-start-pick" defaultValue="">
                <option value="" disabled>Choose session…</option>
                {sessions.filter((s) => s.status !== 'running').map((s) => (
                  <option key={s.id} value={s.id}>{s.name} · {new Date(s.created_at).toLocaleDateString()}</option>
                ))}
              </select>
              <button
                className="tlm-btn good"
                disabled={startDisabled}
                onClick={() => {
                  const el = document.getElementById('tlm-start-pick');
                  if (el?.value) startSession(el.value);
                }}
              ><Play size={16} /> Start</button>
            </div>
            {!workingTrack?.start_lat && <span className="sub" style={{ color: 'var(--tlm-warn)', fontSize: '0.78rem' }}>Set a start/finish line to enable auto lap timing.</span>}
          </div>
        )}

        {msg && (
          <div style={{ fontSize: '0.82rem', color: msg.ok ? 'var(--tlm-good)' : 'var(--tlm-bad)' }}>{msg.text}</div>
        )}
      </div>
    </Card>
  );
}
