import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css"; 

const AccountPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // ✅ Extract user email properly
  const userEmail = user?.email?.email || user?.email || "";

  // ✅ Initial State for Prefilled Data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    trainingYear: "",
    hospital: "",
    specialty: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [memberSince, setMemberSince] = useState("");
  const [role, setRole] = useState(""); // Store user role

  // ✅ Training Year, Hospitals, Specialties Lists
  const trainingYearsIndia = ["Residency", "Postgraduate year 1", "Internship", "Resident medical officer"];
  const trainingYearsOther = ["Medical Year 1", "Medical Year 2", "Medical Year 3"];
  const hospitalsIndia = ["KMC Manipal", "AIIMS Delhi", "Fortis Hospital"];
  const hospitalsOther = ["Mayo Clinic", "Cleveland Clinic", "Johns Hopkins Hospital"];
  const specialtiesIndia = ["Allergy", "Cardiology", "Dermatology", "Emergency medicine"];
  const specialtiesOther = ["Oncology", "Pediatrics", "Neurology"];

  const [availableTrainingYears, setAvailableTrainingYears] = useState([]);
  const [availableHospitals, setAvailableHospitals] = useState([]);
  const [availableSpecialties, setAvailableSpecialties] = useState([]);

  // ✅ Fetch Logged-in User Details
  useEffect(() => {
    if (!userEmail) return;

    fetch(`http://localhost:5000/api/auth/user/${encodeURIComponent(userEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) {
          console.error("User data fetch failed:", data?.error || "Unknown error");
          return;
        }
        setRole(data.role || "student"); // Default to student if role is missing

        setFormData({
          fullName: data.fullName || "",
          email: data.email || "", // ✅ Non-editable
          password:data.password, // Do not prefill password for security reasons
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

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Country Selection (Updates Dropdowns)
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setFormData({ ...formData, country: selectedCountry });

    if (selectedCountry === "India") {
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

    // If the user is a doctor, remove unnecessary fields
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
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Profile updated successfully!");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
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
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Account deleted successfully!");
        setTimeout(() => {
          navigate("/"); // ✅ Redirect to login page after deletion
        }, 2000);
      }
    })
    .catch((error) => {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account.");
    });
};


  return (
    <div className="w-[80%] flex flex-col m-auto p-5 bg-[#344d66] rounded-md font-arial text-white [&_label]:mb-1.5 [&_label]:font-bold [&_input]:p-3 [&_input]:mb-4 [&_input]:rounded-md [&_input]:border-0 [&_input]:bg-white/20 [&_input]:placeholder:text-gray-300 [&_select]:p-3 [&_select]:rounded-md [&_select]:border [&_select]:border-gray-300 [&_select]:text-gray-300 [&_select]:bg-white/20 [&_select]:mb-4 [&_option]:bg-gray-700">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-2">Account Information</h2>

      <p className="flex items-center mb-6">
        <strong>Email:</strong> {formData.email} <FaCheckCircle className="text-[#0e856f]" />
      </p>


      <label>Full Name*</label>
      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

      <label>Password</label>
      <input type="password" name="password" placeholder="Enter new password" value={formData.password} onChange={handleChange} />
      {role === "doctor" && (
  <>
    <label>Specialty*</label>
    <select name="specialty" value={formData.specialty} onChange={handleChange}>
      <option value="">Select specialty</option>
      <option value="Allergy">Allergy</option>
      <option value="Cardiology">Cardiology</option>
      <option value="Dermatology">Dermatology</option>
      <option value="Emergency medicine">Emergency medicine</option>
      <option value="Oncology">Oncology</option>
      <option value="Pediatrics">Pediatrics</option>
      <option value="Neurology">Neurology</option>
    </select>
  </>
)}
{role === "student" && (
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
  </>
)}


      {role === "student" && formData.country && (

        
        <>
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
            {availableHospitals.map((hospital) => (
              <option key={hospital} value={hospital}>{hospital}</option>
            ))}
          </select>

          <label>Specialty*</label>
          <select name="specialty" value={formData.specialty} onChange={handleChange}>
            <option value="">Select specialty</option>
            {availableSpecialties.map((specialty) => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </>
      )}

<button className="w-full p-3 bg-[#008080] rounded-md cursor-pointer transition delay-300 hover:#015b5b" onClick={handleUpdate}>Update</button>
<button className="bg-[#2f2267] py-2 px-4 rounded-md cursor-pointer flex justify-center gap-1.5 mt-2" onClick={handleDelete}>
        <FaTrash /> Delete Account
      </button>
    </div>
  );
};

export default AccountPage;
