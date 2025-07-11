// // // // // // import React, { useState } from "react";
// // // // // // import { useNavigate } from "react-router-dom";

// // // // // // const AssignTaskPage = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const [taskTitle, setTaskTitle] = useState(""); // Task Title
// // // // // //   const [taskDescription, setTaskDescription] = useState(""); // Task Description
// // // // // //   const [dueDate, setDueDate] = useState(""); // Due Date
// // // // // //   const [priority, setPriority] = useState(""); // Priority
// // // // // //   const [department, setDepartment] = useState(""); // Department
// // // // // //   const [assignedBy, setAssignedBy] = useState(""); // Doctor's Email (assignedBy)

// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();

// // // // // //     const taskData = {
// // // // // //       title: taskTitle, // Matching with backend
// // // // // //       description: taskDescription, // Matching with backend
// // // // // //       priority, // Matching with backend
// // // // // //       targetDate: dueDate, // Matching with backend
// // // // // //       department, // Matching with backend
// // // // // //       assignedBy, // Doctor's email assignedBy
// // // // // //     };

// // // // // //     try {
// // // // // //       const response = await fetch("http://localhost:5001/api/assign-task", {

// // // // // //         method: "POST",
// // // // // //         headers: {
// // // // // //           "Content-Type": "application/json",
// // // // // //         },
// // // // // //         body: JSON.stringify(taskData),
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         navigate("/doctor-home");
// // // // // //       } else {
// // // // // //         alert("Failed to assign task");
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error:", error);
// // // // // //       alert("Error assigning task");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="container mx-auto p-4">
// // // // // //       <h2 className="text-xl font-bold mb-4">Assign Task to Department</h2>
// // // // // //       <form onSubmit={handleSubmit} className="space-y-4">
// // // // // //         <div>
// // // // // //           <label htmlFor="taskTitle" className="block">Task Title</label>
// // // // // //           <input
// // // // // //             type="text"
// // // // // //             id="taskTitle"
// // // // // //             value={taskTitle}
// // // // // //             onChange={(e) => setTaskTitle(e.target.value)}
// // // // // //             className="w-full p-2 border rounded"
// // // // // //             required
// // // // // //           />
// // // // // //         </div>

// // // // // //         <div>
// // // // // //           <label htmlFor="taskDescription" className="block">Description</label>
// // // // // //           <textarea
// // // // // //             id="taskDescription"
// // // // // //             value={taskDescription}
// // // // // //             onChange={(e) => setTaskDescription(e.target.value)}
// // // // // //             className="w-full p-2 border rounded"
// // // // // //           />
// // // // // //         </div>

// // // // // //         <div>
// // // // // //           <label htmlFor="dueDate" className="block">Due Date</label>
// // // // // //           <input
// // // // // //             type="date"
// // // // // //             id="dueDate"
// // // // // //             value={dueDate}
// // // // // //             onChange={(e) => setDueDate(e.target.value)}
// // // // // //             className="w-full p-2 border rounded"
// // // // // //             required
// // // // // //           />
// // // // // //         </div>

// // // // // //         <div>
// // // // // //           <label htmlFor="priority" className="block">Priority</label>
// // // // // //           <input
// // // // // //             type="text"
// // // // // //             id="priority"
// // // // // //             value={priority}
// // // // // //             onChange={(e) => setPriority(e.target.value)}
// // // // // //             className="w-full p-2 border rounded"
// // // // // //           />
// // // // // //         </div>

// // // // // //         <div>
// // // // // //           <label htmlFor="department" className="block">Department</label>
// // // // // //           <input
// // // // // //             type="text"
// // // // // //             id="department"
// // // // // //             value={department}
// // // // // //             onChange={(e) => setDepartment(e.target.value)}
// // // // // //             className="w-full p-2 border rounded"
// // // // // //           />
// // // // // //         </div>

// // // // // //         <div>
// // // // // //           <label htmlFor="assignedBy" className="block">Doctor's Email (assignedBy)</label>
// // // // // //           <input
// // // // // //             type="email"
// // // // // //             id="assignedBy"
// // // // // //             value={assignedBy}
// // // // // //             onChange={(e) => setAssignedBy(e.target.value)}
// // // // // //             className="w-full p-2 border rounded"
// // // // // //             required
// // // // // //           />
// // // // // //         </div>

