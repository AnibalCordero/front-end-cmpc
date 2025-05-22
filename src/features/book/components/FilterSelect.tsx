interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export const FilterSelect = ({ label, value, options, onChange }: Props) => {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};
