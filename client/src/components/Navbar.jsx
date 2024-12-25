import React, { useState } from "react";
import { FaSearch, FaEllipsisV, FaBell } from "react-icons/fa";
import logo from "./../images/logo.jpg";
import {
  navigationLinksDesktop,
  navigationLinksMobile,
  navigationLinksMoreItems,
  notificationItems,
} from "../config";
import { Hamburger } from "../ui/hamburger";
import Tooltip from "../ui/tooltip"; // Import Tooltip component
import { DropDown } from "../ui/dropdownMenu";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu Toggle
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown Toggle
  const [searchQuery, setSearchQuery] = useState(""); // Search Input Value
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false); // Notification Dropdown Toggle
  const [isMoreItemsDropdownOpen, setIsMoreItemsDropdownOpen] = useState(false); // More Items Dropdown Toggle

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleNotificationDropdown = () =>
    setIsNotificationDropdownOpen((prev) => !prev); // Toggle for notification dropdown
  const toggleMoreItemsDropdown = () =>
    setIsMoreItemsDropdownOpen((prev) => !prev); // Toggle for more items dropdown

  return (
    <>
      <nav className="bg-primary relative z-50">
        {/* First Row */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* Menu Icon for Mobile - Use Hamburger component */}
          <div className="sm:hidden text-background mr-2">
            <Hamburger toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
          </div>

          {/* Logo */}
          <div className="sm:text-left">
            <a href="/home" className="flex items-center">
              <img
                src={logo}
                alt="Company Logo"
                className="h-10 w-auto inline-block"
              />
              <span className="text-background font-extrabold text-xl hidden sm:inline ml-5">
                Shri Kalam Academy
              </span>
            </a>
          </div>

          {/* Notification Icon and Triple Dot Dropdown */}
          <div className="text-background flex items-center space-x-4 relative">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={toggleNotificationDropdown}
                className="focus:outline-none relative"
              >
                <FaBell className="text-2xl cursor-pointer" />
                {/* Badge for notifications */}
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-error text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  3 {/* Dynamic count */}
                </span>
              </button>

              {/* Notifications Dropdown */}
              {isNotificationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-background shadow-lg z-50 rounded-xl overflow-hidden">
                  <ul>
                    {notificationItems.map((item, index) => (
                      <li
                        key={index}
                        className="py-2 px-4 text-primary hover:bg-primary hover:text-secondary flex items-center"
                      >
                        <a
                          href={item.link}
                          className="text-inherit flex items-center w-full"
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Triple Dot Dropdown */}
        {/* Triple Dot Dropdown */}
<div className="hidden sm:block relative">
  <button
    onClick={toggleMoreItemsDropdown}
    className="focus:outline-none"
  >
    <FaEllipsisV className="text-2xl cursor-pointer" />
  </button>

  {isMoreItemsDropdownOpen && (
    <div className="absolute right-0 mt-2  z-30 rounded-xl overflow-hidden">
      {/* Replace this with your custom DropDown component */}
      <DropDown />
    </div>
  )}
</div>

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
              className="flex-grow px-2 py-1 bg-transparent text-primary border-b-2 border-primary focus:outline-none placeholder:text-primary"
            />
            <button
              className="text-primary ml-2"
              onClick={() => alert(`Searching: ${searchQuery}`)}
            >
              <FaSearch className="text-xl" />
              {/* <Tooltip tooltipText="Search" /> */}
            </button>
          </div>
        </div>

        {/* Second Row (Static for Desktop) */}
        <div className="hidden sm:flex justify-center bg-accent py-2">
          {navigationLinksDesktop.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-background text-lg flex items-center px-4 py-2 hover:bg-primary rounded-full space-x-2"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`sm:hidden fixed top-0 left-0 h-full bg-primary w-64 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          {/* Close Button using Hamburger Component */}
          <div className="flex justify-end p-4">
            <Hamburger toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            {/* <Tooltip tooltipText="Menu Items" /> */}
          </div>

          {/* Menu Items */}
          <div className="flex flex-col space-y-2 px-4">
            <img src={logo} alt="" className="w-20 self-center" />
            {navigationLinksMobile.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={`text-background flex items-center px-4 py-2 rounded-full space-x-2 ${
                  item.label === "Logout" ? "hover:bg-error" : "hover:bg-accent"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
