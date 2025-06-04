import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets.js";
const Navbar = () => {
  const navigate = useNavigate();
  const { aToken, setAToken } = useContext(AdminContext);
  const handleLogout = () => {
    // Clear token or session
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <nav className="bg-white  px-6 py-4 flex justify-between items-center">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-3">
        <img
          src={assets.admin_logo} // Replace with your logo URL
          alt="Admin Logo"
          className="w-40 cursor-pointer"
        />
        <div className="border border-gray-800 rounded-full px-3 py-1">
          <span className="text-sm font-semibold text-gray-800 p-0">Admin</span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-primary text-white px-6 py-2 rounded-full hover:scale-102 transition duration-200 cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
