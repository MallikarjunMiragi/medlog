
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const predefinedCategories = ["Admissions", "CPD", "POCUS", "Procedures"];
const categories = [
  "Admissions", "Bone Marrow Reporting", "Clinical Events", "Clinics", "CPD",
  "CUSIC", "General Surgery", "Echocardiograms", "Multi-Disciplinary Team Meetings",
  "O & G Ultrasound", "POCUS", "Procedures", "Radiology Reporting", "Research",
  "Thoracic Ultrasound", "Ward Rounds"
];

const AddCategory = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSave = () => {
    if (!selectedCategory) {
      alert("Please select a category before saving.");
      return;
    }

    // ✅ Fetch stored categories from ManageLogbook
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];

    // ✅ Check if the selected category exists in ManageLogbook (predefined or newly added)
    if (storedCategories.includes(selectedCategory)) {
      alert("Category already exists in Manage Logbook! Please choose a different category.");
      return;
    }
    if (predefinedCategories.includes(selectedCategory)) {
      alert("Category already exists in predefined categories! Please choose a different category.");
      return;
    }

    // ✅ If new, proceed to category form
    navigate(`/category-form/${selectedCategory}`);
  };

  return (
    <div style={styles.container}>
      <h2>Add Category</h2>
      <p>Logbook categories help you organize your logbook.</p>

      <label>Logbook category *</label>
      <select style={styles.input} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      <label>Optional category name</label>
      <input type="text" style={styles.input} placeholder="Enter optional name" />

      <div style={styles.buttonContainer}>
        <button style={styles.cancelButton} onClick={() => navigate(-1)}>Cancel</button>
        <button style={styles.saveButton} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", maxWidth: "500px", margin: "0 auto", textAlign: "center" },
  input: { width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" },
  buttonContainer: { display: "flex", justifyContent: "center", gap: "10px" },
  cancelButton: { padding: "10px 15px", background: "#ccc", cursor: "pointer" },
  saveButton: { padding: "10px 15px", background: "teal", color: "white", cursor: "pointer" }
};

export default AddCategory;
