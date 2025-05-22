import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import mockedApi from "@/api/axios";
import "@testing-library/jest-dom";
import { BookList } from "@/features/book/pages/BookList";
import { BookCard } from "@/features/book/components/BookCard";
import type { Book } from "@/types/interfaces/book.interface";

jest.mock("@/assets/default-book.png", () => "default-book.png");

jest.mock("@/config/env", () => ({
  getApiUrl: () => "http://localhost:4000",
}));

jest.mock("@/api/axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => "token123"),
    },
    writable: true,
  });
});

describe("BookList", () => {
  it("renderiza correctamente", async () => {
    (mockedApi.get as jest.Mock).mockImplementation((url: string) => {
      switch (url) {
        case "/authors":
          return Promise.resolve({
            data: [{ id: "1", name: "Gabriel García Márquez" }],
          });
        case "/editorials":
          return Promise.resolve({ data: [{ id: "2", name: "Planeta" }] });
        case "/genres":
          return Promise.resolve({ data: [{ id: "3", name: "Ficción" }] });
        case "/books":
          return Promise.resolve({
            data: {
              data: [
                {
                  id: 1,
                  title: "El Principito",
                  author: { name: "Antoine de Saint-Exupéry" },
                  genre: { name: "Ficción" },
                  editorial: { name: "Sudamericana" },
                  price: 12000,
                  available: true,
                },
              ],
              total: 1,
            },
          });
        default:
          return Promise.resolve({
            data: {
              data: [
                {
                  id: 1,
                  title: "El Principito",
                  author: { name: "Antoine de Saint-Exupéry" },
                  genre: { name: "Ficción" },
                  editorial: { name: "Sudamericana" },
                  price: 12000,
                  available: true,
                },
              ],
              total: 1,
            },
          });
      }
    });

    render(
      <MemoryRouter>
        <BookList />
      </MemoryRouter>
    );

    expect(await screen.findByText("El Principito")).toBeInTheDocument();
  });
  it("muestra NoResults si no hay libros", async () => {
    (mockedApi.get as jest.Mock).mockImplementation((url) => {
      switch (url) {
        case "/authors":
          return Promise.resolve({
            data: [{ id: "1", name: "Gabriel García Márquez" }],
          });
        case "/editorials":
          return Promise.resolve({ data: [{ id: "1", name: "Planeta" }] });
        case "/genres":
          return Promise.resolve({ data: [{ id: "2", name: "Ficción" }] });
        case "/books":
          return Promise.resolve({
            data: {
              data: [],
              total: 0,
            },
          });
        default:
          return Promise.resolve({
            data: {
              data: [],
              total: 0,
            },
          });
      }
    });

    render(
      <MemoryRouter>
        <BookList />
      </MemoryRouter>
    );

    expect(await screen.findByText(/no se encontraron/i)).toBeInTheDocument();
  });

  it("permite eliminar un libro", () => {
    const book = {
      id: 1,
      title: "Test",
      author: { name: "test" },
      genre: { name: "test" },
      editorial: { name: "test" },
      price: 123,
      available: true,
    };

    render(
      <MemoryRouter>
        <BookCard book={book as Book} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/eliminar/i));
  });

  it("permite cambiar los filtros y dispara una nueva búsqueda", async () => {
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValue({
      data: {
        data: [],
        total: 0,
      },
    });

    render(
      <MemoryRouter>
        <BookList />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/buscar/i), {
      target: { value: "nuevo título" },
    });

    fireEvent.change(screen.getByLabelText("Género"), {
      target: { value: "1" },
    });

    fireEvent.change(screen.getByLabelText("Autor"), {
      target: { value: "2" },
    });

    fireEvent.change(screen.getByLabelText("Editorial"), {
      target: { value: "3" },
    });

    fireEvent.change(screen.getByLabelText("Disponibilidad"), {
      target: { value: "true" },
    });

    expect(await screen.findByText(/no se encontraron/i)).toBeInTheDocument();
  });
  it("permite cambiar el orden de los libros", async () => {
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValue({
      data: {
        data: [],
        total: 0,
      },
    });

    render(
      <MemoryRouter>
        <BookList />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Ordenar por:"), {
      target: { value: "price" },
    });

    expect(await screen.findByText(/no se encontraron/i)).toBeInTheDocument();
  });

  it("permite navegar entre páginas", async () => {
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValue({
      data: {
        data: new Array(10).fill({
          id: 1,
          title: "Libro",
          author: { name: "Autor" },
          genre: { name: "Género" },
          editorial: { name: "Editorial" },
          price: 123,
          available: true,
        }),
        total: 100,
      },
    });

    render(
      <MemoryRouter>
        <BookList />
      </MemoryRouter>
    );

    const nextBtn = await screen.findByText("Siguiente");
    fireEvent.click(nextBtn);

    const prevBtn = await screen.findByText("Anterior");
    fireEvent.click(prevBtn);
  });

  it("muestra correctamente el mensaje de libros mostrados", async () => {
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (mockedApi.get as jest.Mock).mockResolvedValue({
      data: {
        data: new Array(10).fill({
          id: 1,
          title: "Libro",
          author: { name: "Autor" },
          genre: { name: "Género" },
          editorial: { name: "Editorial" },
          price: 123,
          available: true,
        }),
        total: 100,
      },
    });

    render(
      <MemoryRouter>
        <BookList />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/Mostrando 1–10 de 100 libros/)
    ).toBeInTheDocument();
  });

  it("renderiza todos los campos del libro", () => {
    const book = {
      id: 1,
      title: "Test",
      author: { name: "Autor X" },
      genre: { name: "Género X" },
      editorial: { name: "Editorial X" },
      price: 9990,
      available: true,
    };

    render(
      <MemoryRouter>
        <BookCard book={book as Book} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText(/Autor:/)).toBeInTheDocument();
    expect(screen.getByText("Autor X")).toBeInTheDocument();
    expect(screen.getByText(/Género:/)).toBeInTheDocument();
    expect(screen.getByText("Género X")).toBeInTheDocument();
    expect(screen.getByText(/Editorial:/)).toBeInTheDocument();
    expect(screen.getByText("Editorial X")).toBeInTheDocument();
    expect(screen.getByText("$9990")).toBeInTheDocument();
    expect(screen.getByText("Sí")).toBeInTheDocument();
  });

  it("navega al editar", () => {
    const book = {
      id: 123,
      title: "Test Book",
      author: { name: "Test" },
      genre: { name: "Test" },
      editorial: { name: "Test" },
      price: 123,
      available: true,
    };

    const mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <BookCard book={book as Book} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Editar"));
    expect(mockNavigate).toHaveBeenCalledWith("/books/123/edit");
  });
  it("abre y cierra el modal de confirmación", async () => {
    const book = {
      id: 1,
      title: "Libro de prueba",
      author: { name: "Autor" },
      genre: { name: "Género" },
      editorial: { name: "Editorial" },
      price: 1000,
      available: true,
    };

    render(
      <MemoryRouter>
        <BookCard book={book as Book} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Eliminar"));
    expect(
      await screen.findByText(/¿Estás seguro de eliminar "Libro de prueba"/)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancelar"));
    expect(screen.queryByText(/¿Estás seguro/)).not.toBeInTheDocument();
  });
});
