import { AiOutlinePicture } from "react-icons/ai";
import {BsChatQuote} from 'react-icons/bs'
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Carousel Image",
    path: "/admin/feature",
    icon: <AiOutlinePicture size={24} />,
  },
  {
    id:'quote',
    label:"Create Quote",
    path:'/admin/feature/quote',
    icon:<BsChatQuote size={24}/>
  }
  ,
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
                ? "bg-accent text-primary shadow-lg"
                : "text-background hover:bg-tertiary hover:text-accent"
            }`}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function FeaturesAdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(null);

  // 🔹 Update activeMenuItem when URL changes
  useEffect(() => {
    const currentItem =
      adminSidebarMenuItems.find((item) => item.path === location.pathname)
        ?.id || null;
    setActiveMenuItem(currentItem);
  }, [location.pathname]); // Runs when location.pathname changes

  return (
    <aside className="w-72 h-screen flex-col bg-primary p-6 shadow-lg hidden lg:flex">
      <div
        onClick={() => navigate("/admin")}
        className="flex flex-col cursor-pointer gap-4 items-center"
      >
        <img src={logo} alt="Logo" className="h-[130px] w-auto object-cover" />
      </div>
      <MenuItems
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />
    </aside>
  );
}

export default FeaturesAdminSidebar;
