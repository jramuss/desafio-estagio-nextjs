"use client";

import { useMemo, useState } from "react";
import { useTasks } from "../store/tasks-context";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";
import TaskList from "./TaskList";
import Pagination from "./Pagination";
import StateMessage from "./StateMessage";

const PAGE_SIZE = 10;

export default function TaskBoard() {
  const { tasks, users, status, error, actionError, reload, clearActionError } = useTasks();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const usersById = useMemo(() => new Map(users.map((u) => [u.id, u])), [users]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesTitle = task.title.toLowerCase().includes(term);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "pending" && !task.completed) ||
        (statusFilter === "done" && task.completed);
      return matchesTitle && matchesStatus;
    });
  }, [tasks, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSearch(value) {
    setSearch(value);
    setPage(1);
  }

  function handleStatus(value) {
    setStatusFilter(value);
    setPage(1);
  }

  function renderContent() {
    if (status === "loading") {
      return <StateMessage type="loading" title="Carregando tarefas..." />;
    }
    if (status === "error") {
      return (
        <StateMessage
          type="error"
          title="Erro ao carregar as tarefas"
          message={error}
          actionLabel="Tentar novamente"
          onAction={reload}
        />
      );
    }
    if (filtered.length === 0) {
      return (
        <StateMessage
          type="empty"
          title="Nenhuma tarefa encontrada"
          message="Ajuste a pesquisa ou o filtro, ou cadastre uma nova tarefa."
        />
      );
    }
    return (
      <>
        <p className="result-count">
          {filtered.length} {filtered.length === 1 ? "tarefa" : "tarefas"}
        </p>
        <TaskList tasks={visible} usersById={usersById} />
        <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
      </>
    );
  }

  return (
    <>
      <TaskForm />

      {actionError && (
        <div className="banner-error" role="alert">
          <span>{actionError}</span>
          <button type="button" className="btn" onClick={clearActionError}>
            Fechar
          </button>
        </div>
      )}

      <section className="card" aria-label="Lista de tarefas">
        <div className="filters">
          <SearchBar value={search} onChange={handleSearch} />
          <StatusFilter value={statusFilter} onChange={handleStatus} />
        </div>
        {renderContent()}
      </section>
    </>
  );
}
