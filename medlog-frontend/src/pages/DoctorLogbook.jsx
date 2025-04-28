import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorLogbook = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const doctor = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!doctor || doctor.role !== "doctor") {
      console.error("No doctor logged in");
      return;
    }

    fetch(
      `http://localhost:5000/api/auth/users?specialty=${encodeURIComponent(
        doctor.specialty
      )}`
    )
      .then((response) => response.json())
      .then((studentsData) => {
        console.log("✅ Filtered Students:", studentsData);
        setStudents(studentsData);
      })
      .catch((error) => console.error("❌ Error fetching students:", error));
  }, [doctor]);

  const handleViewEntries = (student) => {
    navigate("/student-entries", { state: { student } });
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex-grow px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Doctor Logbook - View Student Entries
        </h2>

        {students.length === 0 ? (
          <p className="text-center text-gray-400">No students found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-800 text-gray-300">
                  <th className="p-3 text-left">Student Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student._id}
                    className="odd:bg-gray-700 even:bg-gray-800"
                  >
                    <td className="p-3">{student.fullName}</td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition"
                        onClick={() => handleViewEntries(student)}
                      >
                        View Entries
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorLogbook;
