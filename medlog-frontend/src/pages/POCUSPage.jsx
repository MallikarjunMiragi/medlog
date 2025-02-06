import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles.css";

const logbookCategories = ["Admissions", "CPD", "POCUS", "Procedures"];
const ultrasoundTypes = [
  "Joint Injections",
  "Nerve Blocks",
  "Other",
  "Abdominal",
  "Pulmonary",
  "Renal Ultrasound",
];
const supervisionOptions = [
  "Observed",
  "Performed (independent)",
  "Performed (supervised)",
];
const genderOptions = ["Female", "Male", "Non-binary"];

const POCUSPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    logbookCategory: "POCUS",
    date: new Date().toISOString().split("T")[0],
    siteType: "",
    reference: "",
    supervision: "",
    gender: "",
    dob: "",
    age: "",
    findings: "",
    notes: "",
    attachments: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      setFormData((prev) => ({ ...prev, dob: value, age: age }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachments: e.target.files[0] }));
  };

  return (
    <div className="pocus-page">

      <div className="pocus-content">
        <h2>Logbook Entry</h2>

        <div className="form-group">
          <label>Logbook Category *</label>
          <select name="logbookCategory" value={formData.logbookCategory} required>
            {logbookCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date *</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Site/Type *</label>
          <select name="siteType" value={formData.siteType} onChange={handleChange} required>
            <option value="">Select Ultrasound Type</option>
            {ultrasoundTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Your Reference</label>
            <input type="text" name="reference" value={formData.reference} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Supervision</label>
            <select name="supervision" value={formData.supervision} onChange={handleChange}>
              <option value="">Select</option>
              {supervisionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Patient's Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              {genderOptions.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            <span>Calculated Age: {formData.age}</span>
          </div>
        </div>

        <div className="form-group">
          <label>Findings</label>
          <input type="text" name="findings" value={formData.findings} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label>Attachments</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="form-buttons">
          <button className="cancel-btn" onClick={() => navigate("/logbook")}>
            Cancel
          </button>
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default POCUSPage;
