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
    <div className="bg-[#008080] w-[250px] h-screen text-white flex flex-col pt-5 fixed left-0 top-0 shadow-lg">
      <div className="text-center text-[22px] font-bold mb-5 text-gray-100">Doctor Logbook</div>
      <ul className="sidebar-menu *:flex">
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
