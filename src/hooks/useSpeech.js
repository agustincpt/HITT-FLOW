import { useEffect, useRef, useState } from 'react';

const voicePreference = {
  female: { nameIncludes: 'Female', lang: 'en-GB' },
  male: { nameIncludes: 'Male', lang: 'en-GB' },
};

export function useSpeech(preference = 'female') {
  const [voices, setVoices] = useState([]);
  const prefRef = useRef(preference);

  useEffect(() => {
    prefRef.current = preference;
  }, [preference]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const handler = () => setVoices(window.speechSynthesis.getVoices());
    handler();
    window.speechSynthesis.addEventListener('voiceschanged', handler);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', handler);
  }, []);

  const speak = (text) => {
    if (!('speechSynthesis' in window) || prefRef.current === 'off') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    const pref = voicePreference[prefRef.current];
    const matching = voices.find(
      (v) => v.lang === 'en-GB' && (!pref || v.name.toLowerCase().includes(pref.nameIncludes.toLowerCase()))
    );
    if (matching) utterance.voice = matching;
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return { speak, cancel };
}
