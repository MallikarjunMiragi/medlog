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

const DynamicCategoryForm = () => {
    const { category } = useParams();
    console.log("🔍 Category from useParams:", category);
    
    const categories = useSelector((state) => state.category.categories || []);
    const userEmail = useSelector((state) => state.auth.user?.email);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formData, setFormData] = useState({});
    const [fileInputs, setFileInputs] = useState({}); // Store file inputs separately

    useEffect(() => {
        if (!category) {
            console.error("❌ categoryName is undefined in URL.");
            return;
        }

        if (categories.length > 0) {
            const normalizedCategory = category.trim().toLowerCase();
            const foundCategory = categories.find(
                (c) => c.name?.trim().toLowerCase() === normalizedCategory
            );

            if (foundCategory) {
                console.log("✅ Found Category:", foundCategory);
                setSelectedCategory(foundCategory);

                // Initialize form fields
                const initialFormData = foundCategory.fields.reduce((acc, field) => {
                    acc[field.name] = field.type === "file" ? null : ""; // Leave file fields null
                    return acc;
                }, {});

                setFormData(initialFormData);
            } else {
                console.error("❌ Category not found:", category);
            }
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
            [fieldName]: e.target.files[0] // Store file separately
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedCategory || !selectedCategory._id) {
            console.error("❌ Category ID is missing!");
            alert("Category not found. Please select a valid category.");
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append("email", userEmail);
        formDataToSend.append("categoryId", selectedCategory._id);
        formDataToSend.append("name", formData["name"] || ""); // Ensure name is included
        
        // Append file only if selected
        if (fileInputs["file"]) {
            formDataToSend.append("file", fileInputs["file"]);
        }
        
        try {
            const response = await fetch("http://localhost:5000/api/logentry/add", {
                method: "POST",
                body: formDataToSend, // ✅ Correct way to send FormData
            });
        
            const result = await response.json();
            console.log("✅ Success:", result);
            alert("Entry submitted successfully!");
        } catch (error) {
            console.error("❌ Error submitting form:", error);
            alert("Failed to submit entry. Please try again.");
        }
        
    };

    if (categories.length === 0) return <p style={{color: "black"}}>Loading categories from database...</p>;
    if (!selectedCategory) return <p>❌ Category not found!</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>{selectedCategory.name} Form</h2>
            {selectedCategory.fields.map((field, index) => (
                <div key={index}>
                    <label>{field.name}</label>
                    
                    {/* Render input dynamically based on type */}
                    {field.type === "file" ? (
                        <input type="file" onChange={(e) => handleFileChange(e, field.name)} required />
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            required
                        />
                    )}
                </div>
            ))}

            <button type="submit">Submit</button>
        </form>
    );
};

export default DynamicCategoryForm;
