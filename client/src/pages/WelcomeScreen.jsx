import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const WelcomeScreen = () => {
  const [randomQuote, setRandomQuote] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName, role } = location.state || {};

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/quotes/getQuote`
        );
        const quotes = response.data;

        if (quotes.length > 0) {
          const randomIndex = Math.floor(Math.random() * quotes.length);
          setRandomQuote(quotes[randomIndex]);
        }
      } catch (err) {
        console.error("Error fetching quotes:", err.message);
      }
    };

    fetchQuotes();

    const timer = setTimeout(() => {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/app");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, role]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1D0042] text-white px-4 text-center">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Hi {fullName},
      </motion.h1>

      <motion.h1
        className={`text-3xl font-semibold mb-4`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {role === "admin" ? "Admin access granted to" : "Welcome to"}
        <motion.span
          className="text-yellow-400 ml-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6, type: "spring" }}
        >
          Shree Kalam Academy!
        </motion.span>
      </motion.h1>

      {randomQuote && (
        <motion.blockquote
          className="italic text-yellow-300 text-sm max-w-md mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          "{randomQuote.quote}"
          <footer className="mt-2 text-xs text-yellow-100">
            — {randomQuote.writtenBy}
          </footer>
        </motion.blockquote>
      )}
    </div>
  );
};

export default WelcomeScreen;
