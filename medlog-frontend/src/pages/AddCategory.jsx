import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../reducers/categoryReducer";
import Notification from "../Components/Notification";

const categories = [
   "Bone Marrow Reporting", "Clinical Events", "Clinics", 
  "CUSIC", "General Surgery", "Echocardiograms", "Multi-Disciplinary Team Meetings",
  "O & G Ultrasound",  "Radiology Reporting", "Research",
  "Thoracic Ultrasound", "Ward Rounds"
];

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth?.user?.email);
  const savedCategories = useSelector((state) => state.categories);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryExists, setCategoryExists] = useState(false);
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

    dispatch(addCategory({ name: selectedCategory, fields, createdBy: userEmail }))
      .unwrap()
      .then(() => {
        setNotification({ isOpen: true, message: "Category saved successfully!", type: "success" });
        setTimeout(() => {
          navigate("/logbookpage");
        }, 2000);
      })
      .catch((error) => {
        setNotification({ isOpen: true, message: error, type: "error" });
      });
  };

  const handleDeleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <Notification
        isOpen={notification.isOpen}
        onRequestClose={() => setNotification({ ...notification, isOpen: false })}
        title="Notification"
        message={notification.message}
        type={notification.type}
      />

      <h2 className="text-lg font-semibold">Add Category</h2>
      <p className="mb-4">Logbook categories help you organize your logbook.</p>

      <label className="block mb-2 font-bold">Logbook category *</label>
      <select
        className="w-full p-3 mb-4 rounded-md border border-gray-300 text-gray-300 bg-white/20"
        value={selectedCategory}
        onChange={async (e) => {
          const category = e.target.value;
          setSelectedCategory(category);

          if (category) {
            const response = await fetch(`http://localhost:5001/api/category/exists?name=${encodeURIComponent(category)}&email=${encodeURIComponent(userEmail)}`);
            const data = await response.json();
            setCategoryExists(data.exists);
          }
        }}
      >
        <option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category} className="bg-gray-700">
            {category}
          </option>
        ))}
      </select>

      {categoryExists ? (
        <p className="text-red-500">This category already exists!</p>
      ) : (
        <>
          <h3 className="mt-4 mb-2 font-semibold">Define Fields</h3>
          {fields.map((field, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Field Name"
                value={field.name}
                onChange={(e) => updateField(index, "name", e.target.value)}
                className="flex-1 p-2 rounded-md bg-white/20 text-white placeholder-gray-300"
              />
              <select
                value={field.type}
                onChange={(e) => updateField(index, "type", e.target.value)}
                className="p-2 rounded-md bg-gray-800 text-gray-300 border border-gray-300"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="file">File</option>
              </select>
              <button onClick={() => handleDeleteField(index)} className="text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
          ))}
        </>
      )}

      <button
        onClick={addField}
        className="w-full my-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        + Add Field
      </button>

      <div className="flex justify-between gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-1/2 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="w-1/2 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
