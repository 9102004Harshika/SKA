import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Select from "../ui/select";
import myImage from "../images/bgOrange.png";
import { FaCalendarAlt } from "react-icons/fa"; // Import a calendar icon
import { ReactDatez } from "react-datez"; // Import ReactDatez
import "react-datez/dist/css/react-datez.css"; // Import ReactDatez styles
import { gsap } from "gsap"; // Import GSAP for animation
import { DatePicker } from "../ui/datePicker";

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
  const formRef = useRef(null);

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

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

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
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <label
                htmlFor="mobile"
                className="block text-sm mb-1 font-semibold text-navy"
              >
                Mobile Number
              </label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                className="placeholder:text-primary placeholder:opacity-[0.5]"
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
            className="placeholder:text-primary placeholder:opacity-[0.5]"
            value={formData.verification}
            onChange={handleChange}
            required
          />
        </div>
        {/* Date of Birth */}
        <div className="mb-2">
          <label
            htmlFor="dob"
            className="block text-sm font-semibold text-navy"
          >
            Date of Birth
          </label>
          <DatePicker
            name="dob"
            handleChange={handleDateChange}
            value={formData.dob}
            placeholder="Select your date of birth"
            allowPast={true}
            allowFuture={false}
            firstDayOfWeek="1"
            displayFormat="DD/MM/YYYY"
            className="text-primary bg-background text-sm font-semibold font-body border-b border-primary w-full placeholder:text-primary placeholder:opacity-[0.5]"
            locale="in"
          />
        </div>

        {/* Education Board */}
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
