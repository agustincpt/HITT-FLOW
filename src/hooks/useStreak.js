import { useEffect, useState } from 'react';

const STREAK_KEY = 'hiitflow_streak_v1';

function getDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [lastCompleted, setLastCompleted] = useState(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STREAK_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setStreak(parsed.streak || 0);
        setLastCompleted(parsed.lastCompleted || null);
      } catch (e) {
        setStreak(0);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      STREAK_KEY,
      JSON.stringify({ streak, lastCompleted })
    );
  }, [streak, lastCompleted]);

  const markComplete = () => {
    const today = getDayKey();
    if (lastCompleted === today) return streak;

    const yesterday = getDayKey(new Date(Date.now() - 86400000));
    const nextStreak = lastCompleted === yesterday ? streak + 1 : 1;
    setStreak(nextStreak);
    setLastCompleted(today);
    return nextStreak;
  };

  return { streak, lastCompleted, markComplete };
}

export { getDayKey };
