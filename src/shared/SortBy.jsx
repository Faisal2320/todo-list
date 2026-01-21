const SortBy = ({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) => {
  return (
    <>
      <label htmlFor="sort-by">Sort By: </label>
      <select
        name="sort-by"
        id="sort-by"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="createdAt">Creation Date</option>
        <option value="title">Title</option>
      </select>
      <label htmlFor="sort-direction"> Sort Direction: </label>
      <select
        name="sort-direction"
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </>
  );
};

export default SortBy;
