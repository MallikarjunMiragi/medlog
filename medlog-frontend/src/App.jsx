
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLoginForm from "./components/pages/AdminLoginForm";
import RegistrationPage from "./components/pages/RegistrationPage";
import WelcomePage from "./components/pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<AdminLoginForm />} />

        {/* Registration Page */}
        <Route path="/register" element={<RegistrationPage />} />

        {/* Welcome Page */}
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;

