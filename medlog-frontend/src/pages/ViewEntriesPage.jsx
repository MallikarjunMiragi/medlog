import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/ViewEntriesPage.css"; // ✅ Importing specific styles
import Notification from "../Components/Notification";


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
        setEntries(data);  // ✅ Store the fetched entries
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching entries:", error);
        setError("Failed to fetch entries.");
        setLoading(false);
      });
  }, [user, navigate]);

  return (
    <div className="view-entries-container">
      <h2 className="view-entries-title">My Logbook Entries</h2>

      {loading && <p className="loading-text">Loading entries...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && entries.length === 0 && (
        <p className="no-entries-text">No log entries found.</p>
      )}

      {entries.length > 0 &&
        entries.map((entry) => (
          <div key={entry._id} className="entry-box">
            <h3 className="entry-category-name">{entry.category}</h3>  {/* ✅ Fix category display */}
            <div className="entry-details-container">
            {Object.entries(entry.data).map(([key, value]) => (
  <p key={key} className="entry-detail">
    <strong>{key.replace(/_/g, " ")}:</strong>{" "}
    {typeof value === "string" && value.startsWith("https://res.cloudinary.com/") ? (
      <a href={value} target="_blank" rel="noopener noreferrer">
        📄 Open File
      </a>
    ) : (
      value || "N/A"
    )}
  </p>
))}







              {/* ✅ Show Comments if Available */}
              {entry.comments && (
                <p className="entry-detail">
                  <strong>Doctor's Comments:</strong> {entry.comments}
                </p>
              )}

              {/* ✅ Show Score if Available */}
              {entry.score !== null && entry.score !== undefined && (
                <p className="entry-detail">
                  <strong>Score:</strong> {entry.score} / 100
                </p>
              )}
            </div>
          </div>
        ))}

      <button className="back-to-jobs-btn" onClick={() => navigate("/jobs")}>
        Back to Jobs
      </button>

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
