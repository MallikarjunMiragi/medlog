import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/StudentEntriesStyles.css"; // ✅ Ensure styles are updated
import DoctorSidebar from "../components/DoctorSidebar";

const StudentEntries = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const student = location.state?.student || {};
    const [entries, setEntries] = useState([]);
    const [comments, setComments] = useState({});
    const [scores, setScores] = useState({}); // ✅ Store scores for each entry

    useEffect(() => {
        if (student.email) {
            fetch(`http://localhost:5000/api/logentry/${encodeURIComponent(student.email)}`)
                .then((res) => res.json())
                .then((logEntries) => {
                    console.log(`Log Entries for ${student.fullName}:`, logEntries);
                    setEntries(logEntries);
                })
                .catch((error) => console.error(`Error fetching logs for ${student.email}:`, error));
        }
    }, [student]);

    // ✅ Handle comment change
    const handleCommentChange = (entryId, value) => {
        setComments({ ...comments, [entryId]: value });
    };
    const handleScoreChange = (entryId, value) => {
        setScores((prevScores) => ({
            ...prevScores,
            [entryId]: value,
        }));
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
                console.log("✅ Comment saved:", result);
                alert(`Comment submitted: ${comments[entryId]}`);
            } else {
                console.error("❌ Error saving comment:", result.error);
            }
        } catch (error) {
            console.error("❌ Server error:", error);
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
                console.log("✅ Score saved:", result);
                alert(`Score submitted: ${scores[entryId]}`);
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

                {entries.length === 0 ? (
                    <p className="no-entries-text">No log entries found.</p>
                ) : (
                    entries.map((entry) => (
                        <div key={entry._id} className="entry-box">
                            {/* 🔹 Score Box at Top-Right Corner */}
                            <div className="score-box">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="Score (0-100)"
                                    value={scores[entry._id] || ""}
                                    onChange={(e) => handleScoreChange(entry._id, e.target.value)}
                                />
                                <button onClick={() => handleScoreSubmit(entry._id)}>Submit</button>
                            </div>

                            {/* Entry Content */}
                            <h4 className="entry-category-name">{entry.category.name}</h4>
                            <div className="entry-details-container">
                                {Object.entries(entry.data).map(([key, value]) => (
                                    <p key={key} className="entry-detail">
                                        <strong>{key.replace(/_/g, " ")}:</strong> {value || "N/A"}
                                    </p>
                                ))}
                            </div>

                            {/* 🔽 Comment Box Below Each Entry */}
                            <div className="comment-box">
                                <textarea
                                    placeholder="Write a comment..."
                                    value={comments[entry._id] || ""}
                                    onChange={(e) => handleCommentChange(entry._id, e.target.value)}
                                />
                                <button onClick={() => handleCommentSubmit(entry._id)}>Submit</button>
                            </div>
                        </div>
                    ))
                )}

                <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
};

export default StudentEntries;
