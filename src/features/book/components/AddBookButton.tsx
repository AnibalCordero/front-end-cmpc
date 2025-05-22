import { useNavigate } from "react-router-dom";
import "../../../styles/components/book/AddBookButton.css";

export const AddBookButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="add-book-button"
      onClick={() => navigate("/books/create")}
    >
      + Agregar libro
    </button>
  );
};
