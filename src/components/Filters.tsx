interface FiltersProps {
  yearFilter: string;
  sortOrder: string;
  onYearFilterChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

function Filters({
  yearFilter,
  sortOrder,
  onYearFilterChange,
  onSortOrderChange,
}: FiltersProps) {
  return (
    <section className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-4">
      <div className="flex flex-col">
        <label
          htmlFor="year"
          className="mb-1 font-medium text-slate-700"
        >
          Publication year
        </label>

        <select
          id="year"
          value={yearFilter}
          onChange={(event) =>
            onYearFilterChange(event.target.value)
          }
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="all">All years</option>
          <option value="before1950">Before 1950</option>
          <option value="1950to2000">1950 - 2000</option>
          <option value="after2000">After 2000</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="sort"
          className="mb-1 font-medium text-slate-700"
        >
          Sort by title
        </label>

        <select
          id="sort"
          value={sortOrder}
          onChange={(event) =>
            onSortOrderChange(event.target.value)
          }
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="default">Default</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>
    </section>
  );
}

export default Filters;