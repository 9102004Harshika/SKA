import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Footer from "../components/Footer";

const Landing = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="bg-gradient-to-b font-body from-background to-secondary text-center">
      {/* Alert Section */}
      <div className="bg-accent text-secondary text-sm py-2">
        <p>
          🔥 Limited Time Offer: New courses with best price available now!
          Hurry up !!! 🔥
        </p>
      </div>

      {/* Navbar */}
      <nav className="flex items-center sticky top-0 justify-between px-6 py-4 bg-primary shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="home" className="flex items-center">
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
            <button className="bg-transparent border-2 border-accent font-bold text-accent px-6 py-2 transition-all hover:border-background duration-300 ease-in-out transform hover:bg-background hover:text-primary shadow-md">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-accent border-2 border-accent font-bold text-primary px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-background hover:border-background hover:text-primary shadow-md">
              Register
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-background text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          <AiOutlineMenu className="text-secondary hover:text-background" />
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
          <AiOutlineClose className="text-secondary hover:text-background" />
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <Link to="/login">
            <button className="w-40 bg-transparent border-2 border-secondary font-bold text-secondary px-6 py-2 transition-all duration-300 ease-in-out transform hover:bg-secondary hover:text-primary shadow-md">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="w-40 bg-secondary border-2 border-secondary font-bold text-primary px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-secondary hover:text-primary shadow-md">
              Register
            </button>
          </Link>
        </div>
      </div>
      <div className="min-h-[120vh] flex justify-center">
        <img
          src="https://blush.design/api/download?shareUri=nwzl7BI-NzkBxYCk&c=Skin_0%7Efbd2ae&w=800&h=800&fm=png"
          alt=""
        />
      </div>
      {/* <img src={Image} /> */}
      <a href="https://storyset.com/education">
        Education illustrations by Storyset
      </a>
      <Footer />
    </section>
  );
};

export default Landing;
