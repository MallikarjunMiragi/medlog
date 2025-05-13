import React from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className=" bg-gray-700 max-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-10 pr-50 pl-50 bg-gray-700 max-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
