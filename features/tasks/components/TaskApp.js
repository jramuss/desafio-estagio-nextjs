'use client';

import '../styles/tasks.css';
import { useTaskManager } from '../hooks/useTaskManager';
import StatsBar from './StatsBar';
import Toolbar from './Toolbar';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import Feedback from './Feedback';

export default function TaskApp() {
  // Técnico: TaskApp compõe componentes controlados e recebe ações/data do hook gerenciador.
  // Humano: esta é a "sala de controle" da tela, que organiza dados e peças visuais.
  const {
    tasks,
    users,
    userMap,
    stats,
    loading,
    submitting,
    feedback,
    setFeedback,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    userFilter,
    setUserFilter,
    editingTask,
    setEditingTask,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    reload,
  } = useTaskManager();

  return (
    <main className="app-container">
      <header className="app-header">
        <div>
          <h1>TaskFlow</h1>
          <p className="app-subtitle">Gerenciamento de tarefas da equipe</p>
        </div>
        <button type="button" className="btn btn--ghost" onClick={reload} disabled={loading}>
          Atualizar lista
        </button>
      </header>

      <Feedback feedback={feedback} onClose={() => setFeedback(null)} />

      <StatsBar stats={stats} />

      <TaskForm
        users={users}
        editingTask={editingTask}
        onCreate={createTask}
        onUpdate={updateTask}
        onCancelEdit={() => setEditingTask(null)}
        submitting={submitting}
      />

      <Toolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        userFilter={userFilter}
        onUserFilterChange={setUserFilter}
        users={users}
      />

      <section className="task-list" aria-label="Lista de tarefas">
        {loading ? (
          <div className="empty-state">Carregando tarefas...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            Nenhuma tarefa encontrada com os filtros atuais.
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              userName={userMap[task.userId]}
              onToggle={toggleTask}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </section>
    </main>
  );
}
