//conexion con la API.

import type { Book } from "../types/book";

export async function getBooks(query: string, page:number=1): Promise<Book[]> {

  const url = `/api/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=20`;
  console.log("URL solicitada:", url);

  // uso Vite como proxy para evitar problemas de CORS. La ruta /api/search.json es manejada por Vite y redirige a la API de Open Library.
  const response = await fetch(
    `/api/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=20`
  );
  
  console.log("estado de la rta:", response.status);

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