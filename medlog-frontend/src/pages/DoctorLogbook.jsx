import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ Get user from Redux

const DoctorLogbook = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // ✅ Get logged-in doctor from Redux
  const doctor = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!doctor || doctor.role !== "doctor") {
      console.error("No doctor logged in");
      return;
    }

    // ✅ FIXED: Use backticks for template literal
    fetch(`http://localhost:5000/api/auth/users?specialty=${encodeURIComponent(doctor.specialty)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        return response.json();
      })
      .then((studentsData) => {
        console.log("✅ Filtered Students:", studentsData);
        setStudents(studentsData);
      })
      .catch((error) => console.error("❌ Error fetching students:", error));
  }, [doctor]); // ✅ Re-run if doctor changes

  const handleViewEntries = (student) => {
    navigate("/student-entries", { state: { student } });
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="flex-grow p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Doctor Logbook - View Student Entries
        </h2>

        {students.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No students found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-700 text-white rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-slate-800">
                  <th className="py-3 px-6 text-left">Student Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-b border-slate-600 hover:bg-slate-600">
                    <td className="py-3 px-6">{student.fullName}</td>
                    <td className="py-3 px-6">{student.email}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleViewEntries(student)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
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
