import { Outlet } from "react-router-dom";
import { useState } from "react";
import CourseAdminSidebar from "../components/CourseAdminSidebar";

function CourseAdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex min-h-screen w-full">
        {/* Course Sidebar */}
        <CourseAdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
        <div className="flex flex-1 flex-col">
          {/* Course Page Body */}
          <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
      {/* Admin Footer */}
      {/* <FooterAdmin /> */}
    </div>
  );
}

export default CourseAdminLayout;
