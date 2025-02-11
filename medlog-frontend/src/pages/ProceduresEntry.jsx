import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles.css"; // Ensure this is linked

const logbookCategories = ["Admissions", "CPD", "POCUS", "Procedures"];

const proceduresList = {
  Airway: [
    "Adjunct use for difficult airway",
    "Direct laryngoscopy",
    "i-Gel airway insertion",
    "Needle cricothyroidotomy",
  ],
  Anaesthesia: [
    "Bier's block",
    "Digital nerve block",
    "Femoral nerve block",
    "Ring block",
  ],
  Breathing: [
    "Bag mask ventilation",
    "Jet insufflation",
    "Needle decompression of pleura",
    "NIV- adult",
    "NIV - child",
  ],
  Circulation: [
    "Central venous access",
    "DC cardioversion",
    "FAST scan",
    "Peripheral venous access",
  ],
  ENT: [
    "Nasal foreign body removal",
    "Nasal packing",
    "Silver nitrate cautery to Kisselbach's plexus",
  ],
  Lines: [
    "Arterial access",
    "Central venous access",
    "Intraosseous access",
    "PICC insertion",
    "Rapid infusion catheter",
    "Urinary catheterisation",
  ],
  "Minor Procedures": [
    "Eyelid eversion",
    "Incision and drainage",
    "Suturing",
    "Skin clips application",
  ],
};

const hospitals = ["Kasturba General Hospital, Manipal"];

const supervisionOptions = [
  "Assisted",
  "Assisting",
  "First operator",
  "Independent",
  "Observed",
  "Second operator",
  "Supervised",
  "Supervising",
];

const genderOptions = ["Female", "Male", "Non-binary/ gender diverse", "Other"];

const ProceduresEntry = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [customProcedure, setCustomProcedure] = useState("");

  const handleDOBChange = (e) => {
    setDob(e.target.value);
    const birthDate = new Date(e.target.value);
    const todayDate = new Date();
    const calculatedAge =
      todayDate.getFullYear() - birthDate.getFullYear() -
      (todayDate < new Date(todayDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
    setAge(calculatedAge);
  };

  const handleCustomProcedure = () => {
    if (customProcedure.trim() !== "") {
      setSelectedProcedure(customProcedure);
      setCustomProcedure("");
    }
  };

  return (
    <div className="procedures-page">

      <div className="content">
        <h2>Logbook Entry</h2>

        <label>Logbook Category</label>
        <select required>
          {logbookCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Date</label>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />

        <label>Procedure</label>
        <div className="dropdown">
          <select value={selectedProcedure} onChange={(e) => setSelectedProcedure(e.target.value)} required>
            <option value="">Select Procedure</option>
            {Object.entries(proceduresList).map(([section, procedures]) => (
              <optgroup key={section} label={section}>
                {procedures.map((procedure) => (
                  <option key={procedure} value={procedure}>
                    {procedure}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="custom" >──────────</option>
            <option value="add-option" >Add Option</option>
          </select>
          {selectedProcedure === "add-option" && (
            <div className="custom-procedure">
              <input
                type="text"
                placeholder="Enter custom procedure"
                value={customProcedure}
                onChange={(e) => setCustomProcedure(e.target.value)}
              />
              <button type="button" onClick={handleCustomProcedure}>
                Add
              </button>
            </div>
          )}
        </div>

        <div className="row">
          <div>
            <label>Hospital</label>
            <select>
              <option value="">Add hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Supervision</label>
            <select>
              {supervisionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div>
            <label>Supervisor</label>
            <input type="text" />
          </div>
          <div>
            <label>Your Reference</label>
            <input type="text" />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Gender</label>
            <select>
              {genderOptions.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Age</label>
            <input type="date" value={dob} onChange={handleDOBChange} />
            <span>{age} years</span>
          </div>
        </div>

        <label>Follow-up Notes</label>
        <textarea></textarea>

        <label>Complications</label>
        <textarea></textarea>

        <label>Notes</label>
        <textarea></textarea>

        <label>Attachments</label>
        <input type="file" />

        <div className="buttons">
          <button type="button" className="cancel-btn" onClick={() => navigate("/logbookpage")}>Cancel</button>
          <button type="submit" className="save-btn" onClick={() => console.log("Saving Procedures Entry...")}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProceduresEntry;
