import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Input } from "../../ui/input";
import { registerForm } from "../../config/index";
import myImage from "../../images/bgNavy.png";
import { Button } from "../../ui/button";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import RightPanel from "./RightPanel";
import { toast } from "../../components/use-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

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

    // Validation logic
    let isValid = true;
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

  const login = useGoogleLogin({
    client_id: "186528455819-lv45ts5lvieg87p536o2ka61qd5uaprc.apps.googleusercontent.com",
    scope: "openid email profile",
    ux_mode: 'popup',
    flow: "implicit",
    onSuccess: async (response) => {
      console.log('Login Success:', response);

      // Get the access token
      const accessToken = response.access_token;

      // Fetch user information using Google People API
      const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await userInfo.json();
      console.log('User Info:', data);

      const fullName = data.name;
      const email = data.email;
      const userData = {
        fullName: fullName,
        email: email,
        password: null,  // Or you can omit this field if it's not required
      };

      try {
        const response = await axios.post(
          'http://localhost:5000/api/register',
          userData,
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
    },
    onError: (error) => {
      console.log('Login Failed:', error);
    }
  });

  const responseFacebook = async (response) => {
    console.log("Facebook login response:", response);
    
    if (response.accessToken) {
      const { name, email } = response;

      const userData = {
        fullName: name,
        email: email,
        password: null,  // Or you can omit this field if it's not required
      };

      try {
        const res = await axios.post(
          'http://localhost:5000/api/register',
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 201) {
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
    }
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
            <Button text="Enroll Now" size="lg" variant="primary" type="submit" />
          </form>

          <div className="flex items-center w-full mb-2">
            <hr className="flex-grow border-t border-muted border-primary" />
            <span className="mx-1 text-sm text-muted-foreground">Or sign up with</span>
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
            <FacebookLogin
              appId="2988430361296081"  // Replace with your Facebook app ID
              fields="name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <Button
                  text={
                    <div className="flex items-center justify-center">
                      <FaFacebook className="w-5 h-5 mr-2" />
                      <span className="hidden lg:inline">Facebook</span>
                    </div>
                  }
                  size="sm"
                  variant="secondary"
                  onClick={renderProps.onClick}
                />
              )}
            />
          </div>
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
