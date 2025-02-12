
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogbookCategory from "../components/logbookCategory";
import { FaHospital, FaClipboardList, FaStethoscope, FaProcedures, FaChevronRight } from "react-icons/fa"; 
import "../styles.css";

const predefinedCategories = [
  { name: "Admissions", description: "Add Admissions", icon: <FaHospital />, route: "/admissions" },
  { name: "CPD", description: "CPD", icon: <FaClipboardList />, route: "/cpd-entry" },
  { name: "POCUS", description: "POCUS", icon: <FaStethoscope />, route: "/pocus" },
  { name: "Procedures", description: "Procedures", icon: <FaProcedures />, route: "/procedures" },
];

const LogbookPage = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState(predefinedCategories);

  // ✅ Fetch categories from localStorage when page loads
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const newCategories = storedCategories.map((name) => ({
      name,
      description: `Manage ${name}`,
      icon: <FaClipboardList />, // Default icon for new categories
      route: `/generated-form/${name}`, // Navigate to dynamically generated form
    }));
    setCategoryList([...predefinedCategories, ...newCategories]);
  }, []);

  return (
    <div className="logbook-container w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Welcome to your new logbook!</h1>
      <p className="text-gray-700 mb-4">
        Log entries you've made in previous jobs are filed separately, and can be accessed and added via the jobs page. 
        Logbooks from multiple jobs can still be combined to produce reports on the Reports page. You can record the following 
        clinical activities in your logbook associated with this job.
      </p>

      {/* ✅ Dynamically List Categories (Including New Ones) */}
      <div className="logbook-list grid grid-cols-2 gap-4">

        {categoryList.map((category, index) => (
          <LogbookCategory
            key={index}
            icon={category.icon}
            title={category.name}
            description={category.description}
            route={category.route} // ✅ Now routes to the correct form
          />
        ))}

        <LogbookCategory icon={<FaHospital />} title="Admissions" description="Add Admissions" route="/admissions" />
        <LogbookCategory icon={<FaClipboardList />} title="CPD" description="CPD" route="/cpd-entry" />
        <LogbookCategory icon={<FaStethoscope />} title="POCUS" description="POCUS" route="/pocus" />
        <LogbookCategory icon={<FaProcedures />} title="Procedures" description="Procedures" route="/procedures-entry" />

      </div>

      {/* Clickable Manage Logbook Categories Section */}
      <div className="logbook-manage clickable" onClick={() => navigate("/manage-logbook")}>
        <FaChevronRight className="arrow-icon" />
        <h3>Manage logbook categories</h3>
      </div>

      <p className="logbook-footer text-sm text-gray-500 mt-4">
        You can opt into one of our growing list of other, more specialist, logbook categories at any time using the "Add category" 
        button on the add logbook entry category picker. If you have any questions, ideas or problems please do not hesitate to get in 
        contact with us on our email.
      </p>
    </div>
  );
};

export default LogbookPage;
