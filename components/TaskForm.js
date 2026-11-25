"use client";

import { useState } from "react";
import { useTasks } from "../store/tasks-context";

export default function TaskForm() {
  const { users, addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next = {};
    if (title.trim().length < 3) next.title = "Informe um título com pelo menos 3 caracteres.";
    if (!userId) next.userId = "Selecione um responsável.";
    return next;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    const ok = await addTask({ title: title.trim(), userId: Number(userId) });
    setSubmitting(false);

    if (ok) {
      setTitle("");
      setUserId("");
    }
  }

  return (
    <form className="card task-form" onSubmit={handleSubmit} noValidate>
      <h2>Nova tarefa</h2>
      <div className="form-row">
        <div className="field grow">
          <label htmlFor="task-title">Título</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <span id="title-error" className="field-error">
              {errors.title}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="task-user">Responsável</label>
          <select
            id="task-user"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={users.length === 0}
            aria-invalid={Boolean(errors.userId)}
            aria-describedby={errors.userId ? "user-error" : undefined}
          >
            <option value="">Selecione...</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          {errors.userId && (
            <span id="user-error" className="field-error">
              {errors.userId}
            </span>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Salvando..." : "Adicionar"}
        </button>
      </div>
    </form>
  );
}
