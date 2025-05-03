import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdGroup, MdLogout } from "react-icons/md";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 py-2 px-4 rounded-lg transition-all text-white 
     ${isActive ? "bg-teal-700 text-teal-700 font-semibold" : "hover:bg-teal-800"}`;

  return (
    <div className="w-64 bg-teal-700 text-white min-h-screen p-6 shadow-lg fixed top-0 left-0 h-screen z-50">
      <h1 className="text-2xl font-bold mb-10 text-center">Medical Logbook</h1>

      <nav className="flex flex-col gap-4">
        <NavLink to="/admin/home" className={navLinkStyles}>
          <MdDashboard size={20} /> Home
        </NavLink>
        <NavLink to="/admin/users" className={navLinkStyles}>
          <MdGroup size={20} /> View Users
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg text-white transition-all "
        >
          <MdLogout size={20} /> Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
