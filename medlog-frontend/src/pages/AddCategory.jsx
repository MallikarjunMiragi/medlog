import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../reducers/categoryReducer";
import DynamicCategoryForm from "../Components/DynamicCategoryForm"; // Importing Dynamic Form Component

const categories = [
  "Admissions", "Bone Marrow Reporting", "Clinical Events", "Clinics", "CPD",
  "CUSIC", "General Surgery", "Echocardiograms", "Multi-Disciplinary Team Meetings",
  "O & G Ultrasound", "POCUS", "Procedures", "Radiology Reporting", "Research",
  "Thoracic Ultrasound", "Ward Rounds"
];

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedCategories = useSelector((state) => state.categories); // Get categories from Redux store

  const [selectedCategory, setSelectedCategory] = useState("");
  const [fields, setFields] = useState([{ name: "", type: "text" }]);

  const addField = () => {
    setFields([...fields, { name: "", type: "text" }]);
  };

  const updateField = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleSave = () => {
    if (!selectedCategory) {
      alert("Please select a category before saving.");
      return;
    }

    if (fields.some((field) => field.name.trim() === "")) {
      alert("Field names cannot be empty.");
      return;
    }

    // Dispatch Redux action to save the category
    dispatch(addCategory({ name: selectedCategory, fields }))
      .unwrap()
      .then(() => {
        alert("Category saved successfully!");
        navigate("/logbookpage");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div style={styles.container}>
      <h2>Add Category</h2>
      <p>Logbook categories help you organize your logbook.</p>

      <label>Logbook category *</label>
      <select
        style={styles.input}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <h3>Define Fields</h3>
      {fields.map((field, index) => (
        <div key={index} style={styles.fieldRow}>
          <input
            type="text"
            placeholder="Enter field name"
            value={field.name}
            onChange={(e) => updateField(index, "name", e.target.value)}
            style={styles.input}
          />
          <select
            value={field.type}
            onChange={(e) => updateField(index, "type", e.target.value)}
            style={styles.select}
          >
            <option value="text">Text</option>
            <option value="date">Date</option>
            <option value="number">Number</option>
            <option value="file">File</option>
          </select>
        </div>
      ))}
      <button style={styles.addButton} onClick={addField}>
        + Add Field
      </button>

      {/* Preview Dynamic Category Form */}
      {selectedCategory && (
        <div style={styles.previewContainer}>
          <h3 style={{color: "black"}}>Preview: {selectedCategory}</h3>
          <DynamicCategoryForm categoryName={selectedCategory} fields={fields} />
        </div>
      )}

      <div style={styles.buttonContainer}>
        <button style={styles.cancelButton} onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button style={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  fieldRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  select: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    margin: "10px 0",
    padding: "8px",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
  },
  previewContainer: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    background: "#f9f9f9",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  cancelButton: {
    padding: "10px 15px",
    background: "#ccc",
    cursor: "pointer",
    borderRadius: "5px",
  },
  saveButton: {
    padding: "10px 15px",
    background: "teal",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default AddCategory;
