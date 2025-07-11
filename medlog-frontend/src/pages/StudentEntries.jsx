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
      fetch(
        `http://localhost:5000/api/logentry/review-status/${encodeURIComponent(
          student.email
        )}`
      )
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

  const handleBreakdownChange = (entryId, index, value) => {
    setScoreBreakdown((prev) => {
      const updated = [...(prev[entryId] || [])];
      updated[index].value = Number(value);
      return { ...prev, [entryId]: updated };
    });

    setScores((prev) => {
      const updated = [...(scoreBreakdown[entryId] || [])];
      updated[index].value = Number(value);
      const total = updated.reduce(
        (acc, item, idx) => (idx === index ? acc + Number(value) : acc + (item.value || 0)),
        0
      );
      return { ...prev, [entryId]: total };
    });
  };

  const addBreakdown = (entryId) => {
    setScoreBreakdown((prev) => ({
      ...prev,
      [entryId]: [...(prev[entryId] || []), { value: 0, max: 10 }],
    }));
  };

  const removeBreakdown = (entryId, index) => {
    const updated = [...(scoreBreakdown[entryId] || [])];
    updated.splice(index, 1);
    const total = updated.reduce((acc, item) => acc + Number(item.value || 0), 0);
    setScoreBreakdown((prev) => ({ ...prev, [entryId]: updated }));
    setScores((prev) => ({ ...prev, [entryId]: total }));
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
          enhance: enhanceComment[entryId] || false,
          scoreBreakdown: scoreBreakdown[entryId] || [],
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
                    <div className="mt-2 w-full max-w-md bg-white text-black rounded-md p-4 border">
                      {scoreBreakdown[entry._id]?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between mb-2 gap-2"
                        >
                          <input
                            type="number"
                            min="0"
                            max={item.max}
                            value={item.value}
                            onChange={(e) =>
                              handleBreakdownChange(
                                entry._id,
                                idx,
                                e.target.value
                              )
                            }
                            className="w-16 px-2 py-1 rounded-md border text-center"
                          />
                          <span className="text-sm">/ {item.max}</span>
                          <button
                            onClick={() => removeBreakdown(entry._id, idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✖
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => addBreakdown(entry._id)}
                        className="mt-2 text-sm text-blue-600 hover:underline"
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
