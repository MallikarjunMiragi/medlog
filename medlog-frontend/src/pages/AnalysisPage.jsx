import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Dummy data for entries
const dummyEntries = [
  { id: 1, category: "Admissions", score: 80, date: "2025-04-01" },
  { id: 2, category: "CPD", score: 70, date: "2025-04-02" },
  { id: 3, category: "POCUS", score: 90, date: "2025-04-05" },
  { id: 4, category: "Procedures", score: 75, date: "2025-04-07" },
  { id: 5, category: "Admissions", score: 85, date: "2025-04-10" },
  { id: 6, category: "Procedures", score: 80, date: "2025-04-15" },
  { id: 7, category: "CPD", score: 65, date: "2025-04-18" },
  { id: 8, category: "Admissions", score: 90, date: "2025-04-20" },
];
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
// Step: Prepare Data for Chart
const getCategoryCounts = () => {
  const counts = {};

  dummyEntries.forEach((entry) => {
    counts[entry.category] = (counts[entry.category] || 0) + 1;
  });

  // Convert counts object into array
  return Object.keys(counts).map((category) => ({
    category,
    entries: counts[category],
  }));
};
// Step: Prepare Average Score per Category
const getAverageScores = () => {
    const scores = {};
  
    dummyEntries.forEach((entry) => {
      if (!scores[entry.category]) {
        scores[entry.category] = { total: 0, count: 0 };
      }
      scores[entry.category].total += entry.score;
      scores[entry.category].count += 1;
    });
  
    return Object.keys(scores).map((category) => ({
      category,
      averageScore: (scores[category].total / scores[category].count).toFixed(2),
    }));
  };
  // Step: Prepare Entries Per Month
const getEntriesPerMonth = () => {
    const monthCounts = {};
  
    dummyEntries.forEach((entry) => {
      const date = new Date(entry.date);
      const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
  
      monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1;
    });
  
    // Sort months chronologically
    const sortedMonths = Object.keys(monthCounts).sort((a, b) => {
      const [monthA, yearA] = a.split(' ');
      const [monthB, yearB] = b.split(' ');
      const dateA = new Date(`${monthA} 1, ${yearA}`);
      const dateB = new Date(`${monthB} 1, ${yearB}`);
      return dateA - dateB;
    });
  
    return sortedMonths.map((monthYear) => ({
      month: monthYear,
      entries: monthCounts[monthYear],
    }));
  };
  // Step: Prepare Category Wise Percentage
const getCategoryPercentage = () => {
    const counts = {};
  
    dummyEntries.forEach((entry) => {
      counts[entry.category] = (counts[entry.category] || 0) + 1;
    });
  
    const totalEntries = dummyEntries.length;
  
    return Object.keys(counts).map((category) => ({
      name: category,
      value: (counts[category] / totalEntries) * 100,
    }));
  };
  
const AnalysisPage = () => {
  const categoryData = getCategoryCounts();
  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold">Student Analysis</h1>
      <p className="mt-2">Welcome to the analysis section. Charts and details will appear here!</p>

      <div className="grid grid-cols-2 gap-6 mt-10">
        {/* First Row */}
        <div className="bg-gray-100 p-5 rounded-lg shadow-md">
          <h2 className="text-center text-xl font-semibold mb-5">Entries Per Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="entries" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-100 p-5 rounded-lg shadow-md">
          <h2 className="text-center text-xl font-semibold mb-5">Average Score Per Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getAverageScores()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="averageScore" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Second Row */}
        <div className="bg-gray-100 p-5 rounded-lg shadow-md">
          <h2 className="text-center text-xl font-semibold mb-5">Entries Per Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getEntriesPerMonth()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="entries" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-100 p-5 rounded-lg shadow-md">
          <h2 className="text-center text-xl font-semibold mb-5">Category-wise Percentage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getCategoryPercentage()}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {getCategoryPercentage().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;