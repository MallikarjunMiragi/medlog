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
                    console.log(`Entries for ${student.fullName}:`, data);
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

    const handleSubmitReview = async (entryId) => {
        if (!comments[entryId] || !scores[entryId]) {
            setNotification({
                isOpen: true,
                message: "Please enter both a comment and a score.",
                type: "error",
            });
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/logentry/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    entryId,
                    comments: comments[entryId],
                    score: scores[entryId],
                }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log("✅ Review saved:", result);
                setNotification({
                    isOpen: true,
                    message: "Review submitted: Comment and Score",
                    type: "success",
                });

                setReviewedEntries([...reviewedEntries, { ...result.updatedEntry }]);
                setNotReviewedEntries(notReviewedEntries.filter(entry => entry._id !== entryId));

                setComments({ ...comments, [entryId]: "" });
                setScores({ ...scores, [entryId]: "" });
            } else {
                console.error("❌ Error saving review:", result.error);
            }
        } catch (error) {
            console.error("❌ Server error:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            
            <div className="flex-grow p-6 overflow-y-auto relative">
                <div className="absolute top-6 left-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded-full text-sm transition-all duration-300"
                    >
                        ←Back
                    </button>
                </div>

                <h2 className="text-3xl font-bold text-center mb-12">Entries for {student.fullName}</h2>

                <div className="flex justify-center mb-8 gap-4">
                    <button
                        className={`px-6 py-2 rounded-full transition-all duration-300 ${
                            selectedTab === "not-reviewed"
                                ? "bg-teal-600 font-bold"
                                : "bg-gray-700 hover:bg-teal-500"
                        }`}
                        onClick={() => setSelectedTab("not-reviewed")}
                    >
                        Not Reviewed
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full transition-all duration-300 ${
                            selectedTab === "reviewed"
                                ? "bg-teal-600 font-bold"
                                : "bg-gray-700 hover:bg-teal-500"
                        }`}
                        onClick={() => setSelectedTab("reviewed")}
                    >
                        Reviewed
                    </button>
                </div>

                {displayedEntries.length === 0 ? (
                    <p className="text-center text-gray-400 text-lg">
                        No {selectedTab.replace("-", " ")} entries found.
                    </p>
                ) : (
                    displayedEntries.map((entry) => (
                        <div key={entry._id} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 relative">
                            <h4 className="text-xl font-bold mb-4">{entry.category}</h4>

                            <div className="mb-6">
                                {Object.entries(entry.data).map(([key, value]) => (
                                    <p key={key} className="text-sm mb-2">
                                        <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                                        {typeof value === "string" && value.startsWith("https://res.cloudinary.com/") ? (
                                            <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                                                📄 Open File
                                            </a>
                                        ) : (
                                            value || "N/A"
                                        )}
                                    </p>
                                ))}
                            </div>

                            {selectedTab === "reviewed" ? (
                                <>
                                    <p className="text-sm mb-2"><strong>Doctor's Comments:</strong> {entry.comments}</p>
                                    <p className="text-sm"><strong>Score:</strong> {entry.score}/100</p>
                                </>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <textarea
                                        placeholder="Write a comment..."
                                        value={comments[entry._id] || ""}
                                        onChange={(e) => handleCommentChange(entry._id, e.target.value)}
                                        className="w-full p-3 bg-gray-700 rounded resize-none"
                                    />
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            placeholder="Score"
                                            value={scores[entry._id] || ""}
                                            onChange={(e) => handleScoreChange(entry._id, e.target.value)}
                                            className="w-24 p-2 rounded bg-gray-700 text-center"
                                        />
                                        <button
                                            onClick={() => handleSubmitReview(entry._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
                                        >
                                            Submit Review
                                        </button>
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
