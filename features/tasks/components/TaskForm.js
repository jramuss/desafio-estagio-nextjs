'use client';

import { useState, useEffect } from 'react';

export default function TaskForm({
  users,
  editingTask,
  onCreate,
  onUpdate,
  onCancelEdit,
  submitting,
}) {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('1');
  const [error, setError] = useState('');

  // Técnico: sincroniza os campos controlados ao entrar/sair do modo de edição.
  // Humano: ao clicar em Editar, os dados aparecem no formulário; ao cancelar, o formulário volta a ficar limpo.
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setUserId(String(editingTask.userId));
      setError('');
    } else {
      setTitle('');
      setUserId(users[0]?.id ? String(users[0].id) : '1');
      setError('');
    }
  }, [editingTask, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      setError('O título deve ter pelo menos 3 caracteres.');
      return;
    }

    setError('');
    if (editingTask) {
      await onUpdate(editingTask.id, {
        title: title.trim(),
        userId: Number(userId),
      });
    } else {
      const ok = await onCreate({ title, userId });
      if (ok) {
        setTitle('');
      }
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__header">
        <h2>{editingTask ? 'Editar tarefa' : 'Nova tarefa'}</h2>
        {editingTask && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onCancelEdit}
            disabled={submitting}
          >
            Cancelar edição
          </button>
        )}
      </div>

      <div className="task-form__fields">
        <div className="form-group form-group--grow">
          <label htmlFor="task-title">Título</label>
          <input
            id="task-title"
            type="text"
            placeholder="Ex: Revisar Pull Request da sprint..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-user">Responsável</label>
          <select
            id="task-user"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={submitting}
          >
            {users.length === 0 && <option value="1">Membro #1</option>}
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn--primary" disabled={submitting}>
          {submitting ? 'Salvando...' : editingTask ? 'Salvar alterações' : 'Adicionar'}
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
