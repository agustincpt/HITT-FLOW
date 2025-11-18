import { useEffect, useMemo, useRef, useState } from 'react';
import ProgressRing from '../components/ProgressRing.jsx';
import IconButton from '../components/IconButton.jsx';
import { useTimer } from '../hooks/useTimer.js';
import { useSwipe } from '../hooks/useSwipe.js';
import { useWakeLock } from '../hooks/useWakeLock.js';
import './Workout.css';

export default function Workout({ workout, onStop, onComplete, voice }) {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { request, release } = useWakeLock();
  const exercises = workout.routine;

  const handleFinish = () => {
    onComplete();
  };

  const { remaining } = useTimer({
    duration: 60,
    isRunning: !paused,
    key: index,
    onExpire: () => handleNext(),
  });

  const progress = useMemo(() => 1 - remaining / 60, [remaining]);
  const totalRemaining = useMemo(
    () => Math.max(0, (exercises.length - index - 1) * 60 + remaining),
    [exercises.length, index, remaining]
  );

  const speakStart = workout.speech.start;
  const speakNext = workout.speech.next;
  const speakEnd = workout.speech.end;

  const handleNext = () => {
    if (index < exercises.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setPaused(false);
      speakNext(exercises[nextIndex]);
    } else {
      speakEnd();
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      const prevIndex = index - 1;
      setIndex(prevIndex);
      setPaused(false);
      speakNext(exercises[prevIndex]);
    }
  };

  useSwipe(containerRef, { onLeft: handleNext, onRight: handlePrev });

  useEffect(() => {
    speakStart(exercises[0]);
    request();
    return () => {
      workout.speech.cancel?.();
      release();
    };
  }, []);

  const current = exercises[index];
  const next = exercises[index + 1];

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="container" ref={containerRef} aria-label="Workout">
      <div className="card workout-card">
        <div className="label-row">
          <div>
            <div className="badge">{workout.duration} min</div>
            <h2>{current}</h2>
            <p className="text-muted">Next: {next || 'Finish'}</p>
          </div>
          <button className="icon-btn" aria-label="Stop" onClick={onStop}>
            ■
          </button>
        </div>

        <div className="ring-wrap">
          <ProgressRing progress={progress} />
          <div className="ring-center" aria-live="polite">
            <div className="seconds">{Math.ceil(remaining)}</div>
            <div className="text-muted">seconds</div>
          </div>
        </div>
        <div className="text-muted" aria-label="total remaining">
          Total left: {formatTime(totalRemaining)}
        </div>
        <div className="dots" aria-label="exercise progress">
          {exercises.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? 'active' : i < index ? 'done' : ''}`}
              aria-label={`Exercise ${i + 1}`}
            />
          ))}
        </div>
        <div className="controls">
          <IconButton label="Previous" icon="⟵" onClick={handlePrev} />
          <IconButton
            label={paused ? 'Resume' : 'Pause'}
            icon={paused ? '▶' : '⏸'}
            onClick={() => setPaused((p) => !p)}
            variant="accent"
          />
          <IconButton label="Next" icon="⟶" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}
