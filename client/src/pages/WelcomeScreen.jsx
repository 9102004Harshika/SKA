import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state;
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/app");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1D0042] text-white">
    <motion.h1
     className="text-4xl text-background font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}>
        Hi {userName} ,
    </motion.h1>
      <motion.h1
        className="text-4xl text-background font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
      Welcome to
        <motion.span
          className="text-accent ml-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
        >
          Shree Kalam Academy!
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-lg  text-background text-center max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
      Let's get started on your learning journey.
      </motion.p>
    </div>
  );
};

export default WelcomeScreen;
