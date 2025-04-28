import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LogbookCategory from "../components/logbookCategory";
import { FaClipboardList, FaChevronRight } from "react-icons/fa"; 
import axios from "axios";
import "../styles.css";

const LogbookPage = () => {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.auth?.user?.email);

  const [categoryList, setCategoryList] = useState([]);

  // ✅ Fetch categories from the backend
  useEffect(() => {
    //const userEmail = useSelector((state) => state.auth?.user?.email); // Get logged-in user's email

const fetchCategories = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/category/all?email=${encodeURIComponent(userEmail)}`);

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
    <div className="w-full max-w-5xl p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-[#a9d0cd] text-center font-[cursive]">Welcome to your new logbook!</h1>
      <p className="text-[#deefed] text-center mb-4">
        Log entries you've made in previous jobs are filed separately, and can be accessed and added via the jobs page. 
        Logbooks from multiple jobs can still be combined to produce reports on the Reports page.
      </p>

      {/* ✅ Display dynamic categories */}
      <div className="grid //grid-cols-2 gap-4">
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
      <div className="flex bg-white/10 p-6 rounded-lg mt-5 transition-colors duration-300 ease-in-out hover:bg-[#3C4752]" onClick={() => navigate("/manage-logbook")}>
        <h3 className="text-base font-bold text-white w-fit">Manage logbook categories</h3>
        <FaChevronRight className="text-gray-300 ml-auto" />
      </div>

      <p className="text-sm text-[#deefed] mt-5 p-2 text-center">
        You can opt into one of our growing list of other, more specialist, logbook categories at any time using the "Add category" 
        button on the category picker. If you have any questions, please contact us via email.
      </p>
    </div>
  );
};

export default LogbookPage;
