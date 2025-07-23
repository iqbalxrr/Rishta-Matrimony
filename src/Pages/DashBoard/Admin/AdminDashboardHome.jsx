import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  FaUserAlt,
  FaMale,
  FaFemale,
  FaCrown,
  FaDollarSign,
} from "react-icons/fa";
import { useDashboardStats } from "../../../Utils/Utils";


const COLORS = {
  male: "#1E90FF",
  female: "#FF69B4",
  premium: "#FFD700",
  revenue: "#32CD32",
};

const AdminDashboardHome = () => {
  const { stats, loading } = useDashboardStats();

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  const pieData = [
    { name: "Male", value: stats.maleBiodata, color: COLORS.male },
    { name: "Female", value: stats.femaleBiodata, color: COLORS.female },
    { name: "Premium", value: stats.premiumBiodata, color: COLORS.premium },
  ];

  const revenueBarData = [
    {
      name: "Revenue",
      value: stats.totalRevenue,
    },
  ];

  const summaryCards = [
    {
      title: "Total Biodata",
      value: stats.totalBiodata,
      icon: <FaUserAlt className="text-blue-500 text-2xl" />,
      color: "bg-blue-50",
    },
    {
      title: "Male Biodata",
      value: stats.maleBiodata,
      icon: <FaMale className="text-indigo-500 text-2xl" />,
      color: "bg-indigo-50",
    },
    {
      title: "Female Biodata",
      value: stats.femaleBiodata,
      icon: <FaFemale className="text-pink-500 text-2xl" />,
      color: "bg-pink-50",
    },
    {
      title: "Premium Biodata",
      value: stats.premiumBiodata,
      icon: <FaCrown className="text-yellow-500 text-2xl" />,
      color: "bg-yellow-50",
    },
    {
      title: "Total Revenue ($)",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <FaDollarSign className="text-green-500 text-2xl" />,
      color: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
            Biodata Distribution
          </h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
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

        {/* Revenue Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
            Total Revenue
          </h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <BarChart data={revenueBarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={COLORS.revenue} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
