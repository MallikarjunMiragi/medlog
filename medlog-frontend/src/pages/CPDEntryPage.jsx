import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logbookCategories from "../logbookCategories"; // Corrected import path
import "../styles.css";

const CPDEntryPage = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0]; // Get today's date

  // State for form fields
  const [formData, setFormData] = useState({
    logbookCategory: "CPD",
    date: today,
    endDate: today,
    cpdActivityType: "",
    title: "",
    notes: "",
    attachment: null,
  });

  // CPD Categories
  const cpdCategories = {
    Academia: [
      "Abstract presented",
      "Conference Attended",
      "Conference Organised",
      "Examiner",
      "Lecture Attended",
      "Lecture Given",
      "Presentation Given",
      "Publication",
      "Seminar Given",
      "Training Event Attended",
    ],
    Certification: ["Examination"],
    Courses: [
      "Course Attended",
      "Departmental Teaching",
      "E-learning Completed",
      "Study Leave",
      "Training Day",
    ],
    "Management Activity": [
      "Audit Completed",
      "Audit Presentation",
      "Clinical Governance Day",
      "Quality Improvement Project (QIP)",
      "Re-audit Completed",
    ],
    "Personal Development": ["Other Literature", "Podcast", "Reflective Practice"],
    Teaching: [
      "Postgraduate Teaching Delivered",
      "Postgraduate Teaching Organised",
      "Postgraduate Teaching Planned",
      "Simulation Teaching Delivered",
      "Simulation Teaching Organised",
      "Teaching Feedback Received",
      "Training Event Organised",
      "Undergraduate Teaching Delivered",
      "Undergraduate Teaching Organised",
      "Undergraduate Teaching Planned",
    ],
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle File Upload
  const handleFileUpload = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    navigate("/logbookpage");
  };

  return (
    <div className="container">
      <div className="content">
        <h2 className="page-title">Logbook Entry</h2>

        <form onSubmit={handleSubmit} className="cpd-form">
          {/* Logbook Category */}
          <label>Logbook Category *</label>
          <select name="logbookCategory" value={formData.logbookCategory} onChange={handleChange} required>
            {logbookCategories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>

          {/* Date and End Date */}
          <div className="date-group">
            <div>
              <label>Date *</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div>
              <label>End Date *</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
            </div>
          </div>

          {/* Type of CPD Activity */}
          <label>Type of CPD Activity *</label>
          <select name="cpdActivityType" value={formData.cpdActivityType} onChange={handleChange} required>
            <option value="">Select an Activity</option>
            {Object.entries(cpdCategories).map(([category, subcategories]) => (
              <optgroup key={category} label={category}>
                {subcategories.map((activity) => (
                  <option key={activity} value={activity}>
                    {activity}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          {/* Title */}
          <label>Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />

          {/* Notes */}
          <label>Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} maxLength="10000"></textarea>

          {/* Attachments */}
          <div className="attachment-section">
            <label>Attachments</label>
            <div className="upload">
              <input type="file" onChange={handleFileUpload} />
              <span>📎 Add Attachment</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={() => navigate("/logbookpage")}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CPDEntryPage;
