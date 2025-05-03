import React from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex bg-gray-700 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-10 pl-72 bg-gray-700 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
