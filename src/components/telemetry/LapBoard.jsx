import React from 'react';
import { Timer } from 'lucide-react';
import { Card, StatTile } from './widgets';
import { lapTime, dist, num, mps2mph, toMs } from './format';

export default function LapBoard({ laps, session, clock }) {
  const timed = laps.filter((l) => l.lap_time_s > 0);
  const best = timed.length ? timed.reduce((a, b) => (b.lap_time_s < a.lap_time_s ? b : a)) : null;
  const last = laps.length ? laps[laps.length - 1] : null;
  const avg = timed.length ? timed.reduce((s, l) => s + l.lap_time_s, 0) / timed.length : null;

  // Current (in-progress) lap time = time since the last completed lap (or session start).
  const running = session?.status === 'running';
  const lastEnd = toMs(last?.ended_at) || clock.startMs;
  const currentLapS = running && lastEnd ? Math.max(0, ((clock.endMs || Date.now()) - lastEnd) / 1000) : null;

  return (
    <Card title="Lap Timing" icon={Timer} className="pad0">
      <div style={{ padding: '1.1rem 1.2rem 0' }}>
        <div className="tlm-tiles cols-4">
          <StatTile label="Lap" value={laps.length} accent="var(--tlm-muted)" />
          <StatTile label="Current" value={currentLapS != null ? lapTime(currentLapS) : '—'} accent="var(--tlm-muted)" />
          <StatTile label="Best" value={best ? lapTime(best.lap_time_s) : '—'} accent="var(--tlm-good)" />
          <StatTile label="Avg" value={avg ? lapTime(avg) : '—'} accent="var(--tlm-muted)" />
        </div>
      </div>

      <div style={{ padding: '0.9rem 1.2rem 1.2rem' }}>
        {laps.length === 0 ? (
          <div className="tlm-empty">No laps yet. Laps auto-record when the car crosses the start/finish line.</div>
        ) : (
          <div className="tlm-laps">
            {[...laps].reverse().map((lap) => {
              const isBest = best && lap.id === best.id;
              return (
                <div key={lap.id || lap.lap_number} className={`tlm-lap ${isBest ? 'best' : ''}`}>
                  <span className="n">{lap.lap_number}</span>
                  <span className="t">
                    {lapTime(lap.lap_time_s)}
                    {isBest && <span className="tlm-badge best" style={{ marginLeft: '0.5rem' }}>Best</span>}
                    {lap.source === 'manual' && <span className="tlm-badge current" style={{ marginLeft: '0.4rem' }}>Manual</span>}
                  </span>
                  <span className="m">
                    {dist(lap.distance_m)}<br />
                    {num(mps2mph(lap.avg_speed_mps), 1)} mph avg
                    {lap.energy_wh ? <> · {num(lap.energy_wh, 0)} Wh</> : null}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
