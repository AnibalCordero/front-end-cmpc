export interface Book {
  id: number;
  title: string;
  price: number;
  available: boolean;
  image?: string;
  author: { id: number; name: string };
  genre: { id: number; name: string };
  editorial: { id: number; name: string };
}


export interface IBookQuery {
  page: number;
  limit: number;
  genreId?: string;
  authorId?: string;
  editorialId?: string;
  available?: string;
  title?: string;
  orderBy?: string;
  order?: 'ASC' | 'DESC';
}
