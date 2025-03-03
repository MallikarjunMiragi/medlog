import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logbookCategories from "../Components/logbookCategory";
import "../styles.css";

const ReportsPage = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
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

  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [reportFormat, setReportFormat] = useState("Summary report");
  const [reportFileType, setReportFileType] = useState("PDF (non-editable format)");

  const categoriesArray = Array.isArray(logbookCategories) ? logbookCategories : Object.values(logbookCategories);
  const [mainToggle, setMainToggle] = useState(true);
  const [categoryToggles, setCategoryToggles] = useState(
    categoriesArray.reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {})
  );

  const handleCategoryToggle = (category) => {
    setCategoryToggles((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

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

  // Generate PDF Report with multiple pages
  const generatePDF = () => {
    const doc = new jsPDF();

    // Cover Page
    doc.setFontSize(20);
    doc.text("Medical Logbook Report", 10, 20);
    doc.setFontSize(14);
    doc.text(`Prepared for: ${userDetails.email}`, 10, 30);
    doc.text(`Hospital: ${userDetails.selectedHospital}`, 10, 40);
    doc.text(`Specialty: ${userDetails.selectedSpecialty}`, 10, 50);
    doc.text(`Training Year: ${userDetails.selectedTrainingYear}`, 10, 60);
    doc.text(`Reporting Period: ${fromDate} - ${toDate}`, 10, 70);
    doc.addPage();

    // Table of Contents
    const sections = [
      "Jobs",
      "Procedures",
      "Performed by Training Year",
      "Performed by Supervision Level",
      "Procedure Records",
      "Admissions",
      "Specialties Seen",
      "Referral Sources",
      "Location Settings",
      "Patient Summaries",
      "Admission Records",
      "Ultrasounds",
      "Point-of-Care Ultrasound Performed by Training Year",
      "Point-of-Care Ultrasound Records",
      "Continued Professional Development",
      "Academia",
      "Audit & Quality Improvement",
      "Publications",
      "Conferences",
      "Courses",
      "Seminars",
      "Teaching and Training",
      "Other Activities",
    ];

    doc.setFontSize(16);
    doc.text("Table of Contents", 10, 20);
    const tocData = sections.map((section, index) => [section, index + 2]);
    autoTable(doc, {
      startY: 30,
      head: [["Section", "Page"]],
      body: tocData,
    });
    doc.addPage();

    // Add Sections
    sections.forEach((section, index) => {
      if (index > 0) doc.addPage();
      doc.setFontSize(16);
      doc.text(section, 10, 20);
      doc.setFontSize(12);
      doc.text("No activities have been performed that relate to this report section", 10, 30);
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, 180, 290);
    }

    doc.save(`Medical_Logbook_Report_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  return (
    <div className="reports-container">
      <div className="reports-content">
        <h2>Create Report</h2>
        <p>
          You can download preformatted logbook reports for use in training reviews, interviews, and other professional settings.
          Reports are available in either PDF or DOCX formats.
        </p>

        <div className="report-form">
          <div className="form-group">
            <label>Name *</label>
            <input type="text" value={userDetails.email} readOnly />
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

          <button className="download-btn" onClick={generatePDF}>Download Report</button>

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
    </div>
  );
};

export default ReportsPage;
