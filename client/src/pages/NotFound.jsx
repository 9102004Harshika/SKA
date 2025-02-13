import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";
import logo from "../images/logo.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      <motion.img
        src={logo}
        alt="Logo"
        className="w-24 h-24 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl mt-2">Oops! Page Not Found</p>
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ rotate: -10 }}
        animate={{ rotate: 10 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
      >
        <FaBookOpen className="text-6xl text-primary" />
      </motion.div>

      <motion.p
        className="mt-4 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Looks like you've lost your way. Let's get you back!
      </motion.p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-primary text-white rounded-full text-lg hover:bg-accent transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
