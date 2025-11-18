import { useEffect, useMemo, useState } from 'react';
import Access from './pages/Access.jsx';
import Config from './pages/Config.jsx';
import Workout from './pages/Workout.jsx';
import Complete from './pages/Complete.jsx';
import { routines } from './data/routines.js';
import { usePrefs } from './hooks/usePrefs.js';
import { useSpeech } from './hooks/useSpeech.js';
import { useStreak } from './hooks/useStreak.js';
import './styles/tokens.css';
import './components/Button.css';

const stages = {
  ACCESS: 'access',
  CONFIG: 'config',
  WORKOUT: 'workout',
  COMPLETE: 'complete',
};

function buildSpeech(speak, cancel, duration) {
  return {
    start: (first) => speak(`Starting ${duration} minute workout. First exercise: ${first}.`),
    next: (next) => speak(`Next: ${next}, 1 minute.`),
    end: () => speak('Workout complete. Great job! See you tomorrow.'),
    cancel,
  };
}

export default function App() {
  const [prefs, setPrefs] = usePrefs();
  const [stage, setStage] = useState(stages.ACCESS);
  const [workout, setWorkout] = useState(null);
  const [theme, setTheme] = useState('light');
  const { streak, markComplete } = useStreak();
  const { speak, cancel } = useSpeech(prefs.voice);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  const startWorkout = (selectedPrefs) => {
    const routine = routines[selectedPrefs.duration];
    const speech = buildSpeech(speak, cancel, selectedPrefs.duration);
    setPrefs(selectedPrefs);
    setWorkout({ duration: selectedPrefs.duration, routine, speech });
    setStage(stages.WORKOUT);
  };

  const quickStart = () => startWorkout(prefs);

  const completeWorkout = () => {
    markComplete();
    setStage(stages.COMPLETE);
  };

  const total = useMemo(() => routines[prefs.duration]?.length || 0, [prefs.duration]);

  return (
    <div>
      <div className="container" style={{ textAlign: 'right', paddingTop: '12px' }}>
        <button
          className="segmented-item"
          style={{ width: 'auto', padding: '10px 12px', boxShadow: 'none' }}
          onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '☾ Dark' : '☀ Light'}
        </button>
      </div>
      {stage === stages.ACCESS && (
        <Access onEnter={() => setStage(stages.CONFIG)} onQuickStart={quickStart} />
      )}
      {stage === stages.CONFIG && (
        <Config
          prefs={prefs}
          streak={streak}
          onChangePrefs={setPrefs}
          onStart={startWorkout}
          onQuickStart={quickStart}
        />
      )}
      {stage === stages.WORKOUT && workout && (
        <Workout
          workout={workout}
          onStop={() => setStage(stages.CONFIG)}
          onComplete={completeWorkout}
          total={total}
        />
      )}
      {stage === stages.COMPLETE && (
        <Complete onRestart={quickStart} onConfig={() => setStage(stages.CONFIG)} streak={streak} />
      )}
    </div>
  );
}
