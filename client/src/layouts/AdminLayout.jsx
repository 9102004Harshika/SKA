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
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import clsx from "clsx";

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
  const { pathname } = useLocation();
  const sidebarRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      sidebarRef.current,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={clsx(
          "hidden md:flex flex-col bg-primary text-white shadow-xl transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Header & Toggle */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          {!collapsed && (
            <h2 className="text-lg font-semibold tracking-wide">Admin Panel</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-accent transition"
          >
            {collapsed ? (
              <MdChevronRight size={24} />
            ) : (
              <MdChevronLeft size={24} />
            )}
          </button>
        </div>

        {/* Nav Items */}
        {navItems.map(({ label, lined, filled, path }) => {
          const active =
            label === "Sales"
              ? pathname === "/admin" || pathname === "/admin/"
              : pathname.startsWith(path);

          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              title={collapsed ? label : ""}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-lg group transition-all duration-200 relative",
                active
                  ? "bg-secondary text-white border-l-4 border-accent"
                  : "hover:bg-secondary/70 hover:text-white"
              )}
            >
              <span className="text-2xl">{active ? filled : lined}</span>
              {!collapsed && (
                <span className="text-base font-medium truncate">{label}</span>
              )}
            </button>
          );
        })}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-20 md:pb-4 overflow-y-auto">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-primary text-white flex justify-around items-center py-2 border-t border-white/10 z-50">
        {navItems.map(({ label, lined, filled, path }) => {
          const active =
            label === "Sales"
              ? pathname === "/admin" || pathname === "/admin/"
              : pathname.startsWith(path);

          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={clsx(
                "flex flex-col items-center text-xs",
                active ? "text-accent" : ""
              )}
            >
              <span className="text-xl">{active ? filled : lined}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminLayout;
