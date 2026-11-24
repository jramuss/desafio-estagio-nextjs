'use client';

export default function Toolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  userFilter,
  onUserFilterChange,
  users,
}) {
  return (
    <section className="toolbar" aria-label="Filtros e busca">
      <div className="toolbar__field toolbar__field--search">
        <label htmlFor="task-search" className="sr-only">
          Buscar tarefa
        </label>
        <input
          id="task-search"
          type="search"
          placeholder="Buscar tarefa por título..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="toolbar__field">
        <label htmlFor="status-filter" className="sr-only">
          Filtrar por status
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <option value="all">Todos os status</option>
          <option value="pending">Pendentes</option>
          <option value="completed">Concluídas</option>
        </select>
      </div>

      <div className="toolbar__field">
        <label htmlFor="user-filter" className="sr-only">
          Filtrar por responsável
        </label>
        <select
          id="user-filter"
          value={userFilter}
          onChange={(e) => onUserFilterChange(e.target.value)}
        >
          <option value="all">Todos os membros</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
