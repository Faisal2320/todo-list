const FilterInput = ({ filterTerm, onFilterTerm }) => {
  return (
    <div className="form-group">
      <label htmlFor="filterInput" className="form-label">
        Filter
      </label>

      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterTerm(e.target.value)}
        placeholder="Search by title..."
        className="input"
      />
    </div>
  );
};

export default FilterInput;
