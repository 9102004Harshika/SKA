import React from "react";
import {
  FaBook,
  FaChalkboardTeacher,
  FaClipboardList,
  FaTachometerAlt,
} from "react-icons/fa";
import logo from "../../images/logo.png";
import FooterAdmin from "../../components/FooterAdmin";

const HomeAdmin = () => {
  const cards = [
    { title: "Courses", icon: <FaBook size={60} />, link: "/admin/course" },
    {
      title: "Notes",
      icon: <FaClipboardList size={60} />,
      link: "/admin/notes",
    },
    {
      title: "Quiz",
      icon: <FaChalkboardTeacher size={60} />,
      link: "/admin/quiz",
    },
    {
      title: "Features",
      icon: <FaTachometerAlt size={60} />,
      link: "/admin/feature",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-background p-6">
      <div className="text-3xl font-bold text-primary mb-6">
        <img
          src={logo}
          alt="Company Logo"
          className="h-20 w-auto inline-block bg-secondary rounded-full"
        />
        <span className="text-primary font-header font-extrabold text-4xl hidden sm:inline ml-5">
          Shri Kalam Academy
        </span>
      </div>
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.link}
            className="flex flex-col items-center justify-center bg-secondary hover:bg-accent border-4 border-primary shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="text-primary">{card.icon}</div>
            <div className="mt-4 text-lg font-semibold text-primary">
              {card.title}
            </div>
          </a>
        ))}
      </div>
      <div className="font-bold my-10 text-2xl font-highlight">
        शिक्षा ही वह तलवार है, जो अंधकार को चीर सकती है।
      </div>
      <FooterAdmin />
    </div>
  );
};

export default HomeAdmin;
