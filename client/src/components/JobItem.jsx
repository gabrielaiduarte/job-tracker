export default function JobItem({ job, onDelete, onUpdateStatus }) {

    function handleDelete() {
        onDelete(job.id);
    }

    function handleStatusChange(e) {
        const newStatus = e.target.value;
        onUpdateStatus(job.id, newStatus);
    }

    return (
        <li className="jt-job-card">

            <div className="jt-job-header">
                <div>
                    <h3 className="jt-company">{job.company}</h3>
                    <p className="jt-title">{job.title}</p>
                </div>

                <button
                    className="jt-delete-btn"
                    onClick={handleDelete}
                >
                    ✕
                </button>
            </div>

            <div className="jt-job-footer">

                <span className={`jt-status jt-status-${job.status.toLowerCase()}`}>
                    {job.status}
                </span>

                <select
                    className="jt-status-select"
                    value={job.status}
                    onChange={handleStatusChange}
                >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Rejected</option>
                    <option>Offer</option>
                </select>

            </div>

        </li>
    );
}