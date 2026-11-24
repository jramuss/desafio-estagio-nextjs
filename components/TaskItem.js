"use client";

import { useTasks } from "../store/tasks-context";

export default function TaskItem({ task, userName }) {
  const { toggleTask, removeTask } = useTasks();
  const checkboxId = `task-${task.id}`;

  return (
    <li className={`task-item ${task.completed ? "is-done" : ""}`}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task)}
      />
      <div className="task-info">
        <label htmlFor={checkboxId} className="task-title">
          {task.title}
        </label>
        <span className="task-meta">Responsável: {userName ?? "Não atribuído"}</span>
      </div>
      <span className={`badge ${task.completed ? "badge-done" : "badge-pending"}`}>
        {task.completed ? "Concluída" : "Pendente"}
      </span>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => removeTask(task)}
        aria-label={`Excluir tarefa: ${task.title}`}
      >
        Excluir
      </button>
    </li>
  );
}
