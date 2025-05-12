// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const DynamicCategoryForm = () => {
//     const { category } = useParams();
//     const categories = useSelector((state) => state.category.categories || []);
//     const userEmail = useSelector((state) => state.auth.user?.email); // ✅ Ensure email is correctly retrieved

//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [formData, setFormData] = useState({});

//     useEffect(() => {
//         if (!category) {
//             console.error("❌ categoryName is undefined.");
//             return;
//         }

//         if (categories.length > 0) {
//             const normalizedCategory = category?.trim().toLowerCase();
//             const foundCategory = categories.find(
//                 (c) => c.name?.trim().toLowerCase() === normalizedCategory
//             );

//             if (foundCategory) {
//                 setSelectedCategory(foundCategory);

//                 // Initialize form data
//                 const initialFormData = {};
//                 foundCategory.fields.forEach(field => {
//                     initialFormData[field.name] = "";
//                 });
//                 setFormData(initialFormData);
//             }
//         }
//     }, [categories, category]);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });  
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         // ✅ Ensure email is retrieved correctly
//         if (!userEmail) {
//             console.error("❌ Email is missing! Make sure the user is logged in.");
//             alert("You must be logged in to submit an entry.");
//             return;
//         }

//         if (!selectedCategory?._id) {
//             console.error("❌ Category ID is missing!");
//             alert("Category not found.");
//             return;
//         }

//         // Normalize form data field names
//         const normalizedData = {};
//         Object.keys(formData).forEach(key => {
//             const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
//             normalizedData[normalizedKey] = formData[key];
//         });

//         console.log("✅ Submitting Data:", normalizedData);
//         console.log("✅ Category ID:", selectedCategory._id);
//         console.log("✅ Email:", userEmail);

//         try {
//             const response = await axios.post("http://localhost:5000/api/logentry/add", {
//                 email: userEmail,  // ✅ Use `userEmail` instead of undefined `email`
//                 categoryId: selectedCategory._id,
//                 data: normalizedData
//             });

//             console.log("✅ Entry saved successfully:", response.data);
//             alert("Log entry submitted successfully!");
//         } catch (error) {
//             console.error("❌ Error saving entry:", error.response?.data || error.message);
//             alert("Failed to save entry. Please try again.");
//         }
//     };

//     if (categories.length === 0) return <p>Loading categories from database...</p>;
//     if (!selectedCategory) return <p>Category not found!</p>;

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>{selectedCategory.name} Form</h2>
//             {selectedCategory.fields.map((field, index) => (
//                 <div key={index}>
//                     <label>{field.name}</label>
//                     <input
//                         type={field.type}
//                         name={field.name}
//                         value={formData[field.name] || ""}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//             ))}
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default DynamicCategoryForm;




// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const DynamicCategoryForm = () => {
//     const { category } = useParams();
//     console.log("🔍 Category from useParams:", category);
//     const [selectedFile, setSelectedFile] = useState(null); // ✅ Store selected file

//     const categories = useSelector((state) => state.category.categories || []);
//     const userEmail = useSelector((state) => state.auth.user?.email);

//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [formData, setFormData] = useState({});
//     useEffect(() => {
//         if (!category) {
//             console.error("❌ categoryName is undefined in URL.");
//             return;
//         }
    
//         if (categories.length > 0) {
//             const normalizedCategory = category.trim().toLowerCase();
//             const foundCategory = categories.find(
//                 (c) => c.name?.trim().toLowerCase() === normalizedCategory
//             );
    
//             if (foundCategory) {
//                 console.log("✅ Found Category:", foundCategory);
//                 setSelectedCategory(foundCategory); // ✅ Ensure category is set
    
//                 // Initialize form fields
//                 const initialFormData = foundCategory.fields.reduce((acc, field) => {
//                     acc[field.name] = ""; // Default to empty values
//                     return acc;
//                 }, {});
    
//                 setFormData(initialFormData);
//             } else {
//                 console.error("❌ Category not found:", category);
//             }
//         }
//     }, [categories, category]);
    

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
    
//         if (!selectedCategory || !selectedCategory._id) {
//             console.error("❌ Category ID is missing!");
//             alert("Category not found. Please select a valid category.");
//             return;
//         }
    
//         const formData = new FormData();
//         formData.append("email", userEmail);
//         formData.append("categoryId", selectedCategory._id); // ✅ Use selectedCategory._id
//         formData.append("name", formData.name); // Ensure name is passed
//         formData.append("file", selectedFile); 
    
//         try {
//             const response = await fetch("http://localhost:5000/api/logentry/add", {
//                 method: "POST",
//                 body: formData, // ✅ Send as multipart/form-data
//             });
    
//             const result = await response.json();
//             console.log("✅ Success:", result);
//             alert("Entry submitted successfully!");
//         } catch (error) {
//             console.error("❌ Error submitting form:", error);
//             alert("Failed to submit entry. Please try again.");
//         }
//     };
    
      
//       const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]); // ✅ Store the actual file, not just the path
//       };
      

//     if (categories.length === 0) return <p style={{color: "black"}}>Loading categories from database...</p>;
//     if (!selectedCategory) return <p>❌ Category not found!</p>;

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>{selectedCategory.name} Form</h2>
//             {selectedCategory.fields.map((field, index) => (
//                 <div key={index}>
//                     <label>{field.name}</label>
//                     <input
//                         type={field.type}
//                         name={field.name}
//                         value={formData[field.name] || ""}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//             ))}
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default DynamicCategoryForm;


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
      {field.type === "file" ? (
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
        </form>
    );
};

export default DynamicCategoryForm;

