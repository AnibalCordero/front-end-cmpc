import { useEffect, useState } from "react";
import { getBooks } from "../services/book.service";
import { BookCard } from "../components/BookCard";
import type { Book, IBookQuery } from "@/types/interfaces/book.interface";
import { BookFilters } from "../components/BookFilters";
import { NoResults } from "@/components/NoResults";
import { AddBookButton } from "../components/AddBookButton";
import "../../../styles/components/book/BookList.css";
import { useDebounce } from "@/hooks/useDebounce";

export const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalBooks, setTotalBooks] = useState(0);

  const [loading, setLoading] = useState(false);
  const [genreId, setGenre] = useState("");
  const [authorId, setAuthor] = useState("");
  const [editorialId, setEditorial] = useState("");
  const [available, setAvailable] = useState("");
  const [title, setTitle] = useState("");
  const debouncedTitle = useDebounce(title, 300);
  const [orderBy, setOrderBy] = useState("title");
  const [order, setOrderDirection] = useState<"ASC" | "DESC">("ASC");

  const fetchBooks = async (pageToFetch: number) => {
    setLoading(true);

    const query: IBookQuery = {
      page: pageToFetch,
      limit,
      genreId,
      authorId,
      editorialId,
      available,
      title: debouncedTitle.trim(),
      orderBy,
      order,
    };

    const data = await getBooks(query);

    setBooks(data.data);
    setTotalBooks(data.total);
    setLoading(false);
  };

  const exportToCSV = (books: Book[]) => {
    const headers = [
      "Título",
      "Autor",
      "Género",
      "Editorial",
      "Precio",
      "Disponible",
    ];
    const rows = books.map((book) => [
      `"${book.title}"`,
      `"${book.author?.name || ""}"`,
      `"${book.genre?.name || ""}"`,
      `"${book.editorial?.name || ""}"`,
      `"${book.price}"`,
      `"${book.available ? "Sí" : "No"}"`,
    ]);

    const csvContent =
      "\uFEFF" + [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "libros.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [genreId, authorId, editorialId, available, debouncedTitle, limit]);

  useEffect(() => {
    fetchBooks(1);
  }, [genreId, authorId, editorialId, available, debouncedTitle, limit]);

  useEffect(() => {
    setPage(1);
  }, [orderBy, order]);

  useEffect(() => {
    fetchBooks(1);
  }, [orderBy, order]);

  const totalPages = Math.ceil(totalBooks / limit);

  return (
    <section className="BookList">
      <h1>
        Libros disponibles
        <section>
          <AddBookButton />
          <button
            onClick={() => exportToCSV(books)}
            className="p-button p-button-secondary export-button"
          >
            Exportar CSV
          </button>
        </section>
      </h1>

      <BookFilters
        genre={genreId}
        author={authorId}
        editorial={editorialId}
        available={available}
        title={title}
        orderBy={orderBy}
        order={order}
        setGenre={setGenre}
        setAuthor={setAuthor}
        setEditorial={setEditorial}
        setAvailable={setAvailable}
        setTitle={setTitle}
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
        resetBooks={() => {
          setBooks([]);
          setPage(1);
          setTotalBooks(0);
        }}
      />

      {books.length === 0 && !loading && (
        <NoResults
          onReset={() => {
            setGenre("");
            setAuthor("");
            setEditorial("");
            setAvailable("");
            setTitle("");
            setBooks([]);
            setPage(1);
            setTotalBooks(0);
          }}
        />
      )}

      <main>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onDelete={(id) =>
              setBooks((prevBooks) =>
                prevBooks.filter((book) => book.id !== id)
              )
            }
          />
        ))}
        {loading && <p>Cargando libros...</p>}
      </main>

      {books.length > 0 && (
        <section className="pagination">
          <fieldset className="filter-group">
            <label htmlFor="limit">Ver por página:</label>
            <select
              id="limit"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </fieldset>

          <p>
            Mostrando {(page - 1) * limit + 1}–
            {Math.min(page * limit, totalBooks)} de {totalBooks} libros
          </p>

          <nav className="pagination-nav">
            <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              Anterior
            </button>

            <span>
              Página {page} de {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </nav>
        </section>
      )}
    </section>
  );
};
