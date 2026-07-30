import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { History, Download, Gauge as GaugeIcon, Zap, Battery, Sun, Play } from 'lucide-react';
import LiveMap from './LiveMap';
import LapBoard from './LapBoard';
import { Card, StatTile } from './widgets';
import { supabaseService } from '../../utils/supabase';
import { num, power, wh, dist, duration, toMs, mps2mph, lapTime } from './format';

const tick = (t) => new Date(t).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

function summarize(history, laps) {
  let energyWh = 0;
  let solarWh = 0;
  let top = 0;
  let last = null;
  history.forEach((r) => {
    const ms = toMs(r.ts);
    if (last) {
      const dt = (ms - last.ms) / 1000;
      if (dt > 0 && dt < 30) {
        energyWh += (last.bw || 0) * dt / 3600;
        solarWh += (last.sw || 0) * dt / 3600;
      }
    }
    if ((r.speed_mph || 0) > top) top = r.speed_mph;
    last = { ms, bw: r.battery_watts, sw: r.solar_watts };
  });
  const distM = laps.reduce((s, l) => s + (l.distance_m || 0), 0);
  const startMs = history.length ? toMs(history[0].ts) : null;
  const endMs = history.length ? toMs(history[history.length - 1].ts) : null;
  return { energyWh, solarWh, top, distM, startMs, endMs, effWhMi: distM > 0 ? energyWh / (distM * 0.000621371) : null };
}

