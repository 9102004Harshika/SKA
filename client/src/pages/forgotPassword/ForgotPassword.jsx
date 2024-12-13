import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import myImage from "../../images/bgNavy.png";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { forgotPasswordForm } from "../../config/index"; // Import configuration
import { toast } from "../../components/use-toast";

function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState("email"); // Start with email step
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Send OTP validation
  const handleSendOTP = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^\d{10}$/;
    const value = useMobile ? formData.mobile : formData.email;

    if (!value) {
      toast({
        title: "Field left empty",
        description: `Your  ${useMobile ? "mobile number" : "email"} field is empty please fill it to proceed`,
        variant: "destructive",
      });
      return;
    }

    if (useMobile && !mobileRegex.test(value)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      return;
    }

    if (!useMobile && !emailRegex.test(value)) {
      toast({
        title: "Invalid Email",
        description: "The email address you entered does not appear to be valid , please try again ",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "OTP Sent",
      description: `An OTP has been sent to your ${useMobile ? "mobile number" : "email"}: ${value}`,
      variant: "success",
    });

    // Clear sensitive data before moving to OTP step
    setFormData({
      otp: "", // Clear OTP
      newPassword: "",
      confirmPassword: "",
      email: "", // Clear email
      mobile: "", // Clear mobile
    });

    setCurrentStep("otp"); // Move to OTP step
  };

  // OTP validation
  const handleVerifyOTP = () => {
    if (!formData.otp) { // Check if OTP field is empty
      toast({
        title: "Empty OTP Field",
        description: "Please enter the OTP sent to your email or mobile number.",
        variant: "destructive",
      });
      return;
    }
  
    if (formData.otp.length !== 6) { // Check if OTP is not 6 digits
      toast({
        title: "Invalid OTP",
        description:
          "The OTP you entered is either incorrect or does not match the expected 6-digit format.",
        variant: "destructive",
      });
      return;
    }
  
    toast({
      title: "OTP Verified",
      description: "Your OTP has been verified, and you are now able to reset your password. ",
      variant: "success",
    });
  
    setCurrentStep("newPassword");
  };
  

 
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+\-])[A-Za-z\d@$!%*?&+\-]+$/;

  const handleResetPassword = () => {
    const { newPassword, confirmPassword } = formData;
  
    // Check if either of the password fields is empty
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Password Fields Are Empty",
        description:
          "Both the new password and confirmation fields are required to reset your password. ",
        variant: "destructive",
      });
      return;
    }
  
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        description:
          "The new password and confirmation password must match exactly.",
        variant: "destructive",
      });
      return;
    }
  
    // Validate new password using the regex
    if (!passwordRegex.test(newPassword)) {
      toast({
        title: "Invalid Password Format",
        description:
          "Your new password must contain at least one uppercase letter, one number, and one special character. ",
        variant: "destructive",
      });
      return;
    }
  
    toast({
      title: "Password Reset Successful",
      description:
        "Your password has been updated successfully. You can now use your new password to log in and access your account. Make sure to remember it for future logins.",
      variant: "success",
    });
  
    // Redirect to login or another page
  };
  
  

  // Render form fields based on the current step
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
          value={formData[field.name] || ""} // Ensure OTP field starts empty
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

        <form className="w-full max-w-md" autoComplete="off">
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
