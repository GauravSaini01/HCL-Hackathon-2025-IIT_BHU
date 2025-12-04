import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Hcl logo.jpg";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 
  shadow-sm backdrop-blur-xl bg-[rgba(235,245,255,0.55)] border-b border-blue-100/40">

      
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-8 h-8 rounded-full object-cover" />
        <h1 className="text-xl font-semibold text-blue-700">CalmCare</h1>
      </div>

      <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <a href="#doctors" className="hover:text-blue-600">Doctors</a>
        <a href="#services" className="hover:text-blue-600">Services</a>
        <a href="#about" className="hover:text-blue-600">About Us</a>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/signin"
          className="px-4 md:px-6 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
        >
          Sign In
        </Link>

        <Link
          to="/signup"
          className="px-4 md:px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;