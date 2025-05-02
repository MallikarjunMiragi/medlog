import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DoctorSidebar from "./components/DoctorSidebar"; // ✅ Import Doctor's Sidebar
import LoginPage from "./pages/AdminLoginForm";
import RegistrationPage from "./pages/RegistrationPage";
import LogbookPage from "./pages/LogbookPage";
import ReportsPage from "./pages/ReportsPage"; 
import AccountPage from "./pages/AccountPage";
import JobsPage from "./pages/JobsPage"; 
import ViewEntriesPage from "./pages/ViewEntriesPage";
import DoctorLogbook from "./pages/DoctorLogbook";
import ManageLogbook from "./pages/ManageLogbook";
import AddCategory from "./pages/AddCategory";
import CategoryForm from "./pages/CategoryForm";
import GeneratedForm from "./pages/GeneratedForm";
import Support from "./pages/Support"; 
import GoalProgression from "./pages/GoalProgression";
import StudentEntries from "./pages/StudentEntries"; 
import DynamicForm from "./Components/DynamicCategoryForm"; 
import DoctorHome from "./pages/DoctorHome";
import { useSelector } from "react-redux"; 
import AdminDashboard from "./pages/AdminDashboard";
import AdminPage from "./pages/AdminPage";
import AdminHome from "./pages/AdminHome";
import PendingApproval from "./pages/PendingApproval";

import "./index.css"; 

const AppLayout = () => {
  const location = useLocation();

  // ✅ Hide sidebar only for login and registration pages
  const hideSidebar = ["/", "/register", "/pending-approval"].includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith("/admin");

  // ✅ Get user role from Redux store
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || "student"; // Default to student if role is not available

  return (
    <div className="flex md:flex-row flex-col h-screen">
      {!hideSidebar && (<div className="w-[250px] h-10 md:h-screen">
        {/* ✅ Show correct sidebar based on user role */}
        {role === "doctor" ? <DoctorSidebar /> : <Sidebar />}
        </div>
        )}
        <div className="flex-1 p-5 overflow-y-auto bg-white/10 rounded-lg m-2.5"    style={{scrollbarWidth:"thin"}}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/logbookpage" element={<LogbookPage />} />
            <Route path="/reports" element={<ReportsPage />} /> 
            <Route path="/account" element={<AccountPage />} />
            <Route path="/manage-logbook" element={<ManageLogbook />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/category-form/:category" element={<CategoryForm />} />
            <Route path="/generated-form/:category" element={<GeneratedForm />} /> 
            <Route path="/support" element={<Support />} />
            <Route path="/goal-progression" element={<GoalProgression />} />
            <Route path="/jobs" element={<JobsPage />} /> 
            <Route path="/view-entries" element={<ViewEntriesPage />} />
            <Route path="/doctor-logbook" element={<DoctorLogbook />} />
            <Route path="/student-entries" element={<StudentEntries />} />
            <Route path="/generated-form/:category" element={<DynamicForm />} />
            <Route path="/doctor-home" element={<DoctorHome />} />
            <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="users" element={<AdminPage />} />
            </Route>
            <Route path="/pending-approval" element={<PendingApproval />} />
         </Routes>

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