export default function HistoryView({ track }) {
  const [sessions, setSessions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([]);
  const [laps, setLaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrub, setScrub] = useState(0);

  useEffect(() => {
    supabaseService.getSessions(50).then((s) => {
      setSessions(s);
      if (s.length && !selectedId) setSelectedId(s[0].id);
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    setLoading(true);
    Promise.all([supabaseService.getHistory(selectedId), supabaseService.getLaps(selectedId)])
      .then(([h, l]) => { setHistory(h); setLaps(l); setScrub(Math.max(0, h.length - 1)); })
      .catch(() => { setHistory([]); setLaps([]); })
      .finally(() => setLoading(false));
  }, [selectedId]);

  const selected = sessions.find((s) => s.id === selectedId) || null;
  const stats = useMemo(() => summarize(history, laps), [history, laps]);
  const route = useMemo(() => history.filter((r) => r.lat != null && r.lat !== 0).map((r) => [r.lat, r.lon]), [history]);
  const scrubRow = history[Math.min(scrub, history.length - 1)] || null;
  const scrubPos = scrubRow && scrubRow.lat != null ? { lat: scrubRow.lat, lon: scrubRow.lon } : null;
  const trackStart = selected?.track?.start_lat != null ? { lat: selected.track.start_lat, lon: selected.track.start_lon } : (track?.start_lat != null ? { lat: track.start_lat, lon: track.start_lon } : null);

  const exportCsv = useCallback(() => {
    if (!history.length) return;
    const cols = ['ts', 'lat', 'lon', 'speed_mph', 'pack_soc', 'battery_voltage', 'battery_watts', 'current_draw', 'solar_watts', 'motor_temp_f', 'inverter_temp_f', 'rpm'];
    const lines = [cols.join(',')].concat(history.map((r) => cols.map((c) => (r[c] ?? '')).join(',')));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-${selectedId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [history, selectedId]);

  return (
    <div>
      <div className="tlm-hero" style={{ marginBottom: '1rem' }}>
        <div className="tlm-row" style={{ alignItems: 'center' }}>
          <select className="tlm-select" style={{ minWidth: 260 }} value={selectedId || ''} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="" disabled>Select a session…</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {new Date(s.created_at).toLocaleDateString()} · {s.status}
              </option>
            ))}
          </select>
          <button className="tlm-btn sm" onClick={exportCsv} disabled={!history.length}><Download size={14} /> Export CSV</button>
        </div>
      </div>

      {loading ? (
        <div className="tlm-empty">Loading session…</div>
      ) : !selected ? (
        <div className="tlm-empty">No sessions recorded yet.</div>
      ) : (
        <>
          <div className="tlm-tiles cols-4">
            <StatTile label="Duration" value={duration(stats.startMs, stats.endMs)} accent="var(--tlm-muted)" icon={GaugeIcon} />
            <StatTile label="Distance" value={dist(stats.distM)} accent="var(--tlm-muted)" />
            <StatTile label="Laps" value={laps.length} accent="var(--tlm-muted)" />
            <StatTile label="Top speed" value={num(stats.top, 1)} unit="mph" accent="var(--tlm-muted)" icon={GaugeIcon} />
            <StatTile label="Energy used" value={wh(stats.energyWh)} accent="var(--tlm-muted)" icon={Zap} />
            <StatTile label="Solar harvested" value={wh(stats.solarWh)} accent="var(--tlm-muted)" icon={Sun} />
            <StatTile label="Efficiency" value={stats.effWhMi != null ? num(stats.effWhMi, 0) : '—'} unit="Wh/mi" accent="var(--tlm-muted)" icon={Battery} />
            <StatTile label="Best lap" value={laps.filter((l) => l.lap_time_s > 0).length ? lapTime(Math.min(...laps.filter((l) => l.lap_time_s > 0).map((l) => l.lap_time_s))) : '—'} accent="var(--tlm-good)" />
          </div>

          <div className="tlm-two" style={{ marginTop: '1rem' }}>
            <Card title="Route Replay" icon={Play} className="pad0">
              <LiveMap carPos={scrubPos} trail={route} start={trackStart} radius={selected?.track?.lap_radius_m ?? 15} follow={false} />
              <div style={{ padding: '0.9rem 1.1rem' }}>
                <input type="range" min={0} max={Math.max(0, history.length - 1)} value={scrub}
                  onChange={(e) => setScrub(Number(e.target.value))} style={{ width: '100%', accentColor: '#e31b23' }} disabled={!history.length} />
                {scrubRow && (
                  <div className="tlm-row" style={{ justifyContent: 'space-between', marginTop: '0.5rem', color: 'var(--tlm-sub)', fontSize: '0.82rem' }}>
                    <span className="tlm-mono">{tick(toMs(scrubRow.ts))}</span>
                    <span className="tlm-mono">{num(scrubRow.speed_mph, 1)} mph</span>
                    <span className="tlm-mono">{num(scrubRow.pack_soc, 0)}% SOC</span>
                    <span className="tlm-mono">{power(scrubRow.battery_watts)}</span>
                  </div>
                )}
              </div>
            </Card>
            <LapBoard laps={laps} session={selected} clock={{ startMs: stats.startMs, endMs: stats.endMs }} />
          </div>

          <h2 className="tlm-h2"><GaugeIcon size={22} /> Speed</h2>
          <Card>
            <div className="tlm-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="ts" tickFormatter={tick} minTickGap={60} />
                  <YAxis />
                  <Tooltip labelFormatter={tick} formatter={(v) => [`${num(v, 1)} mph`, 'Speed']} />
                  <Line type="monotone" dataKey="speed_mph" stroke="#5b8def" dot={false} strokeWidth={2} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <h2 className="tlm-h2"><Zap size={22} /> Power &amp; SOC</h2>
          <div className="tlm-two">
            <Card title="Battery vs Solar power" icon={Zap}>
              <div className="tlm-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="ts" tickFormatter={tick} minTickGap={60} />
                    <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                    <Tooltip labelFormatter={tick} formatter={(v, n) => [`${num(v, 0)} W`, n]} />
                    <Line type="monotone" dataKey="battery_watts" name="Battery" stroke="#e31b23" dot={false} strokeWidth={2} isAnimationActive={false} />
                    <Line type="monotone" dataKey="solar_watts" name="Solar" stroke="#d99a3d" dot={false} strokeWidth={2} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card title="State of charge" icon={Battery}>
              <div className="tlm-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="ts" tickFormatter={tick} minTickGap={60} />
                    <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip labelFormatter={tick} formatter={(v) => [`${num(v, 1)}%`, 'SOC']} />
                    <Line type="monotone" dataKey="pack_soc" stroke="#2ecc71" dot={false} strokeWidth={2} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
