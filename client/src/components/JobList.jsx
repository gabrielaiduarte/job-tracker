import JobItem from "./JobItem";

export default function JobList({ jobs, onDelete, onUpdateStatus }) {

  function renderJobs() {
    return jobs.map((job) => {
      return (
        <JobItem
          key={job.id}
          job={job}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      );
    });
  }

  return (
    <ul className="jt-job-list">
      {renderJobs()}
    </ul>
  );
}