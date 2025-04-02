import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../Components/Notification";

const ManageLogbook = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [editedCategories, setEditedCategories] = useState({});
  const [notification, setNotification] = useState({ isOpen: false, title: "", message: "", type: "info" });
  const navigate = useNavigate();

  // ✅ Fetch categories from backend instead of localStorage
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category/all");
        setCategoryList(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Delete category from backend
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    setNotification({ isOpen: true, title: "Info", message: `Deleting category with ID: ${id}`, type: "info" }); 
  
    try {
      const response = await axios.delete(`http://localhost:5000/api/category/delete/${id}`);
      console.log("Delete response:", response.data);
      setNotification({ isOpen: true, title: "Success", message: "Category deleted successfully!", type: "success" });
      
      // Remove category from the state
      setCategoryList(categoryList.filter((category) => category._id !== id));
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to delete category. Please try again.";
      setNotification({ isOpen: true, title: "Error", message: errorMessage, type: "error" });
    }
  };
  

  // ✅ Update category name in frontend state
  const handleEdit = (id, newName) => {
    setEditedCategories({ ...editedCategories, [id]: newName });
  };

  // ✅ Save updated category name to backend
  const handleSave = async (id, e) => {
    e.stopPropagation();
    try {
      const updatedName = editedCategories[id];
      await axios.put(`http://localhost:5000/api/category/update/${id}`, { name: updatedName });
      setCategoryList(
        categoryList.map((category) =>
          category._id === id ? { ...category, name: updatedName } : category
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Manage logbook categories</h2>
      <p>
        You can change the name of a category and delete categories you no longer require.
      </p>
      <button style={styles.addButton} onClick={() => navigate("/add-category")}>
        Add additional category
      </button>
      <div style={styles.categoryList}>
        {categoryList.map((category) => (
          <div key={category._id} style={styles.categoryItem}>
            <input
              type="text"
              value={editedCategories[category._id] ?? category.name}
              onChange={(e) => handleEdit(category._id, e.target.value)}
              style={styles.input}
            />
            <button style={{ ...styles.button, ...styles.saveButton }} onClick={(e) => handleSave(category._id, e)}>
              ✔️
            </button>
            <button style={{ ...styles.button, ...styles.deleteButton }} onClick={(e) => handleDelete(category._id, e)}>
              🗑️
            </button>
          </div>
        ))}
      </div>

       {/* Notification Modal */}
            <Notification
              isOpen={notification.isOpen}
              onRequestClose={() => setNotification({ ...notification, isOpen: false })}
              title={notification.title}
              message={notification.message}
              type={notification.type}
            />
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
