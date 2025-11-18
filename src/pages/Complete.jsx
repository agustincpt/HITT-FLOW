import PrimaryButton from '../components/PrimaryButton.jsx';

export default function Complete({ onRestart, onConfig, streak }) {
  return (
    <div className="container">
      <div className="card stack-lg" aria-label="Complete">
        <div className="stack-md">
          <div className="badge">Well done</div>
          <h2>Workout complete</h2>
          <p className="text-muted">Great job! See you tomorrow.</p>
          <p className="text-muted">Current streak: {streak} 🔥</p>
        </div>
        <PrimaryButton label="Quick Start" onClick={onRestart} />
        <PrimaryButton label="Back to Config" onClick={onConfig} />
      </div>
    </div>
  );
}
