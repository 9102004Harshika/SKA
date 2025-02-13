import { Outlet } from "react-router-dom";
import { useState } from "react";
import CourseAdminSidebar from "../components/CourseAdminSidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MainLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Course Sidebar */}
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
}

export default MainLayout;
