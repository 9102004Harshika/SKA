import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Footer from "../components/Footer";
import Image from "../ui/illustrations/image.svg";
import Learning from "../ui/illustrations/learning.svg";
import Video from "../ui/illustrations/video.svg";
import Notes from "../ui/illustrations/notes.svg";
import Quiz from "../ui/illustrations/quiz.svg";
import { Button } from "../ui/button";
const Landing = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="bg-background font-body  text-center">
      {/* Alert Section */}
      <div className="bg-accent text-secondary text-sm py-2">
        <p>
          🔥 Limited Time Offer: New courses with best price available now!
          Hurry up !!! 🔥
        </p>
      </div>

      {/* Navbar */}
      <nav className="flex items-center sticky top-0 justify-between px-6 py-2 sm:py-0 bg-primary shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/login" className="flex items-center outline-none">
            <img
              src={logo}
              alt="Company Logo"
              className="h-10 w-auto inline-block bg-secondary rounded-full"
            />
            <span className="text-background font-highlight text-xl ml-3 tracking-wide">
              Shree Kalam Academy
            </span>
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <Link to="/login">
            <Button text="Login" variant="white" size="xs" />
          </Link>
          <Link to="/register">
            <Button text="Register" variant="accent" size="xs" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-background text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          <AiOutlineMenu className="text-background hover:text-accent" />
        </button>
      </nav>

      {/* Sidebar Menu (Mobile) - Slides in from LEFT */}
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-primary shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-background text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          <AiOutlineClose className="text-background hover:text-accent" />
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <Link to="/login">
            <button className="w-40 bg-background border-2 border-secondary font-bold text-secondary px-6 py-2 transition-all duration-300 ease-in-out transform hover:bg-secondary hover:text-primary shadow-md">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="w-40 bg-accent border-2 border-secondary font-bold text-primary px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-secondary hover:text-primary shadow-md">
              Register
            </button>
          </Link>
        </div>
      </div>
      <section className="min-h-[120vh] flex justify-evenly flex-col md:flex-row">
        <div className="flex flex-col items-center">
          <img src={Video} width={350} height={350} />
          <h2 className="text-primary text-3xl font-header tracking-wide font-semibold">
            Videos
          </h2>
          <p className="font-body text-tertiary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consectetur consequuntur saepe praesentium necessitatibus omnis
            corporis voluptas culpa sit iure sequi.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img src={Notes} width={350} height={350} />
          <h2 className="text-primary text-3xl font-header tracking-wide font-semibold">
            Notes
          </h2>
          <p className="font-body text-tertiary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consectetur consequuntur saepe praesentium necessitatibus omnis
            corporis voluptas culpa sit iure sequi.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img src={Quiz} width={350} height={350} />
          <h2 className="text-primary text-3xl font-header tracking-wide font-semibold">
            Quizzes
          </h2>
          <p className="font-body text-tertiary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consectetur consequuntur saepe praesentium necessitatibus omnis
            corporis voluptas culpa sit iure sequi.
          </p>
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default Landing;
