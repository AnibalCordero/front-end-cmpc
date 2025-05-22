import type { Book } from "@/types/interfaces/book.interface";
import "../../../styles/components/book/BookCard.css";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useState } from "react";
import defaultImage from "@/assets/default-book.png";
import { getApiUrl } from "@/config/env";

interface Props {
  book: Book;
  onDelete?: (id: number) => void;
}

export const BookCard = ({ book, onDelete }: Props) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  return (
    <article className="book-card">
      <img
        src={book.image ? `${getApiUrl()}${book.image}` : defaultImage}
        alt={`Portada de ${book.title}`}
      />
      <section>
        <h2>{book.title}</h2>
        <p>
          <strong>Autor:</strong> {book.author.name}
        </p>
        <p>
          <strong>Género:</strong> {book.genre.name}
        </p>
        <p>
          <strong>Editorial:</strong> {book.editorial.name}
        </p>
        <p>
          <strong>Precio:</strong> ${book.price}
        </p>
        <p>
          <strong>Disponible:</strong> {book.available ? "Sí" : "No"}
        </p>
      </section>
      <section>
        <button
          onClick={() => navigate(`/books/${book.id}/edit`)}
          className="edit-book-button"
        >
          Editar
        </button>
        <button
          className="delete-book-button"
          onClick={() => setShowConfirmModal(true)}
        >
          Eliminar
        </button>
      </section>
      {showConfirmModal && (
        <ConfirmModal
          message={`¿Estás seguro de eliminar "${book.title}"?`}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={async () => {
            await api.delete(`/books/${book.id}`);
            onDelete?.(book.id);
            setShowConfirmModal(false);
          }}
        />
      )}
    </article>
  );
};
