import { renderHook, act } from '@testing-library/react';
import { usePrefs, prefsDefaults } from '../src/hooks/usePrefs.js';

beforeEach(() => {
  window.localStorage.clear();
});

test('loads defaults and saves updates', () => {
  const { result } = renderHook(() => usePrefs());
  expect(result.current[0]).toEqual(prefsDefaults);

  act(() => {
    result.current[1]({ duration: 7, music: 'off', voice: 'male' });
  });

  const stored = JSON.parse(window.localStorage.getItem('hiitflow_prefs_v1'));
  expect(stored).toEqual({ duration: 7, music: 'off', voice: 'male' });
});

test('restores persisted preferences', () => {
  window.localStorage.setItem(
    'hiitflow_prefs_v1',
    JSON.stringify({ duration: 15, music: 'energetic', voice: 'female' })
  );
  const { result } = renderHook(() => usePrefs());
  expect(result.current[0]).toEqual({ duration: 15, music: 'energetic', voice: 'female' });
});
