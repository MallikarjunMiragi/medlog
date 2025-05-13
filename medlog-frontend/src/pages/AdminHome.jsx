import React from "react";

const AdminHome = () => {
  return (

    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#253b50] text-white p-6 rounded-lg shadow-lg max-w-2xl w-full text-center font-sans">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-400 text-transparent bg-clip-text">Welcome, Admin!</h2>
        <p className="mb-4 text-lg !text-blue-300">
          Manage your users and system efficiently.
        </p>
        <p className="text-lg">
          Navigate to <strong className="text-[#00d9c0]">View Users</strong> to approve or reject the registered users or log out when you're done.
          <br />
          Thank you!!
        </p>

      </div>
    </div>
  );
};

export default AdminHome;
