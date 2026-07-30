import { useEffect, useState } from 'react';
import { authService } from '../../utils/auth';

/**
 * Whether the current user may operate pit controls (leader/director,
 * approved => has 'control_telemetry'). Reactive to auth state changes.
 */
export function usePitAuth() {
  const [canControl, setCanControl] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const evaluate = () => {
      if (!mounted) return;
      try {
        setCanControl(authService.isAuthenticated() && authService.hasPermission('control_telemetry'));
      } catch {
        setCanControl(false);
      }
    };
    (async () => {
      try { await authService.waitForInit?.(); } catch { /* noop */ }
      evaluate();
      if (mounted) setReady(true);
    })();
    const unsub = authService.onAuthStateChange?.(() => evaluate());
    return () => { mounted = false; if (typeof unsub === 'function') unsub(); };
  }, []);

  return { canControl, ready };
}