// // // // // //         <button type="submit" className="mt-4 bg-teal-500 text-white py-2 px-4 rounded">
// // // // // //           Assign Task
// // // // // //         </button>
// // // // // //       </form>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default AssignTaskPage;
// // // // // import React, { useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // const AssignTaskPage = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const [taskTitle, setTaskTitle] = useState("");
// // // // //   const [taskDescription, setTaskDescription] = useState("");
// // // // //   const [dueDate, setDueDate] = useState("");
// // // // //   const [priority, setPriority] = useState("");
// // // // //   const [department, setDepartment] = useState("");
// // // // //   const [assignedBy, setAssignedBy] = useState("");

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();

// // // // //     const taskData = {
// // // // //       title: taskTitle,
// // // // //       description: taskDescription,
// // // // //       priority,
// // // // //       targetDate: dueDate,
// // // // //       department,
// // // // //       assignedBy,
// // // // //     };

// // // // //     try {
// // // // //       const response = await fetch("http://localhost:5001/api/assign-task", {
// // // // //         method: "POST",
// // // // //         headers: {
// // // // //           "Content-Type": "application/json",
// // // // //         },
// // // // //         body: JSON.stringify(taskData),
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         navigate("/doctor-home");
// // // // //       } else {
// // // // //         alert("Failed to assign task");
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error:", error);
// // // // //       alert("Error assigning task");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     // <div className="min-h-screen bg-gray-100 flex items-center justify-center">
// // // // //     //   <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
// // // // //      <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10">
// // // // //         <h2 className="text-2xl font-bold text-blue-600 mb-6">Assign Task to Department</h2>
// // // // //         <form onSubmit={handleSubmit} className="space-y-6">
// // // // //           <div>
// // // // //             <label htmlFor="taskTitle" className="block text-gray-700 font-semibold">Task Title</label>
// // // // //             <input
// // // // //               type="text"
// // // // //               id="taskTitle"
// // // // //               value={taskTitle}
// // // // //               onChange={(e) => setTaskTitle(e.target.value)}
// // // // //               className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // // // //               required
// // // // //             />
// // // // //           </div>

// // // // //           <div>
// // // // //             <label htmlFor="taskDescription" className="block text-gray-700 font-semibold">Description</label>
// // // // //             <textarea
// // // // //               id="taskDescription"
// // // // //               value={taskDescription}
// // // // //               onChange={(e) => setTaskDescription(e.target.value)}
// // // // //               className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // // // //             />
// // // // //           </div>

// // // // //           <div>
// // // // //             <label htmlFor="dueDate" className="block text-gray-700 font-semibold">Due Date</label>
// // // // //             <input
// // // // //               type="date"
// // // // //               id="dueDate"
// // // // //               value={dueDate}
// // // // //               onChange={(e) => setDueDate(e.target.value)}
// // // // //               className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // // // //               required
// // // // //             />
// // // // //           </div>

// // // // //           <div>
// // // // //             <label htmlFor="priority" className="block text-gray-700 font-semibold">Priority</label>
// // // // //             <select
// // // // //               id="priority"
// // // // //               value={priority}
// // // // //               onChange={(e) => setPriority(e.target.value)}
// // // // //               className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // // // //               required
// // // // //             >
// // // // //               <option value="">Select Priority</option>
// // // // //               <option value="Low">Low</option>
// // // // //               <option value="Medium">Medium</option>
// // // // //               <option value="High">High</option>
// // // // //             </select>
// // // // //           </div>

// // // // //           <div>
// // // // //             <label htmlFor="department" className="block text-gray-700 font-semibold">Department</label>
// // // // //             <select
// // // // //               id="department"
// // // // //               value={department}
// // // // //               onChange={(e) => setDepartment(e.target.value)}
// // // // //               className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // // // //               required
// // // // //             >
// // // // //               <option value="">Select Department</option>
// // // // //               <option value="Cardiology">Cardiology</option>
// // // // //               <option value="Neurology">Neurology</option>
// // // // //               <option value="Orthopedics">Orthopedics</option>
// // // // //               <option value="Radiology">Radiology</option>
// // // // //               <option value="Pediatrics">Pediatrics</option>
// // // // //             </select>
// // // // //           </div>

// // // // //           <div>
// // // // //             <label htmlFor="assignedBy" className="block text-gray-700 font-semibold">Doctor's Email (assignedBy)</label>
// // // // //             <input
// // // // //               type="email"
// // // // //               id="assignedBy"
// // // // //               value={assignedBy}
// // // // //               onChange={(e) => setAssignedBy(e.target.value)}
// // // // //               className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // // // //               required
// // // // //             />
// // // // //           </div>

