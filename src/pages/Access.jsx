import PrimaryButton from '../components/PrimaryButton.jsx';

export default function Access({ onEnter, onQuickStart }) {
  return (
    <div className="container">
      <div className="card stack-lg" aria-label="Access">
        <div className="stack-md">
          <div className="badge">HIIT-Inspired routines</div>
          <h1>HIIT&FLOW</h1>
          <p className="text-muted">Routines for vitality and longevity.</p>
        </div>
        <PrimaryButton label="Enter" onClick={onEnter} />
        <PrimaryButton label="Quick Start" onClick={onQuickStart} />
      </div>
    </div>
  );
}
