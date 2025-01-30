import React from "react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Medical Logbook</div>
      <ul className="sidebar-menu">
        <li>📖 Primary logbook</li>
        <li>💼 Jobs</li>
        <li>📊 Analysis</li>
        <li>🎯 Goal progression</li>
        <li>📜 Reports</li>
        <li>⚙️ Account</li>
        <li>❓ Support</li>
        <li>🚪 Log out</li>
      </ul>
      {/* <div className="night-mode">
        <label>
          <input type="checkbox" />
          Night mode
        </label>
      </div> */}
    </div>
  );
};

export default Sidebar;
