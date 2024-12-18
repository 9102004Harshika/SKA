import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import logo from "./../images/logo.jpg";
import { navigationLinksDesktop, navigationLinksMobile } from "../config";

const logoutLink = { label: "Logout", link: "/logout", icon: FaSignOutAlt };

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu Toggle
  const [searchQuery, setSearchQuery] = useState(""); // Search Input Value

  // Toggle Functions
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      {/* Navbar Container */}
      <nav className="bg-primary relative z-50">
        {/* First Row */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* Bread Crumb Icon for Mobile */}
          <div className="sm:hidden text-background" onClick={toggleMenu}>
            <FaBars className="text-2xl cursor-pointer" />
          </div>

          {/* Logo */}
          <div className="flex-grow text-center sm:text-left">
            <a href="/home">
              <img
                src={logo}
                alt="Company Logo"
                className="h-10 w-auto inline-block"
              />
            </a>
          </div>

          {/* Profile Button (Mobile) */}
          <div className="sm:hidden text-background">
            <button>
              <FaUserCircle className="text-2xl cursor-pointer" />
            </button>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden sm:flex items-center border-b-[1px] border-secondary pr-2 mr-5">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-2 py-1 bg-transparent text-secondary focus:outline-none text-blue"
            />
            <button
              className="text-background ml-5"
              onClick={() => alert(`Searching: ${searchQuery}`)}
            >
              <FaSearch className="text-xl" />
            </button>
          </div>

          {/* Icons and Logout (Desktop) */}
          <div className="hidden sm:flex items-center space-x-4">
            <button className="text-background">
              <FaUserCircle className="text-xl" />
            </button>
            <button className="text-background">
              <FaSignOutAlt className="text-xl" />
            </button>
          </div>
        </div>

        {/* Search Bar (Mobile - Always Visible) */}
        <div className="sm:hidden bg-secondary px-4 py-2">
          <div className="flex items-center rounded-md px-2">
            <input
              type="text"
              placeholder="Type your search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-2 py-1 bg-transparent text-primary border-b-2 border-accent focus:outline-none"
            />
            <button
              className="text-accent ml-2"
              onClick={() => alert(`Searching: ${searchQuery}`)}
            >
              <FaSearch className="text-xl" />
            </button>
          </div>
        </div>

        {/* Second Row (Static for Desktop) */}
        <div className="hidden sm:flex justify-center bg-accent py-2">
          {navigationLinksDesktop.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-background px-4 py-2 hover:bg-primary rounded-full"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`sm:hidden fixed top-0 left-0 h-full bg-primary w-64 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <IoClose
              className="text-background text-2xl cursor-pointer hover:text-secondary"
              onClick={toggleMenu}
            />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col space-y-2 px-4">
            <img src={logo} alt="" className="w-20 self-center" />
            {navigationLinksMobile.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-background px-4 py-2 hover:bg-accent rounded-full"
              >
                {item.label}
              </a>
            ))}
            {/* Logout Button */}
            <a
              href={logoutLink.link}
              className="text-background px-4 py-2 hover:bg-error rounded-full flex items-center"
            >
              <logoutLink.icon className="text-background inline-block mr-2" />
              {logoutLink.label}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
