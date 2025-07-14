import React, { useEffect, useState } from "react";
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
import { motion, useAnimation } from "framer-motion";

const Landing = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const controls = useAnimation();
  const fadeVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-background font-body text-center relative">
      {/* Alert Section */}
      <div className="bg-accent text-secondary text-sm py-2 z-50 relative">
        <p>
          🔥 Limited Time Offer: New courses with best price available now!
          Hurry up !!! 🔥
        </p>
      </div>

      {/* Navbar */}
      <nav className="flex items-center sticky top-0 justify-between px-6 py-2 sm:py-0 bg-primary shadow-md z-40">
        <div className="flex items-center gap-2">
          <a href="/login" className="flex items-center outline-none">
            <img
              src={logo}
              alt="Company Logo"
              className="h-10 w-auto inline-block bg-secondary rounded-full"
            />
            <span className="text-background font-highlight text-xl ml-3 tracking-wide">
              Kalp Academy
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
          className="md:hidden text-background text-2xl z-50"
          onClick={() => setMenuOpen(true)}
        >
          <AiOutlineMenu className="text-background hover:text-accent" />
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-primary shadow-lg z-[100] transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-background text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          <AiOutlineClose className="hover:text-accent" />
        </button>

        <div className="flex flex-col items-center justify-center h-full gap-6">
          <Link to="/login">
            <button className="w-40 bg-background border-2 border-secondary font-bold text-secondary px-6 py-2 transition-all duration-300 transform hover:bg-secondary hover:text-primary shadow-md">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="w-40 bg-accent border-2 border-secondary font-bold text-primary px-6 py-2 transition-all duration-300 transform hover:scale-105 hover:bg-secondary hover:text-primary shadow-md">
              Register
            </button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b md:h-[65vh] from-primary to-secondary py-12 relative font-[Arial] overflow-hidden z-0">
        <FaGraduationCap className="hidden md:block absolute right-[5%] top-[25%] transform -translate-y-1/2 text-gray-400 opacity-10 text-[400px] rotate-[25deg]" />

        <div className="absolute left-0 top-[2%] transform -translate-y-1/2 flex items-center justify-center">
          <div className="w-[500px] h-[500px] border-2 border-gray-400 opacity-10 rounded-full absolute rotate-[35deg]" />
          <div className="w-[400px] h-[400px] border-2 border-gray-400 opacity-10 rounded-full absolute rotate-[-15deg]" />
          <div className="w-[300px] h-[300px] border-2 border-gray-400 opacity-10 rounded-full absolute rotate-[10deg]" />
          <div className="w-[200px] h-[200px] border-2 border-gray-400 opacity-10 rounded-full absolute rotate-[-5deg]" />
        </div>

        <h1 className="text-[55px] md:text-[110px] font-bold text-accent leading-tight text-center md:text-left md:ml-[150px]">
          <motion.span
            className="inline-block ml-[-20px] md:ml-0"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            One Stop
          </motion.span>
          <br />
          <motion.span
            className="relative inline-block ml-[-10px] md:ml-[150px]"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Learning
            <span className="absolute left-0 top-0 -z-10 text-transparent stroke-2 stroke-[#FFC33E]">
              Learning
            </span>
          </motion.span>
          &nbsp;
          <motion.span
            className="inline-block outline-text"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Destination
          </motion.span>
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

      {/* Features Section */}
      <section className="h-auto flex justify-evenly flex-col md:flex-row">
        {[
          {
            img: Video,
            title: "Videos",
            desc: "Access high-quality video lectures designed to make learning easy, engaging, and effective with expert explanations and visual clarity.",
          },
          {
            img: Notes,
            title: "Notes",
            desc: "Get well-structured notes that simplify complex topics and help reinforce your understanding with clear summaries and visuals.",
          },
          {
            img: Quiz,
            title: "Quizzes",
            desc: "Test your knowledge with topic-wise quizzes designed to challenge and improve your understanding through active recall.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="flex flex-col items-center"
          >
            <img src={item.img} width={350} height={350} alt={item.title} />
            <h2 className="text-primary text-3xl font-header tracking-wide font-semibold">
              {item.title}
            </h2>
            <p className="font-body text-tertiary text-justify leading-relaxed px-10 py-2">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* About Section */}
      <motion.section
        className="md:flex md:flex-row flex-col justify-between md:pl-20 md:pr-20 md:pt-20 pl-10 pr-10"
        variants={fadeVariants}
        initial="hidden"
        animate={controls}
        onViewportEnter={() => controls.start("visible")}
        onViewportLeave={() => controls.start("hidden")}
        viewport={{ amount: 0.2 }}
      >
        <motion.div className="text-start py-10">
          <h1 className="text-6xl font-bold font-header mb-10">About US</h1>
          <p className="font-body text-tertiary leading-relaxed md:w-[800px]">
            At Kalp Academy, we specialize in providing top-tier
            educational solutions through our robust and scalable Learning
            Management System (LMS). Our platform is designed to enhance the
            learning experience, simplify course management, and support both
            students and instructors. With customizable features, we ensure
            that every learner receives effective, engaging, and impactful
            training, tailored to meet their educational needs and aspirations.
          </p>
        </motion.div>

        <motion.div>
          <img src={Learning} width={350} height={350} alt="Learning" />
        </motion.div>
      </motion.section>

      <Footer />
    </section>
  );
};

export default Landing;
