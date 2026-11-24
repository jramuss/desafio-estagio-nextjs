const OPTIONS = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendentes" },
  { value: "done", label: "Concluídas" },
];

export default function StatusFilter({ value, onChange }) {
  return (
    <div className="field">
      <label htmlFor="status-filter">Status</label>
      <select id="status-filter" value={value} onChange={(e) => onChange(e.target.value)}>
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
