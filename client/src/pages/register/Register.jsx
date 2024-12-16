import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Input } from "../../ui/input";
import { registerForm } from "../../config/index";
import myImage from "../../images/bgNavy.png";
import { Button } from "../../ui/button";
import { FaGoogle, FaApple } from "react-icons/fa";
import { TiVendorMicrosoft } from "react-icons/ti";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import RightPanel from "./RightPanel";
import { toast } from "../../components/use-toast";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin ,useGoogleLogin} from "@react-oauth/google";  // Import Google OAuth

function RegisterPage() {
  const [formData, setFormData] = useState({});
  const rightPanelRef = useRef(null);
  const registerFormRef = useRef(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic (same as you already have)
    let isValid = true;

    // Check for any missing fields and validate them
    if (!isValid) return;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/register',
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast({
          title: "Registration Successful",
          description: "Congratulations! Your registration has been successfully completed.",
          variant: "success",
        });
        navigate("/enrollment");
      } else {
        toast({
          title: "Registration Failed",
          description: "An error occurred during registration. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Server Error",
        description: "We encountered an issue with the server. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Google Login success handler
  const handleGoogleLogin = async (response) => {
    try {
      const googleToken = response.credential; // This is the token from Google

      const { data } = await axios.post(
        'http://localhost:5000/api/register/google',
        { googleToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
      if (data.success) {
        toast({
          title: "Registration Successful",
          description: "You have successfully signed up with Google.",
          variant: "success",
        });
        navigate("/enrollment");
      } else {
        toast({
          title: "Google Signup Failed",
          description: "An error occurred during Google signup. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast({
        title: "Server Error",
        description: "An error occurred during Google signup. Please try again later.",
        variant: "destructive",
      });
    }
  };
  const login = useGoogleLogin({
    onSuccess: async(response) => {
      // Handle successful login, e.g., send the response to your backend
      console.log('Login Success:', response);
      // You can also extract the token from the response:
     
    },
    onError: (error) => {
      console.log('Login Failed:', error);
    }
  });
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
            <form className="w-full max-w-md" onSubmit={handleSubmit} noValidate>
              {registerForm.map((field, index) => (
                <div className="mb-5" key={index}>
                  <label className="block text-sm font-medium mb-1">{field.label}</label>
                  <Input
                    className="placeholder:text-primary placeholder:opacity-[0.5]"
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <Button text="Enrol Now" size="lg" variant="primary" type="submit" />
            </form>

            <div className="flex items-center w-full mb-2">
              <hr className="flex-grow border-t border-muted border-primary" />
              <span className="mx-1 text-sm text-muted-foreground">Or sign up with</span>
              <hr className="flex-grow border-t border-muted border-primary" />
            </div>

            {/* Google Signup Button */}
            <div className="flex space-x-4 w-full justify-between flex-wrap">
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
            </div>
          
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log("Login Failed")} />
          </div>

          <motion.div ref={rightPanelRef} className="hidden md:flex w-1/2 bg-gradient-to-l from-secondary to-primary text-background items-center justify-center">
            <RightPanel />
          </motion.div>
        </div>
      </div>
   
  );
}

export default RegisterPage;
