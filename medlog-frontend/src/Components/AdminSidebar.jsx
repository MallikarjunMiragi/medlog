import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdGroup, MdLogout, MdSupport } from "react-icons/md";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 py-2 px-4 rounded-lg transition-all text-white 
     ${isActive ? "bg-teal-800 font-semibold" : "hover:bg-white/20 hover:border-l-[4px] hover:border-[#3498db] hover:pl-[16px]"}`;

  return (
    <div className="w-64 bg-[#008080] text-white min-h-screen p-6 shadow-lg fixed top-0 left-0 h-screen z-50">
      <h1 className="text-2xl font-bold mb-10 text-center">Medical Logbook</h1>

      <nav className="flex flex-col gap-4">
        <NavLink to="/admin/home" className={navLinkStyles}>
          <MdDashboard size={20} /> Home
        </NavLink>
        <NavLink to="/admin/users" className={navLinkStyles}>
          <MdGroup size={20} /> View Users
        </NavLink>
        <NavLink to="/admin/support" className={navLinkStyles}>
          <MdSupport size={20} /> Support
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 hover:bg-teal-900 py-2 px-4 rounded-lg text-white transition-all"
        >
          <MdLogout size={20} /> Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
