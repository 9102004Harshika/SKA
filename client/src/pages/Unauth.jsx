import React, { useEffect, useRef } from "react";
import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Unauth = () => {
  const iconRef = useRef(null);

  useEffect(() => {
    gsap.to(iconRef.current, {
      keyframes: [
        { x: -2, y: 0 },
        { x: 2, y: 1 },
        { x: -2, y: -1 },
        { x: 2, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ],
      duration: 0.5,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-accent text-primary p-10 rounded-2xl shadow-2xl w-full max-w-md text-center border border-primary"
      >
        <div className="flex justify-center mb-4">
          <div ref={iconRef} className="text-error text-7xl">
            <MdNoEncryptionGmailerrorred />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold mb-2 tracking-wide text-secondary">
          Access Denied
        </h1>
        <p className="text-primary mb-6 leading-relaxed">
          You don't have permission to access this page. Please go back to a
          valid page or contact your administrator.
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-error text-accent font-medium px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Go to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Unauth;
