import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Select from "../ui/select";
import myImage from "../images/bgOrange.png";
import { FaCalendarAlt } from "react-icons/fa"; // Import a calendar icon
import { gsap } from "gsap"; // Import GSAP for animation
import Calendar from "../ui/calendar";
import { useNavigate, useLocation } from "react-router-dom";
import { State, City } from "country-state-city";
import { handleSubmit, handleDateSelect } from "../logic/enroll/enrollSubmit";
import { RadioButton } from "../ui/radioButton"; // Import RadioButton
import { Checkbox } from "../ui/checkBox"; // Import Checkbox

const Enrollment = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    verification: "",
    dob: "",
    state: "",
    city: "",
    board: "",
    class: "",
    stream:"",
    gender: "", // Add gender to form data

  });

  const [isCheckedTerms, setIsCheckedTerms] = useState(false); // State for the "Agree to Terms" checkbox
  const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(false); // State for the "Agree to Privacy" checkbox

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [otpSent, setOtpSent] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); // State to manage calendar visibility
  const formRef = useRef(null);
  const calendarRef = useRef(null);
  const dobInputRef = useRef(null); // Reference to the date of birth input
  const email = params.get("userEmail");
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Animate the form to slide in from the left
    gsap.fromTo(
      formRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, ease: "power2.out" }
    );
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);
  }, []);

  const handleStateSelect = (stateCode) => {
    setFormData({ ...formData, state: stateCode, city: "" });
    const stateCities = City.getCitiesOfState("IN", stateCode);
    setCities(stateCities);
  };

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

  const [selectedDate, setSelectedDate] = useState("");

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
        return ["7th", "8th", "9th", "10th", "11th", "12th"]
      case "IB":
        return ["7th", "8th", "9th", "10th", "11th", "12th"];
      case "CBSE":
        return ["9th", "10th", "11th", "12th"]
      case "SSC":
        return ["9th", "10th", "11th", "12th"];
      case "ICSC":
        return ["8th", "9th", "10th", "11th", "12th"];
      default:
        return [];
    }
  };

  const genderOptions = [
    { value: "Male", text: "Male" },
    { value: "Female", text: "Female" },
    { value: "Prefer Not To Say", text: "Prefer Not To Say" },
  ];

  // Handle checkbox changes for gender preferences
  const handleCheckboxChange = (updatedValues) => {
    setFormData({ ...formData, genderPreferences: updatedValues });
  };
  const streamOptions = ["Science", "Commerce", "Arts"];


  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${myImage})`,
      }}
    >
      <form
        ref={formRef}
        onSubmit={(e) => {
          handleSubmit(e, formData, navigate, email,isCheckedTerms,isCheckedPrivacy)
        }}
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
          <label htmlFor="dob" className="block text-sm font-semibold text-navy">
            Date of Birth
          </label>
          <div className="flex items-center">
            <Input
              ref={dobInputRef}
              id="dob"
              name="dob"
              type="text"
              placeholder="Select your date of birth"
              value={formData.dob instanceof Date ? formData.dob.toLocaleDateString() : ""}
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
              <Calendar
                onDateSelect={(date) =>
                  handleDateSelect(date, setFormData, setSelectedDate, setShowCalendar)
                }
              />
            </div>
          )}
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-navy mb-2">Gender</label>
          <div className="flex items-center gap-4 mb-2">
            <RadioButton
              name="gender"
              options={genderOptions}
              checked={formData.gender}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* State Selection */}
        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-semibold text-navy">
            State
          </label>
          <Select
            menuTitle="Select State"
            onClick={() => setShowCalendar(false)}
            submenuItems={states.map((state) => state.name)}
            onSelect={(stateName) => {
              const selectedState = states.find((s) => s.name === stateName);
              handleStateSelect(selectedState.isoCode);
            }}
          />
        </div>

        {/* City Selection */}
        {formData.state && (
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-semibold text-navy">
              City
            </label>
            <Select
              menuTitle="Select City"
              onClick={() => setShowCalendar(false)}
              submenuItems={cities.map((city) => city.name)}
              onSelect={(cityName) => {
                const selectedCity = cities.find((c) => c.name === cityName);
                setFormData({ ...formData, city: selectedCity.name });
              }}
            />
          </div>
        )}

        {/* Board Selection */}
        <div className="mb-4">
          <label htmlFor="board" className="block text-sm font-semibold text-navy">
            Board
          </label>
          <Select
            menuTitle="Select Board"
            onClick={() => setShowCalendar(false)}
            submenuItems={["CBSE", "ICSE", "IGCSE", "IB", "SSC"]}
            onSelect={(board) => {
              setFormData({ ...formData, board, class: "" });
            }}
          />
        </div>

        {/* Class Selection */}
        {formData.board && (
          <div className="mb-4">
            <label htmlFor="class" className="block text-sm font-semibold text-navy">
              Class
            </label>
            <Select
              menuTitle="Select Class"
              onClick={() => setShowCalendar(false)}
              submenuItems={getClassOptions()}
              onSelect={(className) => setFormData({ ...formData, class: className })}
            />
          </div>
        )}

{(formData.class === "11th" || formData.class === "12th") && (
  <div className="mb-4">
    <label htmlFor="stream" className="block text-sm font-semibold text-navy">
      Stream
    </label>
    <Select
      menuTitle="Select Stream"
      onClick={() => setShowCalendar(false)}
      submenuItems={streamOptions}
      onSelect={(stream) => setFormData({ ...formData, stream })}
    />
  </div>
)}
        {/* Agree to Terms Checkbox */}
        <Checkbox
          text={
            <span>
              I Agree to the{" "}
              <a href="/terms-and-conditions" className="text-accent">
                Terms and Conditions .
              </a>
            </span>
          }
          checked={isCheckedTerms}
          onChange={setIsCheckedTerms} // Handle checkbox state change
        />

        {/* Agree to Privacy Checkbox */}
        <Checkbox
          text={
            <span>
              I Agree to the{" "}
              <a href="/privacy-policies" className="text-accent">
                Privacy Policies .
              </a>
            </span>
          }
          checked={isCheckedPrivacy}
          onChange={setIsCheckedPrivacy} // Handle checkbox state change
        />

        <Button text="Submit" size="lg" variant="accent" type="submit" />
      </form>
    </div>
  );
};

export default Enrollment;
