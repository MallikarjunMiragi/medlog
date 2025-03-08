import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import {
  setFromDate,
  setToDate,
  setReportFormat,
  setReportFileType,
} from "../reducers/reportsReducer";
import "../styles.css";

const API_URL = "http://localhost:5000/api/auth";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const { fromDate, toDate, reportFormat, reportFileType } = useSelector(
    (state) => state.reports
  );
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = "suchitha@gmail.com"; // Replace with dynamic email from localStorage
        const response = await axios.get(`${API_URL}/userDetails/${email}`);

        if (response.data) {
          console.log("Fetched User Data:", response.data); // Debugging
          setUserData(response.data);
        } else {
          throw new Error("No data received");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const generatePDF = () => {
    if (!userData) {
      alert("User details are missing! Cannot generate report.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Medical Logbook Report", 10, 20);
    doc.setFontSize(14);
    doc.text(`Prepared for: ${userData.fullName || "N/A"}`, 10, 30);
    doc.text(`Hospital: ${userData.selectedHospital || "N/A"}`, 10, 40);
    doc.text(`Specialty: ${userData.selectedSpecialty || "N/A"}`, 10, 50);
    doc.text(`Training Year: ${userData.selectedTrainingYear || "N/A"}`, 10, 60);
    doc.text(`Reporting Period: ${fromDate} - ${toDate}`, 10, 70);
    doc.addPage();

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
    autoTable(doc, {
      startY: 30,
      head: [["Section", "Page"]],
      body: sections.map((section, index) => [section, index + 2]),
    });
    doc.addPage();

    doc.setFontSize(16);
    doc.text("Jobs", 10, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Training Year", userData.selectedTrainingYear || "N/A"],
        ["Specialty", userData.selectedSpecialty || "N/A"],
      ],
    });

    sections.slice(1).forEach((section) => {
      doc.addPage();
      doc.setFontSize(16);
      doc.text(section, 10, 20);
      doc.setFontSize(12);
      doc.text("No activities have been performed that relate to this report section", 10, 30);
    });

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
        {loading ? (
          <p>Loading user details...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <p>You can download preformatted logbook reports for professional use.</p>
            <div className="report-form">
              <div className="form-group">
                <label>Name *</label>
                <input type="text" value={userData.fullName || ""} readOnly />
              </div>
              <div className="form-group">
                <label>Hospital *</label>
                <input type="text" value={userData.selectedHospital || ""} readOnly />
              </div>
              <div className="form-group">
                <label>Specialty *</label>
                <input type="text" value={userData.selectedSpecialty || ""} readOnly />
              </div>
              <div className="form-group">
                <label>Training Year *</label>
                <input type="text" value={userData.selectedTrainingYear || ""} readOnly />
              </div>
              <button className="download-btn" onClick={generatePDF}>Download Report</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
