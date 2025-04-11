import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../reducers/categoryReducer";
import DynamicCategoryForm from "../Components/DynamicCategoryForm";
import Notification from "../Components/Notification";


const categories = [
  "Admissions", "Bone Marrow Reporting", "Clinical Events", "Clinics", "CPD",
  "CUSIC", "General Surgery", "Echocardiograms", "Multi-Disciplinary Team Meetings",
  "O & G Ultrasound", "POCUS", "Procedures", "Radiology Reporting", "Research",
  "Thoracic Ultrasound", "Ward Rounds"
];

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth?.user?.email);

  const savedCategories = useSelector((state) => state.categories); // Get categories from Redux store

  //const [selectedCategory, setSelectedCategory] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [categoryExists, setCategoryExists] = useState(false);

 // const [fields, setFields] = useState([{ name: "", type: "text" }]);
 const [fields, setFields] = useState([]);

  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });
  

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
      setNotification({ isOpen: true, message: "Please select a category before saving.", type: "error" });
      return;

    }

    if (fields.some((field) => field.name.trim() === "")) {
      setNotification({ isOpen: true, message: "Field names cannot be empty.", type: "error" });
      return;
    }

    // Dispatch Redux action to save the category
    //dispatch(addCategory({ name: selectedCategory, fields }))
   

dispatch(addCategory({ name: selectedCategory, fields, createdBy: userEmail }))

    .unwrap()
    .then(() => {
      setNotification({ isOpen: true, message: "Category saved successfully!", type: "success" });
  
      // Delay navigation to allow the notification to appear
      setTimeout(() => {
        navigate("/logbookpage");
      }, 2000); // 2-second delay (adjust if needed)
    })
    .catch((error) => {
      setNotification({ isOpen: true, message: error, type: "error" });
    });
  
  };
  const handleDeleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index)); // Remove field at `index`
  };
  
  return (
    
    <div style={styles.container}>
      <Notification
      isOpen={notification.isOpen}
      onRequestClose={() => setNotification({ ...notification, isOpen: false })}
      title="Notification"
      message={notification.message}
      type={notification.type}
      />

      <h2>Add Category</h2>
      <p>Logbook categories help you organize your logbook.</p>

      <label>Logbook category *</label>
      <select
        style={styles.input}
        value={selectedCategory}
        //onChange={(e) => setSelectedCategory(e.target.value)}
        onChange={async (e) => {
          const category = e.target.value;
          setSelectedCategory(category);
      
          if (category) {
              //const response = await fetch(`http://localhost:5000/api/category/exists?name=${encodeURIComponent(category)}`);
              const response = await fetch(`http://localhost:5000/api/category/exists?name=${encodeURIComponent(category)}&email=${encodeURIComponent(userEmail)}`);

              const data = await response.json();
              setCategoryExists(data.exists);
          }
      }}
      
      >
        <option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {categoryExists ? (
    <p style={{ color: "red" }}>This category already exists!</p>
) : (
    <>
        <h3>Define Fields</h3>
        {fields.map((field, index) => (
  <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <input
      type="text"
      placeholder="Field Name"
      value={field.name}
      onChange={(e) => {
        const updatedFields = [...fields];
        updatedFields[index].name = e.target.value;
        setFields(updatedFields);
      }}
    />
    
    <select
      value={field.type}
      onChange={(e) => {
        const updatedFields = [...fields];
        updatedFields[index].type = e.target.value;
        setFields(updatedFields);
      }}
    >
      <option value="text">Text</option>
      <option value="number">Number</option>
      <option value="date">Date</option>
      <option value="file">File</option>
    </select>

    {/* ✅ Delete Button */}
    <button onClick={() => handleDeleteField(index)} style={{ color: "red", cursor: "pointer" }}>
      ❌ Delete
    </button>
  </div>
))}

    </>
)}

      <button style={styles.addButton} onClick={addField}>
        + Add Field
      </button>

      {/* Preview Dynamic Category Form */}
      {/* {selectedCategory && (
        <div style={styles.previewContainer}>
          <h3 style={{color: "black"}}>Preview: {selectedCategory}</h3>
          <DynamicCategoryForm categoryName={selectedCategory} fields={fields} />
        </div>
      )} */}

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
