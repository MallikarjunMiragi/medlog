import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { FaTrash, FaDownload } from "react-icons/fa";

const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Get today's date in DD/MM/YYYY format
    const todayDate = new Date().toLocaleDateString("en-GB");

    // Fetch training year & specialty from local storage
    const storedTrainingYear = localStorage.getItem("trainingYear") || "Postgraduate Year 1";
    const storedSpecialty = localStorage.getItem("specialty") || "Emergency Medicine";

    // Mock job data
    const storedJobs = [
      {
        id: 1,
        trainingYear: storedTrainingYear,
        specialty: storedSpecialty,
        startDate: todayDate,
        endDate: todayDate, // Defaults to today's date
        isPrimary: true, // Ongoing job
      },
      {
        id: 2,
        trainingYear: storedTrainingYear,
        specialty: storedSpecialty,
        startDate: todayDate,
        endDate: todayDate, // Defaults to today's date
        isPrimary: false, // Past job
      },
    ];

    setJobs(storedJobs);
  }, []);

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h2>Your jobs</h2>
        <button className="add-job-btn">Add new job</button>
      </div>
      <p>
        You can tell Logitbox about new jobs, and change the hospitals and specialties associated
        with existing jobs in your account. You can also access logbook entries associated with old
        jobs. Click on job names to edit job properties.
      </p>

      {/* Jobs List */}
      {jobs.length > 0 && (
        <>
          <div className="job-section">
            <h3>Primary job - (you see this job's logbook entries when you log in)</h3>
            {jobs
              .filter((job) => job.isPrimary)
              .map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-info">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                      alt="flag"
                      className="job-flag"
                    />
                    <div>
                      <h4>{job.trainingYear} {job.specialty}</h4>
                      <p>{job.startDate} - {job.endDate}</p>
                    </div>
                  </div>
                  <div className="job-actions">
                    <button className="view-entries-btn" onClick={() => navigate("/view-entries")}>
                      View entries
                    </button>
                    <FaDownload className="icon-btn" />
                    <FaTrash className="icon-btn" />
                  </div>
                </div>
              ))} 
          </div>

          <div className="job-section">
            <h3>Previous jobs ({jobs.filter((job) => !job.isPrimary).length})</h3>
            {jobs
              .filter((job) => !job.isPrimary)
              .map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-info">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                      alt="flag"
                      className="job-flag"
                    />
                    <div>
                      <h4>{job.trainingYear} {job.specialty}</h4>
                      <p>{job.startDate} - {job.endDate}</p>
                    </div>
                  </div>
                  <div className="job-actions">
                    <button className="view-entries-btn" onClick={() => navigate("/logbookpage")}>
                      View entries
                    </button>
                    <FaDownload className="icon-btn" />
                    <FaTrash className="icon-btn" />
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default JobsPage;
