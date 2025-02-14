import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure correct path to styles.css

const RegistrationPage = () => {
  const navigate = useNavigate();

  const countries = ["India", "United States", "United Kingdom", "Australia", "Canada", "Germany"];
  const trainingYearsIndia = ["Residency", "Postgraduate year 1", "Internship", "Resident medical officer","Postgraduate year 2","Postgraduate year 3","Postgraduate year 4","Postgraduate year 5","Consultant"];
  const trainingYearsOther = ["Medical Year 1", "Medical Year 2", "Medical Year 3"];
  const hospitalsIndia = ["KMC Manipal", "AIIMS Delhi", "Fortis Hospital"];
  const hospitalsOther = ["Mayo Clinic", "Cleveland Clinic", "Johns Hopkins Hospital"];
  const specialtiesIndia = ["Allergy", "Cardiology", "Dermatology", "Emergency medicine"];
  const specialtiesOther = ["Oncology", "Pediatrics", "Neurology"];

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

  // Handle country selection
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

  // Form submission
  const handleSubmit = () => {
    if (!email || !password || !confirmPassword || !selectedCountry || !selectedTrainingYear || !selectedHospital || !selectedSpecialty) {
      alert("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const registrationDetails = { email, password, selectedCountry, selectedTrainingYear, selectedHospital, selectedSpecialty };
    localStorage.setItem("userDetails", JSON.stringify(registrationDetails));
    navigate("/logbookpage");
  };

  return (
    <div className="registration-container">
      <h1 className="title">Welcome to MedicalLogBook!</h1>
      <p className="subtitle">To configure your account, please provide details about your current medical training.</p>
      
      {/* Email Input */}
      <div className="form-group">
        <label>Email <span className="required">*</span></label>
        <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      {/* Password Input */}
      <div className="form-group">
        <label>Password <span className="required">*</span></label>
        <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      {/* Confirm Password Input */}
      <div className="form-group">
        <label>Confirm Password <span className="required">*</span></label>
        <input type="password" className="form-control" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>

      {/* Country Selection */}
      <div className="form-group">
        <label>Country <span className="required">*</span></label>
        <select className="form-control" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Training Year */}
      {selectedCountry && (
        <div className="form-group">
          <label>Training Year <span className="required">*</span></label>
          <select className="form-control" value={selectedTrainingYear} onChange={(e) => setSelectedTrainingYear(e.target.value)}>
            <option value="">Select your training year</option>
            {trainingYears.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>
      )}

      {/* Hospital Selection */}
      {selectedCountry && (
        <div className="form-group">
          <label>Hospital <span className="required">*</span></label>
          <select className="form-control" value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)}>
            <option value="">Select a hospital</option>
            {hospitals.map((hospital, index) => (
              <option key={index} value={hospital}>{hospital}</option>
            ))}
          </select>
        </div>
      )}

      {/* Specialty Selection */}
      {selectedCountry && (
        <div className="form-group">
          <label>Specialty <span className="required">*</span></label>
          <select className="form-control" value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
            <option value="">Select a specialty</option>
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      )}

      {/* Submit Button */}
      <button className="btn-submit" onClick={handleSubmit} disabled={!selectedCountry}>Set up Logbook!</button>
    </div>
  );
};

export default RegistrationPage;
