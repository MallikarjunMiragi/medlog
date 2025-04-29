import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const userEmail = user?.email?.email || user?.email || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    trainingYear: "",
    hospital: "",
    specialty: "",
  });

  const [memberSince, setMemberSince] = useState("");
  const [role, setRole] = useState("");

  const trainingYearsIndia = ["Residency", "Postgraduate year 1", "Internship", "Resident medical officer"];
  const trainingYearsOther = ["Medical Year 1", "Medical Year 2", "Medical Year 3"];
  const hospitalsIndia = ["KMC Manipal", "AIIMS Delhi", "Fortis Hospital"];
  const hospitalsOther = ["Mayo Clinic", "Cleveland Clinic", "Johns Hopkins Hospital"];
  const specialtiesIndia = ["Allergy", "Cardiology", "Dermatology", "Emergency medicine"];
  const specialtiesOther = ["Oncology", "Pediatrics", "Neurology"];

  const [availableTrainingYears, setAvailableTrainingYears] = useState([]);
  const [availableHospitals, setAvailableHospitals] = useState([]);
  const [availableSpecialties, setAvailableSpecialties] = useState([]);

  useEffect(() => {
    if (!userEmail) return;

    fetch(`http://localhost:5000/api/auth/user/${encodeURIComponent(userEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) {
          console.error("User data fetch failed:", data?.error || "Unknown error");
          return;
        }

        setRole(data.role || "student");

        setFormData({
          fullName: data.fullName || "",
          email: data.email || "",
          password: "", // Avoid pre-filling passwords
          country: data.country || "",
          trainingYear: data.trainingYear || "",
          hospital: data.hospital || "",
          specialty: data.specialty || "",
        });

        setMemberSince(new Date(data.createdAt).toLocaleDateString());

        if (data.country === "India") {
          setAvailableTrainingYears(trainingYearsIndia);
          setAvailableHospitals(hospitalsIndia);
          setAvailableSpecialties(specialtiesIndia);
        } else {
          setAvailableTrainingYears(trainingYearsOther);
          setAvailableHospitals(hospitalsOther);
          setAvailableSpecialties(specialtiesOther);
        }
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userEmail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData({ ...formData, country });

    if (country === "India") {
      setAvailableTrainingYears(trainingYearsIndia);
      setAvailableHospitals(hospitalsIndia);
      setAvailableSpecialties(specialtiesIndia);
    } else {
      setAvailableTrainingYears(trainingYearsOther);
      setAvailableHospitals(hospitalsOther);
      setAvailableSpecialties(specialtiesOther);
    }
  };

  const handleUpdate = async () => {
    const updatedUser = { ...formData };

    if (role === "doctor") {
      delete updatedUser.country;
      delete updatedUser.hospital;
      delete updatedUser.trainingYear;
    }

    fetch("http://localhost:5000/api/auth/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Profile updated successfully!");
        }
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        toast.error("Failed to update profile.");
      });
  };

  const handleDelete = async () => {
    if (!formData.email) {
      toast.error("No user found to delete.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    fetch(`http://localhost:5000/api/auth/user/delete/${encodeURIComponent(formData.email)}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Account deleted successfully!");
          setTimeout(() => navigate("/"), 2000);
        }
      })
      .catch((err) => {
        console.error("Error deleting account:", err);
        toast.error("Failed to delete account.");
      });
  };

  return (
    <div className="w-4/5 mx-auto p-6 bg-slate-700 rounded-lg text-white shadow-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center">Account Information</h2>

      <p className="text-center mb-6">
        <strong>Email:</strong> {formData.email}{" "}
        <FaCheckCircle className="inline text-green-400 ml-2" />
      </p>

      <label className="block text-lg font-semibold mb-1">Full Name*</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-600 focus:outline-none"
      />

      <label className="block text-lg font-semibold mb-1">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter new password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-600 focus:outline-none"
      />

      {/* Doctor-specific fields */}
      {role === "doctor" && (
        <>
          <label className="block text-lg font-semibold mb-1">Specialty*</label>
          <select
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-600 focus:outline-none"
          >
            <option value="">Select specialty</option>
            {specialtiesIndia.concat(specialtiesOther).map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Student-specific fields */}
      {role === "student" && (
        <>
          <label className="block text-lg font-semibold mb-1">Country*</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-600 focus:outline-none"
          >
            <option value="">Select a country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
          </select>

          {/* Training Year */}
          {formData.country && (
            <>
              <label className="block text-lg font-semibold mb-1">Training Year*</label>
              <select
                name="trainingYear"
                value={formData.trainingYear}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-600 focus:outline-none"
              >
                <option value="">Select training year</option>
                {availableTrainingYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Hospital */}
              <label className="block text-lg font-semibold mb-1">Hospital*</label>
              <select
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-600 focus:outline-none"
              >
                <option value="">Select hospital</option>
                {availableHospitals.map((hosp) => (
                  <option key={hosp} value={hosp}>
                    {hosp}
                  </option>
                ))}
              </select>

              {/* Specialty */}
              <label className="block text-lg font-semibold mb-1">Specialty*</label>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-600 focus:outline-none"
              >
                <option value="">Select specialty</option>
                {availableSpecialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </>
          )}
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
          onClick={handleUpdate}
        >
          Update
        </button>

        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
          onClick={handleDelete}
        >
          <FaTrash /> Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
