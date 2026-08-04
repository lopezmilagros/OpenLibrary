//guarda tipos de TypeScript para los libros.

export interface DescriptionObject {
  value: string;
}

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  description?: string | DescriptionObject;
  subject?: string[];  //lista de temas/categorias.
}