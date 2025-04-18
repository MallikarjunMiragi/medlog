import React, { useState } from "react";
import AdminUserTable from "../Components/AdminUserTable";

const AdminPage = () => {
  const [pendingUsers, setPendingUsers] = useState([
    { id: 1, name: "Suchitha Bolar", email: "suchitha@example.com", role: "student" },
    { id: 2, name: "Dr. Aryan Singh", email: "aryan@hospital.com", role: "doctor" },
  ]);

  const [notifications, setNotifications] = useState([]);

  const handleApprove = (id) => {
    const user = pendingUsers.find((u) => u.id === id);
    setPendingUsers(pendingUsers.filter((u) => u.id !== id));
    setNotifications([...notifications, { type: "success", message: `${user.name} approved.` }]);
  };

  const handleReject = (id) => {
    const user = pendingUsers.find((u) => u.id === id);
    setPendingUsers(pendingUsers.filter((u) => u.id !== id));
    setNotifications([...notifications, { type: "error", message: `${user.name} rejected.` }]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Panel</h2>

      <div className="mb-4 space-y-2">
        {notifications.map((note, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded text-white ${
              note.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {note.message}
          </div>
        ))}
      </div>

      <AdminUserTable
        users={pendingUsers}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default AdminPage;
