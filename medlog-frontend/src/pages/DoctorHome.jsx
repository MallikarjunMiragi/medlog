import React from "react";

const DoctorHome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f2a38] p-4">
      <div className="bg-[#344d66] text-white p-6 rounded-lg shadow-lg max-w-2xl w-full text-center font-sans">
        <h1 className="text-3xl font-bold mb-4 text-[#a9d0cd]">Welcome, Doctor!</h1>
        <p className="mb-4 text-lg">
          As a doctor, your expertise and guidance help shape the future of medicine.
          This logbook allows you to monitor students’ progress, review their entries,
          and provide feedback to enhance their learning experience.
        </p>
        <p className="text-lg">
          Navigate to <strong className="text-[#00d9c0]">View Students</strong> to check their progress or log out when you're done.
          Thank you for your dedication to medical education!
        </p>
      </div>
    </div>
  );
};

export default DoctorHome;
