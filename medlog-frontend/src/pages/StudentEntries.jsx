import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorSidebar from "../Components/DoctorSidebar";
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
  const [enhanceComment, setEnhanceComment] = useState({});
  const [scoreBreakdown, setScoreBreakdown] = useState({});
  const [scoresBreakdownVisible, setScoresBreakdownVisible] = useState({});

  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    if (student.email) {
      fetch(`http://localhost:5000/api/logentry/review-status/${encodeURIComponent(student.email)}`)
        .then((res) => res.json())
        .then((data) => {
          setReviewedEntries(data.reviewed);
          setNotReviewedEntries(data.notReviewed);
        })
        .catch((error) =>
          console.error(`Error fetching logs for ${student.email}:`, error)
        );
    }
  }, [student]);

  const rawEntries =
    selectedTab === "reviewed" ? reviewedEntries : notReviewedEntries;

  const displayedEntries = rawEntries.filter((entry) => {
    const matchesCategory = entry.categoryName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const entryDate = entry.data?.Date
      ? new Date(entry.data.Date).toISOString().slice(0, 10)
      : null;

    const matchesDate = filterDate === "" || entryDate === filterDate;

    return matchesCategory && matchesDate;
  });

  const isUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

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
          message: `Comment submitted:\n ${result.updatedEntry.comments}`,
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

const isUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
};
const handleReviewSubmit = async (entryId) => {
  const comment = comments[entryId];
  const score = scores[entryId];

    if (!comment || !score) {
      setNotification({
        isOpen: true,
        message: "Please enter both comment and score before submitting.",
        type: "warning",
      });
      return;
    }

  try {
    const response = await fetch("http://localhost:5000/api/logentry/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entryId,
        comments: comment,
        score: score,
        enhance: enhanceComment[entryId] || false, // retain enhance flag
      }),
    });

      const result = await response.json();

      if (response.ok) {
        setNotification({
          isOpen: true,
          message: `Review submitted:\nComment: ${comment}\nScore: ${score}`,
          type: "success",
        });

        setReviewedEntries([...reviewedEntries, result.updatedEntry]);
        setNotReviewedEntries(
          notReviewedEntries.filter((entry) => entry._id !== entryId)
        );
        setComments((prev) => ({ ...prev, [entryId]: "" }));
        setScores((prev) => ({ ...prev, [entryId]: "" }));
        setEnhanceComment((prev) => ({ ...prev, [entryId]: false }));
        setScoreBreakdown((prev) => ({ ...prev, [entryId]: [] }));
      } else {
        setNotification({
          isOpen: true,
          message: `Error: ${result.error}`,
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        isOpen: true,
        message: "Failed to submit review.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a]">
      <DoctorSidebar />

      <div className="flex-grow p-5 overflow-y-auto">
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mb-4"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <h2 className="text-center text-2xl text-teal-100 font-bold mb-6">
          Entries for {student.fullName}
        </h2>

        {/* Filters */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 rounded-md mx-2 ${
              selectedTab === "not-reviewed"
                ? "bg-teal-600 text-white"
                : "bg-gray-700 text-teal-100"
            }`}
            onClick={() => setSelectedTab("not-reviewed")}
          >
            Not Reviewed
          </button>
          <button
            className={`px-6 py-2 rounded-md mx-2 ${
              selectedTab === "reviewed"
                ? "bg-teal-600 text-white"
                : "bg-gray-700 text-teal-100"
            }`}
            onClick={() => setSelectedTab("reviewed")}
          >
            Reviewed
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md border bg-white/20 text-white placeholder:text-gray-300"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 rounded-md border bg-white/20 text-white"
          />
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterDate("");
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white"
          >
            Clear Filters
          </button>
        </div>

        {/* Entries */}
        {displayedEntries.length === 0 ? (
          <p className="text-center text-gray-400">
            No {selectedTab.replace("-", " ")} entries found.
          </p>
        ) : (
          displayedEntries.map((entry) => (
            <div
              key={entry._id}
              className="relative bg-[#717c9350] p-6 rounded-lg mb-6 shadow-md"
            >
              <h4 className="text-lg font-semibold text-teal-100 mb-4 flex items-center gap-2">
                <span>🩺</span> {capitalize(entry.categoryName)}
              </h4>

              <div className="mb-4">
              {Object.entries(entry.data).map(([key, value]) => (
                <p key={key} className="text-white text-sm mb-2">
                  <strong>{capitalize(key.replace(/_/g, " "))}:</strong>{" "}
{typeof value === "string" && value.startsWith("/uploads/") ? (
  <a
    href={`http://localhost:5000${value}`}
    download
    className="text-teal-300 underline"
  >
    📄 Download File
  </a>
) : typeof value === "string" && isUrl(value) ? (
  <a
    href={value}
    target="_blank"
    rel="noopener noreferrer"
    className="text-teal-300 underline"
  >
    📄 View File
  </a>
) : typeof value === "string" ? (
  capitalize(value)
) : (
  value || "N/A"
)}

                </p>
              ))}
            </div>

              {selectedTab === "reviewed" ? (
                <>
                  <p className="text-white text-sm mb-2">
                    <strong>Doctor's Comments:</strong> {entry.comments}
                  </p>
                  <p className="text-white text-sm">
                    <strong>Score:</strong> {entry.score}/100
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <textarea
                    className="w-full min-h-[80px] p-3 rounded-md border border-gray-300 bg-[#0f172a] text-white resize-none"
                    placeholder="Write a comment..."
                    value={comments[entry._id] || ""}
                    onChange={(e) =>
                      handleCommentChange(entry._id, e.target.value)
                    }
                  />

                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`enhance-${entry._id}`}
                        checked={enhanceComment[entry._id] || false}
                        onChange={(e) =>
                          setEnhanceComment((prev) => ({
                            ...prev,
                            [entry._id]: e.target.checked,
                          }))
                        }
                      />
                      <label
                        htmlFor={`enhance-${entry._id}`}
                        className="text-white"
                      >
                        Enhance comment
                      </label>
                    </div>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Score"
                      className="w-20 py-2 px-2 rounded-md bg-[#0f172a] text-white border text-center"
                      value={scores[entry._id] || ""}
                      onChange={(e) =>
                        handleScoreChange(entry._id, e.target.value)
                      }
                    />

                    <button
                      onClick={() =>
                        setScoresBreakdownVisible((prev) => ({
                          ...prev,
                          [entry._id]: !prev[entry._id],
                        }))
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md"
                    >
                      Score Valuation ⬇
                    </button>

                    <button
                      className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md"
                      onClick={() => handleReviewSubmit(entry._id)}
                    >
                      Submit Review
                    </button>
                  </div>

                  {scoresBreakdownVisible[entry._id] && (
                    <div className="mt-2 w-full max-w-xs rounded bg-[#1a2236] shadow-sm p-2">
                      <h3 className="text-sm font-bold text-teal-300 mb-2">Score Breakdown</h3>
                      <div className="flex flex-col gap-2">
                        {scoreBreakdown[entry._id]?.map((item, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              placeholder="Label"
                              value={item.name || ''}
                              onChange={(e) => handleBreakdownChange(entry._id, idx, 'name', e.target.value)}
                              className="bg-[#232b43] text-white text-sm font-semibold rounded px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                            <div className="flex gap-2 items-center bg-[#232b43] rounded px-3 py-2 w-24 justify-center">
                              <input
                                type="number"
                                min="0"
                                max={item.max}
                                value={item.value}
                                onChange={(e) => handleBreakdownChange(entry._id, idx, 'value', e.target.value)}
                                className="bg-transparent text-white text-sm font-semibold w-8 text-center focus:outline-none"
                              />
                              <span className="text-white text-sm font-semibold">/</span>
                              <input
                                type="number"
                                min="1"
                                value={item.max}
                                onChange={(e) => handleBreakdownChange(entry._id, idx, 'max', e.target.value)}
                                className="bg-transparent text-white text-sm font-semibold w-8 text-center focus:outline-none"
                              />
                            </div>
                            <button
                              onClick={() => removeBreakdown(entry._id, idx)}
                              className="ml-1 text-red-400 hover:text-red-600 text-base font-bold"
                              title="Remove"
                            >
                              ✖
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => addBreakdown(entry._id)}
                        className="mt-2 text-xs text-blue-500 hover:underline font-semibold"
                      >
                        + Add Breakdown
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        <Notification
          isOpen={notification.isOpen}
          onRequestClose={() =>
            setNotification((prev) => ({ ...prev, isOpen: false }))
          }
          title="Notification"
          message={notification.message}
          type={notification.type}
        />
      </div>
    </div>
  );
};

export default StudentEntries;
