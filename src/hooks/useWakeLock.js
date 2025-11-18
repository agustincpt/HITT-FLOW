import { useCallback, useEffect, useRef, useState } from 'react';

export function useWakeLock() {
  const wakeLockRef = useRef(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported('wakeLock' in navigator);
  }, []);

  const request = useCallback(async () => {
    if (wakeLockRef.current || !('wakeLock' in navigator)) return;
    try {
      wakeLockRef.current = await navigator.wakeLock.request('screen');
      wakeLockRef.current.addEventListener('release', () => {
        wakeLockRef.current = null;
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const release = useCallback(async () => {
    if (wakeLockRef.current) {
      await wakeLockRef.current.release();
      wakeLockRef.current = null;
    }
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && wakeLockRef.current) {
        request();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [request]);

  return { request, release, supported };
}
