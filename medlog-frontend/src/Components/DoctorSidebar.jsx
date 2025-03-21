import React from "react";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { FaHome, FaUserGraduate } from "react-icons/fa";

const DoctorSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="logo">Doctor Logbook</div>
      <ul className="sidebar-menu">
        <li onClick={() => navigate("/doctor-home")}> {/* ✅ Navigates to Doctor's Home Page */}
          <FaHome className="icon" /> Home
        </li>
        <li onClick={() => navigate("/doctor-logbook")}> {/* ✅ Now navigates to DoctorLogbook */}
          <FaUserGraduate className="icon" /> View Students
        </li>
        <li onClick={() => navigate("/account")}> {/* ✅ Now navigates to DoctorLogbook */}
          <FaUserGraduate className="icon" /> Account
        </li>
        <li className="logout" onClick={handleLogout}>
          <IoLogOutOutline className="icon" /> Log Out
        </li>
      </ul>
    </div>
  );
};

export default DoctorSidebar;
