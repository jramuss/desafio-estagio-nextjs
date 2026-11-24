'use client';

export default function StatsBar({ stats }) {
  return (
    <section className="stats-grid" aria-label="Resumo das tarefas">
      <div className="stat-card">
        <span className="stat-card__label">Total</span>
        <strong className="stat-card__value">{stats.total}</strong>
      </div>
      <div className="stat-card">
        <span className="stat-card__label">Pendentes</span>
        <strong className="stat-card__value stat-card__value--warning">{stats.pending}</strong>
      </div>
      <div className="stat-card">
        <span className="stat-card__label">Concluídas</span>
        <strong className="stat-card__value stat-card__value--success">{stats.completed}</strong>
      </div>
      <div className="stat-card">
        <span className="stat-card__label">Progresso</span>
        <strong className="stat-card__value">{stats.rate}%</strong>
      </div>
    </section>
  );
}
