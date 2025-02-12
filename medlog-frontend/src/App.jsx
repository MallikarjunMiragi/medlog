import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminLoginForm from "./pages/AdminLoginForm";
import RegistrationPage from "./pages/RegistrationPage";
import LogbookPage from "./pages/LogbookPage";
import AdmissionsForm from "./pages/AdmissionsForm";
import ReportsPage from "./pages/ReportsPage"; 
import AccountPage from "./pages/AccountPage";
import CPDEntry from "./pages/CPDEntryPage";
import POCUSPage from "./pages/POCUSPage";
import ProceduresEntry from "./pages/ProceduresEntry";
import JobsPage from "./pages/JobsPage"; 

import ManageLogbook from "./pages/ManageLogbook";
import AddCategory from "./pages/AddCategory";
import CategoryForm from "./pages/CategoryForm";
import GeneratedForm from "./pages/GeneratedForm";
import Support from "./pages/Support"; 
import GoalProgression from "./pages/GoalProgression";
const AppLayout = () => {
  const location = useLocation();
  const hideNavbarSidebar = location.pathname === "/";

  return (
    <div className="app-layout">
      {!hideNavbarSidebar && <Navbar />}
      <div className="main-content">
        {!hideNavbarSidebar && <Sidebar />}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<AdminLoginForm />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/logbookpage" element={<LogbookPage />} />
            <Route path="/admissions" element={<AdmissionsForm />} />
            <Route path="/reports" element={<ReportsPage />} /> 
            <Route path="/account" element={<AccountPage />} />
            <Route path="/cpd-entry" element={<CPDEntry />} />
            <Route path="/pocus" element={<POCUSPage />} />

            <Route path="/manage-logbook" element={<ManageLogbook />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/category-form/:category" element={<CategoryForm />} />
            <Route path="/generated-form/:category" element={<GeneratedForm />} /> 
            <Route path="/support" element={<Support />} />
            <Route path="/goal-progression" element={<GoalProgression />} />
            <Route path="/procedures-entry" element={<ProceduresEntry />} />
            <Route path="/jobs" element={<JobsPage />} /> 

          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
