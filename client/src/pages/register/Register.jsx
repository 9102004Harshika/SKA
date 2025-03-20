import React, { useState, useEffect, useRef } from "react";
import { Input } from "../../ui/input";
import { registerForm } from "../../config/index";
import myImage from "../../images/bgPurple.png";
import { Button } from "../../ui/button";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import RightPanel from "./RightPanel";
import { useNavigate } from "react-router-dom";
import {
  GoogleRegister,
  handleSubmit,
} from "../../logic/register/registerSubmit";
function RegisterPage() {
  const [formData, setFormData] = useState({});
  const rightPanelRef = useRef(null);
  const registerFormRef = useRef(null);
  const navigate = useNavigate();
  const login = GoogleRegister(navigate);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background text-foreground bg-cover bg-center"
      style={{ backgroundImage: `url(${myImage})` }}
    >
      <div className="w-full max-w-screen-lg flex flex-col md:flex-row items-center justify-center h-full">
        <div
          ref={registerFormRef}
          className="w-full md:w-1/2 bg-background text-card-foreground p-8 flex flex-col items-center border-2 border-primary"
          style={{ boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 22px" }}
        >
          <h2 className="text-3xl font-semibold capitalize md:tracking-wide font-header text-center mb-6">
            Elevate Your Learning
          </h2>
          <form
            className="w-full max-w-md"
            onSubmit={(e) => handleSubmit(e, formData, navigate)}
            noValidate
          >
            {registerForm.map((field, index) => (
              <div className="mb-5" key={index}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                <Input
                  className="placeholder:text-primary placeholder:opacity-[0.8]"
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
            <Button
              text="Enroll Now"
              size="lg"
              variant="primary"
              type="submit"
            />
          </form>

          <div className="flex items-center w-full mb-2">
            <hr className="flex-grow border-t border-muted border-primary" />
            <span className="mx-1 text-sm text-muted-foreground">
              Or sign up with
            </span>
            <hr className="flex-grow border-t border-muted border-primary" />
          </div>

          {/* Social Sign-Up Buttons */}
          <div className="flex space-x-4 w-full flex-wrap">
            {/* Google Login */}
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
            {/* Facebook Login */}

            <Button
              text={
                <div className="flex items-center justify-center">
                  <FaFacebook className="w-5 h-5 mr-2" />
                  <span className="hidden lg:inline">Facebook</span>
                </div>
              }
              size="sm"
              variant="secondary"
            />
          </div>
          <p>
            Already have a account ?{" "}
            <a
              href="/login"
              className="text-secondary font-bold hover:underline underline-offset-2"
            >
              Login
            </a>
          </p>
        </div>

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
