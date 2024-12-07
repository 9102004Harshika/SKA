import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Select from "../ui/select";
import myImage from "../images/bgOrange.png";
import { FaCalendarAlt } from "react-icons/fa"; // Import a calendar icon
import { DayPicker } from "react-day-picker";
import classes from "react-day-picker/style.module.css"; // Import the DayPicker styles

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
  const [showCalendar, setShowCalendar] = useState(false); // State to manage calendar visibility
  const formRef = useRef(null);
  const calendarRef = useRef(null);

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

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
    setShowCalendar(false); // Close calendar after selecting date
  };

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev); // Toggle calendar visibility
  };

  // Close calendar if click happens outside the calendar or on other inputs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      } else if (
        formRef.current &&
        formRef.current.contains(event.target) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${myImage})`,
      }}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-background p-8 border-2 border-accent w-full max-w-lg"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 10px 30px 10px",
        }}
      >
        <h2 className="text-3xl font-semibold capitalize md:tracking-wide font-header text-center mb-6">
          Student Enrollment Form
        </h2>
        {/* Mobile Number and OTP */}
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-semibold text-navy"
          >
            Mobile Number
          </label>
          <div className="flex items-end gap-4">
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              disabled={otpSent}
              required
            />
            <Button
              text={
                <div className="flex items-center justify-center">
                  <span className="block lg:inline whitespace-nowrap">
                    {otpSent ? "Resend OTP" : "Send OTP"}
                  </span>
                </div>
              }
              size="xs"
              variant="accent"
              onClick={handleSendOtp}
            />
          </div>
        </div>
        {/* OTP */}
        <div>
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
        <div className="relative">
          <label
            htmlFor="dob"
            className="block text-sm font-semibold text-navy"
          >
            Date of Birth
          </label>
          <div className="flex items-center">
            <Input
              id="dob"
              name="dob"
              type="text"
              placeholder="Select your date of birth"
              value={formData.dob ? formData.dob.toLocaleDateString() : ""}
              readOnly
              onClick={toggleCalendar} // Open calendar on input click
              required
            />
            <button
              type="button"
              onClick={toggleCalendar}
              className="ml-2 mb-4 text-lg text-navy"
            >
              <FaCalendarAlt />
            </button>
          </div>
          {/* Conditionally render DayPicker calendar */}
          {showCalendar && (
            <div
              ref={calendarRef}
              className="absolute border p-4 border-accent z-10 w-full bg-background"
              style={{
                maxWidth: "95vw", // Prevent overflow on smaller screens
                width: "auto",
                left: "50%",
                transform: "translateX(-50%)",
                boxShadow: "rgba(0, 0, 0, 0.56) 0px 10px 20px 10px", // Add subtle shadow for better visibility
              }}
            >
              <DayPicker
                mode="single"
                selected={formData.dob}
                onSelect={handleDateChange}
                classNames={classes}
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="board"
            className="block text-sm font-semibold text-navy"
          >
            Board of Education
          </label>
          <Select
            menuTitle="Select Board"
            submenuItems={["CBSE", "ICSE", "SSC"]}
            onSelect={(item) => setFormData({ ...formData, board: item })}
          />
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
            menuTitle="Select Class"
            submenuItems={["9th", "10th", "11th", "12th"]}
            onSelect={(item) => setFormData({ ...formData, class: item })}
          />
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
              menuTitle="Select Medium"
              submenuItems={["English", "Hindi", "Marathi"]}
              onSelect={(item) => setFormData({ ...formData, medium: item })}
            />
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
              menuTitle="Select Stream"
              submenuItems={["Science", "Commerce", "Arts"]}
              onSelect={(item) => setFormData({ ...formData, stream: item })}
            />
          </div>
        ) : null}
        {/* Submit Button */}
        <Button text="Submit" size="lg" variant="accent" />
      </form>
    </div>
  );
};

export default Enrollment;
