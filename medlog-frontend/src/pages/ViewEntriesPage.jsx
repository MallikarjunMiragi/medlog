import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";

const ViewEntriesPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    if (!user || !user.email) {
      setNotification({ isOpen: true, message: "Please log in to view entries.", type: "error" });
      navigate("/login");
      return;
    }

    const userEmail = user.email.email || user.email;

    fetch(`http://localhost:5000/api/logentry/${encodeURIComponent(userEmail)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Raw API Data:", data);
        setEntries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching entries:", error);
        setError("Failed to fetch entries.");
        setLoading(false);
      });
  }, [user, navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">My Logbook Entries</h2>

      {/* Loader */}
      {loading && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 border-4 border-teal-300 border-dashed rounded-full animate-spin"></div>
          <p className="italic text-teal-100">Loading entries...</p>
        </div>
      )}

      {error && <p className="text-red-400 font-semibold">{error}</p>}

      {!loading && !error && entries.length === 0 && (
        <p className="text-teal-100">No log entries found.</p>
      )}

      {!loading && entries.length > 0 &&
        entries.map((entry) => (
          <div key={entry._id} className="bg-[#717c9350] p-5 mb-4 rounded-lg shadow text-left">
            <h3 className="text-xl font-bold text-teal-300 mb-2">{entry.category}</h3>
           <div className="space-y-2">
  {Object.entries(entry.data).map(([key, value]) => (
    <p key={key} className="text-sm text-teal-100">
      <strong className="text-white">{key.replace(/_/g, " ")}:</strong>{" "}
      {typeof value === "string" &&
      (value.startsWith("/uploads/") || value.startsWith("http")) ? (
        <a
          href={
            value.startsWith("/uploads/")
              ? `http://localhost:5000${value}`
              : value
          }
          download
          className="text-teal-400 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          📄 Download File
        </a>
      ) : (
        value || "N/A"
      )}
    </p>
              ))}


              {entry.comments && (
                <p className="text-sm text-teal-100">
                  <strong className="text-white">Doctor's Comments:</strong> {entry.comments}
                </p>
              )}

              {entry.score !== null && entry.score !== undefined && (
                <p className="text-sm text-teal-100">
                  <strong className="text-white">Score:</strong> {entry.score} / 100
                </p>
              )}
            </div>
          </div>
        ))}

      {/* Button */}
      {!loading && (
        <button
          onClick={() => navigate("/jobs")}
          className="mt-6 px-6 py-3 bg-[#211c2f] text-white rounded-md hover:bg-[#221544] transition"
        >
          Back to Jobs
        </button>
      )}

      <Notification
        isOpen={notification.isOpen}
        onRequestClose={() => setNotification({ ...notification, isOpen: false })}
        title="Notification"
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
};

export default ViewEntriesPage;
