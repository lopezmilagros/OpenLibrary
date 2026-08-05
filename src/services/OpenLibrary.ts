//conexion con la API.

import type { Book } from "../types/book";

export async function getBooks(query: string, page:number=1): Promise<Book[]> {
  // uso Vite como proxy para evitar problemas de CORS. La ruta /api/search.json es manejada por Vite y redirige a la API de Open Library.
  const response = await fetch(
    `/api/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=20`
  );
  
  if (!response.ok) {
    if (response.status === 503) {
      throw new Error(
      "Open Library is temporarily unavailable. Please try again in a moment."
      );
    }
    if (response.status === 504) {
      throw new Error(
        "Open Library is taking too long to respond. Please try again."
      );
    }

    throw new Error("Failed to load books. Please try again later.");
  }

  const data = await response.json();

  return data.docs;
}

export async function getDefaultBooks(page:number=1, subject = "classics"): Promise<Book[]> {
  const response = await fetch(
    `/api/search.json?subject=${subject}&sort=rating&page=${page}&limit=20`
  );

  if (!response.ok) {
    throw new Error("Failed to load books. Please try again later.");
  }

  const data = await response.json();

  const books: Book[] = data.docs.map((doc: Book) => ({
    key: doc.key,
    title: doc.title,
    author_name: doc.author_name ?? [],
    first_publish_year: doc.first_publish_year,
    cover_i: doc.cover_i,
    subject: doc.subject,
  }));

  return books;
}

export async function getBookDetail( bookKey: string): Promise<Book> {
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