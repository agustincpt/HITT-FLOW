import { act, renderHook } from '@testing-library/react';
import { useTimer } from '../src/hooks/useTimer.js';

beforeEach(() => {
  jest.useFakeTimers();
  global.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
  global.cancelAnimationFrame = (id) => clearTimeout(id);
});

afterEach(() => {
  jest.useRealTimers();
});

test('counts down 60 seconds and triggers expire', () => {
  const onExpire = jest.fn();
  const { result } = renderHook(() => useTimer({ duration: 60, isRunning: true, onExpire }));
  act(() => {
    jest.advanceTimersByTime(60000);
  });
  expect(onExpire).toHaveBeenCalled();
  expect(result.current.remaining).toBeLessThanOrEqual(0);
});

test('resets when key changes', () => {
  const { result, rerender } = renderHook(
    ({ key }) => useTimer({ duration: 60, isRunning: true, key }),
    { initialProps: { key: 0 } }
  );
  act(() => jest.advanceTimersByTime(30000));
  expect(result.current.remaining).toBeLessThan(40);
  rerender({ key: 1 });
  expect(result.current.remaining).toBeCloseTo(60, 0);
});