// // // // //           <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
// // // // //             Assign Task
// // // // //           </button>
// // // // //         </form>
// // // // //       </div>
// // // // //     // </div>
// // // // //   );
// // // // // };

// // // // // export default AssignTaskPage;
// // // // import React, { useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { useSelector } from "react-redux";

// // // // const AssignTaskPage = () => {
// // // //   const navigate = useNavigate();

// // // //   // ✅ Get logged-in doctor from Redux
// // // //   const doctor = useSelector((state) => state.auth.user);

// // // //   const [taskTitle, setTaskTitle] = useState("");
// // // //   const [taskDescription, setTaskDescription] = useState("");
// // // //   const [dueDate, setDueDate] = useState("");
// // // //   const [priority, setPriority] = useState("");
// // // //   const [department, setDepartment] = useState("");

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();

// // // //     if (!doctor || doctor.role !== "doctor") {
// // // //       alert("Only doctors can assign tasks.");
// // // //       return;
// // // //     }

// // // //     const taskData = {
// // // //       title: taskTitle,
// // // //       description: taskDescription,
// // // //       priority,
// // // //       targetDate: dueDate,
// // // //       department,
// // // //       assignedBy: doctor.email, // ✅ Use the logged-in doctor's email
// // // //     };

// // // //     try {
// // // //       const response = await fetch("http://localhost:5001/api/assign-task", {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         body: JSON.stringify(taskData),
// // // //       });

// // // //       if (response.ok) {
// // // //         navigate("/doctor-home");
// // // //       } else {
// // // //         alert("Failed to assign task");
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error:", error);
// // // //       alert("Error assigning task");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10">
// // // //       <h2 className="text-2xl font-bold text-blue-600 mb-6">Assign Task to Department</h2>
// // // //       <form onSubmit={handleSubmit} className="space-y-6">
// // // //         <div>
// // // //           <label htmlFor="taskTitle" className="block text-gray-700 font-semibold">Task Title</label>
// // // //           <input
// // // //             type="text"
// // // //             id="taskTitle"
// // // //             value={taskTitle}
// // // //             onChange={(e) => setTaskTitle(e.target.value)}
// // // //             className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // // //             required
// // // //           />
// // // //         </div>

// // // //         <div>
// // // //           <label htmlFor="taskDescription" className="block text-gray-700 font-semibold">Description</label>
// // // //           <textarea
// // // //             id="taskDescription"
// // // //             value={taskDescription}
// // // //             onChange={(e) => setTaskDescription(e.target.value)}
// // // //             className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // // //           />
// // // //         </div>

// // // //         <div>
// // // //           <label htmlFor="dueDate" className="block text-gray-700 font-semibold">Due Date</label>
// // // //           <input
// // // //             type="date"
// // // //             id="dueDate"
// // // //             value={dueDate}
// // // //             onChange={(e) => setDueDate(e.target.value)}
// // // //             className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // // //             required
// // // //           />
// // // //         </div>

// // // //         <div>
// // // //           <label htmlFor="priority" className="block text-gray-700 font-semibold">Priority</label>
// // // //           <select
// // // //             id="priority"
// // // //             value={priority}
// // // //             onChange={(e) => setPriority(e.target.value)}
// // // //             className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // // //             required
// // // //           >
// // // //             <option value="">Select Priority</option>
// // // //             <option value="Low">Low</option>
// // // //             <option value="Medium">Medium</option>
// // // //             <option value="High">High</option>
// // // //           </select>
// // // //         </div>

// // // //         <div>
// // // //           <label htmlFor="department" className="block text-gray-700 font-semibold">Department</label>
// // // //           <select
// // // //             id="department"
// // // //             value={department}
// // // //             onChange={(e) => setDepartment(e.target.value)}
// // // //             className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // // //             required
// // // //           >
// // // //             <option value="">Select Department</option>
// // // //             <option value="Cardiology">Cardiology</option>
// // // //             <option value="Neurology">Neurology</option>
// // // //             <option value="Orthopedics">Orthopedics</option>
// // // //             <option value="Radiology">Radiology</option>
// // // //             <option value="Pediatrics">Pediatrics</option>
// // // //           </select>
// // // //         </div>

