// import React from "react";
// import LogbookCategory from "../Components/logbookCategory";
// import { FaHospital, FaClipboardList, FaStethoscope, FaProcedures } from "react-icons/fa"; 
// import "../styles/LogbookPage.css";

// const LogbookPage = () => {
//   return (
//     <div className="logbook-container">
//       <h1>Welcome to your new logbook!</h1>
//       <p className="logbook-description">
//         Log entries you've made in previous jobs are filed separately, and can be accessed and added via the jobs page. 
//         Logbooks from multiple jobs can still be combined to produce reports on the Reports page. You can record the following 
//         clinical activities in your logbook associated with this job.
//       </p>

//       <div className="logbook-list">
//         <LogbookCategory icon={<FaHospital />} title="Admissions" description="Add Admissions" />
//         <LogbookCategory icon={<FaClipboardList />} title="CPD" description="CPD" />
//         <LogbookCategory icon={<FaStethoscope />} title="POCUS" description="POCUS" />
//         <LogbookCategory icon={<FaProcedures />} title="Procedures" description="Procedures" />
//       </div>

//       <div className="logbook-manage">
//         <h3>Manage logbook categories</h3>
//         <p>Change the name, configuration and add or delete categories</p>
//       </div>

//       <p className="logbook-footer">
//         You can opt into one of our growing list of other, more specialist, logbook categories at any time using the "Add category" 
//         button on the add logbook entry category picker. If you have any questions, ideas or problems please do not hesitate to get in 
//         contact with us on our email.
//       </p>
//     </div>
//   );
// };

// export default LogbookPage;

import React from "react";
import LogbookCategory from "../Components/LogbookCategory";
import { FaHospital, FaClipboardList, FaStethoscope, FaProcedures } from "react-icons/fa"; 
import "../styles/LogbookPage.css";

const LogbookPage = () => {
  return (
    <div className="logbook-container">
      <h1>Welcome to your new logbook!</h1>
      <p className="logbook-description">
        Log entries you've made in previous jobs are filed separately, and can be accessed and added via the jobs page. 
        Logbooks from multiple jobs can still be combined to produce reports on the Reports page. You can record the following 
        clinical activities in your logbook associated with this job.
      </p>

      <div className="logbook-list">
        <LogbookCategory icon={<FaHospital />} title="Admissions" description="Add Admissions" route="/admissions" />
        <LogbookCategory icon={<FaClipboardList />} title="CPD" description="CPD" route="/cpd" />
        <LogbookCategory icon={<FaStethoscope />} title="POCUS" description="POCUS" route="/pocus" />
        <LogbookCategory icon={<FaProcedures />} title="Procedures" description="Procedures" route="/procedures" />
      </div>

      <div className="logbook-manage">
        <h3>Manage logbook categories</h3>
        <p>Change the name, configuration and add or delete categories</p>
      </div>

      <p className="logbook-footer">
        You can opt into one of our growing list of other, more specialist, logbook categories at any time using the "Add category" 
        button on the add logbook entry category picker. If you have any questions, ideas or problems please do not hesitate to get in 
        contact with us on our email.
      </p>
    </div>
  );
};

export default LogbookPage;
