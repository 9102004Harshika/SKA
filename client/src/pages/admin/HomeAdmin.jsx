import React from "react";
import { useNavigate } from "react-router-dom";
import Settings from "../../ui/illustrations/settings.svg";
import CreateNotes from "../../ui/illustrations/createNotes.svg";
import CreateQuiz from "../../ui/illustrations/createQuiz.svg";
import CreateCourse from "../../ui/illustrations/createCourse.svg";
import logo from "../../images/logo.png";
import FooterAdmin from "../../components/FooterAdmin";
import { handleLogout } from "../../logic/logout/logout";
import { FaSignOutAlt } from "react-icons/fa";

// Placeholder avatar (or fetch from sessionStorage/API if available)
const profilePhoto = sessionStorage.getItem("profilePhoto");

const HomeAdmin = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Courses", icon: CreateCourse, link: "/admin/course" },
    { title: "Notes", icon: CreateNotes, link: "/admin/notes" },
    { title: "Quiz", icon: CreateQuiz, link: "/admin/quiz" },
    { title: "Features", icon: Settings, link: "/admin/feature" },
  ];

  return (
    <div>
      <nav className="flex justify-between items-center bg-primary text-background py-2 px-4 shadow-md">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Company Logo"
            className="h-14 w-auto bg-secondary rounded-full"
          />
          <span className="ml-4 text-3xl font-highlight hidden sm:inline">
            Shri Kalam Academy
          </span>
        </div>

        {/* Right Side: Avatar + Logout */}
        <div className="flex items-center gap-4">
          <img
            src={profilePhoto}
            alt="Instructor Avatar"
            className="w-10 h-10 rounded-full border-2 border-background"
          />
          <button
            onClick={() => handleLogout(navigate)}
            className="flex items-center gap-2 bg-error text-primary font-semibold px-4 py-1 rounded-lg hover:bg-accenta transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </nav>

      {/* Cards Section */}
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-background to-primary p-6">
        <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-4xl">
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              className="flex flex-col items-center justify-center bg-background hover:border-secondary border-4 border-primary shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img src={card.icon} />
              <div className="mt-4 px-4 py-2 border-2 bg-accenta text-primary rounded-2xl  text-3xl tracking-wide font-semibold font-header">
                {card.title}
              </div>
            </a>
          ))}
        </div>
      </div>

      <FooterAdmin />
    </div>
  );
};

export default HomeAdmin;
