import React, { useState } from 'react';
import { Activity, MapPin, Zap, Battery, History as HistoryIcon } from 'lucide-react';
import './RacePitTelemetry.css';
import { useActiveSession, useLivePacket } from '../components/telemetry/useTelemetry';
import { isFault, timeOfDay } from '../components/telemetry/format';
import LiveView from '../components/telemetry/LiveView';
import PowerView from '../components/telemetry/PowerView';
import BatteryView from '../components/telemetry/BatteryView';
import HistoryView from '../components/telemetry/HistoryView';

const TABS = [
  { id: 'live', label: 'Live', icon: MapPin },
  { id: 'power', label: 'Power', icon: Zap },
  { id: 'battery', label: 'Battery', icon: Battery },
  { id: 'history', label: 'History', icon: HistoryIcon },
];

export default function RacePitTelemetry() {
  const [tab, setTab] = useState('live');
  const { session, track, refresh } = useActiveSession();
  const live = useLivePacket({ active: true });
  const fault = isFault(live.packet);

  let statusClass = 'is-stale';
  let statusText = 'Waiting for car';
  if (fault) { statusClass = 'is-fault'; statusText = 'Fault'; }
  else if (!live.stale) { statusClass = 'is-live'; statusText = 'Live'; }

  const sessionLabel = session
    ? `${session.name} · ${session.status.toUpperCase()}`
    : 'No active session';

  return (
    <div className="tlm">
      <div className="tlm-hero">
        <div>
          <h1>Race Pit <span>Telemetry</span></h1>
          <div className="tlm-sub">
            {sessionLabel}
            {live.lastTs ? ` · updated ${timeOfDay(live.lastTs)}` : ''}
          </div>
        </div>
        <div className={`tlm-status ${statusClass}`}>
          <span className="tlm-dot" /> {statusText}
        </div>
      </div>

      <div className="tlm-tabs">
        {TABS.map((t) => (
          <button key={t.id} className={`tlm-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'live' && <LiveView live={live} session={session} track={track} topSpeed={live.topSpeed} refreshSession={refresh} />}
      {tab === 'power' && <PowerView live={live} />}
      {tab === 'battery' && <BatteryView live={live} />}
      {tab === 'history' && <HistoryView track={track} />}

      <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--tlm-muted)', fontSize: '0.78rem' }}>
        <Activity size={12} style={{ verticalAlign: 'middle' }} /> Live data streamed from the SolarPack car · pit crew controls require sign-in
      </div>
    </div>
  );
}
