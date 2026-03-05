import { useState } from "react";

export default function JobForm({ onAddJob }) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Applied");

  function handleCompanyChange(e) {
    setCompany(e.target.value);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleStatusChange(e) {
    setStatus(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddJob({ company, title, status });

    setCompany("");
    setTitle("");
    setStatus("Applied");
  }

  return (
    <form className="jt-form-card" onSubmit={handleSubmit}>
      
      <div className="jt-form-row">
        <div className="jt-form-group">
          <label className="jt-label">Company</label>
          <input
            className="jt-input"
            type="text"
            value={company}
            onChange={handleCompanyChange}
            placeholder="Google"
          />
        </div>

        <div className="jt-form-group">
          <label className="jt-label">Job Title</label>
          <input
            className="jt-input"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Frontend Developer"
          />
        </div>

        <div className="jt-form-group">
          <label className="jt-label">Status</label>
          <select
            className="jt-select"
            value={status}
            onChange={handleStatusChange}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>
        </div>
      </div>

      <button className="jt-primary-btn" type="submit">
        Add Job
      </button>

    </form>
  );
}