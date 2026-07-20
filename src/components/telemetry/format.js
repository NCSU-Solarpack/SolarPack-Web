// Shared formatting + config helpers for the race pit telemetry section.

// Relay base URL (live packet fallback + health). Overridable via env.
export const RELAY_URL =
  import.meta.env.VITE_TELEMETRY_RELAY_URL || 'https://solarpack-app-server-alyv.onrender.com';

// Consider live data "stale" if the last snapshot is older than this.
export const STALE_MS = 6000;

// Status palette (matches the telemetry page's CSS tokens in RacePitTelemetry.css).
export const STATUS = {
  good: '#2ECC71',
  warn: '#E0A72E',
  bad: '#FF4D5E',
  info: '#5B8DEF',
  solar: '#D99A3D',
  idle: '#6B7280',
};

const nf = (digits) => new Intl.NumberFormat('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits });

export const num = (v, digits = 0, fallback = '—') => {
  if (v === null || v === undefined || Number.isNaN(Number(v))) return fallback;
  return nf(digits).format(Number(v));
};

// Compact watts/kW.
export const power = (watts, fallback = '—') => {
  if (watts === null || watts === undefined || Number.isNaN(Number(watts))) return fallback;
  const w = Number(watts);
  if (Math.abs(w) >= 1000) return `${num(w / 1000, 2)} kW`;
  return `${num(w, 0)} W`;
};

export const wh = (v, fallback = '—') => {
  if (v === null || v === undefined || Number.isNaN(Number(v))) return fallback;
  const x = Number(v);
  if (Math.abs(x) >= 1000) return `${num(x / 1000, 2)} kWh`;
  return `${num(x, 0)} Wh`;
};

export const mps2mph = (mps) => (mps == null ? null : Number(mps) * 2.23694);
export const m2mi = (m) => (m == null ? null : Number(m) * 0.000621371);

export const dist = (meters, fallback = '—') => {
  if (meters == null || Number.isNaN(Number(meters))) return fallback;
  return `${num(m2mi(meters), 2)} mi`;
};

export const speed = (mph, fallback = '—') => (mph == null ? fallback : `${num(mph, 1)}`);

// ms -> mm:ss.cs
export const lapTime = (seconds, fallback = '—') => {
  if (seconds == null || Number.isNaN(Number(seconds))) return fallback;
  const ms = Number(seconds) * 1000;
  const t = Math.floor(ms / 1000);
  const m = Math.floor(t / 60);
  const s = t % 60;
  const cs = Math.floor((ms % 1000) / 10);
  return `${m}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
};

// Elapsed duration between two ISO/ms timestamps -> H:MM:SS.
export const duration = (startMs, endMs) => {
  if (!startMs) return '—';
  const secs = Math.max(0, Math.floor(((endMs || Date.now()) - startMs) / 1000));
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

export const toMs = (v) => {
  if (!v) return null;
  if (typeof v === 'number') return v;
  const t = Date.parse(v);
  return Number.isNaN(t) ? null : t;
};

export const timeOfDay = (v) => {
  const ms = toMs(v);
  if (!ms) return '—';
  return new Date(ms).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

// Extract a plain telemetry object from a live_telemetry row (payload holds the full packet).
export const packetOf = (liveRow) => {
  if (!liveRow) return null;
  const p = liveRow.payload && typeof liveRow.payload === 'object' ? liveRow.payload : {};
  // Merge hot columns as authoritative fallbacks.
  return {
    ...p,
    speed: p.speed ?? liveRow.speed_mph,
    packSOC: p.packSOC ?? liveRow.pack_soc,
    batteryVoltage: p.batteryVoltage ?? liveRow.battery_voltage,
    batteryWattage: p.batteryWattage ?? liveRow.battery_watts,
    currentDraw: p.currentDraw ?? liveRow.current_draw,
    solarWatts: p.solarWatts ?? liveRow.solar_watts,
    motorTemp: p.motorTemp ?? liveRow.motor_temp_f,
    inverterTemp: p.inverterTemp ?? liveRow.inverter_temp_f,
    rpm: p.rpm ?? liveRow.rpm,
    location: p.location ?? (liveRow.lat != null ? { lat: liveRow.lat, lon: liveRow.lon, heading: liveRow.heading, speed: liveRow.gps_speed_mps, accuracy: liveRow.accuracy_m, ts: liveRow.captured_at } : null),
    _fault: liveRow.fault,
    _updatedAt: toMs(liveRow.updated_at),
  };
};

export const isFault = (pkt) => {
  if (!pkt) return false;
  if (pkt._fault) return true;
  if (pkt.systemStatus === 2) return true;
  if (Array.isArray(pkt.bmsFaultCodes) && pkt.bmsFaultCodes.length > 0) return true;
  if (Array.isArray(pkt.boardStatus) && pkt.boardStatus.includes(2)) return true;
  return false;
};

export const CAR_MODE_LABELS = ['Off', 'Ignition', 'Accessory', 'Full Start'];
export const DRIVE_MODE_LABELS = ['Neutral', 'Drive', 'Reverse'];
export const BOARD_NAMES = ['Dash', 'Power', 'HV/BMS', 'Motor', 'Solar', 'LPDRV'];
