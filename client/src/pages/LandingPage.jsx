import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import Footer from "../components/Footer";
import Image from "../ui/illustrations/image.svg";
import Learning from "../ui/illustrations/learning.svg";
import Video from "../ui/illustrations/video.svg";
import Notes from "../ui/illustrations/notes.svg";
import Quiz from "../ui/illustrations/quiz.svg";
import { Button } from "../ui/button";
import {motion } from 'framer-motion'
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
      <div className="bg-gradient-to-b h-[80vh] from-primary to-secondary py-12 relative font-[Arial] overflow-hidden">
  {/* Graduation Hat Icon in Background */}
  <FaGraduationCap className="absolute right-[5%] top-[25%] transform -translate-y-1/2 text-gray-400 opacity-10 text-[400px] rotate-[25deg]" />

  {/* Concentric Circles on the Right Side */}
  <div className="absolute left-0 top-[2%] transform -translate-y-1/2  flex items-center justify-center ">
    <div className="w-[500px] h-[500px] border-2 border-gray-400 opacity-10 rounded-full absolute rotate-[35deg] "></div>
    <div className="w-[400px] h-[400px] border-2 border-gray-400 opacity-10 rounded-full absolute rotate-[-15deg]"></div>
    <div className="w-[300px] h-[300px] border-2 border-gray-400 opacity-10 rounded-full absolute rotate-[10deg]"></div>
    <div className="w-[200px] h-[200px] border-2 border-gray-400 opacity-10 rounded-full absolute rotate-[-5deg]"></div>
  </div>

  {/* Text Content */}
  <h1 className="text-[110px] font-bold text-accent leading-tight text-start ml-[150px]">
    <span className="ml-[-80px]">Your Smart</span> <br />
    <span className="relative inline-block ml-[150px]">
      Learning
      <span className="absolute left-0 top-0 -z-10 text-transparent stroke-2 stroke-[#FFC33E]">
        Learning
      </span>
    </span>
    <span className="outline-text"> Journey</span>
  </h1>
</div>

<style>
  {`
    .outline-text {
      color: transparent;
      -webkit-text-stroke: 2px #FFC33E;
    }
  `}
</style>



<section className="h-auto flex justify-evenly flex-col md:flex-row">
  {[
    { img: Video, title: "Videos" },
    { img: Notes, title: "Notes" },
    { img: Quiz, title: "Quizzes" },
  ].map((item, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: -50 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <img src={item.img} width={350} height={350} />
      <h2 className="text-primary text-3xl font-header tracking-wide font-semibold">
        {item.title}
      </h2>
      <p className="font-body text-tertiary text-justify leading-relaxed px-10">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur
        consequuntur saepe praesentium necessitatibus omnis corporis voluptas
        culpa sit iure sequi.
      </p>
    </motion.div>
  ))}
</section>

      <section className="flex justify-between pl-20 pr-20 pt-20">
        <div className="text-start py-10">
        <h1 className="text-6xl font-bold font-header mb-10">About US</h1>
        <p className="font-body text-tertiary leading-relaxed w-[800px]">
        We specialize in providing robust and scalable Learning Management System solutions for businesses and organizations. Our platform is designed to streamline training, enhance employee development, and improve organizational efficiency. We offer customizable solutions to meet the unique needs of our clients, ensuring that they can deliver effective and impactful training programs
      </p>
        </div>
        
        <div>
        <img src={Learning} width={350} height={350} />
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default Landing;
