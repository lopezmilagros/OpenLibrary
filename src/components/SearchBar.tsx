interface SearchBarProps {
  readonly onSearch: (query: string) => void;
  readonly query: string;
  readonly onQueryChange: (query: string) => void;
}

function SearchBar({ onSearch, query, onQueryChange }: SearchBarProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //evita recargar pagina.
    event.preventDefault();

    //elimina espacios al principio y al final.
    const cleanQuery = query.trim();

    //evita busqueda vacia.
    if (cleanQuery === "") {
      return;
    }

    onSearch(cleanQuery);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl gap-3 px-4 py-2 mt-10"
    >
      <input
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search for books..."
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;