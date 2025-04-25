import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaDownload } from "react-icons/fa";

const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth); // 👈 get user from redux
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
    <div className="p-6 text-white bg-gray-800 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Your jobs</h2>
        <p className="text-gray-300">
          You can tell Logitbox about new jobs, and change the hospitals and specialties
          associated with existing jobs in your account. You can also access logbook entries
          associated with old jobs. Click on job names to edit job properties.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : jobs.length > 0 ? (
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-teal-300">
              Primary job - (you see this job's logbook entries when you log in)
            </h3>
          </div>

          {jobs
            .filter((job) => job.isPrimary)
            .map((job) => (
              <div
                key={job.id}
                className="bg-gray-900 rounded-lg shadow-md p-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                    alt="flag"
                    className="w-10 h-6 object-cover rounded-sm"
                  />
                  <div>
                    <h4 className="font-semibold text-white">
                      {job.trainingYear} {job.specialty}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {job.startDate} - {job.endDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 text-sm rounded text-white whitespace-nowrap"
                    onClick={() => navigate("/view-entries")}
                  >
                    View entries
                  </button>

                  <button className="text-white hover:text-gray-400">
                    <FaDownload className="text-lg" />
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobsPage;
