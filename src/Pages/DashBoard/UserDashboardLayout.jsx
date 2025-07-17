import React, {  useContext, useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaBars,
  FaTimes,
  FaUserEdit,
  FaEye,
  FaHeart,
  FaPaperPlane,
  FaDoorOpen,
  FaChevronRight,
} from "react-icons/fa";
import { AuthContext } from "../../Contex/AuthProvider";

const UserDashboardLayout = () => {

 const {user} = useContext(AuthContext)

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const links = [
    { to: "/userDashboard/editbio", label: "Edit Biodata", icon: <FaUserEdit /> },
    { to: "/userDashboard/view", label: "View Biodata", icon: <FaEye /> },
    { to: "/userDashboard/myContactRequest", label: "My Contact Requests", icon: <FaPaperPlane /> },
    { to: "/userDashboard/favourites", label: "Favourite Biodatas", icon: <FaHeart /> },
    { to: "/userDashboard/gotMarried", label: "Got Married", icon: <FaHeart /> },
  ];

  return (
    <div className="bg-[#E7EBEE]">
      <div className="min-h-screen xl:max-w-8/12  mx-auto flex flex-col md:flex-row relative">
      {/* Desktop Sidebar */}
      <aside className="hidden bg-[#FEFBF2] md:flex md:flex-col md:w-62  p-3 shadow-md">
        <h2 className="text-xl font-bold mb-8 mt-3 text-pink-600 subtitle-font text-center">User Dashboard</h2>
        <nav className="flex flex-col space-y-4 font-semibold">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-2 text-black poppins  hover:bg-pink-200 px-3 py-2 rounded"
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
          <button
            className="mt-10 text-black  hover:underline flex items-center"
            onClick={() => alert("Logout logic goes here")}
          >
            <FaDoorOpen className="mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between bg-pink-100 p-4 shadow-md">
        <h2 className="text-xl font-bold text-pink-600 subtitle-font">User Dashboard</h2>
        <button onClick={toggleDrawer} className="text-2xl text-pink-700">
          {drawerOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer with Inside Close Button */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
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
                  className="flex items-center gap-2 text-black hover:bg-pink-200 px-3 py-2 rounded"
                >
                  {icon}
                  <span>{label}</span>
                </NavLink>
              ))}
              <button
                className="mt-10 text-black hover:underline flex items-center"
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
      <main className="flex-1 text-xl p-6 items-center bg-white">
        <div className="hidden md:flex justify-between border-b-2 pb-4 border-gray-200">
         <div className="flex md:gap-3 lg:gap-10 *:hover:text-pink-700 ">
           <NavLink to='/' className=''>Home </NavLink>
          <FaChevronRight className="mt-2" />
          <NavLink to='/about'>About</NavLink>
          <FaChevronRight className="mt-2" />
          <NavLink to='/contac'>Contact</NavLink>
         </div>

         <img src={user?.photoURL} alt="" className="w-10 rounded-full" />
        </div>
        <Outlet />
      </main>
    </div>
    </div>
  );
};

export default UserDashboardLayout;
