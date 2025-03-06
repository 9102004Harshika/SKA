import { Outlet } from "react-router-dom";
import { useState } from "react";
import FeaturesAdminSidebar from "../components/FeaturesAdminSidebar";

function FeatureAdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen w-full flex">
      {/* Fixed Sidebar */}
      <div className="h-screen fixed top-0 left-0 z-50">
        <FeaturesAdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      </div>
      {/* Course Page Body */}
      <div className="flex-1 flex flex-col ml-[250px]">
        <main className="flex-1 flex flex-col bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      {/* Admin Footer */}
      {/* <FooterAdmin /> */}
    </div>
  );
}

export default FeatureAdminLayout;
