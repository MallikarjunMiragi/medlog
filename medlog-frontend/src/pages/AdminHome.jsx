import React from "react";

const AdminHome = () => {
  return (
    <div className="flex flex-col  items-center h-full text-center">
      <h2 className="text-5xl font-bold bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-400 text-transparent bg-clip-text mb-4">
        Welcome, Admin!
     </h2>

     <p className="text-lg !text-blue-300">
      Manage your users and system efficiently.
    </p>


    </div>
  );
};

export default AdminHome;
