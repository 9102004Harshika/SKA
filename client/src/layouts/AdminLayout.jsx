import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdMenuBook,
  MdQuiz,
  MdStickyNote2,
  MdSettings,
  MdPeople,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import gsap from "gsap";

const navItems = [
  { label: "Sales", icon: <MdDashboard />, path: "/admin" },
  { label: "Courses", icon: <MdMenuBook />, path: "/admin/course" },
  { label: "Quiz", icon: <MdQuiz />, path: "/admin/quiz" },
  { label: "Notes", icon: <MdStickyNote2 />, path: "/admin/notes" },
  { label: "Settings", icon: <MdSettings />, path: "/admin/feature" },
  { label: "Teacher", icon: <MdPeople />, path: "/admin/instructor" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sidebarRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Initial sidebar animation
    gsap.fromTo(
      sidebarRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`hidden md:flex flex-col ${
          collapsed ? "w-20" : "w-64"
        } bg-primary text-white py-4 px-2 xl:px-4 border-r border-tertiary transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          className="self-end mb-4 text-white hover:text-accent"
          onClick={toggleSidebar}
        >
          {collapsed ? (
            <MdChevronRight size={24} />
          ) : (
            <MdChevronLeft size={24} />
          )}
        </button>

        <nav className="flex flex-col gap-2">
          {navItems.map(({ label, icon, path }) => {
            const active = pathname.startsWith(path);
            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 text-sm ${
                  active
                    ? "bg-secondary text-white"
                    : "hover:bg-secondary/70 hover:text-white"
                }`}
              >
                <span className="text-lg">{icon}</span>
                {!collapsed && <span>{label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 pb-20 md:pb-4 overflow-y-auto">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-primary text-white flex justify-around items-center py-2 border-t border-tertiary z-50">
        {navItems.map(({ label, icon, path }) => {
          const active = pathname.startsWith(path);
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center text-xs ${
                active ? "text-accent" : ""
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminLayout;
