import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoClose, IoLogOutOutline, IoMenu } from "react-icons/io5";
import { FaBook, FaBriefcase, FaChartBar, FaBullseye, FaFileAlt, FaCog, FaQuestionCircle } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaTasks } from "react-icons/fa";


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
    ${
      isActive
        ? "bg-white/20 border-l-[4px] border-white pl-[16px] font-semibold text-white"
        : "hover:bg-white/20 hover:border-l-[4px] hover:border-white hover:pl-[16px]"
    }`;
};


  return (
    <>
      <div className="md:hidden p-4 fixed top-0 left-0 z-50">
       <button
  onClick={() => setIsOpen(!isOpen)}
  style={{
    display: "block",
    width: "100%",
    fontWeight: "bold",
    background: "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
    color: "white",
    padding: "12px 20px",
    margin: "auto",
    borderRadius: "20px",
    boxShadow: "rgba(133, 189, 215, 0.88) 0px 20px 10px -15px",
    border: "none",
    fontSize: "24px",
    transition: "all 0.2s ease-in-out",
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
  onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
  onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
>
  {isOpen ? <IoClose /> : <IoMenu />}
</button>

      </div>

     <div
  className={`w-[250px] h-screen text-white flex flex-col pt-5 fixed top-0 z-40 transition-transform duration-300 shadow-lg
  ${isOpen ? "left-0" : "-left-[250px]"} md:left-0`}
  style={{
    background: "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
  }}
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
            <FaBriefcase className="icon" /> Assignment history
          </li>
          <li
            className={getLinkStyle("/analysis")}
            onClick={() => navigate("/analysis")}
          >
            <FaChartBar className="icon" /> Analysis
          </li>
          <li
  className={getLinkStyle("/assigned-tasks")}
  onClick={() => navigate("/assigned-tasks")}
>
  <FaTasks className="icon" /> Assigned Tasks
</li>
          {/*<li
            className={getLinkStyle("/goal-progression")}
            onClick={() => navigate("/goal-progression")}
          >
            <FaBullseye className="icon" /> Goal Progression
          </li>*/}
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
  className="px-6 py-5 flex gap-3 items-center cursor-pointer rounded-lg transition-all duration-300 hover:bg-white/20 hover:border-l-[4px] hover:border-white hover:pl-[16px] text-white"
  onClick={() => {
    handleLogout();
    setIsOpen(false);
  }}
>
  <IoLogOutOutline className="icon" /> Log Out
</li>

        </ul>
      </div>
    </>
  );
};

export default Sidebar;

