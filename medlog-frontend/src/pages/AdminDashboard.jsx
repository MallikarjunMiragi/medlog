import React from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className=" bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-10 pr-50 pl-50 ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
