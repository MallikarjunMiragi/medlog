import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReportData, setFromDate, setToDate, toggleMain, toggleCategory } from "../reducers/reportsReducer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles.css";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const {
    userDetails,
    fromDate,
    toDate,
    reportFormat,
    reportFileType,
    mainToggle,
    categoryToggles,
    categories,
    isLoading,
    error,
  } = useSelector((state) => state.reports);

  // Fetch user report details when the page loads
  useEffect(() => {
    dispatch(fetchReportData(userDetails.email));
  }, [dispatch, userDetails.email]);

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
    const sections = categories.map((category, index) => [category, index + 2]);

    doc.setFontSize(16);
    doc.text("Table of Contents", 10, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Section", "Page"]],
      body: sections,
    });
    doc.addPage();

    // Add Sections
    categories.forEach((category, index) => {
      if (index > 0) doc.addPage();
      doc.setFontSize(16);
      doc.text(category, 10, 20);
      doc.setFontSize(12);
      doc.text("No activities have been performed that relate to this report section", 10, 30);
    });

    doc.save(`Medical_Logbook_Report_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  return (
    <div className="reports-container">
      <div className="reports-content">
        <h2>Create Report</h2>
        <p>Generate preformatted logbook reports with the details below.</p>

        {isLoading && <p>Loading report data...</p>}
        {error && <p className="error">{error}</p>}

        <div className="report-form">
          <div className="form-group">
            <label>Name *</label>
            <input type="text" value={userDetails.email || ""} readOnly />
          </div>
          <div className="form-group">
            <label>From Date *</label>
            <input type="date" value={fromDate} onChange={(e) => dispatch(setFromDate(e.target.value))} />
          </div>
          <div className="form-group">
            <label>To Date *</label>
            <input type="date" value={toDate} onChange={(e) => dispatch(setToDate(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Report Format *</label>
            <select value={reportFormat} onChange={(e) => dispatch({ type: "SET_REPORT_FORMAT", payload: e.target.value })}>
              <option>Summary report</option>
              <option>Full disclosure report</option>
            </select>
          </div>
          <div className="form-group">
            <label>Report File Type *</label>
            <select value={reportFileType} onChange={(e) => dispatch({ type: "SET_REPORT_FILE_TYPE", payload: e.target.value })}>
              <option>PDF (non-editable format)</option>
              <option>Docx (editable format)</option>
            </select>
          </div>

          <button className="download-btn" onClick={generatePDF}>Download Report</button>

          <div className="categories">
            {categories.map((category) => (
              <div key={category} className="category-item">
                <span>{category}</span>
                <input type="checkbox" checked={categoryToggles[category]} onChange={() => dispatch(toggleCategory(category))} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
