import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/api/axios";
import "../../../styles/components/book/EditBook.css";

export const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [editorialId, setEditorialId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const [authors, setAuthors] = useState([]);
  const [editorials, setEditorials] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    api.get(`/books/${id}`).then((res) => {
      const book = res.data;
      setTitle(book.title);
      setAuthorId(book.authorId);
      setEditorialId(book.editorialId);
      setGenreId(book.genreId);
      setPrice(book.price);
      setAvailable(book.available);
    });

    api.get("/authors").then((res) => setAuthors(res.data));
    api.get("/editorials").then((res) => setEditorials(res.data));
    api.get("/genres").then((res) => setGenres(res.data));
  }, [id]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (Number(price) <= 0) {
      setFormError("El precio debe ser mayor a 0");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("authorId", authorId);
    formData.append("editorialId", editorialId);
    formData.append("genreId", genreId);
    formData.append("price", price);
    formData.append("available", String(available));
    if (file) {
      formData.append("file", file);
    }

    try {
      await api.put(`/books/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/books");
    } catch {
      setFormError("Ocurrió un error al actualizar el libro.");
    }
  };

  return (
    <section className="edit-book">
      <h2>Editar libro</h2>

      <form onSubmit={handleUpdate}>
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Autor:
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          >
            <option value="">Seleccione un autor</option>
            {authors.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Editorial:
          <select
            value={editorialId}
            onChange={(e) => setEditorialId(e.target.value)}
            required
          >
            <option value="">Seleccione una editorial</option>
            {editorials.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Género:
          <select
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            required
          >
            <option value="">Seleccione un género</option>
            {genres.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Precio:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Disponible:
          <select
            value={String(available)}
            onChange={(e) => setAvailable(e.target.value === "true")}
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>

        <label>
          Imagen del libro:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        {formError && <p className="error">{formError}</p>}

        <div className="actions">
          <button type="submit">Guardar cambios</button>
          <button
            type="button"
            className="outline"
            onClick={() => navigate("/books")}
          >
            Volver
          </button>
        </div>
      </form>
    </section>
  );
};
