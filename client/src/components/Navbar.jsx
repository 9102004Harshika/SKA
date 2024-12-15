import React from "react";
import { FaSearch, FaUserCircle, FaGraduationCap } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="bg-primary">
      {/* First Row */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="text-white text-lg font-bold">MyLogo</div>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-grow items-center mx-4">
          <FaSearch className="text-white mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow px-2 py-1 rounded-md focus:outline-none"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <FaGraduationCap className="text-white text-xl" />
          <FaUserCircle className="text-white text-xl" />
        </div>
      </div>

      {/* Second Row */}
      <div className="flex flex-wrap justify-center sm:justify-around bg-secondary py-2">
        <button className="text-white px-4 py-2 hover:bg-blue-700 rounded-md">
          Courses
        </button>
        <button className="text-white px-4 py-2 hover:bg-blue-700 rounded-md">
          Quiz
        </button>
        <button className="text-white px-4 py-2 hover:bg-blue-700 rounded-md">
          Notes
        </button>
        <button className="text-white px-4 py-2 hover:bg-blue-700 rounded-md">
          Tuitions
        </button>
        <button className="text-white px-4 py-2 hover:bg-blue-700 rounded-md">
          Career Guidance
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
