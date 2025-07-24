import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaBars,
  FaTimes,
  FaUsers,
  FaUserShield,
  FaCheckCircle,
  FaChartPie,
  FaDoorOpen,
  FaChevronRight,
  FaHeart,
} from "react-icons/fa";
import { AuthContext } from "../Contex/AuthProvider";
import Swal from "sweetalert2";

const AdminDashboardLayout = () => {
  const { user , biodata , LogOut } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);


  const HandalLogOut =() =>{
      LogOut()
        .then(() => {
          Swal.fire({
            title: "Logout Successfully",
            icon: "success",
          });
        
        })
        .catch((error) => {
          Swal.fire({
            title: error.message,
            icon: "error",
          });
        });
    };

  const links = [
    { to: "/adminDashboard", label: "Dashboard", icon: <FaChartPie /> },
    { to: "/adminDashboard/manage", label: "Manage Users", icon: <FaUsers /> },
    { to: "/adminDashboard/approvedPremium", label: "Approve Premium", icon: <FaUserShield /> },
    { to: "/adminDashboard/approvedContactRequest", label: "Approve Contacts", icon: <FaCheckCircle /> },
    { to: "/adminDashboard/successStories", label: "SuccessStories", icon: <FaHeart /> },
  ];

  const activeClass =
    "bg-blue-600 text-white rounded-md px-3 py-2 flex items-center gap-2";
  const inactiveClass =
    "text-blue-700 hover:bg-blue-200 rounded-md px-3 py-2 flex items-center gap-2";

  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row relative">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:flex-col w-60 lg:w-72  p-4 bg-blue-100  shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-blue-600 text-center">
            Admin Dashboard
          </h2>
          <nav className="flex flex-col space-y-4 font-semibold">
            {links.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/adminDashboard"}
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
              onClick={HandalLogOut}
            >
              <FaDoorOpen className="mr-2" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Mobile Navbar */}
        <div className="flex md:hidden items-center justify-between bg-blue-100 p-4 shadow-md">
          <h2 className="text-xl font-bold subtitle-font text-blue-600">Dashboard</h2>
          <button onClick={toggleDrawer} className="text-2xl text-blue-700">
            {drawerOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 bg-opacity-50">
            <div
              className="absolute top-0 right-0 w-64 h-full bg-blue-100 p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-4">
                <button onClick={toggleDrawer} className="text-2xl text-blue-700">
                  <FaTimes />
                </button>
              </div>

              <nav className="flex flex-col space-y-4 font-semibold text-blue-700">
                {links.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/adminDashboard"}
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
                  onClick={HandalLogOut}
                >
                  <FaDoorOpen className="mr-2" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-3 bg-white">
          <div className="flex justify-between border-b-2 pb-4 border-gray-200 lg:mx-10">
            <div className="flex gap-1.5 md:gap-3 lg:gap-10 items-center *:hover:text-pink-700">
              <NavLink to="/" className="">Home </NavLink>
              <FaChevronRight className="mt-2" />
              <NavLink to="/about">About</NavLink>
              <FaChevronRight className="mt-2" />
              <NavLink to="/contact">Contact</NavLink>
            </div>
            <img src={biodata?.profileImage || user?.photoURL} alt="User" className="w-10 h-10 border-2 border-amber-400  rounded-full" />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
