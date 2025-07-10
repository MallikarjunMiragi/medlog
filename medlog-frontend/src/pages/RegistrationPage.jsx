import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../reducers/authReducer";
import Notification from "../Components/Notification"; // Import Notification Component
import "../styles.css"; // Ensure correct path to styles.css

// Helper function to generate a random code
function generateRegistrationCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [role, setRole] = useState("student");

  const [selectedDoctorSpecialty, setSelectedDoctorSpecialty] = useState("");

  const doctorSpecialties = ["Allergy", "Cardiology", "Dermatology", "Emergency medicine", "Oncology", "Pediatrics", "Neurology"];


  const [notification, setNotification] = useState({ isOpen: false, title: "", message: "" });

  const countries = ["India", "United States", "United Kingdom", "Australia", "Canada", "Germany"];
  const trainingYearsIndia = ["Residency", "Postgraduate year 1", "Internship", "Resident medical officer", "Postgraduate year 2", "Postgraduate year 3", "Postgraduate year 4", "Postgraduate year 5", "Consultant"];
  const trainingYearsOther = ["Medical Year 1", "Medical Year 2", "Medical Year 3"];
  const hospitalsIndia = ["KMC Manipal", "AIIMS Delhi", "Fortis Hospital"];
  const hospitalsOther = ["Mayo Clinic", "Cleveland Clinic", "Johns Hopkins Hospital"];
  const specialtiesIndia = ["Allergy", "Cardiology", "Dermatology", "Emergency medicine"];
  const specialtiesOther = ["Oncology", "Pediatrics", "Neurology"];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  // Password should be auto-generated and displayed, not editable
  const [password, setPassword] = useState(() => generateRegistrationCode(10));
  // Confirm password is not needed since password is auto-generated
  const [selectedCountry, setSelectedCountry] = useState("");
  const [trainingYears, setTrainingYears] = useState([]);
  const [selectedTrainingYear, setSelectedTrainingYear] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const handleRoleToggle = () => {
    setRole(role === "student" ? "doctor" : "student");
  };

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    if (country === "India") {
      setTrainingYears(trainingYearsIndia);
      setHospitals(hospitalsIndia);
      setSpecialties(specialtiesIndia);
    } else {
      setTrainingYears(trainingYearsOther);
      setHospitals(hospitalsOther);
      setSpecialties(specialtiesOther);
    }
    setSelectedTrainingYear("");
    setSelectedHospital("");
    setSelectedSpecialty("");
  };



  const handleSubmit = async () => {
    console.log("🔹 handleSubmit triggered! Role:", role);

    if (!fullName || !email || !password) {
      console.log("❌ Missing text-red-600 fields:", {
        fullName, email, password
      });
      setNotification({ isOpen: true, title: "Error", message: "Please fill in all text-red-600 fields." });
      return;
    }

    // Validate fields based on role
    if (role === "student" && (!selectedCountry || !selectedTrainingYear || !selectedHospital || !selectedSpecialty)) {
      console.log("❌ Missing student fields");
      setNotification({ isOpen: true, title: "Error", message: "Please fill in all text-red-600 student fields." });
      return;
    }

    if (role === "doctor" && !selectedDoctorSpecialty) {
      console.log("❌ Missing doctor specialty:", selectedDoctorSpecialty);
      setNotification({ isOpen: true, title: "Error", message: "Please select a specialty for doctor." });
      return;
    }

    // Generate a registration code
    const registrationCode = generateRegistrationCode();

    const userData = {
      fullName,
      email,
      password,
      role,
      specialty: role === "student" ? selectedSpecialty : selectedDoctorSpecialty,
      registrationCode, // Add the generated code
    };

    // Only add student fields if role is student
    if (role === "student") {
      userData.country = selectedCountry;
      userData.trainingYear = selectedTrainingYear;
      userData.hospital = selectedHospital;
    }

    console.log("✅ Submitting Registration Data:", userData);

    try {
      console.log("🚀 Sending API request...");
      await dispatch(signupUser(userData)).unwrap();
      console.log("🎉 Registration Successful!");
      setNotification({ isOpen: true, title: "Success", message: "Registration successful! you can now login." });
    
      setTimeout(() => {
        navigate("/admin/register"); // Pass email to verify-otp page if needed
      }, 1000); // you can reduce timeout to 1s or even navigate immediately
    
    } catch (err) {
      console.error("❌ Registration Error:", err);
      setNotification({ isOpen: true, title: "Error", message: err.error || "Registration failed" });
    }
  };


  return (
    <div className="max-w-[1000px] bg-white/10 p-6 mx-auto my-12 rounded-lg shadow-md text-white [&_label]:mb-1.5 [&_label]:font-bold [&_input]:p-3 [&_input]:mb-4 [&_input]:rounded-md [&_input]:border-0 [&_input]:bg-white/20 [&_input]:placeholder:text-gray-300 [&_select]:p-3 [&_select]:rounded-md [&_select]:border [&_select]:border-gray-300 [&_select]:text-gray-300 [&_select]:bg-white/20 [&_select]:mb-4 [&_option]:bg-gray-700">
      <div className="relative" >
        <h1 className="text-2xl font-bold mb-3 text-[#a9d0cd] text-center font-[cursive] col-span-2">Welcome to MedicalLogBook!</h1>
        <p className="text-sm mb-5 text-center">To configure your account, please provide details about your current medical training.</p>

      </div>

      {/* Notification Modal */}
      <Notification
        isOpen={notification.isOpen}
        onRequestClose={() => setNotification({ isOpen: false })}
        title={notification.title}
        message={notification.message}
      />

      {/* Show Student Fields */}


      <div className="flex flex-col">
        <div className="flex">
          <label>Full Name <span className="text-red-600">*</span>
          </label>

          <button className={`ml-auto !w-24 px-5 py-2 -mt-4 mb-2 text-[16px] text-white rounded-lg cursor-pointer ${role === "student" ? "bg-green-600" : "bg-blue-700"}`} onClick={handleRoleToggle}>
            {role === "student" ? "Student" : "Doctor"}
          </button>
        </div>

        <input type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>

      <div className="flex flex-col">
        <label className="">Email <span className="text-red-600">*</span></label>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="flex flex-col">
        <label>Password <span className="text-red-600">*</span></label>
        <input
          type="text"
          value={password}
          readOnly
          className="bg-gray-200 text-black cursor-not-allowed"
        />
        <span className="text-xs text-gray-400">This password is auto-generated and cannot be changed.</span>
      </div>
      {role === "student" && (
        <>
          <div className="flex flex-col">
            <label>Country <span className="text-red-600">*</span></label>
            <select value={selectedCountry} onChange={handleCountryChange}>
              <option value="">Select a country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {selectedCountry && (
            <>
              <div className="flex flex-col">
                <label>Training Year <span className="text-red-600">*</span></label>
                <select value={selectedTrainingYear} onChange={(e) => setSelectedTrainingYear(e.target.value)}>
                  <option value="">Select your training year</option>
                  {trainingYears.map((year, index) => (
                    <option key={index} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label>Hospital <span className="text-red-600">*</span></label>
                <select value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)}>
                  <option value="">Select a hospital</option>
                  {hospitals.map((hospital, index) => (
                    <option key={index} value={hospital}>{hospital}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label>Specialty <span className="text-red-600">*</span></label>
                <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
                  <option value="">Select a specialty</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </>

      )}

      {/* Show Doctor Fields */}

      {role === "doctor" && (

        <div className="flex flex-col">
          <label>Specialty <span className="text-red-600">*</span></label>
          <select value={selectedDoctorSpecialty} onChange={(e) => setSelectedDoctorSpecialty(e.target.value)}>
            <option value="">Select a specialty</option>
            {doctorSpecialties.map((specialty, index) => (
              <option key={index} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

      )}


      <button className="w-full p-3 rounded-md cursor-pointer bg-[#008080] transition ease duration-300 hover:bg-[#015b5b] font-medium" onClick={() => {
        console.log("🟢 Button clicked! Role:", role);
        handleSubmit();
      }} disabled={isLoading || (role === "student" && !selectedCountry)}>
        {isLoading ? "Registering..." : "Set up Logbook!"}
      </button>


      {/* Go Back Button */}
      <button className="w-full btn-back p-3 mt-3 cursor-pointer rounded-md bg-slate-500 hover:bg-[#015b5b] font-medium" onClick={() => navigate("/")}>Go Back</button>

    </div>
  );
};

export default RegistrationPage;