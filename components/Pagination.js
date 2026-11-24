export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Paginação">
      <button
        type="button"
        className="btn"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        Anterior
      </button>
      <span aria-live="polite">
        Página {page} de {totalPages}
      </span>
      <button
        type="button"
        className="btn"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        Próxima
      </button>
    </nav>
  );
}
