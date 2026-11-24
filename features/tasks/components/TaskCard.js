'use client';

export default function TaskCard({ task, userName, onToggle, onEdit, onDelete }) {
  return (
    <article className={`task-card ${task.completed ? 'task-card--completed' : ''}`}>
      {/* Técnico: a classe de conclusão altera o estilo derivado do estado.
          Humano: uma tarefa concluída parece finalizada e ganha riscado. */}
      <div className="task-card__main">
        <input
          type="checkbox"
          className="task-card__checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          aria-label={`Marcar "${task.title}" como ${task.completed ? 'pendente' : 'concluída'}`}
        />

        <div className="task-card__content">
          <h3 className="task-card__title">{task.title}</h3>
          <div className="task-card__meta">
            <span className={`badge ${task.completed ? 'badge--success' : 'badge--warning'}`}>
              {task.completed ? 'Concluída' : 'Pendente'}
            </span>
            <span className="task-card__user">
              Responsável: {userName || `Membro #${task.userId}`}
            </span>
          </div>
        </div>
      </div>

      <div className="task-card__actions">
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => onEdit(task)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn--danger btn--sm"
          onClick={() => {
            if (window.confirm(`Excluir a tarefa "${task.title}"?`)) {
              onDelete(task.id);
            }
          }}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}
