import { useTheme } from "@/hooks/useTheme";
import "../styles/components/Header.css";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="header" role="banner">
      <h1>CMPC Libros</h1>

      <nav role="navigation" aria-label="Acciones principales">
        <button onClick={toggleTheme}>
          Tema: {theme === "light" ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </nav>
    </header>
  );
};
