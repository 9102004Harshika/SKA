import React, { useState, useEffect, useRef } from "react";
import { Input } from "../../ui/input";
import { registerForm } from "../../config/index";
import myImage from "../../images/bgNavy.png";
import { Button } from "../../ui/button";
import { FaGoogle, FaApple } from "react-icons/fa";
import { TiVendorMicrosoft } from "react-icons/ti";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import RightPanel from "./RightPanel"; // Import the RightPanel component

function RegisterPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const rightPanelRef = useRef(null);
  const registerFormRef = useRef(null);

  // GSAP animation for the RightPanel
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      rightPanelRef.current,
      { x: "100%" },
      { x: "0%", duration: 1.2, ease: "power3.out" }
    );

    tl.fromTo(
      registerFormRef.current,
      { opacity: 0, x: "-50%" },
      { opacity: 1, x: "0%", duration: 0.8, ease: "power3.out" },
      "-=0.8"
    );
  }, []);

  const handleGoogleSignup = () => {
    console.log("Sign Up with Google clicked");
  };

  const handleFacebookSignup = () => {
    console.log("Sign Up with Facebook clicked");
  };

  const handleTwitterSignup = () => {
    console.log("Sign Up with Twitter clicked");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background text-foreground bg-cover bg-center"
      style={{
        backgroundImage: `url(${myImage})`,
      }}
    >
      {/* Main Content */}
      <div className="w-full max-w-screen-lg flex flex-col md:flex-row items-center justify-center h-full">
        {/* Registration Form */}
        <div
          ref={registerFormRef}
          className="w-full md:w-1/2 bg-background text-card-foreground p-8 flex flex-col items-center border-2 border-primary"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 22px",
          }}
        >
          <h2 className="text-3xl font-semibold capitalize md:tracking-wide font-header text-center mb-6">
            Elevate Your Learning
          </h2>
          <form className="w-full max-w-md">
            {/* Dynamic Input Fields */}
            {registerForm.map((field, index) => (
              <div className="" key={index}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                <Input
                  className="placeholder:text-primary placeholder:opacity-[0.5]"
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            ))}

            {/* Additional Links */}
            <div className="my-2 text-center">
              <p className="text-sm">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-accent font-bold hover:underline underline-offset-2"
                >
                  Login here
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <Button text="Enrol Now" size="lg" variant="primary" />
          </form>

          {/* Divider */}
          <div className="flex items-center w-full mb-2">
            <hr className="flex-grow border-t border-muted border-primary" />
            <span className="mx-1 text-sm text-muted-foreground">
              Or sign up with
            </span>
            <hr className="flex-grow border-t border-muted border-primary" />
          </div>

          {/* Social Media Sign-Up Buttons */}
          <div className="flex space-x-4 w-full justify-between flex-wrap">
            {/* Google Sign-Up Button */}
            <Button
              text={
                <div className="flex items-center justify-center">
                  <FaGoogle className="w-5 h-5 mr-2" /> {/* Google Icon */}
                  <span className="hidden lg:inline">Google</span>{" "}
                  {/* Text hidden on mobile */}
                </div>
              }
              size="sm"
              variant="secondary"
              onClick={handleGoogleSignup}
            />

            {/* Microsoft Sign-Up Button */}
            <Button
              text={
                <div className="flex items-center justify-center">
                  <TiVendorMicrosoft className="w-5 h-5 mr-2" />{" "}
                  {/* Microsoft Icon */}
                  <span className="hidden lg:inline">Microsoft</span>{" "}
                  {/* Text hidden on mobile */}
                </div>
              }
              size="sm"
              variant="secondary"
              onClick={handleFacebookSignup}
            />

            {/* Apple Sign-Up Button */}
            <Button
              text={
                <div className="flex items-center justify-center">
                  <FaApple className="w-5 h-5 mr-2" /> {/* Apple Icon */}
                  <span className="hidden lg:inline">Apple</span>{" "}
                  {/* Text hidden on mobile */}
                </div>
              }
              size="sm"
              variant="secondary"
              onClick={handleTwitterSignup} // Change to appropriate handler for Apple
            />
          </div>
        </div>

        {/* Right Panel */}
        <motion.div
          ref={rightPanelRef}
          className="hidden md:flex w-1/2 bg-gradient-to-l from-secondary to-primary text-background items-center justify-center"
        >
          <RightPanel />
        </motion.div>
      </div>
    </div>
  );
}

export default RegisterPage;
