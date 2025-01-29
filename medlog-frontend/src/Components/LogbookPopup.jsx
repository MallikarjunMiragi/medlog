import React from "react";
import "../styles/LogbookPopup.css";
import { FaHospital, FaClipboardList, FaStethoscope, FaProcedures } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const categories = [
  { name: "Admissions", icon: <FaHospital className="category-icon admissions" /> },
  { name: "CPD", icon: <FaClipboardList className="category-icon cpd" /> },
  { name: "POCUS", icon: <FaStethoscope className="category-icon pocus" /> },
  { name: "Procedures", icon: <FaProcedures className="category-icon procedures" /> },
];

const LogbookPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>
          <IoClose />
        </button>
        <h2 className="popup-title">Select Category</h2>
        <p className="popup-subtext">
          Choose a logbook category to add an entry.
        </p>
        <div className="category-list">
          {categories.map((category, index) => (
            <button key={index} className="category-button">
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        <button className="add-category-btn">+ Add New Category</button>
      </div>
    </div>
  );
};

export default LogbookPopup;
