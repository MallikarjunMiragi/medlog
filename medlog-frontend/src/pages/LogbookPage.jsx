import React from "react";
import { useNavigate } from "react-router-dom";
import LogbookCategory from "../components/logbookCategory";
import { FaHospital, FaClipboardList, FaStethoscope, FaProcedures, FaChevronRight } from "react-icons/fa"; 
import "../styles.css";

const LogbookPage = () => {
  const navigate = useNavigate();

  return (
    <div className="logbook-container w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Welcome to your new logbook!</h1>
      <p className="text-gray-700 mb-4">
        Log entries you've made in previous jobs are filed separately, and can be accessed and added via the jobs page. 
        Logbooks from multiple jobs can still be combined to produce reports on the Reports page. You can record the following 
        clinical activities in your logbook associated with this job.
      </p>

      <div className="logbook-list grid grid-cols-2 gap-4">
        <LogbookCategory icon={<FaHospital />} title="Admissions" description="Add Admissions" route="/admissions" />
        <LogbookCategory icon={<FaClipboardList />} title="CPD" description="CPD" route="/cpd-entry" />
        <LogbookCategory icon={<FaStethoscope />} title="POCUS" description="POCUS" route="/pocus" />
        <LogbookCategory icon={<FaProcedures />} title="Procedures" description="Procedures" route="/procedures" />
      </div>

      {/* Clickable Manage Logbook Categories Section */}
      <div className="logbook-manage clickable" onClick={() => navigate("/manage-logbook")}>
        <FaChevronRight className="arrow-icon" />
        <h3>Manage logbook categories</h3>
      </div>

      <p className="logbook-footer text-sm text-gray-500 mt-4">
        You can opt into one of our growing list of other, more specialist, logbook categories at any time using the "Add category" 
        button on the add logbook entry category picker. If you have any questions, ideas or problems please do not hesitate to get in 
        contact with us on our email.
      </p>
    </div>
  );
};

export default LogbookPage;
