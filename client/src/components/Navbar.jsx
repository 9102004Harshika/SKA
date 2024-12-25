import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import logo from "./../images/logo.jpg";
import {
  navigationLinksDesktop,
  navigationLinksMobile,
  notificationItems,
} from "../config";
import { Hamburger } from "../ui/hamburger";
import Tooltip from "../ui/tooltip"; // Import Tooltip component
import { DropDown, NotificationDropDown } from "../ui/dropdownMenu";
import { Notification } from "../ui/notification"; // Import your new notification button component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu Toggle
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown Toggle
  const [searchQuery, setSearchQuery] = useState(""); // Search Input Value
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false); // Notification Dropdown Toggle
  const [isMoreItemsDropdownOpen, setIsMoreItemsDropdownOpen] = useState(false); // More Items Dropdown Toggle

  // References for dropdowns
  const notificationDropdownRef = useRef(null);
  const moreItemsDropdownRef = useRef(null);
  const count = notificationItems.length;

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setIsNotificationDropdownOpen(false);
      }
      if (
        moreItemsDropdownRef.current &&
        !moreItemsDropdownRef.current.contains(event.target)
      ) {
        setIsMoreItemsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* Right Side Icons */}
          <div className="text-background flex items-center space-x-4">
            <div className="hidden sm:flex items-center border-b-[1px] border-background">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-5 py-1 bg-transparent text-background focus:outline-none placeholder:text-background"
              />
              <button
                className="text-background ml-5"
                onClick={() => alert(`Searching: ${searchQuery}`)}
              >
                <FaSearch className="text-xl" />
              </button>
            </div>

            {/* Notification and Triple Dot */}
            <div className="relative flex items-center space-x-4">
              {/* Notification Button */}
              <div className="relative" ref={notificationDropdownRef}>
                <Notification
                  onClick={toggleNotificationDropdown}
                  count={count}
                />
                {isNotificationDropdownOpen && (
                  <div
                    className="absolute -right-5 rounded-xl overflow-hidden"
                    style={{
                      boxShadow: isNotificationDropdownOpen
                        ? "rgba(0, 0, 0, 0.56) 40px 40px 40px 15px"
                        : "none",
                    }}
                  >
                    <ul>
                      <NotificationDropDown />
                    </ul>
                  </div>
                )}
              </div>

              {/* Triple Dot Dropdown */}
              <div
                className="hidden sm:block relative"
                ref={moreItemsDropdownRef}
              >
                <button
                  onClick={toggleMoreItemsDropdown}
                  className="focus:outline-none"
                >
                  <FaEllipsisV className="text-xl cursor-pointer" />
                </button>

                {isMoreItemsDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 z-30 rounded-xl overflow-hidden"
                    style={{
                      boxShadow: isMoreItemsDropdownOpen
                        ? "rgba(0, 0, 0, 0.56) 40px 40px 40px 15px"
                        : "none",
                    }}
                  >
                    <DropDown />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden bg-secondary px-4 py-2">
          <div className="flex items-center rounded-md px-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-2 py-1 bg-transparent text-primary border-b-2 border-primary focus:outline-none placeholder:text-primary"
            />
            <button
              className="text-primary ml-2"
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
          style={{
            boxShadow: isMenuOpen
              ? "rgba(0, 0, 0, 0.56) 40px 40px 40px 15px"
              : "none",
          }}
        >
          {/* Close Button using Hamburger Component */}
          <div className="flex justify-end p-4">
            <Hamburger toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col space-y-2 px-4">
            <img src={logo} alt="" className="w-20 self-center" />
            {navigationLinksMobile.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={`text-background flex items-center px-4 py-2 rounded-full space-x-2 ${
                  item.label === "Logout"
                    ? "hover:bg-error"
                    : "hover:bg-accent"
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
