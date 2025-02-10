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
    label: "Create New",
    path: "/admin/courses/create",
    icon: <AiOutlineShoppingCart size={24} />,
  },
  {
    id: "edit",
    label: "Update",
    path: "/admin/courses/edit",
    icon: <AiOutlineCheckCircle size={24} />,
  },
  {
    id: "delete",
    label: "Delete",
    path: "/admin/courses/delete",
    icon: <AiOutlinePicture size={24} />,
  },
];

function MenuItems({ setOpen, activeMenuItem, setActiveMenuItem }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex flex-col gap-2">
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
                ? "bg-primary text-background shadow-lg"
                : "text-primary hover:bg-muted hover:text-secondary"
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
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-72 rounded-lg bg-white shadow-xl"
        >
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
      <aside className="hidden w-72 flex-col border-r bg-background p-6 shadow-lg lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex flex-col cursor-pointer gap-4 items-center"
        >
          <img src={logo} alt="Logo" className="h-20 w-auto object-cover" />
        </div>
        <MenuItems
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
        />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