// // // //         <button
// // // //           type="submit"
// // // //           className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
// // // //         >
// // // //           Assign Task
// // // //         </button>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AssignTaskPage;
// // // import React, { useState } from "react"; 
// // // import { useSelector } from "react-redux";
// // // import Notification from "../components/Notification";

// // // const AssignTaskPage = () => {
// // //   const doctor = useSelector((state) => state.auth.user);

// // //   const [taskTitle, setTaskTitle] = useState("");
// // //   const [taskDescription, setTaskDescription] = useState("");
// // //   const [dueDate, setDueDate] = useState("");
// // //   const [priority, setPriority] = useState("");
// // //   const [department, setDepartment] = useState("");
// // //   const [notification, setNotification] = useState({ message: "", type: "" });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     if (!doctor || doctor.role !== "doctor") {
// // //       alert("Only doctors can assign tasks.");
// // //       return;
// // //     }

// // //     const taskData = {
// // //       title: taskTitle,
// // //       description: taskDescription,
// // //       priority,
// // //       targetDate: dueDate,
// // //       department,
// // //       assignedBy: doctor.email,
// // //     };

// // //     try {
// // //       const response = await fetch("http://localhost:5001/api/assign-task", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify(taskData),
// // //       });

// // //       if (response.ok) {
// // //         setNotification({ message: "Task assigned successfully!", type: "success" });
// // //         setTaskTitle("");
// // //         setTaskDescription("");
// // //         setDueDate("");
// // //         setPriority("");
// // //         setDepartment("");
// // //       } else {
// // //         setNotification({ message: "Failed to assign task.", type: "error" });
// // //       }
// // //     } catch (error) {
// // //       setNotification({ message: "Error assigning task", type: "error" });
// // //       console.error("Error:", error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10">
// // //       <h2 className="text-2xl font-bold text-blue-600 mb-6">Assign Task to Students</h2>
// // //       {notification.message && <Notification message={notification.message} type={notification.type} />}
// // //       <form onSubmit={handleSubmit} className="space-y-6">
// // //         <div>
// // //           <label htmlFor="taskTitle" className="block text-gray-700 font-semibold">Task Title</label>
// // //           <input
// // //             type="text"
// // //             id="taskTitle"
// // //             value={taskTitle}
// // //             onChange={(e) => setTaskTitle(e.target.value)}
// // //             className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // //             required
// // //           />
// // //         </div>

// // //         <div>
// // //           <label htmlFor="taskDescription" className="block text-gray-700 font-semibold">Description</label>
// // //           <textarea
// // //             id="taskDescription"
// // //             value={taskDescription}
// // //             onChange={(e) => setTaskDescription(e.target.value)}
// // //             className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // //           />
// // //         </div>

// // //         <div>
// // //           <label htmlFor="dueDate" className="block text-gray-700 font-semibold">Due Date</label>
// // //           <input
// // //             type="date"
// // //             id="dueDate"
// // //             value={dueDate}
// // //             onChange={(e) => setDueDate(e.target.value)}
// // //             className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // //             required
// // //           />
// // //         </div>

// // //         <div>
// // //           <label htmlFor="priority" className="block text-gray-700 font-semibold">Priority</label>
// // //           <select
// // //             id="priority"
// // //             value={priority}
// // //             onChange={(e) => setPriority(e.target.value)}
// // //             className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // //             required
// // //           >
// // //             <option value="">Select Priority</option>
// // //             <option value="Low">Low</option>
// // //             <option value="Medium">Medium</option>
// // //             <option value="High">High</option>
// // //           </select>
// // //         </div>

// // //         <div>
// // //           <label htmlFor="department" className="block text-gray-700 font-semibold">Department</label>
// // //           <select
// // //             id="department"
// // //             value={department}
// // //             onChange={(e) => setDepartment(e.target.value)}
// // //             className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
// // //             required
// // //           >
// // //             <option value="">Select Department</option>
// // //             <option value="Cardiology">Cardiology</option>
// // //             <option value="Neurology">Neurology</option>
// // //             <option value="Orthopedics">Orthopedics</option>
// // //             <option value="Radiology">Radiology</option>
// // //             <option value="Pediatrics">Pediatrics</option>
// // //           </select>
// // //         </div>

// // //         <button
// // //           type="submit"
// // //           className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
// // //         >
// // //           Assign Task
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default AssignTaskPage;
// // import React, { useState, useEffect } from "react";
// // import { useSelector } from "react-redux";
// // import Notification from "../components/Notification";

