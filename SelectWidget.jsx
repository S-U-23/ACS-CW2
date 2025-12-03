function SelectWidget({ label, value, onChange, options = [] }) {
  return (
    <label>
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt, index) => (
          <option key={index} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

export default SelectWidget;
