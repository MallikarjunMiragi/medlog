import React, { useEffect, useState } from "react";
import AdminUserTable from "../Components/AdminUserTable";
import axios from "axios";
import Notification from "../Components/Notification";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/users/all");
      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setNotification({
        isOpen: true,
        title: "Error",
        message: "Failed to fetch users.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (email) => {
    const user = users.find((u) => u.email === email); // ✅ Find first
    try {
      await axios.put(`http://localhost:5000/api/auth/user/update-status`, {
        email,
        status: "approved",
      });
  
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, status: "approved" } : user
        )
      );
  
      setNotification({
        isOpen: true,
        title: "Success",
        message: `${user?.fullName || email} approved.`,
        type: "success",
      });
    } catch (err) {
      console.error("Failed to approve user", err);
      setNotification({
        isOpen: true,
        title: "Error",
        message: "Failed to approve user.",
        type: "error",
      });
    }
  };
  

  const handleReject = async (email) => {
    const user = users.find((u) => u.email === email);
    try {
      await axios.put(`http://localhost:5000/api/auth/user/update-status`, {
        email,
        status: "rejected",
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, status: "rejected" } : user
        )
      );

      setNotification({
        isOpen: true,
        title: "Rejected",
        message: `${user?.fullName} rejected.`,
        type: "error",
      });
    } catch (err) {
      console.error("Failed to reject user", err);
      setNotification({
        isOpen: true,
        title: "Error",
        message: "Failed to reject user.",
        type: "error",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-700 min-h-screen">
      <h2 className="text-3xl mb-6 text-center text-white">Admin Panel</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <AdminUserTable
          users={users}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {/* Notification Modal */}
      <Notification
        isOpen={notification.isOpen}
        onRequestClose={() => setNotification({ ...notification, isOpen: false })}
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
};

export default AdminPage;
