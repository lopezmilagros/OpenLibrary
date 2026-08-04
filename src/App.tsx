import { useCallback, useEffect, useRef, useState } from "react";
import { getBooks } from "./services/OpenLibrary";
import type { Book } from "./types/book";
import BookCard from "./components/BookCard";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import BookDetail from "./components/BookDetail";
import ContactDetail from "./components/ContactDetail";
import logo from "./Assets/logo.png";

function App() {

  const [books, setBooks] = useState<Book[]>([]); //guarda libros
  const [loading, setLoading] = useState(true); //indica si está cargando
  const [error, setError] = useState(""); //guarda error

  const [page, setPage] = useState(1); //página actual
  const [loadingMore, setLoadingMore] = useState(false); //indica si está cargando más libros
  const [hasMore, setHasMore] = useState(true); //indica si hay más libros para cargar

  const loadMoreRef = useRef<HTMLDivElement | null>(null); //referencia al div de carga más

  const [selectedBook, setSelectedBook] = useState<Book | null>(null); //libro seleccionado para detalle
  const [showContact, setShowContact] = useState(false);

  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("search") || "";
  });
  

  const [yearFilter, setYearFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search);

    return params.get("year") || "all";
  });

  const [sortOrder, setSortOrder] = useState(() => {
    const params = new URLSearchParams(window.location.search);

    return params.get("sort") || "default";
  });

  // loadBooks para busquedas hechas por el usuario.
 const loadBooks = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError("");


      // Consulta a la API de Open Library para obtener libros
      const booksFromAPI = await getBooks(query); // usa la búsqueda recibida

      // guarda los libros en el estado books
      setBooks(booksFromAPI);
      setPage(1);
      setHasMore(booksFromAPI.length == 20);
    } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load books. Please try again later.");
        }
        console.error(error);
      } finally {
      setLoading(false);
    }
  }, []);

  // loadMoreBooks para cargar más libros cuando el usuario hace scroll.
   const loadMoreBooks = useCallback(async () => {
    if (loadingMore || !hasMore) {
      return;
    }

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const moreBooks = await getBooks(
        searchQuery,
        nextPage
      );

      setBooks((currentBooks) => [
        ...currentBooks,
        ...moreBooks,
      ]);

      setPage(nextPage);

      if (moreBooks.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, searchQuery]);

  // para ejecutar solo una vez al cargar la página.
  useEffect(() => {
    // espera API y carga libros iniciales.
    async function loadInitialBooks() {
      try {
        const booksFromAPI = await getBooks("popular");
        setBooks(booksFromAPI);
        setPage(1);
        setHasMore(booksFromAPI.length > 0);
      }

      catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load books. Please try again later.");
        }
        console.error(error);
      } finally {
          setLoading(false);
        }
    }

    void loadInitialBooks();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          loadMoreBooks();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    const currentElement = loadMoreRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [loadMoreBooks]);

  // Actualiza URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery !== "Best Sellers") {
      params.set("search", searchQuery);
    }

    if (yearFilter !== "all") {
      params.set("year", yearFilter);
    }

    if (sortOrder !== "default") {
      params.set("sort", sortOrder);
    }

    const queryString = params.toString();

    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState(
      {},
      "",
      newUrl
    );
  }, [searchQuery, yearFilter, sortOrder]);


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

  const handleHomeClick = () => {
    setSearchQuery("");
    setYearFilter("all");
    setSortOrder("default");

    loadBooks("popular");
  };

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <header>
        <nav className="flex justify-between ">
          <div className="flex items-center gap-0">
            <img src={logo} alt="BookExplorer logo" className="h-9 w-9 object-contain" />
            <span className="text-2xl font-bold text-blue-700">BookExplorer</span>
          </div>
          <div className="flex space-x-4 items-center mb-8 text-slate-700">
            <button type="button" onClick={handleHomeClick} className="hover:text-blue-600"> Home </button>
            <button type="button" onClick={() => setShowContact(true)} className="hover:text-blue-600"> Contact </button>
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
      <SearchBar onSearch={loadBooks} query={searchQuery} onQueryChange={setSearchQuery} />
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
        <>
          <div ref={loadMoreRef} />
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-4 py-2 mt-10">
            {filteredBooks.map((book) => (
              <BookCard key={book.key} book={book} onClick={() => setSelectedBook(book)} />
            ))}
          </section>

          <div ref={loadMoreRef} className="flex justify-center py-8" >
            {loadingMore && (
              <p className="text-slate-600"> Loading more books... </p>
            )}

            {!hasMore && (
              <p className="text-slate-500"> No more books to load. </p>
            )}
          </div>
        </>
      )}

      {selectedBook && (
        <BookDetail
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {showContact && (
        <ContactDetail
          onClose={() => setShowContact(false)}
        />
)}

    </main>
  );
}

export default App; 