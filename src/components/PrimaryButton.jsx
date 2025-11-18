import './Button.css';

export default function PrimaryButton({ label, onClick, type = 'button', disabled = false }) {
  return (
    <button
      className="primary-btn"
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {label}
    </button>
  );
}
