import React, { useEffect, useState } from "react";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import Notification from "../Components/Notification";

const AdminSupport = () => {
  const [queries, setQueries] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [notification, setNotification] = useState({
      isOpen: false,
      title: "",
      message: "",
      type: "info",
    });

  // ✅ Fetch queries
  useEffect(() => {
    fetch("http://localhost:5001/api/support/all")
      .then((res) => res.json())
      .then((data) => setQueries(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Handle resolve
  const handleResolve = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/support/resolve/${id}`, {
        method: "PUT",
      });

      if (res.ok) {
        setNotification({
        isOpen: true,
        title: "Success",
        message: "Marked as resolved",
        type: "success",
      });
        setQueries((prev) =>
          prev.map((q) => (q._id === id ? { ...q, status: "resolved" } : q))
        );
      } else {
        setNotification({
        isOpen: true,
        title: "Error",
        message: "Failed to mark as resolved",
        type: "error",
      });
      }
    } catch (err) {
      console.error(err);
      setNotification({
        isOpen: true,
        title: "Error",
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  const filteredQueries = queries.filter((q) =>
    filter === "all" ? true : q.status === filter
  );

  return (
    <div className="ml-0 p-8 text-white  min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-teal-300">Support Queries</h2>

      {/* ✅ Toggle Buttons */}
      <div className="mb-6 flex gap-3">
        {["pending", "resolved", "all"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === f
                ? f === "pending"
                  ? "bg-yellow-500 text-black"
                  : f === "resolved"
                  ? "bg-green-500 text-black"
                  : "bg-blue-500 text-black"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* ✅ Query Cards */}
      <div className="space-y-6">
        {filteredQueries.map((query) => (
          <div
            key={query._id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
          >
            <p className="mb-1">
              <span className="font-bold text-teal-300">Name:</span>{" "}
              {query.studentName}
            </p>
            <p className="mb-1">
              <span className="font-bold text-teal-300">Email:</span>{" "}
              {query.studentEmail}
            </p>
            <p className="mb-1">
              <span className="font-bold text-teal-300">Type:</span>{" "}
              {query.supportType}
            </p>
            <p className="mb-1">
              <span className="font-bold text-teal-300">Detail:</span>{" "}
              {query.detail}
            </p>
            <p className="mb-1">
              <span className="font-bold text-teal-300">Status:</span>{" "}
              <span
                className={
                  query.status === "resolved" ? "text-green-400" : "text-yellow-400"
                }
              >
                {query.status}
              </span>
            </p>
            <p className="mb-4">
              <span className="font-bold text-teal-300">Submitted:</span>{" "}
              {new Date(query.submittedAt).toLocaleString()}
            </p>

            {/* ✅ Action Buttons */}
            <div className="flex gap-3">
              {/* Send Email */}
              <a
                href={`mailto:${query.studentEmail}?subject=${encodeURIComponent(
                  "Support Response"
                )}&body=${encodeURIComponent(`Hi ${query.studentName},\n\n`)}`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
              >
                <FaEnvelope /> Send Email
              </a>

              {/* Mark Resolved */}
              {query.status !== "resolved" && (
                <button
                  onClick={() => handleResolve(query._id)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
                >
                  <FaCheckCircle /> Mark Resolved
                </button>
              )}
            </div>
          </div>
        ))}

        {/* No Queries */}
        {filteredQueries.length === 0 && (
          <p className="text-gray-400 text-lg">No {filter} queries found.</p>
        )}
      </div>
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

export default AdminSupport;
