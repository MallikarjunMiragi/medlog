

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import Notification from "../Components/Notification";

const DynamicCategoryForm = () => {
    const { category } = useParams();
    console.log("🔍 Category from useParams:", category);

    const categories = useSelector((state) => state.category.categories || []);
    const userEmail = useSelector((state) => state.auth.user?.email);
const [customFields, setCustomFields] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formData, setFormData] = useState({});
    const [fileInputs, setFileInputs] = useState({});
    const [notification, setNotification] = useState({ isOpen: false, message: "", type: "info" });
// Dropdown options map
const dropdownOptions = {
  Admissions: {
    Location: ["A & E Major", "A & E Minor", "A & E Paediatric", "A & E Resus", "AAU", "Acute Medical Unit", "Admitted from clinic", "Ambulance Bay", "Ambulatory Majors Area", "CDU", "Coronary Care Unit", "Emergency Assessment Unit", "High Dependency Unit", "Intensive Care Unit", "Medical Ward", "Rapid Assessment Triage", "Respiratory Care Unit", "Ward Referral"],
    "Referral Source": ["Ambulance Re Alert", "Emergency Department", "ENT", "GP Referral", "High Dependency Unit", "In Patient Unit", "Intensive Care Unit", "Medical Specialty", "Obstetrics and Gynaecology", "Other Hospital", "Surgery"],
    Role: ["Clerked", "Reviewed"],
    Gender: ["Male", "Female", "Other"],
    Specialty: ["Alcohol and Drug Intoxication", "Allergy", "Andrology", "Audiological Medicine", "Cardiology", "Cardiothoracic Surgery", "Clinical Genetics", "Clinical Neurophysiology", "Clinical Nutrition", "Clinical Oncology", "Clinical Pharmacology and Therapeutics", "Clinical Rotation 1 (HOGCR1)", "Dentistry", "Dermatology", "Diagnostic Radiology", "Emergency Medicine", "Endocrinology & Diabetes Mellitus", "Family Medicine", "Forensic Medicine and Medicolegal", "Gastroenterology", "General Internal Medicine", "General Practice"],
    Outcome: ["Admitted", "Coronary Care Unit", "Discharged", "Died", "High Dependency Unit", "Intensive Care", "Other Specialty Unit", "Referred On", "Theatre", "Ward Care"],
  },
  CPD: {
    "Type of CPD Activity": ["Abstract Presented", "Conference Attended", "Conference Organized", "Examiner", "Lecture Attended", "Lecture Given", "Presentation Given", "Publication", "Seminar Given", "Training Event Attended", "Examination", "Course Attended", "Departmental Teaching", "E-learning Completed", "Simulation Teaching Attended", "Study Leave", "Training Day", "Audit Completed", "Audit Presentation", "Clinical Governance Day", "Other Literature", "Podcast", "Reflective Practice", "Taster Day Attended", "Postgraduate Teaching Delivered", "Postgraduate Teaching Organized", "Postgraduate Teaching Planned", "Simulation Teaching Delivered", "Simulation Teaching Organized", "Teaching Feedback Received", "Teaching Feedback Organized", "Undergraduate Teaching Delivered", "Undergraduate Teaching Organized", "Undergraduate Teaching Planned"]
  },
  POCUS: {
    "Site/Type": ["Abdominal Aortic Aneurysm", "Arterial Ultrasound", "Deep Venous Thrombosis Ultrasound", "Early Pregnancy Ultrasound", "Focused Assessment with Sonography for Pneumonia", "Focused Assessment with Sonography in Trauma", "Focused Cardiac Ultrasound", "Hepatobiliary Ultrasound", "Joint Injections", "Lung Ultrasound", "Muscle and Tendon Ultrasound", "Nerve Blocks", "Ocular Ultrasound", "Other Abdominal", "Pericardiocentesis", "Peripheral", "Pleural Ultrasound", "Pulmonary", "Renal Ultrasound", "Resuscitation", "Skin and Subcutaneous Tissue Ultrasound", "Soft Tissue Ultrasound", "Testicular Ultrasound", "Transabdominal Pelvic Ultrasound", "Ultrasound Guided Procedures"],
    Supervision: ["Observed", "Performed (Independent)", "Performed (Supervised)"],
    Gender: ["Male", "Female", "Other"]
  },
  Procedures: {
    Procedure: ["Joint Aspiration", "Joint Injection", "Talc Pleurodesis", "Spirometry", "Selinger Pleural Drain", "Pleural Ultrasound", "Pleural Decompression", "Pleural Aspiration", "Pigtail Pleural Drain", "Peak Flow", "Argyll Pleural Drain", "Lumbar Puncture", "Pap Smear", "Phlebotomy", "Suprapubic Catheter Change", "Three-Way Catheter Insertion", "Urinary Catheterisation", "Venous Cannulation", "ABG Sampling", "ABG Sampling with Ultrasound Guidance", "Arterial Line Insertion", "Blood Cultures from Peripheral Site", "Brainstem Death Testing", "Central Venous Access"],
    Supervision: ["Assisted", "Assisting", "First Operator", "Independent", "Observed", "Second Operator", "Supervised", "Supervising"],
    Gender: ["Female", "Male", "Other"]
  }
};
const addCustomField = () => {
  setCustomFields([...customFields, { name: "", type: "text" }]);
};

