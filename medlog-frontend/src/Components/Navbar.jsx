import React from "react";
import "../styles/Navbar.css";
import { FiDownload } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = ({ onAddEntryClick }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2 className="logo-text">Medical Logbook</h2> {/* Removed Free Badge */}
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="download-btn">
          <FiDownload />
        </button>
      </div>

      <div className="navbar-right">
        <span className="user-email">suchithabolarganglia@gmail.com</span>
        <FaRegUserCircle className="icon profile-icon" />
        <IoLogOutOutline className="icon logout-icon" />
        <button className="logbook-btn" onClick={onAddEntryClick}>
          + Add logbook entry
        </button>
      </div>
    </div>
  );
};

export default Navbar;
