import type { Book } from "../types/book";
import { useEffect, useState } from "react";
import { getBookDetail } from "../services/OpenLibrary";

interface BookDetailProps {
  book: Book;
  onClose: () => void;
}

function BookDetail({
  book,
  onClose,
}: BookDetailProps) {
    const [detail, setDetail] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        setError("");

        const data = await getBookDetail( book.key );

        setDetail(data);
      } catch {
        setError(
          "Could not load the book details."
        );
      } finally {
        setLoading(false);
      }
    }

        loadDetail();
    }, [book.key]);

    let description =
        "No description available.";

    if ( typeof detail?.description === "string") {
        description = detail.description;
    }

    if (typeof detail?.description === "object" && detail.description !== null) {
        description = detail.description.value;
    }

   return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-2xl text-slate-600 hover:bg-slate-100"
          aria-label="Close book details"
        >
          ×
        </button>

        <div className="flex flex-col gap-8 md:flex-row">

          {book.cover_i ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              alt={`Cover of ${book.title}`}
              className="h-80 w-56 rounded-lg object-cover shadow"
            />
          ) : (
            <div className="flex h-80 w-56 items-center justify-center rounded-lg bg-slate-200 text-slate-500">
              No cover available
            </div>
          )}

          <div className="flex-1">

            <h2 className="pr-8 text-3xl font-bold text-blue-700">
              {book.title}
            </h2>

            <p className="mt-3 text-lg text-slate-600">
              <span className="font-semibold">
                Author:
              </span>{" "}
              {book.author_name?.join(", ") ??
                "Unknown author"}
            </p>

            <p className="mt-2 text-slate-600">
              <span className="font-semibold">
                First published:
              </span>{" "}
              {book.first_publish_year ??
                "Unknown"}
            </p>

            {loading && (
              <p className="mt-6 text-slate-500">
                Loading details...
              </p>
            )}

            {error && (
              <p className="mt-6 text-red-600">
                {error}
              </p>
            )}

            {!loading && !error && (
              <>
                <h3 className="mt-6 text-xl font-bold text-slate-800">
                  Description
                </h3>

                <p className="mt-2 leading-relaxed text-slate-600">
                  {description}
                </p>  
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;