import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../reducers/authReducer";
import Notification from "../Components/Notification"; // Import Notification Component
import "../styles.css"; // Ensure correct path to styles.css

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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (!fullName || !email || !password || !confirmPassword) {
      console.log("❌ Missing required fields:", {
        fullName, email, password, confirmPassword
      });
      setNotification({ isOpen: true, title: "Error", message: "Please fill in all required fields." });
      return;
    }
    

    // Validate fields based on role
    if (role === "student" && (!selectedCountry || !selectedTrainingYear || !selectedHospital || !selectedSpecialty)) {
        console.log("❌ Missing student fields");
        setNotification({ isOpen: true, title: "Error", message: "Please fill in all required student fields." });
        return;
    }
    
    if (role === "doctor" && !selectedDoctorSpecialty) {
      console.log("❌ Missing doctor specialty:", selectedDoctorSpecialty);
      setNotification({ isOpen: true, title: "Error", message: "Please select a specialty for doctor." });
      return;
    }
    

    const userData = {
        fullName,
        email,
        password,
        role,
        specialty: role === "student" ? selectedSpecialty : selectedDoctorSpecialty,
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
        setNotification({ isOpen: true, title: "Success", message: "Registration successful!" });
        setTimeout(() => {
          navigate("/pending-approval");
        }, 2000);
        
        
    } catch (err) {
        console.error("❌ Registration Error:", err);
        setNotification({ isOpen: true, title: "Error", message: err.error || "Registration failed" });
    }
};


  return (
    <div className="registration-container">
      <div className="role-toggle-container">
        <button className={`role-toggle ${role === "student" ? "active" : ""}`} onClick={handleRoleToggle}>
          {role === "student" ? "Student" : "Doctor"}
        </button>
      </div>
      <h1 className="title">Welcome to MedicalLogBook!</h1>
      <p className="subtitle">To configure your account, please provide details about your current medical training.</p>

      {/* Notification Modal */}
      <Notification 
        isOpen={notification.isOpen} 
        onRequestClose={() => setNotification({ isOpen: false })} 
        title={notification.title} 
        message={notification.message} 
      />

  {/* Show Student Fields */}
{role === "student" && (
  <>
    <div className="form-group">
      <label>Full Name <span className="required">*</span></label>
      <input type="text" className="form-control" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Email <span className="required">*</span></label>
      <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Password <span className="required">*</span></label>
      <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Confirm Password <span className="required">*</span></label>
      <input type="password" className="form-control" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Country <span className="required">*</span></label>
      <select className="form-control" value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>{country}</option>
        ))}
      </select>
    </div>

    {selectedCountry && (
      <>
        <div className="form-group">
          <label>Training Year <span className="required">*</span></label>
          <select className="form-control" value={selectedTrainingYear} onChange={(e) => setSelectedTrainingYear(e.target.value)}>
            <option value="">Select your training year</option>
            {trainingYears.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Hospital <span className="required">*</span></label>
          <select className="form-control" value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)}>
            <option value="">Select a hospital</option>
            {hospitals.map((hospital, index) => (
              <option key={index} value={hospital}>{hospital}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Specialty <span className="required">*</span></label>
          <select className="form-control" value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
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
  <>
    <div className="form-group">
      <label>Full Name <span className="required">*</span></label>
      <input type="text" className="form-control" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Email <span className="required">*</span></label>
      <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Password <span className="required">*</span></label>
      <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Confirm Password <span className="required">*</span></label>
      <input type="password" className="form-control" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Specialty <span className="required">*</span></label>
      <select className="form-control" value={selectedDoctorSpecialty} onChange={(e) => setSelectedDoctorSpecialty(e.target.value)}>
        <option value="">Select a specialty</option>
        {doctorSpecialties.map((specialty, index) => (
          <option key={index} value={specialty}>{specialty}</option>
        ))}
      </select>
    </div>
  </>
)}


<button className="btn-submit" onClick={() => {
  console.log("🟢 Button clicked! Role:", role);
  handleSubmit();
}} disabled={isLoading || (role === "student" && !selectedCountry)}>
  {isLoading ? "Registering..." : "Set up Logbook!"}
</button>


      {/* Go Back Button */}
      <button className="btn-back" onClick={() => navigate("/")}>Go Back</button>

    </div>
  );
};

export default RegistrationPage;
