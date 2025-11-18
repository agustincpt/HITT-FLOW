import { useEffect, useRef } from 'react';

export function useSwipe(ref, { onLeft, onRight, threshold = 30, cooldown = 350 }) {
  const startX = useRef(null);
  const startY = useRef(null);
  const lastTrigger = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleStart = (e) => {
      const touch = e.changedTouches[0];
      startX.current = touch.clientX;
      startY.current = touch.clientY;
    };

    const handleEnd = (e) => {
      const now = Date.now();
      if (now - lastTrigger.current < cooldown) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX.current;
      const dy = touch.clientY - startY.current;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        lastTrigger.current = now;
        if (dx < 0) onLeft?.();
        else onRight?.();
      }
    };

    el.addEventListener('touchstart', handleStart);
    el.addEventListener('touchend', handleEnd);
    return () => {
      el.removeEventListener('touchstart', handleStart);
      el.removeEventListener('touchend', handleEnd);
    };
  }, [ref, onLeft, onRight, threshold, cooldown]);
}
