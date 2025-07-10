import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoLogOutOutline, IoMenu, IoClose } from "react-icons/io5";
import { MdDashboard, MdGroup, MdSupport, MdAccountCircle } from "react-icons/md";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return `px-6 py-4 flex gap-3 items-center cursor-pointer rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-teal-800 font-semibold"
        : "hover:bg-white/20 hover:border-l-[4px] hover:border-[#3498db] hover:pl-[16px]"
    }`;
  };

  return (
    <>
      {/* 🍔 Burger Icon - Show only when sidebar is closed */}
      {!isOpen && (
        <div className="md:hidden p-4 fixed top-0 left-0 z-50">
          <button onClick={() => setIsOpen(true)} className="text-white text-3xl">
            <IoMenu />
          </button>
        </div>
      )}

      {/* 🧱 Sidebar Panel */}
      <div
        className={`bg-[#008080] w-[250px] h-screen text-white flex flex-col pt-5 fixed top-0 z-40 transition-transform duration-300 shadow-lg
        ${isOpen ? "left-0" : "-left-[250px]"} md:left-0`}
      >
        {/* 🔠 Title & Close Button */}
        <div className="flex items-center justify-between px-5 mb-5">
          <div className="text-[22px] font-bold text-gray-100">Admin Logbook</div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-white text-2xl">
            <IoClose />
          </button>
        </div>

        {/* 🔗 Navigation Links */}
        <ul>
          <li
            className={getLinkStyle("/admin/home")}
            onClick={() => {
              navigate("/admin/home");
              setIsOpen(false);
            }}
          >
            <MdDashboard className="icon" /> Home
          </li>
          <li
  className={getLinkStyle("/admin/register")}
  onClick={() => {
    navigate("/admin/register");
    setIsOpen(false);
  }}
>
  <MdAccountCircle className="icon" /> Register User
</li>

          <li
            className={getLinkStyle("/admin/users")}
            onClick={() => {
              navigate("/admin/users");
              setIsOpen(false);
            }}
          >
            <MdGroup className="icon" /> View Users
          </li>
          <li
            className={getLinkStyle("/admin/support")}
            onClick={() => {
              navigate("/admin/support");
              setIsOpen(false);
            }}
          >
            <MdSupport className="icon" /> Support
          </li>
          <li
            className={getLinkStyle("/admin/account")}
            onClick={() => {
              navigate("/admin/account");
              setIsOpen(false);
            }}
          >
            <MdAccountCircle className="icon" /> Account
          </li>
          <li
            className="px-6 py-5 flex gap-3 items-center cursor-pointer rounded-md transition-all duration-300 hover:bg-[#154f4e]"
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

export default AdminSidebar;