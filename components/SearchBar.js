export default function SearchBar({ value, onChange }) {
  return (
    <div className="field">
      <label htmlFor="search">Pesquisar por título</label>
      <input
        id="search"
        type="search"
        placeholder="Digite parte do título..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
