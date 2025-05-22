import "../styles/components/NoResults.css";

interface Props {
  message?: string;
  onReset?: () => void;
}

export const NoResults = ({
  message = "No se encontraron libros con los filtros aplicados.",
  onReset,
}: Props) => {
  return (
    <section className="no-results" role="alert">
      <p>{message}</p>
      {onReset && <button onClick={onReset}>Limpiar filtros</button>}
    </section>
  );
};
