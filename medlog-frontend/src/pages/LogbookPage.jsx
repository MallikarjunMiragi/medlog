import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogbookCategory from "../components/logbookCategory";
import { FaClipboardList, FaChevronRight } from "react-icons/fa"; 
import axios from "axios";
import "../styles.css";

const LogbookPage = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);

  // ✅ Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category/all");
        const categories = response.data.map((category) => ({
          name: category.name,
          description: `Manage ${category.name}`,
          icon: <FaClipboardList />, // Default icon
          route: `/generated-form/${category.name}`, // ✅ Navigate dynamically
        }));
        setCategoryList(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="logbook-container w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Welcome to your new logbook!</h1>
      <p className="text-gray-700 mb-4">
        Log entries you've made in previous jobs are filed separately, and can be accessed and added via the jobs page. 
        Logbooks from multiple jobs can still be combined to produce reports on the Reports page.
      </p>

      {/* ✅ Display dynamic categories */}
      <div className="logbook-list grid grid-cols-2 gap-4">
        {categoryList.map((category, index) => (
          <LogbookCategory
            key={index}
            icon={category.icon}
            title={category.name}
            description={category.description}
            route={category.route} // ✅ Dynamic category routing
          />
        ))}
      </div>

      {/* Clickable Manage Logbook Categories Section */}
      <div className="logbook-manage clickable" onClick={() => navigate("/manage-logbook")}>
        <FaChevronRight className="arrow-icon" />
        <h3>Manage logbook categories</h3>
      </div>

      <p className="logbook-footer text-sm text-gray-500 mt-4">
        You can opt into one of our growing list of other, more specialist, logbook categories at any time using the "Add category" 
        button on the category picker. If you have any questions, please contact us via email.
      </p>
    </div>
  );
};

export default LogbookPage;
