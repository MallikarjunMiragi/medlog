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

  const [loading, setLoading] = useState(true); // ✅ Loader state
  const [role, setRole] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [profileImage, setProfileImage] = useState(null);

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
          password: data.password,
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
      .catch((error) => console.error("Error fetching user details:", error))
      .finally(() => setLoading(false)); // ✅ Hide loader after fetch
  }, [userEmail]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
    setLoading(true);
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
        if (data.error) toast.error(data.error);
        else toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update profile.");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    setLoading(true);

    fetch(`http://localhost:5000/api/auth/user/delete/${encodeURIComponent(formData.email)}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) toast.error(data.error);
        else {
          toast.success("Account deleted!");
          setTimeout(() => navigate("/"), 2000);
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error("Failed to delete account.");
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1e2a38] text-white">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-teal-400"></div>
      </div>
    );
  }

  return (
    <div className="w-[80%] flex flex-col m-auto p-5 bg-[#364454] rounded-md font-arial text-white [&_label]:mb-1.5 [&_label]:font-bold [&_input]:p-3 [&_input]:mb-4 [&_input]:rounded-md [&_input]:border-0 [&_input]:bg-white/20 [&_input]:placeholder:text-gray-300 [&_select]:p-3 [&_select]:rounded-md [&_select]:border [&_select]:border-gray-300 [&_select]:text-gray-300 [&_select]:bg-white/20 [&_select]:mb-4 [&_option]:bg-gray-700">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-2">Account Information</h2>

      <p className="flex items-center mb-6">
        <strong>Email:</strong> {formData.email} <FaCheckCircle className="text-[#0e856f] ml-1" />
      </p>

      <label>Full Name*</label>
      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

      <label>Password</label>
      <input type="password" name="password" placeholder="Enter new password" value={formData.password} onChange={handleChange} />

      {role === "doctor" ? (
        <>
          <label>Specialty*</label>
          <select name="specialty" value={formData.specialty} onChange={handleChange}>
            <option value="">Select specialty</option>
            {specialtiesIndia.concat(specialtiesOther).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </>
      ) : (
        <>
          <label>Country*</label>
          <select name="country" value={formData.country} onChange={handleCountryChange}>
            <option value="">Select a country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
          </select>

          <label>Training Year*</label>
          <select name="trainingYear" value={formData.trainingYear} onChange={handleChange}>
            <option value="">Select training year</option>
            {availableTrainingYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <label>Hospital*</label>
          <select name="hospital" value={formData.hospital} onChange={handleChange}>
            <option value="">Select hospital</option>
            {availableHospitals.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>

          <label>Specialty*</label>
          <select name="specialty" value={formData.specialty} onChange={handleChange}>
            <option value="">Select specialty</option>
            {availableSpecialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </>
      )}

      <button className="w-full p-3 bg-[#008080] rounded-md cursor-pointer transition hover:bg-[#015b5b]" onClick={handleUpdate}>
        Update
      </button>
      <button className="bg-[#2f2267] py-2 px-4 rounded-md cursor-pointer flex justify-center items-center gap-1.5 mt-2" onClick={handleDelete}>
        <FaTrash /> Delete Account
      </button>
    </div>
  );
};

export default AccountPage;
