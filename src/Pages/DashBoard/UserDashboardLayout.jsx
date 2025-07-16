
// src/Layouts/UserDashboardLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserEdit,
  FaEye,
  FaHeart,
  FaPaperPlane,
  FaDoorOpen,
} from "react-icons/fa";

const UserDashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const links = [
    { to: "/dashboard", label: "Edit Biodata", icon: <FaUserEdit /> },
    { to: "/dashboard/view", label: "View Biodata", icon: <FaEye /> },
    { to: "/dashboard/myContactRequest", label: "My Contact Requests", icon: <FaPaperPlane /> },
    { to: "/dashboard/favourites", label: "Favourite Biodatas", icon: <FaHeart /> },
    { to: "/dashboard/gotMarried", label: "Got Married", icon: <FaHeart /> },
  ];

  const activeClass =
    "bg-pink-600 text-white rounded-md px-3 py-2 flex items-center space-x-2";
  const inactiveClass =
    "text-pink-700 hover:bg-pink-200 rounded-md px-3 py-2 flex items-center space-x-2";

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-pink-100 p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-pink-600 text-center">
          User Dashboard
        </h2>
        <nav className="flex flex-col space-y-4 font-semibold">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
              onClick={() => setDrawerOpen(false)}
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}

          <button
            className="mt-10 text-red-600 hover:underline flex items-center"
            onClick={() => alert("Logout logic goes here")}
          >
            <FaDoorOpen className="mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Navbar */}
      <div className="flex md:hidden bg-pink-100 p-4 w-full justify-between items-center shadow-md">
        <h2 className="text-xl font-bold text-pink-600">User Dashboard</h2>
        <button
          onClick={toggleDrawer}
          aria-label="Toggle Menu"
          className="text-pink-700 text-2xl"
        >
          {drawerOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-pink-100 shadow-lg transform transition-transform duration-300 ease-in-out
        ${drawerOpen ? "translate-x-0" : "translate-x-full"} md:hidden z-50`}
      >
        <nav className="flex flex-col p-6 space-y-4 font-semibold text-pink-700">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
              onClick={() => setDrawerOpen(false)}
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
          <button
            className="mt-10 text-red-600 hover:underline flex items-center"
            onClick={() => alert("Logout logic goes here")}
          >
            <FaDoorOpen className="mr-2" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;
