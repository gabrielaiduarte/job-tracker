export default function StatusFilter({ value, onChange }) {

  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <div className="jt-filter">
      <label className="jt-label">Filter by Status</label>

      <select
        className="jt-select"
        value={value}
        onChange={handleChange}
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>
    </div>
  );
}