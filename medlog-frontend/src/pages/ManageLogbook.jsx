
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialCategories = [
  { id: 1, name: "Admissions", icon: "🟠" },
  { id: 2, name: "CPD", icon: "🔵" },
  { id: 3, name: "POCUS", icon: "🟡" },
  { id: 4, name: "Procedures", icon: "🟢" },
];

const ManageLogbook = () => {
  const [categoryList, setCategoryList] = useState(initialCategories);
  const [editedCategories, setEditedCategories] = useState({});
  const navigate = useNavigate();

  // ✅ Load saved categories when component mounts
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const updatedCategories = [
      ...initialCategories,
      ...storedCategories.map((name, index) => ({
        id: initialCategories.length + index + 1,
        name,
        icon: "🟣", // Default icon for new categories
      })),
    ];
    setCategoryList(updatedCategories);
  }, []);

  const handleDelete = (id, e) => {
    e.stopPropagation();
  
    // Find the category name before deleting
    const categoryToDelete = categoryList.find((category) => category.id === id)?.name;
  
    // Remove from state
    const updatedList = categoryList.filter((category) => category.id !== id);
    setCategoryList(updatedList);
  
    // ✅ Remove from localStorage
    if (categoryToDelete) {
      const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
      const filteredCategories = storedCategories.filter((cat) => cat !== categoryToDelete);
      localStorage.setItem("categories", JSON.stringify(filteredCategories));
    }
  };
  

  const handleEdit = (id, newName) => {
    setEditedCategories({ ...editedCategories, [id]: newName });
  };

  const handleSave = (id, e) => {
    e.stopPropagation();
    setCategoryList(
      categoryList.map((category) =>
        category.id === id ? { ...category, name: editedCategories[id] || category.name } : category
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2>Manage logbook categories</h2>
      <p>
        You can change the name of a category and also delete the category if you no longer require it.
        Categories that have existing logbook entries will not be able to be removed until their log entries
        have been removed.
      </p>
      <button style={styles.addButton} onClick={() => navigate("/add-category")}>
        Add additional category
      </button>
      <div style={styles.categoryList}>
        {categoryList.map((category) => (
          <div key={category.id} style={styles.categoryItem}>
            <span style={styles.icon}>{category.icon}</span>
            <input
              type="text"
              value={editedCategories[category.id] ?? category.name}
              onChange={(e) => handleEdit(category.id, e.target.value)}
              style={styles.input}
            />
            <button style={{ ...styles.button, ...styles.saveButton }} onClick={(e) => handleSave(category.id, e)}>
              ✔️
            </button>
            <button style={{ ...styles.button, ...styles.deleteButton }} onClick={(e) => handleDelete(category.id, e)}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ Keeping your original styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  addButton: {
    display: "block",
    marginBottom: "15px",
    padding: "8px 12px",
    fontSize: "14px",
    cursor: "pointer",
  },
  categoryList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  categoryItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    minWidth: "400px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  icon: {
    fontSize: "22px",
  },
  input: {
    flexGrow: 1,
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    fontSize: "14px",
    padding: "5px 8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "transparent",
  },
  saveButton: {
    right: "40px",
  },
  deleteButton: {
    right: "10px",
  },
};

export default ManageLogbook;
