
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import "../styles/LogbookPage.css";

const LogbookCategory = ({ icon, title, description, route }) => {
  const navigate = useNavigate();

  return (
    <div className="logbook-category" onClick={() => navigate(route)}>
      <div className="category-left">
        <span className="category-icon">{icon}</span>
        <div className="category-text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <FaArrowRight className="arrow-icon" />
    </div>
  );
};

export default LogbookCategory;