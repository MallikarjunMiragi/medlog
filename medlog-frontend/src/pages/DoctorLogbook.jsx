import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure correct import
import DoctorSidebar from "../components/DoctorSidebar";

const DoctorLogbook = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/auth/users")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Students:", data);
                setStudents(data);
            })
            .catch((error) => console.error("Error fetching students:", error));
    }, []);

    const handleViewEntries = (student) => {
        navigate("/student-entries", { state: { student } });
    };

    return (
        <div className="doctor-logbook-layout">
            {/* Sidebar on Left */}
            <DoctorSidebar />

            {/* Main Content */}
            <div className="doctor-logbook-container">
                <h2 className="doctor-logbook-title">Doctor Logbook - View Student Entries</h2>

                {students.length === 0 ? (
                    <p className="no-students">No students found.</p>
                ) : (
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.fullName}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <button 
                                            className="view-entries-btn"
                                            onClick={() => handleViewEntries(student)}
                                        >
                                            View Entries
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DoctorLogbook;
