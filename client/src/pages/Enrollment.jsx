import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { FaApple } from "react-icons/fa";

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
      // Example OTP
      alert("Invalid OTP. Please verify your OTP.");
      return;
    }
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-background p-6 border-8 border-double border-primary w-full max-w-lg "
        style={{
          boxShadow:
            "0 60px 80px rgba(0,0,0,0.60), 0 45px 26px rgba(0,0,0,0.14)",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Student Enrollment Form
        </h2>
        {/* Mobile Number and OTP */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-sm text-primary font-bold"
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
              className="placeholder:text-primary placeholder:opacity-[0.5]"
              required
            />
            <Button
              text={otpSent ? "Resend OTP" : "Send OTP"}
              size="lg"
              variant="secondary"
              onClick={handleSendOtp}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="verification"
            className="block text-sm text-primary font-bold"
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
          <label htmlFor="dob" className="block text-sm text-primary font-bold">
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
            className="block text-sm text-primary font-bold"
          >
            Board of Education
          </label>
          <Select
            value={formData.board}
            onValueChange={(value) =>
              handleChange({ target: { name: "board", value } })
            }
          >
            <SelectTrigger className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-primary">
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
            className="block text-sm text-primary font-bold"
          >
            Class
          </label>
          <Select
            value={formData.class}
            onValueChange={(value) =>
              handleChange({ target: { name: "class", value } })
            }
          >
            <SelectTrigger className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-primary">
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
        {/* Conditional Fields for Medium or Stream */}
        {(formData.class === "9th" || formData.class === "10th") && (
          <div className="mb-4">
            <label
              htmlFor="medium"
              className="block text-sm text-primary font-bold"
            >
              Medium/Language
            </label>
            <Select
              value={formData.medium}
              onValueChange={(value) =>
                handleChange({ target: { name: "medium", value } })
              }
            >
              <SelectTrigger className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-primary">
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
        )}
        {(formData.class === "11th" || formData.class === "12th") && (
          <div className="mb-4">
            <label
              htmlFor="stream"
              className="block text-sm text-primary font-bold"
            >
              Stream
            </label>
            <Select
              value={formData.stream}
              onValueChange={(value) =>
                handleChange({ target: { name: "stream", value } })
              }
            >
              <SelectTrigger className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-primary">
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
        )}
        {/* Submit Button */}
        <Button
          text={
            <div className="flex items-center justify-center">
              <FaApple className="w-5 h-5 mr-2" />
              <span>Submit</span>
            </div>
          }
          type="submit"
          className="w-full"
        />
      </form>
    </div>
  );
};

export default Enrollment;
