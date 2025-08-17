import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Contex/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const { user, biodata, authUser } = useContext(AuthContext)

  const handleLinkClick = () => {
    if (isOpen) {
      toggleDrawer();
    }
  };


  // console.log(user)

  const navLinks = (
    <>
      <NavLink to="/" onClick={handleLinkClick} className="block  py-2 hover:text-blue-500">Home</NavLink>
      <NavLink to="/about" onClick={handleLinkClick} className="block  py-2 hover:text-blue-500">About</NavLink>
      <NavLink to="/biodataspage" onClick={handleLinkClick} className="block  py-2 hover:text-blue-500">Biodatas</NavLink>
      <NavLink to="/contact" onClick={handleLinkClick} className="block py-2 hover:text-blue-500">Contact</NavLink>
      <NavLink to="/blog" onClick={handleLinkClick} className="block py-2 hover:text-blue-500">Blog</NavLink>

      {
        user && authUser?.role !== "admin" && (
          <NavLink
            to="/userDashboard"
            onClick={handleLinkClick}
            className="block py-2 hover:text-blue-500"
          >
            Dashboard
          </NavLink>
        )
      }

      {
        user && authUser?.role === "admin" && (
          <NavLink
            to="/adminDashboard"
            onClick={handleLinkClick}
            className="block py-2 hover:text-blue-500"
          >
            Dashboard
          </NavLink>
        )
      }
      {user ? (
        <div className="relative group">
          <img
            src={biodata?.profileImage || user?.photoURL}
            alt="Profile"
            className={`w-10 h-10 border-2 border-amber-400 rounded-full cursor-pointer ${isOpen ? 'hidden' : 'flex'}`}
          />
          {/* Tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 bg-[#db5aa6] text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap text-center">
            <div>{biodata?.name || user?.displayName}</div>
            <div className="text-xs text-gray-300">{authUser?.role === "admin" ? (
              "admin"
            ) : (
              <span>ID NO : {biodata?.bioId || "N/A" }</span>
            )}</div>
          </div>
        </div>
      ) : (
        <Link
          to="/loginpage"
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-3xl mt-2 md:mt-0 text-center"
        >
          Log In
        </Link>
      )}

    </>
  );


  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#FEFBF1] shadow-md fixed  w-full z-50 ">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center poppins  ">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src="/logo.png" className="w-25" alt="Logo" />
            {/* <span className="text-2xl font-semibold dark:text-white">Flowbite</span> */}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 md:text-sm lg:text-base items-center text-gray-900 subtitle-font  font-bold">
            {navLinks}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleDrawer}
              className="text-gray-700 mr-2  text-2xl focus:outline-none"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30  z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={toggleDrawer}
      ></div>

      {/* Drawer panel */}
      <div
        className={`fixed  top-0 right-0 w-64 h-full bg-[#FEFBF1] z-50 shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="py-6 px-4 flex justify-between items-center border-b border-gray-200 ">
          <span className="text-lg font-semibold ">
            {
              user ?

                <div className="flex gap-2">
                  <img
                    src={biodata?.profileImage || user?.photoURL}
                    alt="" className="w-10 h-10 rounded-full border-2 border-[#66451C]" />
                  <div className="flex flex-col gap-1 primary-color">
                    <h1 className="text-[12px] overflow-hidden">{biodata?.name || user?.displayName}</h1>
                    <h1 className="text-[12px] overflow-hidden uppercase">
                      {authUser?.role === "admin" ? (
                        "admin"
                      ) : (
                        <span>ID NO : {biodata?.bioId || "N/A"}</span>
                      )}
                    </h1>
                  </div>
                </div>

                :

                <h1 className="subtitle-font">Menu</h1>
            }
          </span>
          <button onClick={toggleDrawer} className="text-gray-700  text-xl ">
            <FaTimes color="#EC003F" className="mr-2" />
          </button>
        </div>
        <div className="flex flex-col p-4 text-gray-700 subtitle-font font-bold ">

          {navLinks}

        </div>
      </div>
    </>
  );
};

export default Navbar;