// // const AssignTaskPage = () => {
// //   const doctor = useSelector((state) => state.auth.user);

// //   const [taskTitle, setTaskTitle] = useState("");
// //   const [taskDescription, setTaskDescription] = useState("");
// //   const [dueDate, setDueDate] = useState("");
// //   const [priority, setPriority] = useState("");
// //   const [department, setDepartment] = useState("");
// //   const [notification, setNotification] = useState({ message: "", type: "" });
// //   const [showTasksPopup, setShowTasksPopup] = useState(false);
// //   const [assignedTasks, setAssignedTasks] = useState([]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!doctor || doctor.role !== "doctor") {
// //       alert("Only doctors can assign tasks.");
// //       return;
// //     }

// //     const taskData = {
// //       title: taskTitle,
// //       description: taskDescription,
// //       priority,
// //       targetDate: dueDate,
// //       department,
// //       assignedBy: doctor.email,
// //     };

// //     try {
// //       const response = await fetch("http://localhost:5001/api/assign-task", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(taskData),
// //       });

// //       if (response.ok) {
// //         setNotification({ message: "Task assigned successfully!", type: "success" });
// //         setTaskTitle("");
// //         setTaskDescription("");
// //         setDueDate("");
// //         setPriority("");
// //         setDepartment("");
// //         fetchTasks();
// //       } else {
// //         setNotification({ message: "Failed to assign task.", type: "error" });
// //       }
// //     } catch (error) {
// //       setNotification({ message: "Error assigning task", type: "error" });
// //       console.error("Error:", error);
// //     }
// //   };

// //   const fetchTasks = async () => {
// //     try {
// //       const response = await fetch(`http://localhost:5001/api/tasks/${doctor.email}`);
// //       const data = await response.json();
// //       setAssignedTasks(data);
// //     } catch (error) {
// //       console.error("Error fetching tasks:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (doctor) fetchTasks();
// //   }, [doctor]);

// //   const handlePopupClose = (e) => {
// //     if (e.target.id === "tasks-popup") setShowTasksPopup(false);
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10 relative">
// //       <button
// //         onClick={() => setShowTasksPopup(true)}
// //         className="absolute top-0 right-0 mt-4 mr-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
// //       >
// //         View Assigned Tasks
// //       </button>

// //       <h2 className="text-2xl font-bold text-blue-600 mb-6">Assign Task to Students</h2>
// //       {notification.message && <Notification message={notification.message} type={notification.type} />}
// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         <div>
// //           <label htmlFor="taskTitle" className="block text-gray-700 font-semibold">Task Title</label>
// //           <input type="text" id="taskTitle" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required />
// //         </div>
// //         <div>
// //           <label htmlFor="taskDescription" className="block text-gray-700 font-semibold">Description</label>
// //           <textarea id="taskDescription" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" />
// //         </div>
// //         <div>
// //           <label htmlFor="dueDate" className="block text-gray-700 font-semibold">Due Date</label>
// //           <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required />
// //         </div>
// //         <div>
// //           <label htmlFor="priority" className="block text-gray-700 font-semibold">Priority</label>
// //           <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required>
// //             <option value="">Select Priority</option>
// //             <option value="Low">Low</option>
// //             <option value="Medium">Medium</option>
// //             <option value="High">High</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label htmlFor="department" className="block text-gray-700 font-semibold">Department</label>
// //           <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required>
// //             <option value="">Select Department</option>
// //             <option value="Cardiology">Cardiology</option>
// //             <option value="Neurology">Neurology</option>
// //             <option value="Orthopedics">Orthopedics</option>
// //             <option value="Radiology">Radiology</option>
// //             <option value="Pediatrics">Pediatrics</option>
// //           </select>
// //         </div>
// //         <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Assign Task</button>
// //       </form>

// //       {showTasksPopup && (
// //         <div id="tasks-popup" onClick={handlePopupClose} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg shadow-xl p-6 w-96">
// //             <h3 className="text-xl font-semibold mb-4">Assigned Tasks</h3>
// //             {assignedTasks.map((task, index) => (
// //               <div key={index} className="mb-2 p-3 border rounded-lg">
// //                 <h4 className="font-semibold">{task.title}</h4>
// //                 <p>{task.description}</p>
// //                 <p className="text-sm text-gray-600">Due: {task.targetDate}</p>
// //               </div>
// //             ))}
// //             <button onClick={() => setShowTasksPopup(false)} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Close</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AssignTaskPage;
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Notification from "../components/Notification";

