// import React, { useState } from "react";
// import Sidebar from "./Components/Sidebar";
// import Navbar from "./Components/Navbar";
// import LogbookPage from "./pages/LogbookPage";
// import LogbookPopup from "./Components/LogbookPopup"; // Import popup

// function App() {
//   const [isPopupOpen, setPopupOpen] = useState(false);

//   return (
//     <div className="app-container">
//       <Sidebar />
//       <div className="main-content">
//         <Navbar onAddEntryClick={() => setPopupOpen(true)} />
//         <LogbookPage />
//       </div>

//       {/* Popup */}
//       {isPopupOpen && <LogbookPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import LogbookPage from "./pages/LogbookPage";
import LogbookPopup from "./Components/LogbookPopup";
import AdmissionsPage from "./pages/AdmissionsPage";
import CPDPage from "./pages/CPDPage";
import POCUSPage from "./pages/POCUSPage";
import ProceduresPage from "./pages/ProceduresPage";

function App() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar onAddEntryClick={() => setPopupOpen(true)} />

          <Routes>
            <Route path="/" element={<LogbookPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/cpd" element={<CPDPage />} />
            <Route path="/pocus" element={<POCUSPage />} />
            <Route path="/procedures" element={<ProceduresPage />} />
          </Routes>
        </div>

        {/* Popup */}
        {isPopupOpen && <LogbookPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />}
      </div>
    </Router>
  );
}

export default App;
