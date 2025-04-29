import React from "react";

const DoctorHome = () => {
  return (
    <div className="flex min-h-screen"> {/* doctor-home-layout converted */}
      
      {/* Main Content */}
      <div className="flex-grow p-5"> {/* doctor-home-container converted */}
        
        <h1 className="text-4xl font-bold text-center text-teal-400 mb-6"> {/* welcome-title */}
          Welcome, Doctor!
        </h1>
        
        <p className="text-lg text-center text-white mb-4">
          As a doctor, your expertise and guidance help shape the future of medicine. 
          This logbook allows you to monitor students’ progress, review their entries, 
          and provide feedback to enhance their learning experience.
        </p>
        
        <p className="text-lg text-center text-white">
          Navigate to <strong>View Students</strong> to check their progress or log out when you're done. 
          Thank you for your dedication to medical education!
        </p>

      </div>
    </div>
  );
};

export default DoctorHome;