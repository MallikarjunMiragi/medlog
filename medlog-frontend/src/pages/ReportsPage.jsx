import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logbookCategories from "../components/logbookCategory"; 
import "../styles.css";

const ReportsPage = () => {
  const navigate = useNavigate();

  // Fetch user details from local storage or set defaults
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    selectedHospital: "",
    selectedSpecialty: "",
    selectedTrainingYear: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails")) || {};
    setUserDetails((prev) => ({
      ...prev,
      ...storedUser,
    }));
  }, []);

  // State for form fields
  const [firstName, setFirstName] = useState(userDetails.email);
  const [surname, setSurname] = useState(userDetails.lastName);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [reportFormat, setReportFormat] = useState("Summary report");
  const [reportFileType, setReportFileType] = useState("PDF (non-editable format)");

  // Ensure logbookCategories is an array before using reduce
  const categoriesArray = Array.isArray(logbookCategories) ? logbookCategories : Object.values(logbookCategories);

  // State for toggles
  const [mainToggle, setMainToggle] = useState(true);
  const [categoryToggles, setCategoryToggles] = useState(
    categoriesArray.reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {})
  );

  // Handle category toggle
  const handleCategoryToggle = (category) => {
    setCategoryToggles((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle main toggle (toggle all categories)
  const handleMainToggle = () => {
    const newState = !mainToggle;
    setMainToggle(newState);
    setCategoryToggles(
      categoriesArray.reduce((acc, category) => {
        acc[category] = newState;
        return acc;
      }, {})
    );
  };

  return (
    <div className="reports-container">
      <div className="reports-content">
        <h2>Create Report</h2>
        <p>You can download preformatted logbook reports for use in training reviews, interviews and other professional settings. 
            Reports are available in either pdf or docx formats. Simply select the date range, 
            jobs and logbook categories you want the report to cover and hit download.</p>

        <div className="report-form">
          <div className="form-group">
            <label>First Name *</label>
            <input type="text" value={userDetails.email} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Surname *</label>
            <input type="text" value={userDetails.email} onChange={(e) => setSurname(e.target.value)} />
          </div>
          <div className="form-group">
            <label>From Date *</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>To Date *</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Report *</label>
            <select>
              <option>Logbook report</option>
            </select>
            <p className="warning">
              Please select the type of report you want to generate. Some reports are only available to specific logbook categories.
            </p>
          </div>
          <div className="form-group">
            <label>Report Format *</label>
            <select value={reportFormat} onChange={(e) => setReportFormat(e.target.value)}>
              <option>Summary report</option>
              <option>Full disclosure report</option>
            </select>
          </div>
          <div className="form-group">
            <label>Report File Type *</label>
            <select value={reportFileType} onChange={(e) => setReportFileType(e.target.value)}>
              <option>PDF (non-editable format)</option>
              <option>Docx (editable format)</option>
            </select>
          </div>

          <button className="download-btn">Download Report</button>
        </div>
        <br />
        <div className="training-info">
          <h3>{userDetails.selectedTrainingYear} {userDetails.selectedSpecialty}</h3>
          <p>{userDetails.selectedHospital}</p>
          <label className="toggle-switch">
            <input type="checkbox" checked={mainToggle} onChange={handleMainToggle} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="categories">
          {categoriesArray.map((category) => (
            <div key={category} className="category-item">
              <span>{category}</span>
              <label className="toggle-switch">
                <input type="checkbox" checked={categoryToggles[category]} onChange={() => handleCategoryToggle(category)} />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