// const AssignTaskPage = () => {
//   const doctor = useSelector((state) => state.auth.user);

//   const [taskTitle, setTaskTitle] = useState("");
//   const [taskDescription, setTaskDescription] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("");
//   const [department, setDepartment] = useState("");
//   const [notification, setNotification] = useState({ message: "", type: "" });
//   const [showTasksPopup, setShowTasksPopup] = useState(false);
//   const [assignedTasks, setAssignedTasks] = useState([]);

//   // Fetch tasks assigned by the logged-in doctor
//   const fetchTasks = async () => {
//     try {
//       const response = await fetch(`http://localhost:5001/api/tasks?assignedBy=${doctor.email}`);
//       const data = await response.json();
//       setAssignedTasks(data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   // Fetch tasks on load if the user is a doctor
//   useEffect(() => {
//     if (doctor && doctor.role === "doctor") fetchTasks();
//   }, [doctor]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!doctor || doctor.role !== "doctor") {
//       alert("Only doctors can assign tasks.");
//       return;
//     }

//     const taskData = {
//       title: taskTitle,
//       description: taskDescription,
//       priority,
//       targetDate: dueDate,
//       department,
//       assignedBy: doctor.email,
//     };

//     try {
//       const response = await fetch("http://localhost:5001/api/assign-task", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(taskData),
//       });

//       if (response.ok) {
//         setNotification({ message: "Task assigned successfully!", type: "success" });
//         setTaskTitle("");
//         setTaskDescription("");
//         setDueDate("");
//         setPriority("");
//         setDepartment("");
//         fetchTasks();  // Refresh the tasks list
//       } else {
//         setNotification({ message: "Failed to assign task.", type: "error" });
//       }
//     } catch (error) {
//       setNotification({ message: "Error assigning task", type: "error" });
//       console.error("Error:", error);
//     }
//   };

//   // Handle popup close
//   const handlePopupClose = (e) => {
//     if (e.target.id === "tasks-popup") setShowTasksPopup(false);
//   };

//   // Format the date to a readable format
//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleDateString();
//     } catch (error) {
//       return "Invalid date";
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10 relative">
//       <button
//         onClick={() => setShowTasksPopup(true)}
//         className="absolute top-0 right-0 mt-4 mr-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
//       >
//         View Assigned Tasks
//       </button>

//       <h2 className="text-2xl font-bold text-blue-600 mb-6">Assign Task to Students</h2>
//       {notification.message && <Notification message={notification.message} type={notification.type} />}
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="taskTitle" className="block text-gray-700 font-semibold">Task Title</label>
//           <input type="text" id="taskTitle" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required />
//         </div>
//         <div>
//           <label htmlFor="taskDescription" className="block text-gray-700 font-semibold">Description</label>
//           <textarea id="taskDescription" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" />
//         </div>
//         <div>
//           <label htmlFor="dueDate" className="block text-gray-700 font-semibold">Due Date</label>
//           <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required />
//         </div>
//         <div>
//           <label htmlFor="priority" className="block text-gray-700 font-semibold">Priority</label>
//           <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required>
//             <option value="">Select Priority</option>
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="department" className="block text-gray-700 font-semibold">Department</label>
//           <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required>
//             <option value="">Select Department</option>
//             <option value="Cardiology">Cardiology</option>
//             <option value="Neurology">Neurology</option>
//             <option value="Orthopedics">Orthopedics</option>
//             <option value="Radiology">Radiology</option>
//             <option value="Pediatrics">Pediatrics</option>
//           </select>
//         </div>
//         <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Assign Task</button>
//       </form>

// {showTasksPopup && (
//   <div id="tasks-popup" onClick={handlePopupClose} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     {/* <div className="bg-white rounded-lg shadow-xl p-6 w-96"> */}
//     <div className="bg-white rounded-lg shadow-xl p-6 w-[1200px] max-h-[80vh] overflow-y-auto">

//       <h3 className="text-xl font-semibold mb-4">Assigned Tasks</h3>
//       {assignedTasks.length > 0 ? (
//          assignedTasks.map((task, index) => {
//           const targetDate = task.targetDate
//             ? new Date(task.targetDate.$date || task.targetDate).toLocaleDateString()
//             : "No Date";
//           const dateAssigned = task.dateAssigned
//             ? new Date(task.dateAssigned.$date || task.dateAssigned).toLocaleDateString()
//             : "No Date";

