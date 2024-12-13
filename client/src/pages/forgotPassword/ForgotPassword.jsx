import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import myImage from "../../images/bgLightBlue.png";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { forgotPasswordForm } from "../../config/index"; // Import configuration
import { toast } from "../../components/use-toast";

function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState("email"); // Start with email step
  const [formData, setFormData] = useState({});
  const [useMobile, setUseMobile] = useState(false); // State to toggle between email and mobile

  const formRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      formRef.current,
      { opacity: 0, x: "30%" },
      { opacity: 1, x: "0%", duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOTP = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^\d{10}$/;
    const value = useMobile ? formData.mobile : formData.email; // Use either mobile or email based on the state

    if (
      (useMobile && !mobileRegex.test(value)) || // Invalid mobile number
      (!useMobile && !emailRegex.test(value)) // Invalid email
    ) {
      toast({
        title: "Invalid Input",
        description: `Please enter a valid ${useMobile ? "mobile number" : "email"}.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "OTP Sent",
      description: `An OTP has been sent to your ${useMobile ? "mobile number" : "email"}: ${value}`,
      variant: "success",
    });

    setCurrentStep("otp");
  };

  const handleVerifyOTP = () => {
    if (!formData.otp || formData.otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "OTP Verified",
      description: "You can now set a new password.",
      variant: "success",
    });

    setCurrentStep("newPassword");
  };

  const handleResetPassword = () => {
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        description: "Please ensure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Reset Successful",
      description: "Your password has been updated successfully.",
      variant: "success",
    });

    // Redirect to login or another page
  };

  const renderFields = () => {
    let fields = [];

    if (currentStep === "email") {
      fields = [forgotPasswordForm[0]]; // Email input field
    } else if (currentStep === "mobile") {
      fields = [forgotPasswordForm[1]]; // Mobile input field
    } else if (currentStep === "otp") {
      fields = [forgotPasswordForm[2]]; // OTP input field
    } else if (currentStep === "newPassword") {
      fields = [forgotPasswordForm[3], forgotPasswordForm[4]]; // New and Confirm password fields
    }

    return fields.map((field, index) => (
      <div className="mb-5" key={index}>
        <label className="block text-sm font-medium mb-1">{field.label}</label>
        <Input
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required={field.required}
        />
      </div>
    ));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background text-foreground relative"
      style={{
        backgroundImage: `url(${myImage})`,
      }}
    >
      {/* Form Section */}
      <div
        ref={formRef}
        className="w-full md:w-1/2 bg-background text-card-foreground p-8 shadow-lg flex flex-col items-center"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 22px",
        }}
      >
        <h2 className="text-3xl capitalize md:tracking-wide font-header font-semibold text-center mb-6">
          {currentStep === "email" || currentStep === "mobile"
            ? "Forgot Password"
            : currentStep === "otp"
            ? "Enter OTP"
            : "Set New Password"}
        </h2>

        <form className="w-full max-w-md">
          {renderFields()}

          {/* Switch between email and mobile */}
          {currentStep === "email" || currentStep === "mobile" ? (
            <p className="text-sm mt-3 text-center">
              Prefer to receive OTP via{" "}
              <span
                className="text-accent font-bold cursor-pointer hover:underline underline-offset-2"
                onClick={() => {
                  setUseMobile(!useMobile);
                  setCurrentStep(useMobile ? "email" : "mobile"); // Switch steps based on state
                }}
              >
                {useMobile ? "Email" : "Mobile"}
              </span>
              ?
            </p>
          ) : null}

          {/* Button to send OTP */}
          {currentStep === "email" || currentStep === "mobile" ? (
            <Button text="Send OTP" size="lg" variant="primary" onClick={handleSendOTP} />
          ) : null}

          {/* Button to verify OTP */}
          {currentStep === "otp" ? (
            <Button text="Verify OTP" size="lg" variant="primary" onClick={handleVerifyOTP} />
          ) : null}

          {/* Button to reset password */}
          {currentStep === "newPassword" ? (
            <Button
              text="Reset Password"
              size="lg"
              variant="primary"
              onClick={handleResetPassword}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
