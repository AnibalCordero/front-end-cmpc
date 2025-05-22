import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn">
      Cambiar a tema {theme === "light" ? "oscuro" : "claro"}
    </button>
  );
};
