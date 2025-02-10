import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineCheckCircle,
  AiOutlinePicture,
} from "react-icons/ai";
import { Fragment, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import logo from "../../images/logo.png";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <AiOutlineDashboard size={24} />,
  },
  {
    id: "create",
    label: "Add New Course",
    path: "/admin/courses/create",
    icon: <AiOutlineShoppingCart size={24} />,
  },
  {
    id: "edit",
    label: "Edit Course",
    path: "/admin/courses/edit",
    icon: <AiOutlineCheckCircle size={24} />,
  },
  {
    id: "delete",
    label: "Delete Course",
    path: "/admin/courses/delete",
    icon: <AiOutlinePicture size={24} />,
  },
];

function MenuItems({ setOpen, activeMenuItem, setActiveMenuItem }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-10 flex flex-col gap-6">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            setActiveMenuItem(menuItem.id);
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          className={`flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium transition-all 
            ${
              activeMenuItem === menuItem.id
                ? "bg-accent text-background shadow-lg"
                : "text-background hover:bg-muted hover:text-accent"
            }`}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(
    adminSidebarMenuItems.find((item) => location.pathname.includes(item.path))
      ?.id || "dashboard"
  );

  return (
    <div className="flex h-screen">
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 h-full bg-white shadow-xl">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b py-4">
              <SheetTitle className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Ecommerce Logo"
                  className="h-16 w-auto object-cover"
                />
              </SheetTitle>
            </SheetHeader>
            <MenuItems
              setOpen={setOpen}
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
            />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-72 h-screen flex-col bg-primary p-6 shadow-lg lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex flex-col cursor-pointer gap-4 items-center"
        >
          <img src={logo} alt="Logo" className="h-[130px] w-auto object-cover" />
        </div>
        <MenuItems
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
        />
      </aside>
    </Fragment>
     <div className="flex-1 p-6">
     <input
       type="text"
       placeholder="Search courses..."
       className="w-full p-3 border border-gray-300 rounded-md mb-4"
     />
     <div className="flex gap-2 mb-4">
       <button className="px-4 py-2 bg-gray-200 rounded-md">All</button>
       <button className="px-4 py-2 bg-gray-200 rounded-md">Popular</button>
       <button className="px-4 py-2 bg-gray-200 rounded-md">New</button>
     </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       <div className="border p-4 rounded-lg shadow-md">
         <h3 className="text-lg font-semibold">Course Title</h3>
         <p className="text-sm text-gray-600">Course description goes here...</p>
       </div>
       <div className="border p-4 rounded-lg shadow-md">
         <h3 className="text-lg font-semibold">Course Title</h3>
         <p className="text-sm text-gray-600">Course description goes here...</p>
       </div>
       <div className="border p-4 rounded-lg shadow-md">
         <h3 className="text-lg font-semibold">Course Title</h3>
         <p className="text-sm text-gray-600">Course description goes here...</p>
       </div>
     </div>
   </div>
 </div>
  );
}

export default AdminSideBar;
