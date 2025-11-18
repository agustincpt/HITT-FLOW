import { renderHook, act } from '@testing-library/react';
import { useStreak, getDayKey } from '../src/hooks/useStreak.js';

afterEach(() => {
  window.localStorage.clear();
});

test('increments on consecutive days and resets otherwise', () => {
  const { result } = renderHook(() => useStreak());

  act(() => {
    result.current.markComplete();
  });
  expect(result.current.streak).toBe(1);

  const yesterday = new Date(Date.now() - 86400000);
  window.localStorage.setItem(
    'hiitflow_streak_v1',
    JSON.stringify({ streak: 1, lastCompleted: getDayKey(yesterday) })
  );

  const { result: next } = renderHook(() => useStreak());
  act(() => {
    next.current.markComplete();
  });
  expect(next.current.streak).toBe(2);

  window.localStorage.setItem(
    'hiitflow_streak_v1',
    JSON.stringify({ streak: 3, lastCompleted: getDayKey(new Date(Date.now() - 3 * 86400000)) })
  );
  const { result: reset } = renderHook(() => useStreak());
  act(() => reset.current.markComplete());
  expect(reset.current.streak).toBe(1);
});
