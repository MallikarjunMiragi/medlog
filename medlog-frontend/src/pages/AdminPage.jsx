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
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, status: "approved" } : u))
      );
      setNotification({
        isOpen: true,
        title: "Success",
        message: `${user?.fullName || email} approved.`,
        type: "success",
      });
    } catch (err) {
      console.error("Approve error:", err);
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
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, status: "rejected" } : u))
      );
      setNotification({
        isOpen: true,
        title: "Rejected",
        message: `${user?.fullName} rejected.`,
        type: "error",
      });
    } catch (err) {
      console.error("Reject error:", err);
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
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, role: newRole } : u))
      );
      setNotification({
        isOpen: true,
        title: "Updated",
        message: `Role updated to ${newRole} for ${email}`,
        type: "success",
      });
    } catch (err) {
      console.error("Update role error:", err);
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
      return (
        user.role?.toLowerCase() === "student" &&
        user.fullName?.toLowerCase().includes(lowerSearch)
      );
    }
    return false;
  });

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 text-white min-h-screen bg-gradient-to-br from-[#1f2937] via-[#111827] to-black">
     <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-teal-300 drop-shadow-md">
        Admin Panel
      </h2>
      <p className="text-center text-gray-400 text-lg mb-1">
        Use the <strong>"Requests"</strong> tab to approve or reject newly registered users.
      </p>
      <p className="text-center text-gray-400 text-lg mb-6">
        Use the <strong>"Users"</strong> tab to update a student's role to doctor.
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {["requests", "users"].map((tab) => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-lg transition-all duration-200 ${
              activeTab === tab
                ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-semibold shadow-lg"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab((prev) => (prev === tab ? null : tab))}
          >
            {tab === "requests" ? "Requests" : "Users"}
          </button>
        ))}
      </div>

      {/* Search */}
      {activeTab && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
      )}

      {activeTab && (
        <>
          {loading ? (
            <p className="text-center text-gray-400 text-lg">Loading users...</p>
          ) : (
            <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6">
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
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={activeTab === "requests" ? 5 : 4} className="text-center py-6 text-gray-400">
                        {activeTab === "users" ? "No students found." : "No requests found."}
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.email} className="border-b border-gray-700 hover:bg-gray-700/50 transition">
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

                        <td className="p-3 text-center">
                          {activeTab === "requests" ? (
                            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                              <button
                                onClick={() => handleApprove(user.email)}
                                className="px-4 py-1.5 bg-gradient-to-r from-green-400 to-green-600 text-black rounded-full hover:from-green-500 hover:to-green-700"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(user.email)}
                                className="px-4 py-1.5 bg-gradient-to-r from-red-400 to-red-600 text-black rounded-full hover:from-red-500 hover:to-red-700"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <select
                              value={user.role}
                              onChange={(e) =>
                                handleRoleUpdate(user.email, e.target.value)
                              }
                              className="bg-gray-900 text-white border border-gray-600 rounded px-3 py-1"
                            >
                              <option value="student">Student</option>
                              <option value="doctor">Doctor</option>
                            </select>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

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
