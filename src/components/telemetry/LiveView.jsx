import React, { useState, useEffect, useCallback } from 'react';
import { Gauge as GaugeIcon, Zap, Sun, Battery, Thermometer, Navigation, MapPin, Activity } from 'lucide-react';
import LiveMap from './LiveMap';
import LapBoard from './LapBoard';
import PitControls from './PitControls';
import { Card, StatTile, MeterTile, Gauge } from './widgets';
import { supabaseService } from '../../utils/supabase';
import { useSessionLaps, useSessionClock } from './useTelemetry';
import { usePitAuth } from './usePitAuth';
import { num, power, DRIVE_MODE_LABELS, CAR_MODE_LABELS, isFault } from './format';
import { tempColor } from './widgets';

export default function LiveView({ live, session, track, topSpeed, refreshSession }) {
  const { canControl } = usePitAuth();
  const laps = useSessionLaps(session?.id);
  const clock = useSessionClock(session);
  const [settingMarker, setSettingMarker] = useState(false);
  const [workingTrackId, setWorkingTrackId] = useState(track?.id || null);
  const [follow, setFollow] = useState(true);
  const [pendingStart, setPendingStart] = useState(null); // instant marker feedback

  useEffect(() => { if (track?.id && !workingTrackId) setWorkingTrackId(track.id); }, [track?.id, workingTrackId]);

  const pkt = live.packet || {};
  const loc = pkt.location && pkt.location.lat ? { lat: pkt.location.lat, lon: pkt.location.lon, heading: pkt.location.heading } : null;
  const startPoint = pendingStart
    || (track?.start_lat != null ? { lat: track.start_lat, lon: track.start_lon } : null);

  const onSetStart = useCallback(async (lat, lon) => {
    try {
      setPendingStart({ lat, lon });
      let id = workingTrackId;
      if (!id) { const t = await supabaseService.saveTrack({ name: 'Track', center_lat: lat, center_lon: lon }); id = t.id; setWorkingTrackId(id); }
      await supabaseService.saveTrack({ id, start_lat: lat, start_lon: lon });
      setSettingMarker(false);
      refreshSession?.();
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(`Could not set start/finish: ${e?.message || e}`);
      setSettingMarker(false);
    }
  }, [workingTrackId, refreshSession]);

  const soc = pkt.packSOC;
  const battW = pkt.batteryWattage;
  const fault = isFault(pkt);
  const driveMode = DRIVE_MODE_LABELS[pkt.driveMode] || '—';

  return (
    <div>
      <div className="tlm-two">
        {/* Map */}
        <Card className="pad0">
          <LiveMap
            carPos={loc}
            trail={live.trail}
            start={startPoint}
            radius={track?.lap_radius_m ?? 15}
            follow={follow}
            settingMarker={settingMarker}
            onSetStart={onSetStart}
          />
        </Card>

        {/* Live vitals */}
        <div className="tlm-grid">
          <Card title="Live Vitals" icon={Activity} right={
            <button className="tlm-btn sm ghost" onClick={() => setFollow((f) => !f)}>
              <Navigation size={13} /> {follow ? 'Following' : 'Free pan'}
            </button>
          }>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0.3rem 0 0.8rem' }}>
              <Gauge label="Speed" value={pkt.speed ?? 0} max={80} display={num(pkt.speed, 0)} unit="mph"
                accent={fault ? 'var(--tlm-bad)' : 'var(--tlm-accent)'} size={180} />
            </div>
            <div className="tlm-tiles" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
              <MeterTile label="State of charge" value={num(soc, 0)} unit="%" pct={soc}
                accent={soc < 20 ? 'var(--tlm-bad)' : soc < 40 ? 'var(--tlm-warn)' : 'var(--tlm-good)'} icon={Battery}
                sub={`${num(pkt.batteryVoltage, 1)} V`} />
              <StatTile label="Battery power" value={power(battW)} accent={battW < 0 ? 'var(--tlm-good)' : 'var(--tlm-accent)'} icon={Zap}
                sub={`${num(pkt.currentDraw, 1)} A`} />
              <StatTile label="Solar" value={power(pkt.solarWatts)} accent="var(--tlm-solar)" icon={Sun}
                sub={pkt.solarCharging ? 'Charging' : 'Idle'} />
              <StatTile label="Motor temp" value={num(pkt.motorTemp, 0)} unit="°F" accent={tempColor(pkt.motorTemp)} icon={Thermometer}
                sub={`Inv ${num(pkt.inverterTemp, 0)}°F`} />
              <StatTile label="Top speed" value={num(topSpeed, 1)} unit="mph" accent="var(--tlm-info)" icon={GaugeIcon} />
              <StatTile label="Drive" value={driveMode} accent="var(--tlm-info)"
                sub={CAR_MODE_LABELS[pkt.carMode] || '—'} />
            </div>
            {fault && (
              <div className="tlm-lock" style={{ marginTop: '0.8rem', background: 'rgba(255,23,68,0.1)', borderColor: 'rgba(255,23,68,0.35)', color: '#ff9aa8' }}>
                <Activity size={16} /> Active fault reported by the car — see Battery &amp; Faults.
              </div>
            )}
          </Card>
        </div>
      </div>

      <div className="tlm-two" style={{ marginTop: '1rem' }}>
        <LapBoard laps={laps} session={session} clock={clock} />
        <PitControls
          canControl={canControl}
          session={session}
          track={track}
          carPos={loc}
          settingMarker={settingMarker}
          setSettingMarker={setSettingMarker}
          workingTrackId={workingTrackId}
          setWorkingTrackId={setWorkingTrackId}
        />
      </div>
    </div>
  );
}
