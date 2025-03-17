import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/ViewEntriesPage.css"; // ✅ Importing specific styles

const ViewEntriesPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) {
      alert("Please log in to view entries.");
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
                  <strong>{key.replace(/_/g, " ")}:</strong> {value || "N/A"}
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
    </div>
  );
};

export default ViewEntriesPage;
