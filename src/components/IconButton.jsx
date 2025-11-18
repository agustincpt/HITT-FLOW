import './Button.css';

export default function IconButton({ icon, label, onClick, variant = 'ghost', disabled = false }) {
  return (
    <button
      className={`icon-btn ${variant === 'accent' ? 'primary' : ''}`}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
