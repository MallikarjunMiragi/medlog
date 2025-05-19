import React, { useEffect, useState } from "react";
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
  const [activeTab, setActiveTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        prevUsers.map((u) =>
          u.email === email ? { ...u, status: "approved" } : u
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
        prevUsers.map((u) =>
          u.email === email ? { ...u, status: "rejected" } : u
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

  const handleRoleUpdate = async (email, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/user/update-role`, {
        email,
        role: newRole,
      });

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.email === email ? { ...u, role: newRole } : u
        )
      );

      setNotification({
        isOpen: true,
        title: "Updated",
        message: `Role updated to ${newRole} for ${email}`,
        type: "success",
      });
    } catch (err) {
      console.error("Failed to update role", err);
      setNotification({
        isOpen: true,
        title: "Error",
        message: "Failed to update role.",
        type: "error",
      });
    }
  };

  const filteredUsers = users.filter((user) => {
  const lowerSearch = searchTerm.toLowerCase();

  if (activeTab === "requests") {
    return user.fullName?.toLowerCase().includes(lowerSearch);
  } else if (activeTab === "users") {
    return user.role?.toLowerCase().includes(lowerSearch);
  }

  return false;
});


  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 text-white min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-teal-300 drop-shadow-lg">
        Admin Panel
      </h2>

      {/* 🔘 Tabs */}
              <div className="flex justify-center mb-6 gap-4">
                <button
          className={`px-4 py-2 rounded ${
            activeTab === "requests"
              ? "bg-teal-500 text-black font-semibold"
              : "bg-gray-700 text-white"
          }`}
          onClick={() =>
            setActiveTab((prev) => (prev === "requests" ? null : "requests"))
          }
        >
          Requests
        </button>

        <button
          className={`px-4 py-2 rounded ${
            activeTab === "users"
              ? "bg-teal-500 text-black font-semibold"
              : "bg-gray-700 text-white"
          }`}
          onClick={() =>
            setActiveTab((prev) => (prev === "users" ? null : "users"))
          }
        >
          Users
        </button>

        {/* <button
          className={`px-4 py-2 rounded ${
            activeTab === "users"
              ? "bg-teal-500 text-black font-semibold"
              : "bg-gray-700 text-white"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button> */}
      </div>

{activeTab && (
  <>
    {/* 🔍 Search */}
    <div className="mb-4">
      <input
        type="text"
        placeholder={
          activeTab === "requests"
            ? "Search by name..."
            : "Search by role..."
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
    </div>

    {loading ? (
      <p className="text-center text-gray-400 text-lg">Loading users...</p>
    ) : (
      <div className="overflow-auto bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
          <table className="min-w-full table-auto text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-700 text-teal-300 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                {activeTab === "requests" && <th className="p-3">Status</th>}
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.email}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                >
                  <td className="p-3">{user.fullName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>

                  {activeTab === "requests" && (
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
                  )}

                  <td className="p-3">
                    {activeTab === "requests" ? (
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <button
                          onClick={() => handleApprove(user.email)}
                          className="px-4 py-1.5 bg-green-500 text-black rounded-full hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user.email)}
                          className="px-4 py-1.5 bg-red-500 text-black rounded-full hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user.email, e.target.value)}
                        className="bg-gray-900 text-white border border-gray-600 rounded px-3 py-1"
                      >
                        <option value="student">Student</option>
                        <option value="doctor">Doctor</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </div>
    )}
  </>
)}


      {/* 🔔 Notification */}
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





