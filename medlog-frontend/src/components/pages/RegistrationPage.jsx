import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const RegistrationPage = () => {
  const navigate = useNavigate();
  const countries = [
    "India",
    "United States",
    "United Kingdom",
    "Australia",
    "Canada",
    "Germany",
    "France",
    "Japan",
    "China",
    "Brazil",
  ];

  const trainingYearsIndia = [
    "Residency",
    "Postgraduate year 1",
    "Internship",
    "Resident medical officer",
    "Postgraduate year 2",
    "Postgraduate year 3",
    "Postgraduate year 4",
    "Postgraduate year 5",
    "Postgraduate year 6",
    "Postgraduate year 7",
    "Postgraduate year 8",
    "Consultant",
  ];

  const trainingYearsOther = [
    "Medical Year 1",
    "Medical Year 2",
    "Medical Year 3",
    "Medical Year 4",
    "Medical Year 5",
  ];

  const hospitalsIndia = [
    "KMC Manipal",
    "AIIMS Delhi",
    "Fortis Hospital",
    "Apollo Hospital",
    "Narayana Health",
  ];

  const hospitalsOther = [
    "Mayo Clinic",
    "Cleveland Clinic",
    "Johns Hopkins Hospital",
    "Massachusetts General Hospital",
    "Toronto General Hospital",
  ];

  const specialtiesIndia = [
    "Allergy",
    "Acute care common stem",
    "Audiological medicine",
    "Biochemistry",
    "Cardiology",
    "Cardiothoracic surgery",
    "Clinical genetics",
    "Clinical neurophysiology",
    "Dermatology",
    "Diagnostic radiology",
    "Emergency medicine",
    "General surgery",
    "General internal medicine",
    "Infectious disease",
  ];

  const specialtiesOther = [
    "Oncology",
    "Pediatrics",
    "Neurology",
    "Orthopedics",
    "Psychiatry",
  ];

  const [selectedCountry, setSelectedCountry] = useState("");
  const [trainingYears, setTrainingYears] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [showAddHospitalBox, setShowAddHospitalBox] = useState(false);
  const [showAddSpecialtyBox, setShowAddSpecialtyBox] = useState(false);
  const [newHospital, setNewHospital] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    if (country === "India") {
      setTrainingYears(trainingYearsIndia);
      setHospitals(hospitalsIndia);
      setSpecialties(specialtiesIndia);
    } else if (country) {
      setTrainingYears(trainingYearsOther);
      setHospitals(hospitalsOther);
      setSpecialties(specialtiesOther);
    } else {
      setTrainingYears([]);
      setHospitals([]);
      setSpecialties([]);
    }
  };

  const handleAddHospital = () => {
    if (newHospital.trim()) {
      setHospitals([...hospitals, newHospital]);
      setNewHospital("");
      setShowAddHospitalBox(false);
    }
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim()) {
      setSpecialties([...specialties, newSpecialty]);
      setNewSpecialty("");
      setShowAddSpecialtyBox(false);
    }
  };
  const handleSubmit = () => {
    const email = localStorage.getItem('userEmail'); // Get email from local storage
    const registrationDetails = {
      email,
      country: selectedCountry,
      trainingYear: trainingYears[0], // Assuming first selection is the intended one
      hospitals,
      specialties,
    };
  
    // Save the email explicitly in local storage
    localStorage.setItem('userEmail', email);
  
    // Save the registration details in local storage
    localStorage.setItem('userDetails', JSON.stringify(registrationDetails));
  
    // Navigate to the welcome page
    navigate('/welcome');
  };
  


  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <h1>Welcome to MedicalLogBook</h1>
      <p>
        To configure your account we need to collect some information about
        your current medical training post.
      </p>
      <p>
        If you are from a country not listed, please email us to get set up at{" "}
        <a href="mailto:support@logitbox.com">support@logitbox.com</a>
      </p>

      {/* Country Dropdown */}
      <div>
        <label>
          Country <span style={{ color: "red" }}>*</span>
        </label>
        <select
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          onChange={handleCountryChange}
          value={selectedCountry}
        >
          <option value="">Select a country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Training Year Dropdown */}
      <div>
        <label>
          Training year <span style={{ color: "red" }}>*</span>
        </label>
        <select
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          disabled={!selectedCountry} // Disable if no country selected
        >
          <option value="">
            {selectedCountry
              ? "Select a training year"
              : "Select a country first"}
          </option>
          {trainingYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Hospitals Section */}
      <div>
        <h3>Hospitals</h3>
        <p>
          Hospitals you select here will be available in your logbook to log
          entries against. Select as many hospitals as you need.
        </p>
        <select
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          disabled={!selectedCountry} // Disable if no country selected
        >
          <option value="">
            {selectedCountry
              ? "Select a hospital"
              : "Select a country first"}
          </option>
          {hospitals.map((hospital, index) => (
            <option key={index} value={hospital}>
              {hospital}
            </option>
          ))}
        </select>
        <button
          style={{
            padding: "10px 15px",
            margin: "10px 0",
            cursor: selectedCountry ? "pointer" : "not-allowed",
          }}
          disabled={!selectedCountry}
          onClick={() => setShowAddHospitalBox(true)}
        >
          + Add additional hospital
        </button>

        {showAddHospitalBox && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={newHospital}
              onChange={(e) => setNewHospital(e.target.value)}
              placeholder="Enter hospital name"
              style={{ padding: "10px", width: "80%" }}
            />
            <button
              onClick={handleAddHospital}
              style={{ padding: "10px", marginLeft: "10px" }}
            >
              Add
            </button>
            <button
              onClick={handleAddSpecialty}
              style={{ padding: "10px", marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Specialties Section */}
      <div>
        <h3>Specialties</h3>
        <p>
          Selecting a specialty here gets you access to the procedure list and
          default log setup for that specialty. Select as many specialties as
          you need.
        </p>
        <select
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          disabled={!selectedCountry}
        >
          <option value="">
            {selectedCountry
              ? "Select a specialty"
              : "Select a country first"}
          </option>
          {specialties.map((specialty, index) => (
            <option key={index} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
        <button
          style={{
            padding: "10px 15px",
            margin: "10px 0",
            cursor: selectedCountry ? "pointer" : "not-allowed",
          }}
          disabled={!selectedCountry}
          onClick={() => setShowAddSpecialtyBox(true)}
        >
          + Add additional specialty
        </button>

        {showAddSpecialtyBox && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              placeholder="Enter specialty name"
              style={{ padding: "10px", width: "80%" }}
            />
            <button
              onClick={handleAddSpecialty}
              style={{ padding: "10px", marginLeft: "10px" }}
            >
              Add
            </button>
            <button
              onClick={handleAddSpecialty}
              style={{ padding: "10px", marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          style={{
            padding: "15px 25px",
            backgroundColor: "teal",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: selectedCountry ? "pointer" : "not-allowed",
          }}
          disabled={!selectedCountry}
          onClick={handleSubmit}
        >
          Set up logbook!
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;
