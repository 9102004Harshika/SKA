import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import LeftPanel from "./LeftPanel";
import myImage from "../../images/bgNavy.png";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { loginForm } from "../../config/index";
import { FaGoogle, FaApple } from "react-icons/fa";
import { TiVendorMicrosoft } from "react-icons/ti";
import { toast } from "../../components/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google"; 

function LoginPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [emailChecked, setEmailChecked] = useState(false);
  const leftPanelRef = useRef(null);
  const loginFormRef = useRef(null);
  const navigate = useNavigate();

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

  const checkGoogleAccount = async (email) => {
    try {
      const response = await axios.post("http://localhost:5000/api/check-google-account", { email });
      if (response.data.isGoogleAccount) {
        toast({
          title: "Google Account Detected",
          description: "It seems this email is associated with a Google login. You can use Google to sign in.",
          variant: "info",
        });
      }
    } catch (error) {
      console.error("Error checking Google account:", error);
    }
  };

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
    if (name === "email" && value && !emailChecked) {
      setEmailChecked(true);
      checkGoogleAccount(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValid = true;

    for (const field of loginForm) {
      const value = formData[field.name] || "";
      if (field.required && !value) {
        toast({
          title: "Field Left Empty",
          description: `Your ${field.label} field is empty. Please fill it to proceed.`,
          variant: "destructive",
        });
        isValid = false;
        break;
      }

      if (field.name === "email" && !emailRegex.test(value)) {
        toast({
          title: "Invalid Email",
          description: "The email address you entered is invalid. Please try again.",
          variant: "destructive",
        });
        isValid = false;
        break;
      }
    }

    if (!isValid) return;

    try {
      const response = await axios.post("http://localhost:5000/api/login", { ...formData, loginMode: "email" });

      if (response.status === 200) {
        const user = response.data.user;
        if (!user.isEnrolled) {
          toast({
            title: "Enrollment Required",
            description: "You are not enrolled. Please complete the enrollment process.",
            variant: "destructive",
          });
          navigate(`/enrollment?userEmail=${formData.email}`);  // Redirect to enrollment page
        } else {
          toast({
            title: "Login Successful",
            description: "You have logged in successfully! Welcome back.",
            variant: "success",
          });
          navigate("/home");  // Redirect to home page
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast({
          title: "Login Failed",
          description: error.response.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  const loginWithGoogle = useGoogleLogin({
    client_id: "186528455819-lv45ts5lvieg87p536o2ka61qd5uaprc.apps.googleusercontent.com", 
    scope: "openid email profile",
    ux_mode: "popup",
    flow: "implicit",
    onSuccess: async (response) => {
      console.log('Google Login Success:', response);
      const accessToken = response.access_token;
      const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await userInfo.json();
      console.log('User Info:', data);

      const userData = {
        fullName: data.name,
        email: data.email,
        password: null, 
      };

      try {
        const res = await axios.post('http://localhost:5000/api/login', { ...userData, loginMode: "google" });

        if (res.status === 200) {
          const user = res.data.user;
          if (!user.isEnrolled) {
            toast({
              title: "Enrollment Required",
              description: "You are not enrolled. Please complete the enrollment process.",
              variant: "destructive",
            });
            navigate(`/enrollment?userEmail=${userData.email}`);  // Redirect to enrollment page
          } else {
            toast({
              title: "Login Successful",
              description: "You have logged in successfully! Welcome back.",
              variant: "success",
            });
            navigate("/home");  // Redirect to home page
          }
        } else {
          toast({
            title: "Login Failed",
            description: "An error occurred during login. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast({
            title: "Login Failed",
            description: error.response.data.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Unexpected Error",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
        }
      }
    },
    onError: (error) => {
      console.log('Login Failed:', error);
    }
  });

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
          <form className="w-full max-w-md" onSubmit={handleSubmit} noValidate>
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
              onClick={() => loginWithGoogle()}
            />
            <Button
              text={
                <div className="flex items-center justify-center">
                  <TiVendorMicrosoft className="w-5 h-5 mr-2" />
                  <span className="hidden lg:inline">Microsoft</span>
                </div>
              }
              size="sm"
              variant="secondary"
            />
            <Button
              text={
                <div className="flex items-center justify-center">
                  <FaApple className="w-5 h-5 mr-2" />
                  <span className="hidden lg:inline">Apple</span>
                </div>
              }
              size="sm"
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
