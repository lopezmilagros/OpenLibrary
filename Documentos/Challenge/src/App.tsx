import { useEffect, useState } from "react";
import { getBooks } from "./services/OpenLibrary";
import type { Book } from "./types/book";
import BookCard from "./components/BookCard";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import BookDetail from "./components/BookDetail";

function App() {

  const [books, setBooks] = useState<Book[]>([]); //guarda libros
  const [loading, setLoading] = useState(true); //indica si está cargando
  const [error, setError] = useState(""); //guarda error

  const [yearFilter, setYearFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const [selectedBook, setSelectedBook] = useState<Book | null>(null); //libro seleccionado para detalle

  async function loadBooks(query: string) {
    try {
      setLoading(true);
      setError("");

      // Consulta a la API de Open Library para obtener libros
      const booksFromAPI = await getBooks(query); // usa la búsqueda recibida

      // guarda los libros en el estado books
      setBooks(booksFromAPI);
    } catch (error) {
      setError("Ocurrió un error al cargar los libros");
    } finally {
      setLoading(false);
    }
  }

  // para ejecutar solo una vez al cargar la página.
  useEffect(() => {
    loadBooks("Best Sellers");
  }, []);


  // filtros.
  //copia de books para no modificar el estado original.
  let filteredBooks = [...books];

  if (yearFilter === "before1950") {
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.first_publish_year !== undefined &&
        book.first_publish_year < 1950
    );
  }

  if (yearFilter === "1950to2000") {
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.first_publish_year !== undefined &&
        book.first_publish_year >= 1950 &&
        book.first_publish_year <= 2000
    );
  }

  if (yearFilter === "after2000") {
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.first_publish_year !== undefined &&
        book.first_publish_year > 2000
    );
  }

  if (sortOrder === "asc") {
  filteredBooks.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}

  if (sortOrder === "desc") {
    filteredBooks.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <header>
        <nav className="flex justify-between ">
          <div className="text-xl font-semibold text-blue-600">
            Book Explorer
          </div>
          <div className="flex space-x-4 items-center mb-8 text-slate-700">
            <a href="#" className="hover:text-blue-600"> Home </a>
            <a href="#" className="hover:text-blue-600"> Contact </a>
            <a href="#" className="hover:text-blue-600"> About </a>
          </div>
        </nav>
      </header>
      <h1 className="text-6xl font-bold text-blue-600 text-center">
        Book Explorer
      </h1>

      <p className="mt-4 text-lg text-slate-700 text-center">
        Search through our collection of books.
      </p>

      {/* Search bar */}
      <SearchBar onSearch={loadBooks} />
      <Filters
        yearFilter={yearFilter}
        sortOrder={sortOrder}
        onYearFilterChange={setYearFilter}
        onSortOrderChange={setSortOrder}
      />

      {/* cargar libros, mostrar error o mostrar libros. */}
      {!loading && !error && filteredBooks.length === 0 && ( <p>No books found.</p> )}

      {loading && <p>Loading books...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && filteredBooks.length > 0 && (
        <section className="grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-4 py-2 mt-10">
          {filteredBooks.map((book) => (
            <BookCard key={book.key} book={book} onClick={() => setSelectedBook(book)} />
          ))}
        </section>
      )}

      {selectedBook && (
        <BookDetail
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

    </main>
  );
}

export default App; 