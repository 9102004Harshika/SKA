import React from "react";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Unauth = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-secondary p-8 rounded-lg shadow-lg text-center"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ yoyo: Infinity, duration: 1 }}
          className="text-red-500 text-6xl"
        >
          <FaLock />
        </motion.div>
        <h1 className="text-3xl font-bold mt-4">Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You do not have permission to view this page.
        </p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-6 bg-red-500 text-background px-4 py-2 rounded-lg shadow hover:bg-red-600"
          >
            Go to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Unauth;
