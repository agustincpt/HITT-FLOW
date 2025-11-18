import './Button.css';

export default function SegmentedGroup({ options, value, onChange }) {
  return (
    <div className="segmented-wrap">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`segmented-item ${value === opt.value ? 'active' : ''}`}
          onClick={() => !opt.disabled && onChange(opt.value)}
          disabled={opt.disabled}
          aria-label={opt.label}
        >
          <span className="label">{opt.label}</span>
          {opt.sub && <span className="sub">{opt.sub}</span>}
          {opt.disabled && <span className="overlay">Premium – Coming soon</span>}
        </button>
      ))}
    </div>
  );
}
