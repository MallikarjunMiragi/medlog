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
  
    const capitalize = (str) =>
      str
        .toString()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
  
    const beautifyKey = (key) =>
      key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
  
    // Header
    doc.setFontSize(20);
    const title = "Medical Logbook Report";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 20);
  
    doc.setFontSize(14);
    const lines = [
      `Prepared for: ${capitalize(userData.fullName || "N/A")}`,
      `Hospital: ${capitalize(userData.selectedHospital || "N/A")}`,
      `Specialty: ${capitalize(userData.selectedSpecialty || "N/A")}`,
      `Training Year: ${capitalize(userData.selectedTrainingYear || "N/A")}`,
      `Reporting Period: ${fromDate} - ${toDate}`,
    ];
  
    let y = 30;
    lines.forEach((line) => {
      const textWidth = doc.getTextWidth(line);
      doc.text(line, (pageWidth - textWidth) / 2, y);
      y += 10;
    });
  
    const img = new Image();
    img.src = gangliaLogo;
  
    img.onload = function () {
      doc.addImage(img, "PNG", 75, y + 10, 70, 70);
  
      // TOC
      doc.addPage();
      doc.setFontSize(16);
      doc.text("Table of Contents", 10, 20);
      autoTable(doc, {
        startY: 30,
        head: [["Section", "Page"]],
        body: [["Jobs", 2], ["Logbook Entries", 3], ["Other Activities", 4]],
      });
  
      // Jobs
      doc.addPage();
      doc.setFontSize(16);
      doc.text("Jobs", 10, 20);
      autoTable(doc, {
        startY: 30,
        body: [
          ["Training Year", capitalize(userData.selectedTrainingYear || "N/A")],
          ["Specialty", capitalize(userData.selectedSpecialty || "N/A")],
        ],
      });
  
      // Logbook Entries
      doc.addPage();
      doc.setFontSize(16);
      doc.text("Logbook Entries", 10, 30);
  
      if (entries.length > 0) {
        entries.forEach((entry, index) => {
          const entryTitleY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30;
          doc.setFontSize(14);
          doc.text(`Entry ${index + 1}: ${capitalize(entry.category)}`, 10, entryTitleY);
  
          const rows = Object.entries(entry.data).map(([key, value]) => {
            const isLink =
              typeof value === "string" &&
              (value.toLowerCase().startsWith("http") || value.toLowerCase().startsWith("/uploads"));
          
            const displayValue = isLink ? value : capitalize(value || "N/A");
          
            return [beautifyKey(key), displayValue];
          });
          
  
          if (entry.comments) {
            rows.push(["Doctor's Comments", capitalize(entry.comments)]);
          }
  
          if (entry.score !== null && entry.score !== undefined) {
            rows.push(["Score", `${entry.score} / 100`]);
          }
  
          autoTable(doc, {
            startY: entryTitleY + 10,
            margin: { bottom: 30 },
            body: rows,
            theme: "grid",
            styles: { fontSize: 11 },
          });
        });
      } else {
        doc.setFontSize(12);
        doc.text("No log entries available.", 10, 40);
      }
  
      // Other Activities
      doc.addPage();
      doc.setFontSize(16);
      doc.text("Other Activities", 10, 20);
      doc.setFontSize(12);
      doc.text("No activities have been performed that relate to this report section", 10, 30);
  
      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Page ${i} of ${pageCount}`, 180, 290);
      }
  
      // Save file
      doc.save(`Medical_Logbook_Report_${new Date().toISOString().split("T")[0]}.pdf`);
    };
  };
  
  return (
    <div className="flex text-white">
      <div className="flex-1 p-5">
        <h2 className="font-semibold text-lg">Create Report</h2>
        {loading ? (
          <p>Loading user details...</p>
        ) : error ? (
          <p className="text-[#721c24] bg-[#f8d7da] border-l-2 border-[#dc2545]">{error}</p>
        ) : (
          <>
            <p className="text-center text-teal-50">Download preformatted logbook reports.</p>
            <div className="grid gap-4 [&>div]:flex [&>div]:flex-col [&_label]:mb-1.5 [&_label]:font-bold [&_input]:p-3 [&_input]:mb-4 [&_input]:rounded-md [&_input]:border-0 [&_input]:bg-white/20 [&_input]:placeholder:text-gray-300 [&_select]:p-3 [&_select]:rounded-md [&_select]:border [&_select]:border-gray-300 [&_select]:text-gray-300 [&_select]:bg-white/20 [&_select]:mb-4 [&_option]:bg-gray-700">
              <div>
                <label>Name *</label>
                <input type="text" value={userData.fullName || ""} readOnly />
              </div>
              <div>
                <label>From Date *</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => dispatch(setFromDate(e.target.value))}
                />
              </div>
              <div>
                <label>To Date *</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => dispatch(setToDate(e.target.value))}
                />
              </div>
              <div>
                <label>Report *</label>
                <select>
                  <option>Logbook Report</option>
                </select>
              </div>
              <div>
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
              <div>
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
              <button className="w-full p-3 bg-[#008080] rounded-md cursor-pointer transition delay-300 hover:#015b5b" onClick={generatePDF}>
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


