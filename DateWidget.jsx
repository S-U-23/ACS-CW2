function DateWidget({ label, value, onChange }) {
  return (
    <label>
      {label}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default DateWidget;
