// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { IoLogOutOutline, IoMenu, IoClose } from "react-icons/io5";
// import { FaHome, FaUserGraduate } from "react-icons/fa";

// const DoctorSidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   const getLinkStyle = (path) => {
//     const isActive = location.pathname === path;
//     return `px-6 py-4 flex gap-3 items-center cursor-pointer rounded-lg transition-all duration-300
//       ${isActive ? "bg-teal-800 font-semibold" : "hover:bg-white/20 hover:border-l-[4px] hover:border-[#3498db] hover:pl-[16px]"}`;
//   };

//   return (
//     <>
//       {/* Burger Icon */}
//       <div className="md:hidden p-4 fixed top-0 left-0 z-50">
//         <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl">
//           {isOpen ? <IoClose className="ml-50 -mt-4" /> : <IoMenu />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`bg-[#008080] w-[250px] h-screen text-white flex flex-col pt-5 fixed top-0 z-40 transition-transform duration-300 shadow-lg
//         ${isOpen ? "left-0" : "-left-[250px]"} md:left-0`}
//       >
//         <div className="pl-5 text-[22px] font-bold mb-5 text-gray-100">Doctor Logbook</div>
//         <ul>
//           <li
//             className={getLinkStyle("/doctor-home")}
//             onClick={() => {
//               navigate("/doctor-home");
//               setIsOpen(false);
//             }}
//           >
//             <FaHome className="icon" /> Home
//           </li>
//           <li
//             className={getLinkStyle("/doctor-logbook")}
//             onClick={() => {
//               navigate("/doctor-logbook");
//               setIsOpen(false);
//             }}
//           >
//             <FaUserGraduate className="icon" /> View Students
//           </li>

//           <li onClick={() => { navigate("/doctor-student-analysis"); setIsOpen(false); }}>
//     <FaUserGraduate className="icon" /> Analysis
//   </li>
//   <li onClick={() => { navigate("/assign-task"); setIsOpen(false); }}>
//   <FaUserGraduate className="icon" /> Assign Task
// </li>

//           <li onClick={() => { navigate("/account"); setIsOpen(false); }}>

//           <li
//             className={getLinkStyle("/account")}
//             onClick={() => {
//               navigate("/account");
//               setIsOpen(false);
//             }}
//           >

//             <FaUserGraduate className="icon" /> Account
//           </li>
//           <li
//             className="px-6 py-5 flex gap-3 items-center cursor-pointer rounded-md transition-all duration-300 hover:bg-[#154f4e]"
//             onClick={() => {
//               handleLogout();
//               setIsOpen(false);
//             }}
//           >
//             <IoLogOutOutline className="icon" /> Log Out
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default DoctorSidebar;
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoLogOutOutline, IoMenu, IoClose } from "react-icons/io5";
import { FaHome, FaUserGraduate } from "react-icons/fa";

const DoctorSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

   const getLinkStyle = (path) => {
  const isActive = location.pathname === path;
  return `px-6 py-4 flex gap-3 items-center cursor-pointer rounded-lg transition-all duration-300
    ${
      isActive
        ? "bg-white/20 border-l-[4px] border-white pl-[16px] font-semibold text-white"
        : "hover:bg-white/20 hover:border-l-[4px] hover:border-white hover:pl-[16px]"
    }`;
};
  return (
    <>
      {/* Burger Icon */}
      <div className="md:hidden p-4 fixed top-0 left-0 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "block",
            width: "100%",
            fontWeight: "bold",
            background: "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
            color: "white",
            padding: "12px 20px",
            margin: "auto",
            borderRadius: "20px",
            boxShadow: "rgba(133, 189, 215, 0.88) 0px 20px 10px -15px",
            border: "none",
            fontSize: "24px",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
          onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
  className={`w-[250px] h-screen text-white flex flex-col pt-5 fixed top-0 z-40 transition-transform duration-300 shadow-lg
  ${isOpen ? "left-0" : "-left-[250px]"} md:left-0`}
  style={{
    background: "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
  }}
>
        <div className="pl-5 text-[22px] font-bold mb-5 text-gray-100">Doctor Logbook</div>
        <ul>
          <li
            className={getLinkStyle("/doctor-home")}
            onClick={() => {
              navigate("/doctor-home");
              setIsOpen(false);
            }}
          >
            <FaHome className="icon" /> Home
          </li>
          <li
            className={getLinkStyle("/doctor-logbook")}
            onClick={() => {
              navigate("/doctor-logbook");
              setIsOpen(false);
            }}
          >
            <FaUserGraduate className="icon" /> View Students
          </li>

          {/* ✅ Your Added Routes */}
          <li
            className={getLinkStyle("/doctor-student-analysis")}
            onClick={() => {
              navigate("/doctor-student-analysis");
              setIsOpen(false);
            }}
          >
            <FaUserGraduate className="icon" /> Analysis
          </li>
          <li
            className={getLinkStyle("/assign-task")}
            onClick={() => {
              navigate("/assign-task");
              setIsOpen(false);
            }}
          >
            <FaUserGraduate className="icon" /> Assign Task
          </li>

          {/* ✅ Partner's improved Account style */}
          <li
            className={getLinkStyle("/account")}
            onClick={() => {
              navigate("/account");
              setIsOpen(false);
            }}
          >
            <FaUserGraduate className="icon" /> Account
          </li>

          <li
  className="px-6 py-5 flex gap-3 items-center cursor-pointer rounded-lg transition-all duration-300 hover:bg-white/20 hover:border-l-[4px] hover:border-white hover:pl-[16px] text-white"
  onClick={() => {
    handleLogout();
    setIsOpen(false);
  }}
>
  <IoLogOutOutline className="icon" /> Log Out
</li>

        </ul>
      </div>
    </>
  );
};

export default DoctorSidebar;
