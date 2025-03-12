import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ Import useSelector to get logged-in user from Redux
import "../styles.css";
import DoctorSidebar from "../components/DoctorSidebar";

const DoctorLogbook = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    // ✅ Get logged-in user details from Redux store
    const doctor = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!doctor || doctor.role !== "doctor") {
            console.error("No doctor logged in");
            return;
        }

        // ✅ Fetch students with the same specialty as the doctor
        fetch(`http://localhost:5000/api/auth/users?specialty=${encodeURIComponent(doctor.specialty)}`)
            .then((response) => response.json())
            .then((studentsData) => {
                console.log("✅ Filtered Students:", studentsData);
                setStudents(studentsData);
            })
            .catch((error) => console.error("❌ Error fetching students:", error));
    }, [doctor]); // ✅ Re-run when `doctor` changes

    const handleViewEntries = (student) => {
        navigate("/student-entries", { state: { student } });
    };

    return (
        <div className="doctor-logbook-layout">
            <DoctorSidebar />
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
