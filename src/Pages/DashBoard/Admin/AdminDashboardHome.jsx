import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaUserAlt,
  FaMale,
  FaFemale,
  FaCrown,
  FaDollarSign,
} from "react-icons/fa";

const data = {
  totalBiodata: 1200,
  maleBiodata: 700,
  femaleBiodata: 500,
  premiumBiodata: 150,
  totalRevenue: 12500,
};

const pieData = [
  { name: "Male Biodata", value: data.maleBiodata, color: "#1E90FF" },
  { name: "Female Biodata", value: data.femaleBiodata, color: "#FF69B4" },
  { name: "Premium Biodata", value: data.premiumBiodata, color: "#FFD700" },
  { name: "Total Revenue", value: data.totalRevenue, color: "#32CD32" },
];

const summaryCards = [
  {
    title: "Total Biodata",
    value: data.totalBiodata,
    icon: <FaUserAlt className="text-blue-500 text-2xl" />,
    color: "bg-blue-50",
  },
  {
    title: "Male Biodata",
    value: data.maleBiodata,
    icon: <FaMale className="text-indigo-500 text-2xl" />,
    color: "bg-indigo-50",
  },
  {
    title: "Female Biodata",
    value: data.femaleBiodata,
    icon: <FaFemale className="text-pink-500 text-2xl" />,
    color: "bg-pink-50",
  },
  {
    title: "Premium Biodata",
    value: data.premiumBiodata,
    icon: <FaCrown className="text-yellow-500 text-2xl" />,
    color: "bg-yellow-50",
  },
  {
    title: "Total Revenue ($)",
    value: `$${data.totalRevenue.toLocaleString()}`,
    icon: <FaDollarSign className="text-green-500 text-2xl" />,
    color: "bg-green-50",
  },
];

const AdminDashboardHome = () => {
  return (
    <div className="min-h-screen  px-4 py-8 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl shadow-sm hover:shadow-md transition ${card.color} flex flex-col items-center text-center`}
          >
            <div className="mb-2">{card.icon}</div>
            <h2 className="text-md font-semibold text-gray-700 mb-1">
              {card.title}
            </h2>
            <p className="text-xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl shadow-md px-2 py-5">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Biodata & Revenue Distribution
        </h2>
        <div className="w-full h-[400px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
