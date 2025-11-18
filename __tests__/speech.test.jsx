import { renderHook, act } from '@testing-library/react';
import { useSpeech } from '../src/hooks/useSpeech.js';

global.SpeechSynthesisUtterance = function (text) {
  this.text = text;
};

test('cancels before speaking', () => {
  const cancel = jest.fn();
  const speak = jest.fn();
  global.window.speechSynthesis = {
    cancel,
    speak,
    getVoices: () => [{ name: 'British English Female', lang: 'en-GB' }],
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  const { result } = renderHook(() => useSpeech('female'));
  act(() => {
    result.current.speak('Hello');
  });

  expect(cancel).toHaveBeenCalled();
  expect(speak).toHaveBeenCalledWith(expect.any(SpeechSynthesisUtterance));
});
