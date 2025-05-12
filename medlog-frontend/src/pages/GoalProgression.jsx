import React, { useState } from 'react';

const GoalProgression = () => {
  const [goals, setGoals] = useState([
    {
      title: "Take 10 patient histories",
      department: "General Medicine",
      targetDate: "2025-04-20",
      status: "In Progress",
      progress: "60%",
    },
    {
      title: "Assist in 5 surgeries",
      department: "Surgery",
      targetDate: "2025-04-25",
      status: "Completed",
      progress: "100%",
    },
  ]);

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
              <option>Surgery</option>
              <option>Pediatrics</option>
              <option>General Medicine</option>
              <option>OBG</option>
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
                <th className="py-2 px-4">Department</th>
                <th className="py-2 px-4">Target Date</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Progress</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{goal.title}</td>
                  <td className="py-2 px-4">{goal.department}</td>
                  <td className="py-2 px-4">{goal.targetDate}</td>
                  <td className="py-2 px-4">{goal.status}</td>
                  <td className="py-2 px-4">{goal.progress}</td>
                </tr>
              ))}
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
