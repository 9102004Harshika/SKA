import React, { useState } from "react";
import LeftPanel from "./LeftPanel";

function LoginPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const handleGoogleLogin = () => {
    // Logic for Google Login (e.g., redirect to Google OAuth)
    console.log("Login with Google clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative">
      {/* Left Panel for Mobile */}
      <div
        className={`fixed inset-0 bg-gradient-to-r from-primary to-secondary text-white z-20 transition-transform duration-300 ease-in-out ${
          isPanelOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-full overflow-y-auto p-8">
          <button
            onClick={togglePanel}
            className="absolute top-4 right-4 text-white text-xl"
          >
            &#10005;
          </button>
          <LeftPanel />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-screen-lg flex flex-col md:flex-row items-center justify-center h-full">
        {/* Desktop Left Panel */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-r from-primary to-secondary text-white items-center justify-center">
          <LeftPanel />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 bg-card text-card-foreground p-8 shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
          <form className="w-full max-w-md">
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-muted rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-muted rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter your password"
                required
              />
            </div>

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
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
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
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border border-muted rounded-lg py-2 px-4 bg-transparent hover:bg-gray-100 focus:ring-2 focus:ring-muted focus:outline-none"
          >
            <img
              src="https://th.bing.com/th/id/OIP.AUmnbiLoI6qsNjlDmrJ3CwHaH5?rs=1&pid=ImgDetMain"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <span className="text-sm font-medium text-muted-foreground">
              Google
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={togglePanel}
        className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-md z-10"
      >
        {isPanelOpen ? "Close Panel" : "Open Panel"}
      </button>
    </div>
  );
}

export default LoginPage;
