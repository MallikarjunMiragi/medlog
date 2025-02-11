import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GeneratedForm = () => {
  const { category } = useParams(); // Get category name from URL
  const [fields, setFields] = useState([]);

  useEffect(() => {
    // ✅ Retrieve stored fields for this category
    const storedForms = JSON.parse(localStorage.getItem("formFields")) || {};
    if (storedForms[category]) {
      setFields(storedForms[category]);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div style={styles.container}>
      <h2>{category} Form</h2>
      <form onSubmit={handleSubmit}>
        {fields.length > 0 ? (
          fields.map((field, index) => (
            <div key={index} style={styles.fieldContainer}>
              <label>{field.name}</label>
              {field.type === "text" && <input type="text" style={styles.input} />}
              {field.type === "number" && <input type="number" style={styles.input} />}
              {field.type === "date" && <input type="date" style={styles.input} />}
              {field.type === "file" && <input type="file" style={styles.input} />}
            </div>
          ))
        ) : (
          <p>No fields available for this category.</p>
        )}

        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

// ✅ Basic styles
const styles = {
  container: { padding: "20px", maxWidth: "500px", margin: "0 auto", textAlign: "center" },
  fieldContainer: { marginBottom: "15px" },
  input: { width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  submitButton: { padding: "10px 15px", background: "teal", color: "white", cursor: "pointer" },
};

export default GeneratedForm;
