import { useEffect, useRef, useState } from 'react';

export function useTimer({ duration = 60, isRunning = false, onExpire, key }) {
  const [remaining, setRemaining] = useState(duration);
  const startRef = useRef(null);
  const pausedFor = useRef(0);
  const rafRef = useRef(null);
  const lastTimestamp = useRef(null);

  const tick = (timestamp) => {
    if (!startRef.current) return;
    if (!lastTimestamp.current) lastTimestamp.current = timestamp;
    const elapsed = timestamp - startRef.current - pausedFor.current;
    const nextRemaining = Math.max(0, duration - elapsed / 1000);
    setRemaining(nextRemaining);
    if (nextRemaining <= 0) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      onExpire?.();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    setRemaining(duration);
    startRef.current = null;
    pausedFor.current = 0;
    lastTimestamp.current = null;
  }, [duration, key]);

  useEffect(() => {
    if (isRunning) {
      const now = performance.now();
      if (!startRef.current) {
        startRef.current = now;
      } else if (lastTimestamp.current) {
        pausedFor.current += now - lastTimestamp.current;
      }
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimestamp.current = performance.now();
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning]);

  return { remaining };
}
