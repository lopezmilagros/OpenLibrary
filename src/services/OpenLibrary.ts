//conexion con la API.

import type { Book } from "../types/book";

export async function getBooks(query: string, page:number=1): Promise<Book[]> {
  const response = await fetch(
    `/api/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=20`
  );

  if (!response.ok) {
    throw new Error("Failed to load books. Please try again later.");
  }

  const data = await response.json();

  return data.docs;
}

export async function getBookDetail(
  bookKey: string
): Promise<Book> {
  const response = await fetch(
    `/api${bookKey}.json`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load book details. Please try again later."
    );
  }

  const data: Book = await response.json();

  return data;
}