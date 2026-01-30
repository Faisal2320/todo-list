const FilterInput = ({ filterTerm, onFilterTerm }) => {
  return (
    <div>
      <label htmlFor="filterInput">Filter:</label>
      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterTerm(e.target.value)}
        placeholder="Search by title..."
      />
    </div>
  );
};

export default FilterInput;
