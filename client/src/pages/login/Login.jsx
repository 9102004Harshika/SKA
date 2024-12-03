import React, { useState } from "react";
import { motion } from "framer-motion";
import LeftPanel from "./LeftPanel";
import { loginForm } from "../../config/index";

function LoginPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      // If dragged down more than 100px, open the panel
      setIsPanelOpen(true);
    } else if (info.offset.y < -100) {
      // If dragged up more than 100px, close the panel
      setIsPanelOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative">
      {/* Left Panel for Mobile with Drag Gesture */}
      <motion.div
        drag="y"
        dragConstraints={{
          top: isPanelOpen ? 0 : -window.innerHeight,
          bottom: 0,
        }}
        onDragEnd={handleDragEnd}
        className={`fixed inset-0 bg-gradient-to-r from-primary to-secondary text-white z-20 transition-transform duration-300 ease-in-out ${
          isPanelOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-full overflow-y-auto p-8">
          <button
            onClick={() => setIsPanelOpen(false)}
            className="absolute top-4 right-4 text-white text-xl"
          >
            &#10005;
          </button>
          <LeftPanel />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-screen-lg flex flex-col md:flex-row items-center justify-center h-full">
        {/* Desktop Left Panel */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-r from-primary to-secondary text-white items-center justify-center">
          <LeftPanel />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 bg-card text-card-foreground p-8 shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-3xl font-header font-semibold text-center mb-6">
            Login
          </h2>
          <form className="w-full max-w-md">
            {/* Dynamic Input Fields */}
            {loginForm.map((field, index) => (
              <div className="mb-4" key={index}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  className="w-full px-4 py-2 border border-muted rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            ))}

            {/* Additional Links */}
            <div className="my-4 text-center">
              <p className="text-sm">
                Don't have an account?{" "}
                <a href="#" className="text-accent hover:underline">
                  Sign up
                </a>
              </p>
              <p className="text-sm mt-2">
                Forgot your password?{" "}
                <a href="#" className="text-accent hover:underline">
                  Reset here
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-background py-2 px-4 rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <hr className="flex-grow border-t border-muted" />
            <span className="mx-2 text-sm text-muted-foreground">
              Or login with
            </span>
            <hr className="flex-grow border-t border-muted" />
          </div>

          {/* Google Login Button */}
          <button
            onClick={() => console.log("Login with Google clicked")}
            className="w-full flex items-center justify-center border border-muted rounded-lg py-2 px-4 bg-transparent hover:bg-gray-100 focus:ring-2 focus:ring-accent focus:outline-none"
          >
            <img
              src="https://th.bing.com/th/id/OIP.AUmnbiLoI6qsNjlDmrJ3CwHaH5?rs=1&pid=ImgDetMain"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <span className="text-sm font-medium text-muted-foreground">
              Login with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
