import { useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { getJobs, createJob, deleteJobById, updateJobStatusById } from "../services/api";
import StatusFilter from "../components/StatusFilter";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/auth";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      setLoading(true);
      setError("");

      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }

  async function addJob(job) {
    try {
      setError("");

      const newJob = await createJob(job);
      setJobs((prevJobs) => [...prevJobs, newJob]);
    } catch (err) {
      setError("Failed to add job");
    }
  }

  async function deleteJob(id) {
    try {
      await deleteJobById(id);

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (err) {
      setError("Failed to delete job");
    }
  }

  async function updateJobStatus(id, status) {
    try {
      await updateJobStatusById(id, status);

      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === id ? { ...job, status } : job))
      );
    } catch (err) {
      setError("Failed to update job status");
    }
  }

  function handleStatusFilterChange(newValue) {
    setStatusFilter(newValue);
  }

  function getFilteredJobs() {
    if (statusFilter === "All") return jobs;
    return jobs.filter((job) => job.status === statusFilter);
  }

  function handleLogout() {
    clearToken();
    navigate("/login");
  }

  function renderLoading() {
    if (!loading) return null;
    return <p className="jt-muted jt-mt-12">Loading jobs...</p>;
  }

  function renderError() {
    if (!error) return null;
    return <p className="jt-alert jt-mt-12">{error}</p>;
  }

  function renderJobList() {
    if (loading) return null;

    return (
      <JobList
        jobs={getFilteredJobs()}
        onDelete={deleteJob}
        onUpdateStatus={updateJobStatus}
      />
    );
  }

  return (
    <div className="jt-page">
      <div className="jt-shell">
        {/* Top header bar */}
        <header className="jt-topbar">
          <div className="jt-brand">
            <div className="jt-logo" aria-hidden="true">📄</div>
            <div>
              <h1 className="jt-brand-title">Job Tracker</h1>
              <p className="jt-brand-subtitle">Manage your job applications</p>
            </div>
          </div>

          <button className="jt-link-btn" onClick={handleLogout}>
            Log Out
          </button>
        </header>

        {/* Main content */}
        <main className="jt-main">
          <div className="jt-section-header">
            <div>
              <h2 className="jt-h2">Job Applications</h2>
              <p className="jt-muted">
                {getFilteredJobs().length} job{getFilteredJobs().length === 1 ? "" : "s"} found
              </p>
            </div>
          </div>

          {/* Filters + form row */}
          <div className="jt-controls">
            <StatusFilter value={statusFilter} onChange={handleStatusFilterChange} />
            <JobForm onAddJob={addJob} />
          </div>

          {renderLoading()}
          {renderError()}

          <div className="jt-list">{renderJobList()}</div>
        </main>
      </div>
    </div>
  );
}