import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoClose, IoLogOutOutline, IoMenu } from "react-icons/io5";
import { FaBook, FaBriefcase, FaChartBar, FaBullseye, FaFileAlt, FaCog, FaQuestionCircle } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Function to get active style
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return `px-6 py-4 flex gap-3 items-center cursor-pointer rounded-lg transition-all duration-300
      ${isActive ? "bg-teal-800 font-semibold" : "hover:bg-white/20 hover:border-l-[4px] hover:border-[#3498db] hover:pl-[16px]"}`;
  };

  return (
    <>
      <div className="md:hidden p-4 fixed top-0 left-0 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl">
          {isOpen ? <IoClose className="ml-50 -mt-4" /> : <IoMenu />}
        </button>
      </div>

      <div
        className={`bg-[#008080] w-[250px] h-screen text-white flex flex-col pt-5 fixed top-0 z-40 transition-transform duration-300 shadow-lg
        ${isOpen ? "left-0" : "-left-[250px]"} md:left-0`}
      >
        <div className="pl-5 text-[22px] font-bold mb-5 text-gray-100">Student Logbook</div>
        <ul>
          <li
            className={getLinkStyle("/logbookpage")}
            onClick={() => navigate("/logbookpage")}
          >
            <FaBook className="icon" /> Primary Logbook
          </li>
          <li
            className={getLinkStyle("/jobs")}
            onClick={() => navigate("/jobs")}
          >
            <FaBriefcase className="icon" /> Jobs
          </li>
          <li
            className={getLinkStyle("/analysis")}
            onClick={() => navigate("/analysis")}
          >
            <FaChartBar className="icon" /> Analysis
          </li>
          <li
            className={getLinkStyle("/goal-progression")}
            onClick={() => navigate("/goal-progression")}
          >
            <FaBullseye className="icon" /> Goal Progression
          </li>
          <li
            className={getLinkStyle("/reports")}
            onClick={() => navigate("/reports")}
          >
            <FaFileAlt className="icon" /> Reports
          </li>
          <li
            className={getLinkStyle("/account")}
            onClick={() => navigate("/account")}
          >
            <MdAccountCircle className="icon" /> Account
          </li>
          <li
            className={getLinkStyle("/support")}
            onClick={() => navigate("/support")}
          >
            <FaQuestionCircle className="icon" /> Support
          </li>
          <li
            className="px-6 py-5 flex gap-3 items-center cursor-pointer rounded-md transition-all duration-300 hover:bg-[#154f4e]"
            onClick={handleLogout}
          >
            <IoLogOutOutline className="icon" /> Log Out
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

