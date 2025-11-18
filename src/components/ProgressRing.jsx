import { useMemo } from 'react';
import './ProgressRing.css';

export default function ProgressRing({ progress, size = 220 }) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = useMemo(
    () => circumference - progress * circumference,
    [circumference, progress]
  );

  return (
    <svg className="ring" width={size} height={size} role="img" aria-label="exercise progress">
      <circle
        className="ring-bg"
        stroke="var(--border)"
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="ring-progress"
        stroke="var(--accent)"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashOffset}
        style={{ transition: 'stroke-dashoffset 1s linear' }}
      />
    </svg>
  );
}
