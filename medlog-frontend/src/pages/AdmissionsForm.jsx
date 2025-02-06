import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import "../styles.css";

const logbookCategories = ["Admissions", "CPD", "POCUS", "Procedures"];
const hospitalOptions = ["Kasturba General Hospital, Manipal"];
const locationOptions = [
  "A&E Majors", "A&E Minors", "A&E Paediatric", "A&E Resus", "AAU", "Acute Medical Unit",
  "Admitted from clinic", "Ambulance Bay", "Ambulatory Majors Area", "CDU", "Coronary Care Unit",
  "Emergency Assessment Unit", "High Dependency Unit", "Intensive Care Unit", "Medical Ward",
  "Rapid Assessment Triage", "Respiratory Care Unit", "Ward Referral"
];
const referralSources = [
  "Ambulance pre-alert", "Emergency Department", "GP Referral", "High Dependency Unit",
  "In patient Unit", "Intensive Care Unit", "Medical Specialty", "Obstetrics and Gynaecology",
  "Other hospital", "Surgery"
];
const genderOptions = ["Female", "Male", "Non-binary / Gender Diverse", "Other"];
const roleOptions = ["Clerked", "Reviewed"];
const specialtyAreas = [
  "Alcohol and Drug Intoxication", "Allergy", "Andrology", "Audiological Medicine", "Cardiology",
  "Cardiothoracic Surgery", "Clinical Genetics", "Clinical Neurophysiology", "Clinical Nutrition",
  "Dentistry", "Dermatology", "Diagnostic Radiology", "Emergency Medicine", "Family Medicine",
  "Diabetes Mellitus", "General Internal Medicine", "General Practice", "General Surgery",
  "Hand Surgery", "Immunology", "Infectious Diseases", "Medical Oncology", "Neurology",
  "Neurosurgery", "Obstetrics and Gynaecology", "Ophthalmology", "Orthopaedics", "Paediatric Cardiology",
  "Paediatric Surgery", "Paediatrics", "Pain Medicine", "Plastic Surgery", "Point of Care Ultrasound(POCUS) - Clalit",
  "Psychiatry", "Radiology", "Stroke Medicine", "Urology"
];
const outcomeOptions = ["Admitted", "Coronary care Unit", "Died", "Discharged", "Intensive care", "Other Specialty Unit", "Referred on", "Theatre", "Ward Care"];

const AdmissionsForm = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  
  const [formData, setFormData] = useState({
    logbookCategory: "Admissions",
    date: today,
    hospital: "",
    location: "",
    referralSource: "",
    reference: "",
    gender: "",
    dob: "",
    age: "",
    role: "",
    specialtyArea: "",
    problem: "",
    outcome: "",
    notes: "",
    attachment: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleCancel = () => {
    navigate("/logbookpage");
  };

  return (
    <div className="admissions-container">
      
      <div className="form-container">
        <h2 className="form-title">Admissions Form</h2>
        <form>
          <label>Logbook Category</label>
          <select name="logbookCategory" value={formData.logbookCategory} onChange={handleChange}>
            {logbookCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />

          <label>Hospital</label>
          <select name="hospital" value={formData.hospital} onChange={handleChange}>
            {hospitalOptions.map((hosp) => (
              <option key={hosp} value={hosp}>{hosp}</option>
            ))}
          </select>

          <label>Location</label>
          <select name="location" value={formData.location} onChange={handleChange}>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <label>Referral Source</label>
          <select name="referralSource" value={formData.referralSource} onChange={handleChange}>
            {referralSources.map((ref) => (
              <option key={ref} value={ref}>{ref}</option>
            ))}
          </select>

          <label>Your Reference</label>
          <input type="text" name="reference" value={formData.reference} onChange={handleChange} />

          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            {genderOptions.map((gen) => (
              <option key={gen} value={gen}>{gen}</option>
            ))}
          </select>

          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            {roleOptions.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <label>Specialty Area</label>
          <select name="specialtyArea" value={formData.specialtyArea} onChange={handleChange}>
            {specialtyAreas.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>

          <label>Problem</label>
          <input type="text" name="problem" value={formData.problem} onChange={handleChange} />

          <label>Outcome</label>
          <select name="outcome" value={formData.outcome} onChange={handleChange}>
            {outcomeOptions.map((out) => (
              <option key={out} value={out}>{out}</option>
            ))}
          </select>

          <label>Notes</label><br />
          <textarea name="notes" value={formData.notes} onChange={handleChange} /><br /> <br />

          <label>Attachments</label>
          <input type="file" onChange={handleFileChange} />
          
          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionsForm;
