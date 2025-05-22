import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import "../../../styles/components/login/Login.css";
import { useTheme } from "@/hooks/useTheme";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { theme, toggleTheme } = useTheme();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data["access_token"]);
      navigate("/books");
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <section className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button type="button" onClick={toggleTheme} className="theme-toggle">
          Cambiar a tema {theme === "light" ? "oscuro 🌙" : "claro ☀️"}
        </button>
      </div>
    </section>
  );
};
