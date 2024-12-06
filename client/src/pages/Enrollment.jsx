import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import myImage from "../images/bgOrange.png";

const Enrollment = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    verification: "",
    dob: "",
    board: "",
    class: "",
    medium: "",
    stream: "",
  });

  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = () => {
    if (!formData.mobile) {
      alert("Please enter a mobile number.");
      return;
    }
    setOtpSent(true);
    alert("OTP has been sent to your mobile number!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.verification || formData.verification !== "1234") {
      alert("Invalid OTP. Please verify your OTP.");
      return;
    }
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${myImage})`,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-background p-8 border-2 border-accent w-full max-w-lg "
        style={{
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 10px 30px 10px",
        }}
      >
        <h2 className="text-3xl font-semibold capitalize md:tracking-wide font-header text-center mb-6">
          Student Enrollment Form
        </h2>
        {/* Mobile Number and OTP */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-sm font-semibold text-navy"
          >
            Mobile Number
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              disabled={otpSent}
              className="placeholder-gray-400"
              required
            />
             <Button
            text={
              <div className="flex items-center justify-center">
                {/* Microsoft Icon */}
                <span className="hidden lg:inline whitespace-nowrap "> {otpSent ? "Resend OTP" : "Send OTP"}</span>{" "}
                {/* Text hidden on mobile */}
              </div>
            }
  size="lg"
  variant="accent"
  onClick={handleSendOtp}
>
  <span className="whitespace-nowrap">
    
  </span>
</Button>
          </div>
        </div>
        {/* OTP */}
        <div className="mb-4">
          <label
            htmlFor="verification"
            className="block text-sm font-semibold text-navy"
          >
            OTP
          </label>
          <Input
            id="verification"
            name="verification"
            type="text"
            placeholder="Enter OTP"
            value={formData.verification}
            onChange={handleChange}
            required
          />
        </div>
        {/* Date of Birth */}
        <div className="mb-4">
          <label
            htmlFor="dob"
            className="block text-sm font-semibold text-navy"
          >
            Date of Birth
          </label>
          <Input
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        {/* Board of Education */}
        <div className="mb-4">
          <label
            htmlFor="board"
            className="block text-sm font-semibold text-navy"
          >
            Board of Education
          </label>
          <Select
            value={formData.board}
            onValueChange={(value) =>
              handleChange({ target: { name: "board", value } })
            }
          >
            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange">
              <span className="text-gray-400">
                {formData.board || "Select Board"}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CBSE">CBSE</SelectItem>
              <SelectItem value="ICSE">ICSE</SelectItem>
              <SelectItem value="State Board">State Board</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Class Selection */}
        <div className="mb-4">
          <label
            htmlFor="class"
            className="block text-sm font-semibold text-navy"
          >
            Class
          </label>
          <Select
            value={formData.class}
            onValueChange={(value) =>
              handleChange({ target: { name: "class", value } })
            }
          >
            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange">
              <span className="text-gray-400">
                {formData.class || "Select Class"}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9th">9th</SelectItem>
              <SelectItem value="10th">10th</SelectItem>
              <SelectItem value="11th">11th</SelectItem>
              <SelectItem value="12th">12th</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Medium or Stream */}
        {formData.class === "9th" || formData.class === "10th" ? (
          <div className="mb-4">
            <label
              htmlFor="medium"
              className="block text-sm font-semibold text-navy"
            >
              Medium/Language
            </label>
            <Select
              value={formData.medium}
              onValueChange={(value) =>
                handleChange({ target: { name: "medium", value } })
              }
            >
              <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange">
                <span className="text-gray-400">
                  {formData.medium || "Select Medium/Language"}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : formData.class === "11th" || formData.class === "12th" ? (
          <div className="mb-4">
            <label
              htmlFor="stream"
              className="block text-sm font-semibold text-navy"
            >
              Stream
            </label>
            <Select
              value={formData.stream}
              onValueChange={(value) =>
                handleChange({ target: { name: "stream", value } })
              }
            >
              <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange">
                <span className="text-gray-400">
                  {formData.stream || "Select Stream"}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Commerce">Commerce</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : null}
        {/* Submit Button */}
        <Button text="Submit" size="lg" variant="accent" />
      </form>
    </div>
  );
};

export default Enrollment;
