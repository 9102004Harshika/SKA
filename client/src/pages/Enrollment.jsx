import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { studentInfoForm } from "../config/index";
import { FaApple } from "react-icons/fa";

const Enrollment = () => {
  const [formData, setFormData] = useState(
    studentInfoForm.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = () => {
    // Simulate sending OTP logic
    setOtpSent(true);
    alert("OTP has been sent to your mobile number!");
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification logic
    if (formData.verification === "1234") {
      // Example OTP
      setOtpVerified(true);
      alert("OTP Verified!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Please verify your OTP before submitting the form.");
      return;
    }
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary font-header md:tracking-wide">
          Student Enrollment Form
        </h2>
        {studentInfoForm.map((field, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm text-primary font-bold"
            >
              {field.label}
            </label>
            {field.componentType === "input" ? (
              <div className="flex items-center gap-2">
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="placeholder:text-primary placeholder:opacity-[0.5]"
                  required
                />
                {field.name === "mobile" && (
                  <Button
                    text={otpSent ? "Resend OTP" : "Send OTP"} // Dynamically update the text
                    size="lg"
                    variant="secondary"
                    onClick={handleSendOtp}
                  />
                )}
                {field.name === "verification" && (
                  <Button
                    text={otpVerified ? "Verified" : "Verify OTP"} // Update text based on verification status
                    size="lg"
                    variant={otpVerified ? "success" : "secondary"} // Optionally change the variant for visual feedback
                    onClick={handleVerifyOtp}
                  />
                )}
              </div>
            ) : field.componentType === "select" ? (
              <Select
                value={formData[field.name]}
                onValueChange={(value) =>
                  handleChange({ target: { name: field.name, value } })
                }
              >
                <SelectTrigger className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <span className="text-gray-400">
                    {formData[field.name] || field.placeholder}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option, i) => (
                    <SelectItem key={i} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
          </div>
        ))}
        <Button
          text={
            <div className="flex items-center justify-center">
              <FaApple className="w-5 h-5 mr-2" />
              <span className="hidden lg:inline">Submit</span>
            </div>
          }
          type="submit"
        />
      </form>
    </div>
  );
};

export default Enrollment;
