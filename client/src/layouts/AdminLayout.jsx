import React, { useState, useEffect, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
  PiChartLineUp,
  PiChartLineUpBold,
  PiChalkboardTeacher,
  PiChalkboardTeacherFill,
} from "react-icons/pi";
import { HiOutlineAcademicCap, HiAcademicCap } from "react-icons/hi2";
import { BsQuestionCircle, BsQuestionCircleFill } from "react-icons/bs";
import {
  IoBookOutline,
  IoBookSharp,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import logo from "../images/logo.png";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Sales",
    lined: <PiChartLineUp />,
    filled: <PiChartLineUpBold />,
    path: "/admin",
  },
  {
    label: "Courses",
    lined: <HiOutlineAcademicCap />,
    filled: <HiAcademicCap />,
    path: "/admin/course",
  },
  {
    label: "Quiz",
    lined: <BsQuestionCircle />,
    filled: <BsQuestionCircleFill />,
    path: "/admin/quiz",
  },
  {
    label: "Notes",
    lined: <IoBookOutline />,
    filled: <IoBookSharp />,
    path: "/admin/notes",
  },
  {
    label: "Settings",
    lined: <IoSettingsOutline />,
    filled: <IoSettingsSharp />,
    path: "/admin/settings",
  },
  {
    label: "Teacher",
    lined: <PiChalkboardTeacher />,
    filled: <PiChalkboardTeacherFill />,
    path: "/admin/teachers",
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = "translateX(0)";
      sidebarRef.current.style.opacity = "1";
    }
  }, []);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className="w-full bg-gray-50">
      {/* Fixed Sidebar */}
      <aside
        ref={sidebarRef}
        className={`hidden md:flex fixed top-0 left-0 h-screen flex-col bg-gradient-to-b from-primary via-primary to-secondary text-background shadow-2xl transition-all duration-300 ease-in-out z-50 ${
          collapsed ? "w-20" : "w-64"
        }`}
        style={{
          transform: "translateX(-80px)",
          opacity: "0",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header & Toggle */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-background/20 bg-background/5 backdrop-blur-sm">
          <div
            className={`flex items-center gap-3 transition-all duration-300 ${
              collapsed ? "opacity-0 w-0" : "opacity-100"
            }`}
          >
            {!collapsed && (
              <div className="flex flex-col">
                <h1 className="text-lg font-bold bg-accent bg-clip-text font-header tracking-wide text-transparent">
                  Admin Name Here
                </h1>
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="text-background hover:text-amber-300 transition-all duration-200 hover:scale-110 p-1 rounded-full hover:bg-background/10"
          >
            {collapsed ? (
              <MdChevronRight size={20} />
            ) : (
              <MdChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(({ label, lined, filled, path }) => {
            const active =
              label === "Sales"
                ? location.pathname === "/admin" ||
                  location.pathname === "/admin/"
                : location.pathname.startsWith(path);

            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                title={collapsed ? label : ""}
                className={`group w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
                  active
                    ? `bg-accent/20 text-background ${
                        !collapsed ? "border-l-4 border-amber-400" : ""
                      } shadow-lg`
                    : "hover:bg-background/10 hover:text-accent text-background"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-background/5 to-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                    active ? "hidden" : ""
                  }`}
                />
                <span
                  className={`text-xl z-10 transition-all duration-200 ${
                    active
                      ? "text-amber-300 scale-110"
                      : "group-hover:text-background group-hover:scale-105"
                  }`}
                >
                  {active ? filled : lined}
                </span>
                <span
                  className={`text-sm font-medium z-10 transition-all duration-300 ${
                    collapsed
                      ? "opacity-0 translate-x-4 w-0"
                      : "opacity-100 translate-x-0"
                  } ${
                    active ? "text-background" : "group-hover:text-background"
                  }`}
                >
                  {label}
                </span>
                {active && !collapsed && (
                  <div className="absolute right-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="px-6 py-4 border-t border-background/20 bg-background/5">
            <div className="text-md text-accent font-highlight text-center flex items-center gap-2 ">
              <img
                src={logo}
                alt="Company Logo"
                className="h-7 w-auto inline-block bg-secondary rounded-full border border-accent"
              />
              Kalp Academy
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className={`min-h-screen overflow-y-auto pt-6 pb-24 md:pb-6 transition-all duration-300 ${
          collapsed ? "md:pl-20" : "md:pl-64"
        }`}
      >
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-background flex justify-around items-center py-2 px-1 border-t border-background/20 z-50 backdrop-blur-lg">
        {navItems.map(({ label, lined, filled, path }) => {
          const active =
            label === "Sales"
              ? location.pathname === "/admin" ||
                location.pathname === "/admin/"
              : location.pathname.startsWith(path);

          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex flex-col w-12 items-center text-[0.60rem] outline-none transition-all duration-200 py-2 px-2 rounded-lg ${
                active
                  ? "text-amber-300 bg-background/10 scale-105"
                  : "text-indigo-200 hover:text-background hover:bg-background/5"
              }`}
            >
              <span
                className={`text-lg mb-1 transition-transform duration-200 ${
                  active ? "scale-110" : ""
                }`}
              >
                {active ? filled : lined}
              </span>
              <span className="font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminLayout;
