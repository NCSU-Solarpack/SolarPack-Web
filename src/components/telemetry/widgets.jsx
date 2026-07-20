import React from 'react';

export function Card({ title, icon: Icon, children, className = '', right }) {
  return (
    <section className={`tlm-card ${className}`}>
      {(title || right) && (
        <div className="tlm-card-title" style={{ justifyContent: right ? 'space-between' : undefined }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            {Icon && <Icon size={15} />} {title}
          </span>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * Stat tile with a colored top accent, big tabular value, optional unit + sub line.
 */
export function StatTile({ label, value, unit, sub, accent = 'var(--tlm-accent)', icon: Icon, big = false }) {
  return (
    <div className={`tlm-tile ${big ? 'big' : ''}`} style={{ '--accent': accent }}>
      <span className="label">{Icon && <Icon size={13} />} {label}</span>
      <span className="value">
        {value}
        {unit && <span className="unit">{unit}</span>}
      </span>
      {sub != null && <span className="sub">{sub}</span>}
    </div>
  );
}

/** Tile with an inline progress meter (e.g. SOC). */
export function MeterTile({ label, value, unit, pct, accent = 'var(--tlm-accent)', icon: Icon, sub }) {
  const clamped = Math.max(0, Math.min(100, pct ?? 0));
  return (
    <div className="tlm-tile" style={{ '--accent': accent }}>
      <span className="label">{Icon && <Icon size={13} />} {label}</span>
      <span className="value">
        {value}
        {unit && <span className="unit">{unit}</span>}
      </span>
      <div className="tlm-meter" style={{ '--accent': accent }}>
        <span style={{ width: `${clamped}%` }} />
      </div>
      {sub != null && <span className="sub">{sub}</span>}
    </div>
  );
}

/** Compact radial gauge (SVG). value in [0,max]. */
export function Gauge({ label, value, max, display, unit, accent = 'var(--tlm-accent)', size = 150 }) {
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(1, max ? (value ?? 0) / max : 0));
  // 270° sweep starting at 135°.
  const sweep = 0.75;
  const dash = c * sweep;
  const offset = dash * (1 - frac);
  const cx = size / 2;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(135deg)' }}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round" />
        <circle cx={cx} cy={cx} r={r} fill="none" stroke={accent} strokeWidth="10"
          strokeDasharray={`${dash} ${c}`} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 400ms ease' }} />
      </svg>
      <div style={{ marginTop: -size * 0.62, textAlign: 'center', pointerEvents: 'none' }}>
        <div className="tlm-mono" style={{ fontSize: '1.5rem', fontWeight: 600 }}>{display}</div>
        {unit && <div style={{ fontSize: '0.7rem', color: 'var(--tlm-sub)' }}>{unit}</div>}
      </div>
      <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tlm-muted)' }}>{label}</div>
    </div>
  );
}

/** Interpolate a cell voltage into a heat color (low=red, mid=green, high=blue). */
export function cellColor(v, min = 3.0, max = 4.2) {
  if (v == null || v <= 0) return 'rgba(255,255,255,0.05)';
  const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
  if (t < 0.5) {
    const k = t / 0.5;
    return `rgb(${Math.round(255 - 55 * k)}, ${Math.round(60 + 170 * k)}, ${Math.round(40 + 30 * k)})`;
  }
  const k = (t - 0.5) / 0.5;
  return `rgb(${Math.round(200 - 160 * k)}, ${Math.round(230 - 40 * k)}, ${Math.round(70 + 160 * k)})`;
}

export function tempColor(f) {
  if (f == null) return 'var(--tlm-muted)';
  if (f >= 180) return 'var(--tlm-bad)';
  if (f >= 140) return 'var(--tlm-warn)';
  return 'var(--tlm-good)';
}
