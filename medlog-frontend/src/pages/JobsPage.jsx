import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaDownload } from "react-icons/fa";

const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const email = user?.email;

  useEffect(() => {
    const fetchJobsFromBackend = async () => {
      try {
        if (!email) {
          console.error("⛔ No user email found in redux.");
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/auth/userDetails/${email}`);
        const { selectedTrainingYear, selectedSpecialty } = response.data;

        if (!selectedTrainingYear || !selectedSpecialty) {
          console.error("❌ Missing trainingYear or specialty in user data.");
          return;
        }

        const todayDate = new Date().toLocaleDateString("en-GB");

        const userJobs = [
          {
            id: 1,
            trainingYear: selectedTrainingYear,
            specialty: selectedSpecialty,
            startDate: todayDate,
            endDate: todayDate,
            isPrimary: true,
          },
          {
            id: 2,
            trainingYear: selectedTrainingYear,
            specialty: selectedSpecialty,
            startDate: todayDate,
            endDate: todayDate,
            isPrimary: false,
          },
        ];

        setJobs(userJobs);
      } catch (error) {
        console.error("❌ Error fetching user job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsFromBackend();
  }, [email]);

  return (
    <div className="p-5 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your jobs</h2>
        <button className="bg-[#008080] hover:bg-[#006a4e] px-3 py-2 cursor-pointer rounded-md !w-32 mb-4">
          Add new job
        </button>
      </div>
      <p className="text-center text-teal-100 font-normal">
        You can tell Logitbox about new jobs, and change the hospitals and specialties associated
        with existing jobs in your account. You can also access logbook entries associated with old
        jobs. Click on job names to edit job properties.
      </p>

      {/* Jobs List */}
      {jobs.length > 0 ? (
        <>
          <div className="mt-5">
            <h3 className="mb-4 font-bold">
              Primary job - (you see this job's logbook entries when you log in)
            </h3>
            {jobs
              .filter((job) => job.isPrimary)
              .map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col md:flex-row gap-2 justify-between items-center bg-[#717c9350] p-4 rounded-lg mb-2 shadow"
                >
                  <div className="flex items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                      alt="flag"
                      className="w-[35px] h-[22px] mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">
                        {job.trainingYear} {job.specialty}
                      </h4>
                      <p className="text-center text-teal-100">
                        {job.startDate} - {job.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="bg-[#211c2f] px-4 py-3 rounded cursor-pointer font-[Times_New_Roman] hover:bg-[#352743]"
                      onClick={() => navigate("/view-entries")}
                    >
                      View entries
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobsPage;
