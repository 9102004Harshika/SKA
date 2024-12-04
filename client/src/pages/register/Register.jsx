import React from "react";
import { Input } from "../../ui/input";
import { registerForm } from "../../config/index";
import myImage from "../../images/bg15.png";
import { Button } from "../../ui/button";
import { FaGoogle, FaApple } from "react-icons/fa";
import { TiVendorMicrosoft } from "react-icons/ti";

function RegisterPage() {
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
      className="min-h-screen flex items-center justify-center bg-background text-foreground"
      style={{
        backgroundImage: `url(${myImage})`,
        background: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main Content */}
      <div className="w-full max-w-screen-lg flex flex-col items-center justify-center h-full">
        {/* Registration Form */}
        <div
          className="w-full md:w-1/2 bg-background text-card-foreground p-8 flex flex-col items-center"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 22px",
          }}
        >
          <h2 className="text-3xl font-semibold font-header text-center mb-6">
            Elevate Your Learning
          </h2>
          <form className="w-full max-w-md">
            {/* Dynamic Input Fields */}
            {registerForm.map((field, index) => (
              <div className="mb-2" key={index}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                <Input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            ))}

            {/* Additional Links */}
            <div className="mt-2 text-center">
              <p className="text-sm">
                Already have an account?{" "}
                <a href="/" className="text-accent hover:underline">
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
          <div className="flex space-x-4 w-full justify-center">
            {/* Google Sign-Up Button */}
            <Button
              text={
                <div className="flex items-center justify-center">
                  <FaGoogle className="w-5 h-5 mr-2" /> {/* Google Icon */}
                  <span className="hidden md:inline">Google</span> {/* Text hidden on mobile */}
                </div>
              }
              size="sm"
              variant="default"
              onClick={handleGoogleSignup}
            />

            {/* Microsoft Sign-Up Button */}
            <Button
              text={
                <div className="flex items-center justify-center">
                  <TiVendorMicrosoft className="w-5 h-5 mr-2" /> {/* Microsoft Icon */}
                  <span className="hidden md:inline">Microsoft</span> {/* Text hidden on mobile */}
                </div>
              }
              size="sm"
              variant="default"
              onClick={handleFacebookSignup} // Change to appropriate handler for Microsoft
            />

            {/* Apple Sign-Up Button */}
            <Button
              text={
                <div className="flex items-center justify-center">
                  <FaApple className="w-5 h-5 mr-2" /> {/* Apple Icon */}
                  <span className="hidden md:inline">Apple</span> {/* Text hidden on mobile */}
                </div>
              }
              size="sm"
              variant="default"
              onClick={handleTwitterSignup} // Change to appropriate handler for Apple
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
