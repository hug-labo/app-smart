import { useCallback, useEffect, useState } from 'react';
import { getGroupConfig, GroupConfig, isTracking, saveGroupConfig, startTracking, stopTracking, TrackingStatus } from '@/lib/tracking';

export function useTracking() {
  const [config, setConfig] = useState<GroupConfig | null>(null);
  const [status, setStatus] = useState<TrackingStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGroupConfig().then(setConfig);
    isTracking().then((active) => setStatus(active ? 'tracking' : 'idle'));
  }, []);

  const configure = useCallback(async (nextConfig: GroupConfig) => {
    await saveGroupConfig(nextConfig);
    setConfig(nextConfig);
    setError(null);
  }, []);

  const start = useCallback(async () => {
    setStatus('starting');
    setError(null);
    try {
      await startTracking();
      setStatus('tracking');
    } catch (reason) {
      setStatus('error');
      setError(reason instanceof Error ? reason.message : 'Impossible de démarrer le suivi.');
    }
  }, []);

  const stop = useCallback(async () => {
    await stopTracking();
    setStatus('idle');
    setError(null);
  }, []);

  return { config, status, error, configure, start, stop };
}
