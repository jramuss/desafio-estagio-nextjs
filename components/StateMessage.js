export default function StateMessage({ type, title, message, actionLabel, onAction }) {
  return (
    <div
      className={`state-message state-${type}`}
      role={type === "error" ? "alert" : "status"}
    >
      {type === "loading" && <span className="spinner" aria-hidden="true" />}
      <strong>{title}</strong>
      {message && <p>{message}</p>}
      {actionLabel && (
        <button type="button" className="btn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
