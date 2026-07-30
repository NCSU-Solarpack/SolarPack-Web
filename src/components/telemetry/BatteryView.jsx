import React from 'react';
import { Battery, Thermometer, AlertTriangle, Cpu, Activity } from 'lucide-react';
import { Card, StatTile, MeterTile, cellColor, tempColor } from './widgets';
import { num, timeOfDay, BOARD_NAMES, STATUS, activeAlertsOf } from './format';

const ALERT_SEV_COLOR = { critical: STATUS.bad, warning: STATUS.warn ?? '#c9791a', caution: STATUS.idle };

function cellStats(cells) {
  const valid = (cells || []).filter((v) => typeof v === 'number' && v > 0.5);
  if (!valid.length) return { min: null, max: null, avg: null, delta: null, count: (cells || []).length };
  const min = Math.min(...valid);
  const max = Math.max(...valid);
  const avg = valid.reduce((a, b) => a + b, 0) / valid.length;
  return { min, max, avg, delta: max - min, count: valid.length };
}

export default function BatteryView({ live }) {
  const pkt = live.packet || {};
  const cells = Array.isArray(pkt.cellVoltages) ? pkt.cellVoltages : [];
  const temps = Array.isArray(pkt.cellTemperatures) ? pkt.cellTemperatures : [];
  const cs = cellStats(cells);

  const validTemps = temps.filter((t) => typeof t === 'number' && t > 0);
  const tMin = validTemps.length ? Math.min(...validTemps) : null;
  const tMax = validTemps.length ? Math.max(...validTemps) : null;

  const faults = Array.isArray(pkt.faultEvents) ? [...pkt.faultEvents].reverse() : [];
  const bmsFaults = Array.isArray(pkt.bmsFaultCodes) ? pkt.bmsFaultCodes : [];
  const boards = Array.isArray(pkt.boardStatus) ? pkt.boardStatus : [];
  const alerts = activeAlertsOf(pkt);

  return (
    <div>
      <h2 className="tlm-h2"><Battery size={22} /> Battery Pack</h2>
      <div className="tlm-tiles">
        <MeterTile label="Pack SOC" value={num(pkt.packSOC, 0)} unit="%" pct={pkt.packSOC}
          accent={pkt.packSOC < 20 ? 'var(--tlm-bad)' : 'var(--tlm-good)'} icon={Battery} sub={`${num(pkt.batteryVoltage, 1)} V pack`} />
        <StatTile label="Cell min" value={cs.min != null ? num(cs.min, 3) : '—'} unit="V" accent={cs.min != null && cs.min < 3.0 ? 'var(--tlm-bad)' : 'var(--tlm-muted)'} />
        <StatTile label="Cell max" value={cs.max != null ? num(cs.max, 3) : '—'} unit="V" accent={cs.max != null && cs.max > 4.2 ? 'var(--tlm-bad)' : 'var(--tlm-muted)'} />
        <StatTile label="Cell delta" value={cs.delta != null ? num(cs.delta * 1000, 0) : '—'} unit="mV" accent={cs.delta > 0.1 ? 'var(--tlm-bad)' : 'var(--tlm-good)'} />
        <StatTile label="Cell avg" value={cs.avg != null ? num(cs.avg, 3) : '—'} unit="V" accent="var(--tlm-muted)" />
        <StatTile label="Pack current" value={num(pkt.currentDraw, 1)} unit="A" accent="var(--tlm-muted)" />
      </div>

      <div className="tlm-masonry" style={{ marginTop: '1rem' }}>
        <Card title={`Cell Voltages (${cs.count})`} icon={Battery}>
          {cs.count === 0 ? (
            <div className="tlm-empty">No cell data.</div>
          ) : (
            <>
              <div className="tlm-cellgrid">
                {cells.map((v, i) => (
                  <div key={i} className="tlm-cell" title={`Cell ${i + 1}: ${v > 0 ? v.toFixed(3) : '—'} V`}
                    style={{ background: cellColor(v) }}>{i + 1}</div>
                ))}
              </div>
              <div className="tlm-legend" style={{ marginTop: '0.7rem' }}>
                <span><i style={{ background: cellColor(3.1) }} />Low</span>
                <span><i style={{ background: cellColor(3.7) }} />Nominal</span>
                <span><i style={{ background: cellColor(4.15) }} />High</span>
              </div>
            </>
          )}
        </Card>

        <Card title="Thermals" icon={Thermometer}>
          <div className="tlm-tiles cols-2">
            <StatTile label="Pack high" value={pkt.packHighTemp != null ? num(pkt.packHighTemp, 0) : (tMax != null ? num(tMax, 0) : '—')} unit="°C"
              accent={tempColor((pkt.packHighTemp ?? tMax) * 9 / 5 + 32)} icon={Thermometer} />
            <StatTile label="Pack low" value={pkt.packLowTemp != null ? num(pkt.packLowTemp, 0) : (tMin != null ? num(tMin, 0) : '—')} unit="°C" accent="var(--tlm-muted)" />
            <StatTile label="Motor" value={num(pkt.motorTemp, 0)} unit="°F" accent={tempColor(pkt.motorTemp)} icon={Thermometer} />
            <StatTile label="Inverter" value={num(pkt.inverterTemp, 0)} unit="°F" accent={tempColor(pkt.inverterTemp)} icon={Thermometer} />
          </div>
        </Card>

        <Card title="BMS / 12V" icon={Cpu}>
          <div className="tlm-tiles cols-2">
            <StatTile label="BMS 12V" value={num(pkt.bms12vBatteryVoltage, 1)} unit="V" accent="var(--tlm-muted)" />
            <StatTile label="Charge state" value={pkt.bmsChargeState ? 'Charging' : pkt.bmsDischargeState ? 'Discharging' : 'Idle'}
              accent={pkt.bmsChargeState ? 'var(--tlm-good)' : 'var(--tlm-muted)'} />
            <StatTile label="Radiator" value={pkt.radiatorOn ? 'On' : 'Off'} accent={pkt.radiatorOn ? 'var(--tlm-good)' : 'var(--tlm-muted)'} />
            <StatTile label="Cooling pump" value={pkt.coolingPumpOn ? 'On' : 'Off'} accent={pkt.coolingPumpOn ? 'var(--tlm-good)' : 'var(--tlm-muted)'} />
            <StatTile label="Cooling fan" value={pkt.fanControl ? 'On' : 'Off'} accent={pkt.fanControl ? 'var(--tlm-good)' : 'var(--tlm-muted)'} />
            <StatTile label="Cabin fan speed" value={num((pkt.occupantFanSpeed / 255) * 100, 0)} unit="%" accent="var(--tlm-muted)" />
            <StatTile label="Battery fan speed" value={num((pkt.batteryFanSpeed / 255) * 100, 0)} unit="%" accent="var(--tlm-muted)" />
          </div>
        </Card>

        <Card title="Boards Online" icon={Activity}>
          <div className="tlm-boards">
            {(boards.length ? boards : [0, 0, 0, 0, 0, 0]).map((s, i) => (
              <div key={i} className="tlm-board">
                <span className="s" style={{ background: s === 2 ? STATUS.bad : s === 1 ? STATUS.good : STATUS.idle }} />
                <span className="name">{BOARD_NAMES[i] || `Board ${i + 1}`}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Fault &amp; Alert Log" icon={AlertTriangle}>
          {/* Live, severity-ranked alerts computed on the iPad and streamed to the pit. */}
          {alerts.length > 0 && (
            <div className="tlm-faults" style={{ marginBottom: '0.7rem' }}>
              {alerts.map((a, i) => (
                <div key={`a-${i}`} className="tlm-fault">
                  <AlertTriangle size={15} color={ALERT_SEV_COLOR[a.severity] || STATUS.bad} />
                  <span>
                    <strong style={{ color: ALERT_SEV_COLOR[a.severity] || STATUS.bad }}>
                      {(a.severity || 'alert').toUpperCase()}
                    </strong>{' '}
                    {a.type}{a.count > 1 ? ` ×${a.count}` : ''} — {a.cause}
                  </span>
                  <time>{timeOfDay(a.since)}</time>
                </div>
              ))}
            </div>
          )}
          {bmsFaults.length > 0 && (
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.7rem' }}>
              {bmsFaults.map((f, i) => <span key={i} className="tlm-badge best" style={{ background: STATUS.bad, color: '#fff' }}>{f}</span>)}
            </div>
          )}
          {alerts.length === 0 && faults.length === 0 && bmsFaults.length === 0 ? (
            <div className="tlm-empty">No faults recorded. All systems nominal.</div>
          ) : (
            <div className="tlm-faults">
              {faults.map((f, i) => (
                <div key={i} className="tlm-fault">
                  <AlertTriangle size={15} color={STATUS.bad} />
                  <span>Fault: <strong>{f.reason}</strong></span>
                  <time>{timeOfDay(f.timestamp)}</time>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
