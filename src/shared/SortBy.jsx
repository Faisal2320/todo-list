const SortBy = ({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) => {
  return (
    <div className="flex items-center gap-4 w-full">
      {/* Sort By */}
      <div className="form-group">
        <label htmlFor="sort-by" className="form-label">
          Sort By
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="input"
        >
          <option value="createdAt">Creation Date</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* Sort Direction */}
      <div className="form-group">
        <label htmlFor="sort-direction" className="form-label">
          Sort Direction
        </label>
        <select
          id="sort-direction"
          value={sortDirection}
          onChange={(e) => onSortDirectionChange(e.target.value)}
          className="input"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default SortBy;
