import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorSidebar from "../components/DoctorSidebar";
import Notification from "../Components/Notification";

const StudentEntries = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student || {};


  const [reviewedEntries, setReviewedEntries] = useState([]);
  const [notReviewedEntries, setNotReviewedEntries] = useState([]);
  const [selectedTab, setSelectedTab] = useState("not-reviewed");
  const [comments, setComments] = useState({});
  const [scores, setScores] = useState({});
  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    if (student.email) {
      fetch(`http://localhost:5000/api/logentry/review-status/${encodeURIComponent(student.email)}`)
        .then((res) => res.json())
        .then((data) => {
          setReviewedEntries(data.reviewed);
          setNotReviewedEntries(data.notReviewed);
        })
        .catch((error) => console.error(`Error fetching logs for ${student.email}:`, error));
    }
  }, [student]);

  const displayedEntries = selectedTab === "reviewed" ? reviewedEntries : notReviewedEntries;

  const handleCommentChange = (entryId, value) => {
    setComments({ ...comments, [entryId]: value });
  };

  const handleScoreChange = (entryId, value) => {
    setScores({ ...scores, [entryId]: value });
  };

  const handleCommentSubmit = async (entryId) => {
    try {
      const response = await fetch("http://localhost:5000/api/logentry/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryId,
          comments: comments[entryId],
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setNotification({
          isOpen: true,
          message: `Comment submitted: ${comments[entryId]}`,
          type: "success",
        });

        setReviewedEntries([...reviewedEntries, { ...result.updatedEntry }]);
        setNotReviewedEntries(notReviewedEntries.filter(entry => entry._id !== entryId));
        setComments({ ...comments, [entryId]: "" });
      } else {
        console.error("Error saving comment:", result.error);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  const handleScoreSubmit = async (entryId) => {
    try {
      const response = await fetch("http://localhost:5000/api/logentry/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryId,
          score: scores[entryId],
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setNotification({
          isOpen: true,
          message: `Score submitted: ${scores[entryId]}`,
          type: "success",
        });

        setReviewedEntries([...reviewedEntries, { ...result.updatedEntry }]);
        setNotReviewedEntries(notReviewedEntries.filter(entry => entry._id !== entryId));
        setScores({ ...scores, [entryId]: "" });
      } else {
        console.error("Error saving score:", result.error);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a]">
      
      <div className="flex-grow p-5 overflow-y-auto">
        {/* Back button */}
        <div className="mb-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

        </div>

        <h2 className="text-center text-2xl text-teal-100 font-bold mb-6">
          Entries for {student.fullName}
        </h2>

        {/* Toggle tabs */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-md mx-2 ${
              selectedTab === "not-reviewed"
                ? "bg-teal-600 text-white font-semibold"
                : "bg-gray-700 text-teal-100"
            }`}
            onClick={() => setSelectedTab("not-reviewed")}
          >
            Not Reviewed
          </button>
          <button
            className={`px-6 py-2 rounded-md mx-2 ${
              selectedTab === "reviewed"
                ? "bg-teal-600 text-white font-semibold"
                : "bg-gray-700 text-teal-100"
            }`}
            onClick={() => setSelectedTab("reviewed")}
          >
            Reviewed
          </button>
        </div>

        {/* Entries */}
        {displayedEntries.length === 0 ? (
          <p className="text-center text-gray-400">No {selectedTab.replace("-", " ")} entries found.</p>
        ) : (
          displayedEntries.map((entry) => (
            <div
              key={entry._id}
              className="relative bg-[#717c9350] p-6 rounded-lg mb-6 shadow-md"
            >
              <h4 className="text-lg font-semibold text-teal-100 mb-4">
                {entry.category}
              </h4>

              <div className="mb-4">
                {Object.entries(entry.data).map(([key, value]) => (
                  <p key={key} className="text-white text-sm mb-2">
                    <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                    {typeof value === "string" && value.startsWith("/uploads/") ? (
                      <a
                        href={`http://localhost:5000${value}`}
                        download
                        className="text-teal-300 underline"
                      >
                        📄 Download File
                      </a>
                    ) : (
                      value || "N/A"
                    )}
                  </p>
                ))}
              </div>

              {/* Reviewed entries view */}
              {selectedTab === "reviewed" && (
                <>
                  <p className="text-white text-sm mb-2">
                    <strong>Doctor's Comments:</strong> {entry.comments}
                  </p>
                  <p className="text-white text-sm">
                    <strong>Score:</strong> {entry.score}/100
                  </p>
                </>
              )}

              {/* Not reviewed inputs */}
              {selectedTab === "not-reviewed" && (
                <div className="flex flex-col gap-4">
                  <textarea
                    className="w-full min-h-[80px] p-3 rounded-md border border-gray-300 bg-[#0f172a] text-white resize-none"
                    placeholder="Write a comment..."
                    value={comments[entry._id] || ""}
                    onChange={(e) => handleCommentChange(entry._id, e.target.value)}
                  />

                  <div className="flex justify-between items-center">
                    <button
                      className="bg-[#211c2f] hover:bg-[#221544] text-white py-2 px-4 rounded-md"
                      onClick={() => handleCommentSubmit(entry._id)}
                    >
                      Submit Comment
                    </button>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Score"
                        className="w-20 py-2 px-2 rounded-md bg-[#0f172a] text-white border border-gray-300 text-center"
                        value={scores[entry._id] || ""}
                        onChange={(e) => handleScoreChange(entry._id, e.target.value)}
                      />
                      <button
                        className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md"
                        onClick={() => handleScoreSubmit(entry._id)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        <Notification
          isOpen={notification.isOpen}
          onRequestClose={() => setNotification({ ...notification, isOpen: false })}
          title="Notification"
          message={notification.message}
          type={notification.type}
        />
      </div>
    </div>
  );
};

export default StudentEntries;
