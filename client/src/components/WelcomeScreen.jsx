// components/WelcomeScreen.jsx
import { motion } from "framer-motion";

const WelcomeScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-primary flex items-center justify-center"
    >
      <h1 className="text-background text-6xl md:text-8xl font-bold text-center">
        Welcome back !!!
      </h1>
    </motion.div>
  );
};

export default WelcomeScreen;