const updateCustomField = (index, key, value) => {
  const updated = [...customFields];
  updated[index][key] = value;
  setCustomFields(updated);
};

const deleteCustomField = (index) => {
  setCustomFields(customFields.filter((_, i) => i !== index));
};

    useEffect(() => {
        if (!category) {
            console.error("❌ categoryName is undefined in URL.");
            return;
        }

        if (!categories.length) {
            console.warn("⚠️ Categories are not loaded yet!");
            return;
        }

        console.log("🔍 Available categories:", categories);

        const normalizedCategory = category.trim().toLowerCase();
        const foundCategory = categories.find((c) => c.name?.trim().toLowerCase() === normalizedCategory);

        if (foundCategory) {
            console.log("✅ Found Category:", foundCategory);

            // Ensure _id exists
            const updatedCategory = { ...foundCategory, _id: foundCategory.id || foundCategory._id };
            console.log("🛠 Selected Category:", updatedCategory);

            setSelectedCategory(updatedCategory);

            // Initialize form data with default values
            const initialFormData = updatedCategory.fields.reduce((acc, field) => {
                acc[field.name] = field.type === "file" ? null : "";
                return acc;
            }, {});

            initialFormData.categoryId = updatedCategory._id; // Ensure categoryId is included
            setFormData(initialFormData);
        } else {
            console.error("❌ Category not found in Redux store:", category);
        }
    }, [categories, category]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e, fieldName) => {
        setFileInputs({
            ...fileInputs,
            [fieldName]: e.target.files[0]
        });
    };

    console.log("🛠 Selected Category:", JSON.stringify(selectedCategory, null, 2));

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!userEmail) {
            console.error("❌ Email is missing! Ensure the user is logged in.");
            setNotification({ isOpen: true, message: "You must be logged in to submit an entry.", type: "error" });
            return;
        }

        if (!selectedCategory || !selectedCategory._id) {
            console.error("❌ Category ID is missing!");
            setNotification({ isOpen: true, message: "Category not found.", type: "error" });
            return;
        }

        console.log("🔹 Submitting log entry with Category ID:", selectedCategory._id);

        const formDataToSend = new FormData();
        formDataToSend.append("email", userEmail);
        formDataToSend.append("categoryId", selectedCategory._id);

        // Append text fields
        Object.entries(formData).forEach(([key, value]) => {
            if (!fileInputs[key]) {
                formDataToSend.append(key, value || "");
            }
        });

        // Append file fields separately
        Object.entries(fileInputs).forEach(([key, value]) => {
            if (value) {
                formDataToSend.append(key, value);
            }
        });

        try {
            const response = await axios.post("http://localhost:5000/api/logentry/add", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) {
                console.log("✅ Entry saved successfully:", response.data);
                setNotification({ isOpen: true, message: "Log entry submitted successfully!", type: "success" });

                // Reset form after successful submission
                setFormData({});
                setFileInputs({});
            } else {
                console.error("❌ Unexpected response:", response);
                setNotification({ isOpen: true, message: "Something went wrong. Try again.", type: "error" });
            }
        } catch (error) {
            console.error("❌ Error saving entry:", error.response?.data || error.message);
            const errorMessage = error.response?.data?.error || "Failed to save entry. Please try again.";
            setNotification({ isOpen: true, message: errorMessage, type: "error" });
        }
    };

    if (!categories.length) return <p style={{ color: "black" }}>Loading categories from database...</p>;
    if (!selectedCategory) return <p>❌ Category not found!</p>;

    return (
        <form onSubmit={handleSubmit} className="text-white font-semibold">
           
            <h2 className="text-2xl font-bold text-center mb-6">{selectedCategory.name} Form</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{selectedCategory.fields.map((field, index) => {
  const options =
    dropdownOptions[selectedCategory.name]?.[field.name] || null;

  return (
    <div
      key={index}
      className="[&_input]:placeholder:text-gray-300 [&_input]:w-full [&_input]:p-3 [&_input]:rounded-md [&_input]:bg-white/20"
    >
      <label className="mb-1 block text-white">{field.name}</label>
      {/* {field.type === "file" ? (
        <input
          type="file"
          onChange={(e) => handleFileChange(e, field.name)}
          required
        />
      ) : options ? (
<select
  name={field.name}
  value={formData[field.name] || ""}
  onChange={handleChange}
  required
  className="w-full p-3 rounded-md bg-white/20 text-white placeholder:text-gray-300"
>

          <option value="">Select {field.name}</option>
          {options.map((option, idx) => (
  <option
    key={idx}
    value={option}
    style={{ color: "black", backgroundColor: "white" }}
  >
    {option}
  </option>
))}

        </select>
      ) : (
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required
          className="text-black"
        />
      )}
    </div>
  );
})}


</div>
<h3 className="mt-6 mb-2 font-semibold text-white">Custom Fields</h3>
{customFields.map((field, index) => (
  <div key={index} className="flex items-center gap-2 mb-2">
    <input
      type="text"
      placeholder="Field Name"
      value={field.name}
      onChange={(e) => updateCustomField(index, "name", e.target.value)}
      className="flex-1 p-2 rounded-md bg-white/20 text-white placeholder-gray-300"
    />
    <select
      value={field.type}
      onChange={(e) => updateCustomField(index, "type", e.target.value)}
      className="p-2 rounded-md bg-white/20 text-gray-300 border border-gray-300"
    >
      <option value="text">Text</option>
      <option value="number">Number</option>
      <option value="date">Date</option>
      <option value="file">File</option>
    </select>
    <button
      onClick={() => deleteCustomField(index)}
      className="text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  </div>
))}
<button
  onClick={addCustomField}
  className="w-full my-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
>
  + Add Field
</button>

           <button
  type="submit"
  className="w-full p-3 mt-4 bg-[#008080] rounded-md cursor-pointer transition delay-300 hover:bg-[#015b5b]"
>
  Submit
</button>

            <Notification
                isOpen={notification.isOpen}
                onRequestClose={() => setNotification({ ...notification, isOpen: false })}
                title="Notification"
                message={notification.message}
                type={notification.type}
            />
        </form> */}
    {field.type === "file" ? (
  <>
    <input
      type="file"
      name={field.name}
      onChange={(e) => handleFileChange(e, field.name)}
      className="text-black w-full p-3 rounded-md bg-white/20"
    />
    <input
      type="text"
      placeholder="Title (required)"
      name={`${field.name}_title`}
      onChange={handleChange}
      value={formData[`${field.name}_title`] || ""}
      required
      className="text-black w-full p-3 rounded-md bg-white/20 mt-2"
    />
    <input
      type="text"
      placeholder="Description (required)"
      name={`${field.name}_description`}
      onChange={handleChange}
      value={formData[`${field.name}_description`] || ""}
      required
      className="text-black w-full p-3 rounded-md bg-white/20 mt-2"
    />
  </>
) : options ? (
  <select
    name={field.name}
    value={formData[field.name] || ""}
    onChange={handleChange}
    className="text-black w-full p-3 rounded-md bg-white/20"
  >
    <option value="">Select {field.name}</option>
    {options.map((option, idx) => (
      <option key={idx} value={option}>
        {option}
      </option>
    ))}
  </select>
) : (
  <input
    type={field.type}
    name={field.name}
    value={formData[field.name] || ""}
    onChange={handleChange}
    placeholder={`Enter ${field.name}`}
  />
)}
    </div>
  );
})}
</div>

{/* Custom Fields Section */}
<div className="mt-6">
  <h3 className="text-xl mb-2">Custom Fields</h3>
  {customFields.map((field, index) => (
    <div key={index} className="mb-4">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={field.name}
          placeholder="Field Name"
          onChange={(e) => updateCustomField(index, "name", e.target.value)}
          className="text-black w-full p-3 rounded-md bg-white/20"
        />
        <select
          value={field.type}
          onChange={(e) => updateCustomField(index, "type", e.target.value)}
          className="text-black w-full p-3 rounded-md bg-white/20"
        >
          <option value="text">Text</option>
          <option value="file">File</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>

              <button
        type="button"
        onClick={() => deleteCustomField(index)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
      >
        Remove
      </button>
      </div>
{field.type === "file" ? (
  <input
    type="file"
    name={field.name}
    onChange={(e) => handleFileChange(e, field.name)}
     className="text-black w-full p-3 rounded-md bg-white/20"

  />
) : (
  <input
    type={
      field.type === "number"
        ? "number"
        : field.type === "date"
        ? "date"
        : "text"
    }
    name={field.name}
    value={formData[field.name] || ""}
    onChange={handleChange}
    placeholder={`Enter ${field.name}`}
    className="text-black w-full p-3 rounded-md bg-white/20"
  />
)}


    </div>
  ))}
  <button
    type="button"
    onClick={addCustomField}
    className="bg-green-500 px-4 py-2 mt-2 rounded"
  >
    Add Custom Field
  </button>
</div>

<button
  type="submit"
  className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-bold"
>
  Submit
</button>

{/* Notification Component
{notification.isOpen && (
  <Notification message={notification.message} type={notification.type} />
)} */}
<Notification
      isOpen={notification.isOpen}
      onRequestClose={() => setNotification({ ...notification, isOpen: false })}
      title="Notification"
      message={notification.message}
      type={notification.type}
    />
</form>
    )
};

export default DynamicCategoryForm;

