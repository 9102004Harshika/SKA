
import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import logo from "../images/logo.png";
import {
  navigationLinksDesktop,
  navigationLinksMobile,
  notificationItems,
} from "../config";
import { Hamburger } from "../ui/hamburger";
import Tooltip from "../ui/tooltip"; // Import Tooltip component
import { DropDown, NotificationDropDown } from "../ui/dropdownMenu";
import { Notification } from "../ui/notification"; // Import your new notification button component
import gsap from "gsap"; // Import GSAP

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

  // Reference for the second row of navigation links (for GSAP animation)
  const navLinksRef = useRef(null);
  const firstRowRef=useRef(null)
  const mobileLinksRef=useRef(null)
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

  // Trigger GSAP animation on load for the second row
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".navbar-first-row", // Select the first row by class
      {
        opacity: 0, // Start invisible
        y: -20, // Start slightly above
      },
      {
        opacity: 1, // Fade to visible
        y: 0, // Move to default position
        ease: "power3.out", // Smooth easing
        duration: 1, // Duration of the animation
      }
    );
    tl.fromTo(
      firstRowRef.current.children, // Target each navigation link
      {
        opacity: 0,
        y: 50, // Start slightly below
        scale: 0.8, // Shrink them initially
        rotation: -15, // Slightly rotated for a cool effect
      },
      {
        opacity: 1,
        y: 0, // Move to their default position
        scale: 1, // Restore original size
        rotation: 0, // Remove rotation
        ease: "elastic.out(1, 0.6)", // Elastic easing for bounce effect
        stagger: 0.15, // Stagger for wave-like effect
        duration: 1.5, // Total duration
      }
    );
    // Cool wave-like animation for the second row navigation links
    tl.fromTo(
      navLinksRef.current.children, // Target each navigation link
      {
        opacity: 0,
        y: 50, // Start slightly below
        scale: 0.8, // Shrink them initially
        rotation: -15, // Slightly rotated for a cool effect
      },
      {
        opacity: 1,
        y: 0, // Move to their default position
        scale: 1, // Restore original size
        rotation: 0, // Remove rotation
        ease: "elastic.out(1, 0.6)", // Elastic easing for bounce effect
        stagger: 0.15, // Stagger for wave-like effect
        duration: 1.5, // Total duration
      }
    );

   
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        mobileLinksRef.current?.children || [],
        {
          opacity: 0,
          y: 50, // Start slightly below
          scale: 0.8, // Shrink them initially
          rotation: -15, // Slightly rotated for a cool effect
        },
        {
          opacity: 1,
          y: 0, // Move to their default position
          scale: 1, // Restore original size
          rotation: 0, // Remove rotation
          ease: "elastic.out(1, 0.6)", // Elastic easing for bounce effect
          stagger: 0.15, // Stagger for wave-like effect
          duration: 1.5, // Total duration
        }
      );
    }
  }, [isMenuOpen]);


  
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleNotificationDropdown = () =>
    setIsNotificationDropdownOpen((prev) => !prev); // Toggle for notification dropdown
  const toggleMoreItemsDropdown = () =>
    setIsMoreItemsDropdownOpen((prev) => !prev); // Toggle for more items dropdown

  return (
    <>
      <nav className=" relative z-20 bg-primary navbar-first-row">
        {/* First Row */}
   <div className="flex  items-center justify-between px-4 py-2 " ref={firstRowRef}>
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
              <span className="text-background font-header font-extrabold text-xl hidden sm:inline ml-5">
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
        {/* Notification Dropdown */}
<div className="relative" ref={notificationDropdownRef}>
  <Notification onClick={toggleNotificationDropdown} count={count} />
  {isNotificationDropdownOpen && (
  <div
    className="absolute -right-5 top-12 rounded-xl overflow-hidden z-100" // Added top positioning and z-index
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
<div className="hidden sm:block relative" ref={moreItemsDropdownRef}>
  <button
    onClick={toggleMoreItemsDropdown}
    className="focus:outline-none"
  >
    <FaEllipsisV className="text-xl cursor-pointer" />
  </button>

  {isMoreItemsDropdownOpen && (
  <div
    className="absolute right-0 mt-2 z-50 rounded-xl overflow-hidden" // Ensured z-index is high enough
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

        {/* Mobile Search Bar */}
        <div className="sm:hidden  bg-secondary px-4 py-2">
          <div className="flex items-center rounded-md px-2" >
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
        <div
          className="hidden   sm:flex justify-center bg-accent py-2"
          ref={navLinksRef}
        >
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
          <div className="flex flex-col space-y-2 px-4"  ref={mobileLinksRef}>
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
