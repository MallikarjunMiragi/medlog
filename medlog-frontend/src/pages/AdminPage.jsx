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
    const user = users.find((u) => u.email === email);
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
    <div className="p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <h2 className="text-4xl font-bold mb-8 text-center text-teal-300 drop-shadow-lg">
        Admin Panel
      </h2>

      {loading ? (
        <p className="text-center text-gray-400 text-lg">Loading users...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-800 p-6">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-700 text-teal-300 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                >
                  <td className="p-3">{user.fullName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td
                    className={`p-3 font-semibold ${
                      user.status === "approved"
                        ? "text-green-400"
                        : user.status === "rejected"
                        ? "text-red-400"
                        : "text-yellow-300"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleApprove(user.email)}
                      className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold rounded-full hover:from-green-500 hover:to-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(user.email)}
                      className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-black font-semibold rounded-full hover:from-red-500 hover:to-red-700 transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Notification */}
      <Notification
        isOpen={notification.isOpen}
        onRequestClose={() =>
          setNotification({ ...notification, isOpen: false })
        }
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
};

export default AdminPage;
