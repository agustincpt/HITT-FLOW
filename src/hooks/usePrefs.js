import { useEffect, useState } from 'react';

const STORAGE_KEY = 'hiitflow_prefs_v1';

const defaultPrefs = {
  duration: 10,
  music: 'relax',
  voice: 'female',
};

export function usePrefs() {
  const [prefs, setPrefs] = useState(defaultPrefs);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPrefs({ ...defaultPrefs, ...parsed });
      } catch (e) {
        setPrefs(defaultPrefs);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  return [prefs, setPrefs];
}

export const prefsDefaults = defaultPrefs;
