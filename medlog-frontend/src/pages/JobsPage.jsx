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
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h2>Your jobs</h2>
        <button className="text-white bg-[#008080] hover:bg-[#006a4e] px-3 py-2 cursor-pointer rounded-md !w-32">Add new job</button>
      </div>
      <p>
        You can tell Logitbox about new jobs, and change the hospitals and specialties associated
        with existing jobs in your account. You can also access logbook entries associated with old
        jobs. Click on job names to edit job properties.
      </p>

      {/* Jobs List */}
      {jobs.length > 0 && (
        <>
          <div className="mt-5">
            <h3>Primary job - (you see this job's logbook entries when you log in)</h3>
            {jobs
              .filter((job) => job.isPrimary)
              .map((job) => (
                <div key={job.id} className="flex justify-between items-center bg-[#717c9350] p-4 rounded-lg mb-2 shadow">
                  <div className="flex items-center text-white">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                      alt="flag"
                      className="w-[35px] h-[22px] mr-4"
                    />
                    <div>
                      <h4>{job.trainingYear} {job.specialty}</h4>
                      <p>{job.startDate} - {job.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <button className="!bg-[#211c2f] text-white px-3 py-2 text-[14px] rounded cursor-pointer font-[Times_New_Roman] hover:bg-[#221544]" onClick={() => navigate("/view-entries")}>
                      View entries
                    </button>
                    <FaDownload className="icon-btn" />
                    <FaTrash className="icon-btn" />
                  </div>
                </div>
              ))} 
          </div>

          <div className="mt-5">
            <h3>Previous jobs ({jobs.filter((job) => !job.isPrimary).length})</h3>
            {jobs
              .filter((job) => !job.isPrimary)
              .map((job) => (
                <div key={job.id} className="flex justify-between items-center bg-[#717c9350] p-4 rounded-lg mb-2 shadow">
                  <div className="flex items-center text-white">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                      alt="flag"
                      className="w-[35px] h-[22px] mr-4"
                    />
                    <div>
                      <h4>{job.trainingYear} {job.specialty}</h4>
                      <p>{job.startDate} - {job.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <button className="!bg-[#211c2f] text-white px-3 py-2 text-[14px] rounded cursor-pointer font-[Times_New_Roman] hover:bg-[#221544]" onClick={() => navigate("/logbookpage")}>
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