//           return (
//             <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-100">
//               <p><strong>Title:</strong> {task.title}</p>
//               <p><strong>Description:</strong> {task.description}</p>
//               <p><strong>Priority:</strong> {task.priority}</p>
//               <p><strong>Target Date:</strong> {targetDate}</p>
//               <p><strong>Department:</strong> {task.department}</p>
//               <p><strong>Assigned By:</strong> {task.assignedBy}</p>
//               <p><strong>Date Assigned:</strong> {dateAssigned}</p>
//             </div>
//           );
//         })
//       ) : (
//         <p>No tasks assigned yet.</p>
//       )}
//       <button onClick={() => setShowTasksPopup(false)} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Close</button>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default AssignTaskPage;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Notification from "../components/Notification";

const AssignTaskPage = () => {
  const doctor = useSelector((state) => state.auth.user);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [department, setDepartment] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showTasksPopup, setShowTasksPopup] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);

  // Fetch tasks assigned by the logged-in doctor
  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/tasks?assignedBy=${doctor.email}`);
      const data = await response.json();
      setAssignedTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks on load if the user is a doctor
  useEffect(() => {
    if (doctor && doctor.role === "doctor") fetchTasks();
  }, [doctor]);

// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctor || doctor.role !== "doctor") {
        alert("Only doctors can assign tasks.");
        return;
    }

    const taskData = {
        title: taskTitle,
        description: taskDescription,
        priority,
        targetDate: dueDate,
        department,
        assignedBy: doctor.email,
        specialty: doctor.specialty  // ✅ Use the specialty here
    };

    try {
        const response = await fetch("http://localhost:5001/api/assign-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            setNotification({ message: "Task assigned successfully!", type: "success" });
            setTaskTitle("");
            setTaskDescription("");
            setDueDate("");
            setPriority("");
            setDepartment("");
            fetchTasks();  // Refresh the tasks list
        } else {
            setNotification({ message: "Failed to assign task.", type: "error" });
        }
    } catch (error) {
        setNotification({ message: "Error assigning task", type: "error" });
        console.error("Error:", error);
    }
};

  // Handle popup close
  const handlePopupClose = (e) => {
    if (e.target.id === "tasks-popup") setShowTasksPopup(false);
  };

  // Format the date to a readable format
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10 relative">
      <button
        onClick={() => setShowTasksPopup(true)}
        className="absolute top-0 right-0 mt-4 mr-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        View Assigned Tasks
      </button>

      <h2 className="text-2xl font-bold text-blue-600 mb-6">Assign Task to Students</h2>
      {/* {notification.message && <Notification message={notification.message} type={notification.type} />} */}
      {notification.message && (
  <Notification 
    isOpen={!!notification.message} 
    onRequestClose={() => setNotification({ message: "", type: "" })} 
    message={notification.message} 
    type={notification.type} 
  />
)}

      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="taskTitle" className="block text-gray-700 font-semibold">Task Title</label>
          <input type="text" id="taskTitle" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="taskDescription" className="block text-gray-700 font-semibold">Description</label>
          <textarea id="taskDescription" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-gray-700 font-semibold">Due Date</label>
          <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="priority" className="block text-gray-700 font-semibold">Priority</label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required>
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="department" className="block text-gray-700 font-semibold">Department</label>
          <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500" required>
            <option value="">Select Department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Radiology">Radiology</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Assign Task</button>
      </form>

      {showTasksPopup && (
        <div id="tasks-popup" onClick={handlePopupClose} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[1200px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Assigned Tasks</h3>
            {assignedTasks.length > 0 ? (
              assignedTasks.map((task, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-100">
                  <p><strong>Title:</strong> {task.title}</p>
                  <p><strong>Description:</strong> {task.description}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <p><strong>Target Date:</strong> {formatDate(task.targetDate)}</p>
                  <p><strong>Department:</strong> {task.department}</p>
                  <p><strong>Assigned By:</strong> {task.assignedBy}</p>
                  <p><strong>Speciality:</strong> {task.specialty || "Not Available"}</p>
                </div>
              ))
            ) : (
              <p>No tasks assigned yet.</p>
            )}
            <button onClick={() => setShowTasksPopup(false)} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignTaskPage;
