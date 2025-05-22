import { useEffect, useState } from "react";
import { getAuthors } from "../services/author.service";
import { getEditorials } from "../services/editorial.service";
import { getGenres } from "../services/genre.service";
import { FilterSelect } from "./FilterSelect";
import "../../../styles/components/book/BookFilter.css";

interface Props {
  genre: string;
  author: string;
  editorial: string;
  available: string;
  title: string;
  orderBy: string;
  order: "ASC" | "DESC";
  setGenre: (value: string) => void;
  setAuthor: (value: string) => void;
  setEditorial: (value: string) => void;
  setAvailable: (value: string) => void;
  setTitle: (value: string) => void;
  setOrderBy: (value: string) => void;
  setOrderDirection: (value: "ASC" | "DESC") => void;
  resetBooks: () => void;
}

export const BookFilters = ({
  genre,
  author,
  editorial,
  available,
  title,
  orderBy,
  order,
  setGenre,
  setAuthor,
  setEditorial,
  setAvailable,
  setTitle,
  resetBooks,
  setOrderBy,
  setOrderDirection,
}: Props) => {
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editorials, setEditorials] = useState([]);

  useEffect(() => {
    getGenres().then(setGenres);
    getAuthors().then(setAuthors);
    getEditorials().then(setEditorials);
  }, []);

  return (
    <form className="filters-form" role="search" aria-label="Filtros de libros">
      <fieldset className="filter-group">
        <label htmlFor="title">Buscar:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Buscar por título..."
        />
      </fieldset>

      <FilterSelect
        label="Género"
        value={genre}
        onChange={(val) => {
          setGenre(val);
          resetBooks();
        }}
        options={[
          { value: "", label: "Todos" },
          ...genres.map(({ id, name }: any) => ({ value: id, label: name })),
        ]}
      />

      <FilterSelect
        label="Autor"
        value={author}
        onChange={(val) => {
          setAuthor(val);
          resetBooks();
        }}
        options={[
          { value: "", label: "Todos" },
          ...authors.map(({ id, name }: any) => ({ value: id, label: name })),
        ]}
      />

      <FilterSelect
        label="Editorial"
        value={editorial}
        onChange={(val) => {
          setEditorial(val);
          resetBooks();
        }}
        options={[
          { value: "", label: "Todas" },
          ...editorials.map(({ id, name }: any) => ({
            value: id,
            label: name,
          })),
        ]}
      />

      <FilterSelect
        label="Disponibilidad"
        value={available}
        onChange={(val) => {
          setAvailable(val);
          resetBooks();
        }}
        options={[
          { value: "", label: "Todas" },
          { value: "true", label: "Sí" },
          { value: "false", label: "No" },
        ]}
      />

      <fieldset className="filter-group">
        <label htmlFor="orderBy">Ordenar por:</label>
        <select
          id="orderBy"
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
        >
          <option value="title">Título</option>
          <option value="price">Precio</option>
          <option value="author">Autor</option>
          <option value="editorial">Editorial</option>
          <option value="genre">Género</option>
        </select>

        <select
          id="orderDirection"
          value={order}
          onChange={(e) => setOrderDirection(e.target.value as "ASC" | "DESC")}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </fieldset>
    </form>
  );
};
