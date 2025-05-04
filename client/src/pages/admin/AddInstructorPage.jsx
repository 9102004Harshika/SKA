import React, { useState } from "react";
import axios from "axios";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";

const AddInstructorPage = () => {
  const [step, setStep] = useState(1);
  const [adminData, setAdminData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [instructorData, setInstructorData] = useState({
    photo: "",
    bio: "",
    education: "",
    experience: "",
  });
  const [userId, setUserId] = useState("");

  const handleAdminChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleInstructorChange = (e) => {
    setInstructorData({ ...instructorData, [e.target.name]: e.target.value });
  };

  const submitAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/createAdmin",
        adminData
      );
      setUserId(res.data._id || res.data.user?._id); // Adjust based on your actual response
      setStep(2);
    } catch (err) {
      console.error("Admin creation failed:", err);
      alert("Failed to create admin.");
    }
  };

  const submitInstructor = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/instructor/add", {
        ...instructorData,
        userId,
      });
      alert("Instructor created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Instructor creation failed:", err);
      alert("Failed to create instructor.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Add Instructor - Step {step}</h2>

      {step === 1 && (
        <form onSubmit={submitAdmin}>
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={adminData.fullName}
            onChange={handleAdminChange}
            required
          />
          <br />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={adminData.email}
            onChange={handleAdminChange}
            required
          />
          <br />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={adminData.password}
            onChange={handleAdminChange}
            required
          />
          <br />
          <Button type="submit" text={"Create Admin"} variant="primary" />
        </form>
      )}

      {step === 2 && (
        <form onSubmit={submitInstructor}>
          <TextInput
            type="text"
            name="photo"
            label="Photo URL"
            value={instructorData.photo}
            onChange={handleInstructorChange}
            required
          />
          <br />
          <TextAreaInput
            name="bio"
            label="Bio"
            value={instructorData.bio}
            onChange={handleInstructorChange}
            required
          />
          <br />
          <TextInput
            type="text"
            name="education"
            label="Education"
            value={instructorData.education}
            onChange={handleInstructorChange}
            required
          />
          <br />
          <TextInput
            type="number"
            name="experience"
            label="Experience"
            value={instructorData.experience}
            onChange={handleInstructorChange}
            required
          />
          <br />
          <Button type="submit" text={"Create Instructor"} variant="primary" />
        </form>
      )}
    </div>
  );
};

export default AddInstructorPage;
