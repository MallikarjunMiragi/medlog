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
import AdminLoginForm from "./components/pages/AdminLoginForm";
import RegistrationPage from "./components/pages/RegistrationPage";
import WelcomePage from "./components/pages/WelcomePage";

function App() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar onAddEntryClick={() => setPopupOpen(true)} />

          <Routes>
            {/* Logbook & Medical Pages */}
            <Route path="/" element={<LogbookPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/cpd" element={<CPDPage />} />
            <Route path="/pocus" element={<POCUSPage />} />
            <Route path="/procedures" element={<ProceduresPage />} />

            {/* Admin & User Pages */}
            <Route path="/login" element={<AdminLoginForm />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
          </Routes>
        </div>

        {/* Popup */}
        {isPopupOpen && <LogbookPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />}
      </div>
    </Router>
  );
}

export default App;
