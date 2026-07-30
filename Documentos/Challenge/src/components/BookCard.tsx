import type { Book } from "../types/book";

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

function BookCard({ book, onClick}: BookCardProps) {
  return (
    <article className="cursor-pointer rounded-xl bg-white p-4 shadow" onClick={onClick}>
      {book.cover_i ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={`Portada de ${book.title}`}
          className="h-64 w-full rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg bg-slate-200">
          Sin portada
        </div>
      )}

      <h2 className="mt-4 text-lg font-bold">
        {book.title}
      </h2>

      <p className="text-slate-600">
        {book.author_name?.[0] ?? "Autor desconocido"}
      </p>

      <p className="text-sm text-slate-500">
        {book.first_publish_year ?? "Año desconocido"}
      </p>
    </article>
  );
}

export default BookCard;