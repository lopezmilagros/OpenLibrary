//conexion con la API.

import type { Book } from "../types/book";

export async function getBooks(query: string): Promise<Book[]> {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("No se pudieron cargar los libros");
  }

  const data = await response.json();

  return data.docs;
}

export async function getBookDetail(
  bookKey: string
): Promise<Book> {
  const response = await fetch(
    `https://openlibrary.org${bookKey}.json`
  );

  if (!response.ok) {
    throw new Error(
      "No se pudo cargar el detalle del libro"
    );
  }

  const data: Book = await response.json();

  return data;
}