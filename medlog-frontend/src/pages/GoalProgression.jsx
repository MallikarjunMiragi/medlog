import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const GoalProgression = () => {
  const student = useSelector((state) => state.auth.user);
  const [goals, setGoals] = useState([]);

useEffect(() => {
  const fetchTasks = async () => {
    try {
      if (student && student.specialty) {
        const response = await fetch(`http://localhost:5000/api/tasks?specialty=${student.specialty}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Backend error:", errorData);
          return;
        }
        
        const data = await response.json();
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          const formattedTasks = data.map((task) => ({
            title: task.title,
            description: task.description,
            priority: task.priority,
            targetDate: task.targetDate,
            department: task.department,
          }));

          setGoals(formattedTasks);
        } else {
          console.error("Unexpected response format:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  fetchTasks();
}, [student]);


  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Goal Progression</h1>

      {/* Add Goal Form */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">Add New Goal</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Goal Title</label>
            <input type="text" placeholder="e.g., Take 10 patient histories"
              className="w-full p-2 border border-gray-300 rounded-xl" />
          </div>

          <div>
            <label className="block font-medium mb-1">Department</label>
            <select className="w-full p-2 border border-gray-300 rounded-xl">
              <option>Neurology</option>
              <option>surgery</option>
              <option>Cardiology</option>
              <option>Orthopedics</option>
              <option>Radiology</option>
              <option>Pediatrics</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Target Date</label>
            <input type="date" className="w-full p-2 border border-gray-300 rounded-xl" />
          </div>

          <div>
            <label className="block font-medium mb-1">Priority</label>
            <select className="w-full p-2 border border-gray-300 rounded-xl">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea rows="3" className="w-full p-2 border border-gray-300 rounded-xl"
              placeholder="Optional description..."></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-xl">
              Add Goal
            </button>
          </div>
        </form>
      </div>

{/* Goal Table */}
<div className="mb-10">
  <h2 className="text-2xl font-semibold text-blue-700 text-center mb-4">Current Goals</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-center border border-gray-300">
      <thead className="bg-blue-700 text-white">
        <tr>
          <th className="py-2 px-4">Goal Title</th>
          <th className="py-2 px-4">Description</th>
          <th className="py-2 px-4">Priority</th>
          <th className="py-2 px-4">Target Date</th>
          <th className="py-2 px-4">Department</th>
        </tr>
      </thead>
      <tbody>
        {goals.length > 0 ? (
          goals.map((goal, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{goal.title}</td>
              <td className="py-2 px-4">{goal.description}</td>
              <td className="py-2 px-4">{goal.priority}</td>
              <td className="py-2 px-4">{new Date(goal.targetDate).toLocaleDateString()}</td>
              <td className="py-2 px-4">{goal.department}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="py-4 text-gray-500">No goals found for your specialty.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


      {/* Weekly Reflection */}
      <div>
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">Weekly Reflection</h2>
        <form className="grid gap-4">
          <div>
            <label className="block font-medium mb-1">Select Week</label>
            <select className="w-full p-2 border border-gray-300 rounded-xl">
              <option>Week 1</option>
              <option>Week 2</option>
              <option>Week 3</option>
              <option>Week 4</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Reflection</label>
            <textarea rows="4" className="w-full p-2 border border-gray-300 rounded-xl"
              placeholder="Write about what you learned or faced this week..."></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-xl">
              Submit Reflection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalProgression;
