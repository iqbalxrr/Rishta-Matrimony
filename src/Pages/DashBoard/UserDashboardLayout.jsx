import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
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
    { to: "/userDashboard", label: "Edit Biodata", icon: <FaUserEdit /> },
    { to: "/userDashboard/view", label: "View Biodata", icon: <FaEye /> },
    { to: "/userDashboard/myContactRequest", label: "My Contact Requests", icon: <FaPaperPlane /> },
    { to: "/userDashboard/favourites", label: "Favourite Biodatas", icon: <FaHeart /> },
    { to: "/userDashboard/gotMarried", label: "Got Married", icon: <FaHeart /> },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col md:flex-row relative">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64  p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-pink-600 text-center">User Dashboard</h2>
        <nav className="flex flex-col space-y-4 font-semibold">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-2 text-pink-700 hover:bg-pink-200 px-3 py-2 rounded"
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
      <div className="flex md:hidden items-center justify-between bg-pink-100 p-4 shadow-md">
        <h2 className="text-xl font-bold text-pink-600">User Dashboard</h2>
        <button onClick={toggleDrawer} className="text-2xl text-pink-700">
          {drawerOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer with Inside Close Button */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div
            className="absolute top-0 right-0 w-64 h-full bg-pink-100 p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button onClick={toggleDrawer} className="text-2xl text-pink-700">
                <FaTimes />
              </button>
            </div>
            <nav className="flex flex-col space-y-4 font-semibold text-pink-700">
              {links.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-2 hover:bg-pink-200 px-3 py-2 rounded"
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
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;
