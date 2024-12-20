import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Select from "../ui/select";
import myImage from "../images/bgOrange.png";
import { FaCalendarAlt } from "react-icons/fa"; // Import a calendar icon
import { gsap } from "gsap"; // Import GSAP for animation
import Calendar from "../ui/calendar";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom"; // Import useNavigate from react-router-dom
import { toast } from "../components/use-toast";
const Enrollment = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    verification: "",
    dob: "",
    state: "",
    city: "",
    board: "",
    class: "",
  });
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [otpSent, setOtpSent] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); // State to manage calendar visibility
  const formRef = useRef(null);
  const calendarRef = useRef(null);
  const dobInputRef = useRef(null); // Reference to the date of birth input
  const email = params.get("userEmail");
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send enrollment data to the backend
    const enrollmentData = { ...formData, email };
    console.log(enrollmentData)
    try {
      const response = await axios.post(
        "http://localhost:5000/api/enroll", // Your API endpoint
        enrollmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
      toast({
                title: "Enrollment Successful",
                description:
                  "Congratulations! Your enrollment has been successfully completed.",
                variant: "success",
              });
        navigate("/login"); // Navigate to the login page after successful enrollment
      } else {
        toast({
                  title: "Error in registration ",
                  description:
                    "ENROLLMENT NOT DONE",
                  variant: "destructive",
                });
      }
    } catch (error) {
      console.error("Error submitting enrollment:", error.response?.data || error.message);
      console.error("Error submitting enrollment:", error);
      alert("An error occurred. Please try again.");
    }
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
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        dobInputRef.current &&
        !dobInputRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dynamically update class options based on selected board
  const getClassOptions = () => {
    switch (formData.board) {
      case "IGCSE":
      case "IB":
        return ["7th", "8th", "9th", "10th", "11th", "12th"];
      case "CBSE":
      case "SSC":
        return ["9th", "10th", "11th", "12th"];
      case "ICSC":
        return ["8th", "9th", "10th", "11th", "12th"];
      default:
        return [];
    }
  };

  const getCitiesByState = (state) => {
    const stateCityMap = {
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      Karnataka: ["Bangalore", "Mysore", "Hubli"],
      Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    };
    return stateCityMap[state] || [];
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
          {showCalendar && (
            <div ref={calendarRef} className="calendar-overlay">
              <Calendar onDateSelect={handleDateSelect} />
            </div>
          )}
        </div>

        {/* State Selection */}
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-semibold text-navy"
          >
            State
          </label>
          <Select
            menuTitle="Select State"
            onClick={() => setShowCalendar(false)}
            submenuItems={["Maharashtra", "Karnataka", "Gujarat"]}
            onSelect={(item) =>
              setFormData({ ...formData, state: item, city: "" })
            }
          />
        </div>

        {/* City Selection */}
        {formData.state && (
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-semibold text-navy"
            >
              City
            </label>
            <Select
              menuTitle="Select City"
              onClick={() => setShowCalendar(false)}
              submenuItems={getCitiesByState(formData.state)}
              onSelect={(item) => setFormData({ ...formData, city: item })}
            />
          </div>
        )}

        {/* Board Selection */}
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
            submenuItems={["IGCSE", "IB", "CBSE", "SSC", "ICSC"]}
            onSelect={(item) =>
              setFormData({ ...formData, board: item, class: "" })
            }
          />
        </div>

        {/* Class Selection */}
        {formData.board && (
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
              submenuItems={getClassOptions()}
              onSelect={(item) => setFormData({ ...formData, class: item })}
            />
          </div>
        )}

        {/* Medium or Stream */}
        {formData.class === "11th" || formData.class === "12th" ? (
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
