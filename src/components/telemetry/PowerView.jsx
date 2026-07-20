import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Zap, Sun, Battery, Gauge as GaugeIcon, Cpu, Route } from 'lucide-react';
import { Card, StatTile, MeterTile } from './widgets';
import { useLiveSeries } from './useTelemetry';
import { num, power } from './format';

const timeTick = (t) => new Date(t).toLocaleTimeString('en-US', { minute: '2-digit', second: '2-digit' });

export default function PowerView({ live }) {
  const pkt = live.packet || {};
  const series = useLiveSeries(pkt);

  const busV = pkt.rmsBusVoltage || 0;
  const busA = pkt.rmsBusCurrent || 0;
  const motorW = Math.round(busV * busA);
  const battW = pkt.batteryWattage || 0;
  const solarW = pkt.solarWatts || 0;
  const netW = battW - solarW;

  return (
    <div>
      <h2 className="tlm-h2"><Zap size={22} /> Power Flow</h2>
      <div className="tlm-tiles">
        <StatTile big label="Battery power" value={power(battW)} accent={battW < 0 ? 'var(--tlm-good)' : 'var(--tlm-accent)'} icon={Battery}
          sub={`${num(pkt.batteryVoltage, 1)} V · ${num(pkt.currentDraw, 1)} A`} />
        <StatTile big label="Solar input" value={power(solarW)} accent="var(--tlm-solar)" icon={Sun}
          sub={`${num(pkt.solarVolts || pkt.solarVoltage, 1)} V · ${num(pkt.solarAmps, 1)} A`} />
        <StatTile big label="Motor power" value={power(motorW)} accent="var(--tlm-info)" icon={Cpu}
          sub={`${num(busV, 0)} V bus · ${num(busA, 0)} A`} />
        <StatTile big label="Net draw" value={power(netW)} accent={netW < 0 ? 'var(--tlm-good)' : 'var(--tlm-warn)'} icon={Zap}
          sub={netW < 0 ? 'Net charging' : 'Net consuming'} />
      </div>

      <div className="tlm-two" style={{ marginTop: '1rem' }}>
        <Card title="Power — last 4 min" icon={Zap}>
          <div className="tlm-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="t" tickFormatter={timeTick} minTickGap={40} />
                <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip labelFormatter={timeTick} formatter={(v, n) => [`${num(v, 0)} W`, n]} />
                <Line type="monotone" dataKey="battW" name="Battery" stroke="#e31b23" dot={false} strokeWidth={2} isAnimationActive={false} />
                <Line type="monotone" dataKey="motorW" name="Motor" stroke="#2979ff" dot={false} strokeWidth={2} isAnimationActive={false} />
                <Line type="monotone" dataKey="solarW" name="Solar" stroke="#ffb300" dot={false} strokeWidth={2} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="tlm-legend">
            <span><i style={{ background: '#e31b23' }} />Battery</span>
            <span><i style={{ background: '#2979ff' }} />Motor</span>
            <span><i style={{ background: '#ffb300' }} />Solar</span>
          </div>
        </Card>

        <Card title="State of charge — last 4 min" icon={Battery}>
          <div className="tlm-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="socfill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00e676" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#00e676" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="t" tickFormatter={timeTick} minTickGap={40} />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip labelFormatter={timeTick} formatter={(v) => [`${num(v, 1)}%`, 'SOC']} />
                <Area type="monotone" dataKey="soc" stroke="#00e676" fill="url(#socfill)" strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <h2 className="tlm-h2"><Sun size={22} /> Solar &amp; Range</h2>
      <div className="tlm-tiles">
        <MeterTile label="Pack SOC" value={num(pkt.packSOC, 0)} unit="%" pct={pkt.packSOC}
          accent={pkt.packSOC < 20 ? 'var(--tlm-bad)' : 'var(--tlm-good)'} icon={Battery} />
        <StatTile label="Est. range" value={num(pkt.batteryRange, 0)} unit="mi" accent="var(--tlm-good)" icon={Route} />
        <StatTile label="Solar volts" value={num(pkt.solarVolts || pkt.solarVoltage, 1)} unit="V" accent="var(--tlm-solar)" icon={Sun} />
        <StatTile label="Solar amps" value={num(pkt.solarAmps, 1)} unit="A" accent="var(--tlm-solar)" icon={Sun} />
        <StatTile label="Motor RPM" value={num(pkt.rpm, 0)} accent="var(--tlm-info)" icon={GaugeIcon} />
        <StatTile label="12V system" value={num(pkt.rms12vBatteryVoltage || pkt.bms12vBatteryVoltage, 1)} unit="V" accent="var(--tlm-info)" icon={Battery} />
        <StatTile label="Charger" value={pkt.chargerPluggedIn ? 'Plugged in' : 'Unplugged'} accent="var(--tlm-muted)"
          sub={pkt.chargeRateWatts ? power(pkt.chargeRateWatts) : '—'} />
        <StatTile label="Solar mode" value={pkt.solarCharging ? 'Charging' : 'Idle'} accent={pkt.solarCharging ? 'var(--tlm-good)' : 'var(--tlm-muted)'} icon={Sun} />
      </div>
    </div>
  );
}
