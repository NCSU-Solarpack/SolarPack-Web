import { useEffect, useRef, useState, useCallback } from 'react';
import { supabaseService } from '../../utils/supabase';
import { RELAY_URL, STALE_MS, toMs, mps2mph } from './format';

/**
 * Polls the relay for the freshest raw packet (works even with no active
 * session, incl. the built-in simulator). Returns the latest packet, whether
 * it's stale, and an accumulated GPS breadcrumb trail.
 */
export function useLivePacket({ pollMs = 1000, active = true } = {}) {
  const [packet, setPacket] = useState(null);
  const [lastTs, setLastTs] = useState(0);
  const [stale, setStale] = useState(true);
  const [trail, setTrail] = useState([]);
  const [topSpeed, setTopSpeed] = useState(0);
  const trailKey = useRef('');

  const resetTrail = useCallback(() => { setTrail([]); setTopSpeed(0); trailKey.current = ''; }, []);

  useEffect(() => {
    if (!active) return undefined;
    let cancelled = false;
    let timer = null;

    const tick = async () => {
      try {
        const res = await fetch(`${RELAY_URL}/packet`, { cache: 'no-store' });
        const pkt = await res.json();
        if (cancelled || !pkt || typeof pkt !== 'object') return;
        setPacket(pkt);
        const ts = pkt.timestamp || Date.now();
        setLastTs(ts);
        setStale(Date.now() - ts > STALE_MS);

        const loc = pkt.location;
        if (loc && typeof loc.lat === 'number' && typeof loc.lon === 'number' && loc.lat !== 0) {
          const key = `${loc.lat.toFixed(6)},${loc.lon.toFixed(6)}`;
          if (key !== trailKey.current) {
            trailKey.current = key;
            setTrail((prev) => {
              const next = [...prev, [loc.lat, loc.lon]];
              return next.length > 800 ? next.slice(next.length - 800) : next;
            });
          }
        }
        const mph = typeof pkt.speed === 'number' ? pkt.speed : mps2mph(loc?.speed);
        if (mph != null && Number.isFinite(mph)) setTopSpeed((p) => Math.max(p, mph));
      } catch {
        if (!cancelled) setStale(true);
      }
    };

    tick();
    timer = setInterval(tick, pollMs);
    return () => { cancelled = true; if (timer) clearInterval(timer); };
  }, [pollMs, active]);

  // Re-evaluate staleness on a steady beat even if fetches fail.
  useEffect(() => {
    const id = setInterval(() => setStale(Date.now() - lastTs > STALE_MS), 1000);
    return () => clearInterval(id);
  }, [lastTs]);

  return { packet, lastTs, stale, trail, resetTrail, topSpeed };
}

/** The active session + its track, kept in sync via realtime. */
export function useActiveSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const s = await supabaseService.getActiveSession();
      setSession(s);
      setError(null);
    } catch (e) {
      setError(e?.message || 'Failed to load session');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const unsub = supabaseService.subscribeSessions(() => refresh());
    return () => unsub && unsub();
  }, [refresh]);

  return { session, track: session?.track || null, loading, error, refresh };
}

/** Laps for a session, updated in realtime as the relay detects them. */
export function useSessionLaps(sessionId) {
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let cancelled = false;
    if (!sessionId) { setLaps([]); return undefined; }
    supabaseService.getLaps(sessionId).then((l) => { if (!cancelled) setLaps(l); }).catch(() => {});
    const unsub = supabaseService.subscribeLaps(sessionId, (lap) => {
      if (!lap) return;
      setLaps((prev) => {
        if (prev.some((x) => x.lap_number === lap.lap_number)) return prev;
        return [...prev, lap].sort((a, b) => a.lap_number - b.lap_number);
      });
    });
    return () => { cancelled = true; unsub && unsub(); };
  }, [sessionId]);

  return laps;
}

/** Derived lap stats: best, average, last, top speed. */
export function lapStats(laps) {
  const timed = laps.filter((l) => l.lap_time_s > 0);
  if (!timed.length) return { count: laps.length, best: null, avg: null, last: null, top: null, bestIdx: -1 };
  let best = timed[0];
  let bestIdx = 0;
  let sum = 0;
  let top = 0;
  timed.forEach((l) => {
    sum += l.lap_time_s;
    if (l.lap_time_s < best.lap_time_s) { best = l; }
    if ((l.top_speed_mps || 0) > top) top = l.top_speed_mps;
  });
  bestIdx = laps.findIndex((l) => l.id === best.id);
  return {
    count: laps.length,
    best,
    bestIdx,
    avg: sum / timed.length,
    last: laps[laps.length - 1],
    top,
  };
}

/**
 * Accumulates a rolling in-memory series from the live packet for live charts.
 * Keeps the last `maxPoints` samples (≈ maxPoints seconds at 1 Hz).
 */
export function useLiveSeries(packet, maxPoints = 240) {
  const [series, setSeries] = useState([]);
  const lastTsRef = useRef(0);
  useEffect(() => {
    if (!packet) return;
    const ts = packet.timestamp || Date.now();
    if (ts === lastTsRef.current) return;
    lastTsRef.current = ts;
    const busV = packet.rmsBusVoltage || 0;
    const busA = packet.rmsBusCurrent || 0;
    const sample = {
      t: ts,
      speed: Number(packet.speed) || 0,
      battW: Number(packet.batteryWattage) || 0,
      solarW: Number(packet.solarWatts) || 0,
      motorW: Math.round(busV * busA),
      soc: Number(packet.packSOC) || 0,
      motorTemp: Number(packet.motorTemp) || 0,
      inverterTemp: Number(packet.inverterTemp) || 0,
    };
    setSeries((prev) => {
      const next = [...prev, sample];
      return next.length > maxPoints ? next.slice(next.length - maxPoints) : next;
    });
  }, [packet, maxPoints]);
  return series;
}

/** Live-subscribed history-friendly current-lap elapsed (client-side clock). */
export function useSessionClock(session) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (session?.status !== 'running') return undefined;
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, [session?.status]);
  const startMs = toMs(session?.started_at);
  const endMs = session?.status === 'stopped' ? toMs(session?.ended_at) : now;
  return { startMs, endMs };
}
