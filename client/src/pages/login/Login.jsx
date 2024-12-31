import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import LeftPanel from "./LeftPanel";
import myImage from "../../images/bgNavy.png";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FaGoogle, FaApple } from "react-icons/fa";
import { TiVendorMicrosoft } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { loginForm } from "../../config/index";
import { GoogleLogin, handleSubmit } from "../../logic/login/loginSubmit";
function LoginPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const leftPanelRef = useRef(null);
  const loginFormRef = useRef(null);
  const navigate = useNavigate();
  const login=GoogleLogin(navigate)
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      leftPanelRef.current,
      { opacity: 0, x: "-30%" },
      { opacity: 1, x: "0%", duration: 1.2, ease: "power3.out" }
    );
    tl.fromTo(
      loginFormRef.current,
      { opacity: 0, x: "30%" },
      { opacity: 1, x: "0%", duration: 0.8, ease: "power3.out" },
      "-=0.8"
    );
  }, []);


  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      setIsPanelOpen(true);
    } else if (info.offset.y < -100) {
      setIsPanelOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background text-foreground relative"
      style={{
        backgroundImage: `url(${myImage})`,
      }}
    >
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
        <div
          ref={leftPanelRef}
          className="hidden md:flex w-1/2 bg-gradient-to-r from-secondary to-primary text-background items-center justify-center"
        >
          <LeftPanel />
        </div>

        {/* Login Form */}
        <div
          ref={loginFormRef}
          className="w-full md:w-1/2 bg-background text-card-foreground p-8 shadow-lg flex flex-col items-center"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 22px",
          }}
        >
          <h2 className="text-3xl capitalize md:tracking-wide font-header font-semibold text-center mb-6">
            Return to learning
          </h2>
          <form className="w-full max-w-md" onSubmit={(e) => handleSubmit(e, formData, navigate)} noValidate>
            {loginForm.map((field, index) => (
              <div className="mb-5" key={index}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                <Input
                  className="placeholder:text-primary placeholder:opacity-[0.5]"
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <div className="mb-2 text-center">
              <p className="text-sm mt-0">
                Forgot your password?{" "}
                <a
                  href="/forgotPassword"
                  className="text-accent font-bold hover:underline underline-offset-2"
                >
                  Reset here
                </a>
              </p>
            </div>

            <Button text="Sign In" size="lg" variant="primary" type="submit" />
          </form>

          <div className="flex items-center w-full mb-2">
            <hr className="flex-grow border-t border-muted border-primary" />
            <span className="mx-2 text-sm text-muted-foreground">Or login with</span>
            <hr className="flex-grow border-t border-muted border-primary" />
          </div>

          <div className="flex space-x-4 w-full justify-between flex-wrap sm:justify-between">
            <Button
              text={
                <div className="flex items-center justify-center">
                  <FaGoogle className="w-5 h-5 mr-2" />
                  <span className="hidden lg:inline">Google</span>
                </div>
              }
              size="sm"
              variant="secondary"
              onClick={() => login()}
            />
            {/* <Button
              text={
                <div className="flex items-center justify-center">
                  <TiVendorMicrosoft className="w-5 h-5 mr-2" />
                  <span className="hidden lg:inline">Microsoft</span>
                </div>
              }
              size="sm"
              variant="secondary"
            /> */}
            {/* <Button
              text={
                <div className="flex items-center justify-center">
                  <FaApple className="w-5 h-5 mr-2" />
                  <span className="hidden lg:inline">Apple</span>
                </div>
              }
              size="sm"
              variant="secondary"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
