import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Select from "../ui/select";
import myImage from "../images/bgOrange.png";
import { FaCalendarAlt } from "react-icons/fa"; // Import a calendar icon
import { gsap } from "gsap"; // Import GSAP for animation
import Calendar from "../ui/calendar";

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
  const dobInputRef = useRef(null); // Reference to the date of birth input
  const mobileRed = useRef(null);
  useEffect(() => {
    // Animate the form to slide in from the left
    gsap.fromTo(
      formRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

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

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateSelect = (date) => {
    const selectedDate = new Date(date); // Ensure it's a Date object
    setFormData((prevData) => ({
      ...prevData,
      dob: selectedDate, // Store as a Date object
    }));
    setSelectedDate(selectedDate);
    setShowCalendar(false); // Close the calendar
    console.log("Selected Date:", selectedDate);
  };

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev); // Toggle calendar visibility
  };

  // Close calendar if click happens outside the calendar or on other inputs
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the dob input, form or calendar, close the calendar
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        dobInputRef.current &&
        !dobInputRef.current.contains(event.target) &&
        dobInputRef.current &&
        !dobInputRef.current.contains(event.target)
        // Ensures clicking on the DOB input won't close it
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
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <label
              htmlFor="mobile"
              className="block text-sm font-semibold text-navy"
            >
              Mobile Number
            </label>
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              onClick={() => setShowCalendar(false)}
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              disabled={otpSent}
              required
            />
          </div>
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
            onClick={() => setShowCalendar(false)}
            type="text"
            placeholder="Enter OTP"
            value={formData.verification}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="relative-container mb-4">
          <label
            htmlFor="dob"
            className="block text-sm font-semibold text-navy"
          >
            Date of Birth 
          </label>
          <div className="flex items-center">
            <Input
              ref={dobInputRef}
              id="dob"
              name="dob"
              type="text"
              placeholder="Select your date of birth"
              value={
                formData.dob instanceof Date
                  ? formData.dob.toLocaleDateString()
                  : ""
              }
              readOnly
              onClick={toggleCalendar}
              required
            />
            <button
              type="button"
              onClick={toggleCalendar}
              className="ml-2 text-lg text-navy"
            >
              <FaCalendarAlt />
            </button>
          </div>
          {/* Render the calendar as an overlay */}
          {showCalendar && (
            <div ref={calendarRef} className="calendar-overlay">
              <Calendar onDateSelect={handleDateSelect} />
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
            onClick={() => setShowCalendar(false)}
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
            onClick={() => setShowCalendar(false)}
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
              onClick={() => setShowCalendar(false)}
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
        <Button
          text="Submit"
          size="lg"
          variant="accent"
          type="submit"
          className={"mt-6"}
        />
      </form>
    </div>
  );
};

export default Enrollment;
