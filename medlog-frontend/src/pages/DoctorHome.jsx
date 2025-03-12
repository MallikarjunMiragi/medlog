import React from "react";
import "../styles.css"; 
import DoctorSidebar from "../components/DoctorSidebar"; // ✅ Import Sidebar

const DoctorHome = () => {
  return (
    <div className="doctor-home-layout"> {/* ✅ Wrap with layout */}
      <DoctorSidebar /> {/* ✅ Sidebar stays visible */}
      
      {/* ✅ Main Content */}
      <div className="doctor-home-container">
        <h1 className="welcome-title">Welcome, Doctor!</h1>
        <p className="welcome-message">
          As a doctor, your expertise and guidance help shape the future of medicine. 
          This logbook allows you to monitor students’ progress, review their entries, 
          and provide feedback to enhance their learning experience.
        </p>
        <p className="welcome-message">
          Navigate to <strong>View Students</strong> to check their progress or log out when you're done. 
          Thank you for your dedication to medical education!
        </p>
      </div>
    </div>
  );
};

export default DoctorHome;
