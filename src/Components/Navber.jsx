import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const navLinks = (
    <>
      <NavLink to="/" className="block  py-2 hover:text-blue-500">Home</NavLink>
      <NavLink to="/about" className="block  py-2 hover:text-blue-500">About</NavLink>
      <NavLink to="/biodataspage" className="block  py-2 hover:text-blue-500">Biodatas</NavLink>
      <NavLink to="/contact" className="block py-2 hover:text-blue-500">Contact</NavLink>


      <button className="  bg-rose-600  hover:bg-rose-700 text-white px-4 rounded-3xl "  >
        <Link to="/loginpage" className="block py-2 ">Log in</Link>
      </button>


    </>
  );

  return (
    <>
      {/* Navbar */}
      <nav className="bg-rose-100 shadow-md fixed  w-full z-50">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center poppins ">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src="/logo.png" className="w-25" alt="Logo" />
            {/* <span className="text-2xl font-semibold dark:text-white">Flowbite</span> */}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 text-gray-900 subtitle-font  font-bold">
            {navLinks}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleDrawer}
              className="text-gray-700   text-2xl focus:outline-none"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={toggleDrawer}
      ></div>

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white  z-50 shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200 ">
          <span className="text-lg font-semibold ">Menu</span>
          <button onClick={toggleDrawer} className="text-gray-700  text-xl">
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col p-4 text-gray-700  font-medium">
          {navLinks}
        </div>
      </div>
    </>
  );
};

export default Navbar;
