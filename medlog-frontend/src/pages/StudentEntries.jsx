import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/StudentEntriesStyles.css";
import DoctorSidebar from "../components/DoctorSidebar";

const StudentEntries = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const student = location.state?.student || {};

    const [reviewedEntries, setReviewedEntries] = useState([]);
    const [notReviewedEntries, setNotReviewedEntries] = useState([]);
    const [selectedTab, setSelectedTab] = useState("not-reviewed"); // Default: Not Reviewed
    const [comments, setComments] = useState({});
    const [scores, setScores] = useState({});

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

    // ✅ Switch between "Reviewed" & "Not Reviewed"
    const displayedEntries = selectedTab === "reviewed" ? reviewedEntries : notReviewedEntries;

    // ✅ Handle comment change
    const handleCommentChange = (entryId, value) => {
        setComments({ ...comments, [entryId]: value });
    };

    // ✅ Handle score change
    const handleScoreChange = (entryId, value) => {
        setScores({ ...scores, [entryId]: value });
    };

    // ✅ Submit comment
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
                console.log("✅ Comment saved:", result);
                alert(`Comment submitted: ${comments[entryId]}`);

                // Update reviewed list after submission
                setReviewedEntries([...reviewedEntries, { ...result.updatedEntry }]);
                setNotReviewedEntries(notReviewedEntries.filter(entry => entry._id !== entryId));
                setComments({ ...comments, [entryId]: "" });
            } else {
                console.error("❌ Error saving comment:", result.error);
            }
        } catch (error) {
            console.error("❌ Server error:", error);
        }
    };

    // ✅ Submit score
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
                console.log("✅ Score saved:", result);
                alert(`Score submitted: ${scores[entryId]}`);

                // Update reviewed list after submission
                setReviewedEntries([...reviewedEntries, { ...result.updatedEntry }]);
                setNotReviewedEntries(notReviewedEntries.filter(entry => entry._id !== entryId));
                setScores({ ...scores, [entryId]: "" });
            } else {
                console.error("❌ Error saving score:", result.error);
            }
        } catch (error) {
            console.error("❌ Server error:", error);
        }
    };

    return (
        <div className="student-entries-container">
            <DoctorSidebar />
            <div className="entries-content">
                <h2 className="student-entries-title">Entries for {student.fullName}</h2>

                {/* 🔹 Toggle Button for Reviewed & Not Reviewed */}
                <div className="toggle-container">
                    <button
                        className={`toggle-btn ${selectedTab === "not-reviewed" ? "active" : ""}`}
                        onClick={() => setSelectedTab("not-reviewed")}
                    >
                        Not Reviewed
                    </button>
                    <button
                        className={`toggle-btn ${selectedTab === "reviewed" ? "active" : ""}`}
                        onClick={() => setSelectedTab("reviewed")}
                    >
                        Reviewed
                    </button>
                </div>

                {/* 🔹 Display Entries Based on Selected Tab */}
                {displayedEntries.length === 0 ? (
                    <p className="no-entries-text">No {selectedTab.replace("-", " ")} entries found.</p>
                ) : (
                    displayedEntries.map((entry) => (
                        <div key={entry._id} className="entry-box">
                            <h4 className="entry-category-name">{entry.category}</h4>
                            <div className="entry-details-container">
                            {Object.entries(entry.data).map(([key, value]) => (
    <p key={key} className="entry-detail">
        <strong>{key.replace(/_/g, " ")}:</strong> 
        {key === "file" && value ? (
            <a href={`http://localhost:5000${value}`} download>
                Download File
            </a>
        ) : (
            value || "N/A"
        )}
    </p>
))}

                            </div>

                            {/* ✅ Show Comments & Score for Reviewed Entries */}
                            {selectedTab === "reviewed" && (
                                <>
                                    <p className="entry-detail"><strong>Doctor's Comments:</strong> {entry.comments}</p>
                                    <p className="entry-detail"><strong>Score:</strong> {entry.score}/100</p>
                                </>
                            )}

                            {/* ✅ Show Comment & Score Inputs for Not Reviewed Entries */}
                            {selectedTab === "not-reviewed" && (
                                <div className="review-inputs">
                                    <textarea
                                        placeholder="Write a comment..."
                                        value={comments[entry._id] || ""}
                                        onChange={(e) => handleCommentChange(entry._id, e.target.value)}
                                    />
                                    <button onClick={() => handleCommentSubmit(entry._id)}>Submit Comment</button>
                                    {/* 🔹 Score Box at Top-Right Corner */}
<div className="score-box">
    <input
        type="number"
        min="0"
        max="100"
        placeholder="Score"
        value={scores[entry._id] || ""}
        onChange={(e) => handleScoreChange(entry._id, e.target.value)}
    />
    <button onClick={() => handleScoreSubmit(entry._id)}>Submit</button>
</div>

                                </div>
                            )}
                        </div>
                    ))
                )}

                {/* 🔹 Back Button */}
                <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
};

export default StudentEntries;
