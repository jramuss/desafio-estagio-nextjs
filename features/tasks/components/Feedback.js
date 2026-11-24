'use client';

export default function Feedback({ feedback, onClose }) {
  if (!feedback) return null;

  return (
    <div
      className={`feedback feedback--${feedback.type}`}
      role="alert"
      aria-live={feedback.type === 'error' ? 'assertive' : 'polite'}
    >
      <span>{feedback.message}</span>
      <button
        type="button"
        className="feedback__close"
        onClick={onClose}
        aria-label="Fechar aviso"
      >
        ×
      </button>
    </div>
  );
}
