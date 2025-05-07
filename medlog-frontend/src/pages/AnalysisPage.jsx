// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// import { LineChart, Line } from "recharts";
// import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

// // Dummy data for entries
// const dummyEntries = [
//   { id: 1, category: "Admissions", score: 80, date: "2025-05-01" },
//   { id: 2, category: "CPD", score: 70, date: "2025-04-02" },
//   { id: 3, category: "POCUS", score: 90, date: "2025-04-05" },
//   { id: 4, category: "Procedures", score: 75, date: "2025-05-07" },
//   { id: 5, category: "Admissions", score: 85, date: "2025-04-10" },
//   { id: 6, category: "Procedures", score: 80, date: "2025-06-15" },
//   { id: 7, category: "CPD", score: 65, date: "2025-04-18" },
//   { id: 8, category: "Admissions", score: 90, date: "2025-07-20" },
// ];
// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
// // Step: Prepare Data for Chart
// const getCategoryCounts = () => {
//   const counts = {};

//   dummyEntries.forEach((entry) => {
//     counts[entry.category] = (counts[entry.category] || 0) + 1;
//   });

//   // Convert counts object into array
//   return Object.keys(counts).map((category) => ({
//     category,
//     entries: counts[category],
//   }));
// };
// // Step: Prepare Average Score per Category
// const getAverageScores = () => {
//     const scores = {};
  
//     dummyEntries.forEach((entry) => {
//       if (!scores[entry.category]) {
//         scores[entry.category] = { total: 0, count: 0 };
//       }
//       scores[entry.category].total += entry.score;
//       scores[entry.category].count += 1;
//     });
  
//     return Object.keys(scores).map((category) => ({
//       category,
//       averageScore: (scores[category].total / scores[category].count).toFixed(2),
//     }));
//   };
//   // Step: Prepare Entries Per Month
// const getEntriesPerMonth = () => {
//     const monthCounts = {};
  
//     dummyEntries.forEach((entry) => {
//       const date = new Date(entry.date);
//       const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
  
//       monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1;
//     });
  
//     // Sort months chronologically
//     const sortedMonths = Object.keys(monthCounts).sort((a, b) => {
//       const [monthA, yearA] = a.split(' ');
//       const [monthB, yearB] = b.split(' ');
//       const dateA = new Date(`${monthA} 1, ${yearA}`);
//       const dateB = new Date(`${monthB} 1, ${yearB}`);
//       return dateA - dateB;
//     });
  
//     return sortedMonths.map((monthYear) => ({
//       month: monthYear,
//       entries: monthCounts[monthYear],
//     }));
//   };
//   // Step: Prepare Category Wise Percentage
// const getCategoryPercentage = () => {
//     const counts = {};
  
//     dummyEntries.forEach((entry) => {
//       counts[entry.category] = (counts[entry.category] || 0) + 1;
//     });
  
//     const totalEntries = dummyEntries.length;
  
//     return Object.keys(counts).map((category) => ({
//       name: category,
//       value: (counts[category] / totalEntries) * 100,
//     }));
//   };
  
// const AnalysisPage = () => {
//   const categoryData = getCategoryCounts();
//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-semibold">Student Analysis</h1>
//       <p className="mt-2">Welcome to the analysis section. Charts and details will appear here!</p>

//       <div className="grid grid-cols-2 gap-6 mt-10">
//         {/* First Row */}
//         <div className=" p-5 rounded-lg shadow-md">
//           <h2 className="text-center text-xl font-semibold mb-5">Entries Per Category</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="entries" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="p-5 rounded-lg shadow-md">
//           <h2 className="text-center text-xl font-semibold mb-5">Average Score Per Category</h2>
//           <ResponsiveContainer width="100%" height={300}>
//   <RadarChart data={getAverageScores()}>
//     <PolarGrid />
//     <PolarAngleAxis dataKey="category" />
//     <PolarRadiusAxis angle={30} domain={[0, 100]} />
//     <Radar name="Score" dataKey="averageScore" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
//     <Tooltip />
//   </RadarChart>
// </ResponsiveContainer>

//         </div>

