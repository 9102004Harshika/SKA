import React from "react";
import Settings from "../../ui/illustrations/settings.svg";
import CreateNotes from "../../ui/illustrations/createNotes.svg";
import CreateQuiz from "../../ui/illustrations/createQuiz.svg";
import CreateCourse from "../../ui/illustrations/createCourse.svg";
import logo from "../../images/logo.png";
import FooterAdmin from "../../components/FooterAdmin";

const HomeAdmin = () => {
  const cards = [
    { title: "Courses", icon: CreateCourse, link: "/admin/course" },
    {
      title: "Notes",
      icon: CreateNotes,
      link: "/admin/notes",
    },
    {
      title: "Quiz",
      icon: CreateQuiz,
      link: "/admin/quiz",
    },
    {
      title: "Features",
      icon: Settings,
      link: "/admin/feature",
    },
  ];

  return (
    <div>
      <nav className=" text-center bg-primary font-bold text-background mb-6 tracking-wide flex items-center justify-center py-2">
        <img
          src={logo}
          alt="Company Logo"
          className="h-14 w-auto inline-block bg-secondary rounded-full"
        />
        <span className="text-background font-highlight text-4xl hidden sm:inline ml-5">
          Shri Kalam Academy
        </span>
      </nav>
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
