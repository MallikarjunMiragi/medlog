import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import gangliaLogo from "../assets/ganglia-logo.png"; // Adjust path if needed

import {
  setFromDate,
  setToDate,
  setReportFormat,
  setReportFileType,
} from "../reducers/reportsReducer";
import "../styles.css";
import Notification from "../Components/Notification";

const API_URL = "http://localhost:5000/api/auth";

const ReportsPage = () => {
  const dispatch = useDispatch();

  const userEmail = useSelector((state) => state.auth.user?.email);
  const { fromDate, toDate, reportFormat, reportFileType } = useSelector(
    (state) => state.reports
  );

  const [userData, setUserData] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!userEmail) {
        setNotification({
          isOpen: true,
          message: "User email not available. Please log in again.",
          type: "error",
        });
        setLoading(false);
        return;
      }

      try {
        // Fetch user data
        const userResponse = await axios.get(
          `${API_URL}/userDetails/${userEmail}`
        );
        if (userResponse.data) {
          setUserData(userResponse.data);
        } else {
          throw new Error("No user data received");
        }

        // Fetch entries
        const formattedEmail =
          typeof userEmail === "object" ? userEmail.email : userEmail;
        const entriesResponse = await axios.get(
          `http://localhost:5000/api/logentry/${encodeURIComponent(
            formattedEmail
          )}`
        );
        if (Array.isArray(entriesResponse.data)) {
          setEntries(entriesResponse.data);
        } else {
          throw new Error("No entries data received");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  const generatePDF = () => {
    if (!userData) {
      setNotification({
        isOpen: true,
        message: "User details are missing! Cannot generate report.",
        type: "error",
      });
      return;
    }
  
    const doc = new jsPDF();
  
// Header Info - First Page
const pageWidth = doc.internal.pageSize.getWidth();

doc.setFontSize(20);
let title = "Medical Logbook Report";
let titleWidth = doc.getTextWidth(title);
doc.text(title, (pageWidth - titleWidth) / 2, 20);

doc.setFontSize(14);

const lines = [
  `Prepared for: ${userData.fullName || "N/A"}`,
  `Hospital: ${userData.selectedHospital || "N/A"}`,
  `Specialty: ${userData.selectedSpecialty || "N/A"}`,
  `Training Year: ${userData.selectedTrainingYear || "N/A"}`,
  `Reporting Period: ${fromDate} - ${toDate}`
];

let y = 30;
lines.forEach((line) => {
  const textWidth = doc.getTextWidth(line);
  doc.text(line, (pageWidth - textWidth) / 2, y);
  y += 10;
});

  
    // ✅ Add Ganglia Logo to bottom center of first page
    const img = new Image();
    img.src = gangliaLogo;
    img.onload = function () {
      const pageWidth = doc.internal.pageSize.getWidth();
      const logoWidth = 70;
      const logoHeight = 70;
      const x = 75;
      const y = 100;
      doc.addImage(img, "PNG", x, y, logoWidth, logoHeight);
  
      // 📄 Move to next page for TOC
      doc.addPage();
  
      const sections = [
        "Jobs",
        "Logbook Entries",
        "Other Activities",
      ];
  
      doc.setFontSize(16);
      doc.text("Table of Contents", 10, 20);
      autoTable(doc, {
        startY: 30,
        head: [["Section", "Page"]],
        body: sections.map((section, index) => [section, index + 2]),
      });
  
      // 📄 Jobs Section
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
  
      // 📄 Logbook Entries Section
      doc.addPage();
      doc.setFontSize(16);
      doc.text("Logbook Entries", 10, 20);
  
      if (entries.length > 0) {
        entries.forEach((entry, index) => {
          const entryTitleY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30;
          doc.setFontSize(14);
          doc.text(`Entry ${index + 1}: ${entry.category}`, 10, entryTitleY);
  
          const rows = Object.entries(entry.data).map(([key, value]) => [
            key.replace(/_/g, " "), value ? value.toString() : "N/A"
          ]);
  
          if (entry.comments) rows.push(["Doctor's Comments", entry.comments]);
          if (entry.score !== null && entry.score !== undefined) {
            rows.push(["Score", `${entry.score} / 100`]);
          }
  
          autoTable(doc, {
            startY: entryTitleY + 10,
            margin: { bottom: 30 },
            head: [["Field", "Value"]],
            body: rows,
            theme: "grid",
            styles: { fontSize: 11 },
          });
        });
      } else {
        doc.setFontSize(12);
        doc.text("No log entries available for this user.", 10, 30);
      }
  
      // 📄 Remaining Sections
      sections.slice(2).forEach((section) => {
        doc.addPage();
        doc.setFontSize(16);
        doc.text(section, 10, 20);
        doc.setFontSize(12);
        doc.text(
          "No activities have been performed that relate to this report section",
          10,
          30
        );
      });
  
      // 📄 Footer - Page Numbers
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Page ${i} of ${pageCount}`, 180, 290);
      }
  
      // ✅ Save
      doc.save(
        `Medical_Logbook_Report_${new Date().toISOString().split("T")[0]}.pdf`
      );
    };
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
            <p>Download preformatted logbook reports.</p>
            <div className="report-form">
              <div className="form-group">
                <label>Name *</label>
                <input type="text" value={userData.fullName || ""} readOnly />
              </div>
              <div className="form-group">
                <label>From Date *</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => dispatch(setFromDate(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>To Date *</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => dispatch(setToDate(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Report *</label>
                <select>
                  <option>Logbook Report</option>
                </select>
              </div>
              <div className="form-group">
                <label>Report Format *</label>
                <select
                  value={reportFormat}
                  onChange={(e) =>
                    dispatch(setReportFormat(e.target.value))
                  }
                >
                  <option>Summary Report</option>
                  <option>Full Disclosure Report</option>
                </select>
              </div>
              <div className="form-group">
                <label>Report File Type *</label>
                <select
                  value={reportFileType}
                  onChange={(e) =>
                    dispatch(setReportFileType(e.target.value))
                  }
                >
                  <option>PDF (non-editable format)</option>
                  <option>Docx (editable format)</option>
                </select>
              </div>
              <button className="download-btn" onClick={generatePDF}>
                Download Report
              </button>
            </div>
          </>
        )}
      </div>

      <Notification
        isOpen={notification.isOpen}
        onRequestClose={() =>
          setNotification({ ...notification, isOpen: false })
        }
        title="Notification"
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
};

export default ReportsPage;