//         {/* Second Row */}
//         <div className=" p-5 rounded-lg shadow-md">
//           <h2 className="text-center text-xl font-semibold mb-5">Entries Per Month</h2>
//           <ResponsiveContainer width="100%" height={300}>
//   <LineChart data={getEntriesPerMonth()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//     <CartesianGrid strokeDasharray="3 3" />
//     <XAxis dataKey="month" />
//     <YAxis />
//     <Tooltip />
//     <Line type="monotone" dataKey="entries" stroke="#ff7300" strokeWidth={2} activeDot={{ r: 6 }} />
//   </LineChart>
// </ResponsiveContainer>

//         </div>

//         <div className=" p-5 rounded-lg shadow-md">
//           <h2 className="text-center text-xl font-semibold mb-5">Category-wise Percentage</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={getCategoryPercentage()}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={120}
//                 fill="#8884d8"
//                 label
//               >
//                 {getCategoryPercentage().map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AnalysisPage;

import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell
} from "recharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const AnalysisPage = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!user || !user.email) {
      navigate("/login");
      return;
    }

    const userEmail = user.email.email || user.email;

    fetch(`http://localhost:5000/api/logentry/${encodeURIComponent(userEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📊 Fetched log entries:", data);
        setEntries(data);
      })
      .catch((err) => {
        console.error("Error fetching log entries:", err);
      });
  }, [user, navigate]);

  // ✅ Entries per Category
  const getCategoryCounts = () => {
    const counts = {};
    entries.forEach((entry) => {
      counts[entry.category] = (counts[entry.category] || 0) + 1;
    });
    return Object.entries(counts).map(([category, count]) => ({
      category,
      entries: count,
    }));
  };

  // ✅ Average Score per Category
  const getAverageScores = () => {
    const scores = {};
    entries.forEach((entry) => {
      if (entry.score !== null && entry.score !== undefined) {
        if (!scores[entry.category]) scores[entry.category] = { total: 0, count: 0 };
        scores[entry.category].total += entry.score;
        scores[entry.category].count += 1;
      }
    });
    return Object.entries(scores).map(([category, { total, count }]) => ({
      category,
      averageScore: (total / count).toFixed(2),
    }));
  };

  // ✅ Entries Per Month
  const getEntriesPerMonth = () => {
    const monthCounts = {};
    entries.forEach((entry) => {
      const date = new Date(entry.data.date || entry.createdAt || new Date());
      const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
      monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1;
    });
    return Object.entries(monthCounts)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([month, count]) => ({ month, entries: count }));
  };

  // ✅ Category Percentages
  const getCategoryPercentage = () => {
    const counts = {};
    entries.forEach((entry) => {
      counts[entry.category] = (counts[entry.category] || 0) + 1;
    });
  
    const totalEntries = entries.length;
  
    return Object.entries(counts).map(([category, count]) => ({
      name: category,
      value: parseFloat(((count / totalEntries) * 100).toFixed(2)),
    }));
  };
  

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold">Student Analysis</h1>
      <p className="mt-2">Charts and insights based on your log entries</p>

      {entries.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 mt-10">
          <div className="p-5 rounded-lg shadow-md">
            <h2 className="text-center text-xl font-semibold mb-5">Entries Per Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getCategoryCounts()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="entries" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-5 rounded-lg shadow-md">
            <h2 className="text-center text-xl font-semibold mb-5">Average Score Per Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={getAverageScores()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Score" dataKey="averageScore" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-5 rounded-lg shadow-md">
            <h2 className="text-center text-xl font-semibold mb-5">Entries Per Month</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getEntriesPerMonth()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="entries" stroke="#ff7300" strokeWidth={2} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-5 rounded-lg shadow-md">
            <h2 className="text-center text-xl font-semibold mb-5">Category Contribution (%)</h2>
            <ResponsiveContainer width="100%" height={300}>
            <PieChart>
  <Pie
    data={getCategoryPercentage()}
    dataKey="value"
    nameKey="name"
    outerRadius={120}
    fill="#8884d8"
    label={({ name, value }) => `${name}: ${value.toFixed(1)}%`} // Optional: better label
  >
    {getCategoryPercentage().map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
</PieChart>

            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p className="mt-10 text-gray-500">Loading or no data available...</p>
      )}
    </div>
  );
};

export default AnalysisPage;
