import React, { useState } from "react";
import axios from "axios";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    courseId: "",
    courseImage: "",
    courseTitle: "",
    instructorName: "",
    instructorPhoto: "",
    instructorBio: "",
    instructorEducation: "",
    studentCount: "",
    keyFeatures: "",
    totalLectures: "",
    originalPrice: "",
    discountedPrice: "",
    discountPercentage: "",
    class: "",
    board: "",
    subject: "",
    stream: "",
    category: "",
    topicsCovered: "",
    courseDescription: "",
    ratingStars: "",
    ratingReviews: "",
    totalEstimatedTime: "",
    uploadedDate: "",
    lastUpdated: "",
    notesName: "",
    notesDescription: "",
    notesLink: "",
    testQuizName: "",
    testQuizDescription: "",
    testQuizLink: "",
    video1: "",
    video2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/courses", formData);
      alert("Course added successfully!");
      setFormData({
        courseId: "",
        courseImage: "",
        courseTitle: "",
        instructorName: "",
        instructorPhoto: "",
        instructorBio: "",
        instructorEducation: "",
        studentCount: "",
        keyFeatures: "",
        totalLectures: "",
        originalPrice: "",
        discountedPrice: "",
        discountPercentage: "",
        class: "",
        board: "",
        subject: "",
        stream: "",
        category: "",
        topicsCovered: "",
        courseDescription: "",
        ratingStars: "",
        ratingReviews: "",
        totalEstimatedTime: "",
        uploadedDate: "",
        lastUpdated: "",
        notesName: "",
        notesDescription: "",
        notesLink: "",
        testQuizName: "",
        testQuizDescription: "",
        testQuizLink: "",
        video1: "",
        video2: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center font-header">
        Add New Course
      </h2>

      {Object.keys(formData).map((field) => (
        <div key={field} className="mb-4">
          <label className="block mb-2 capitalize">
            {field.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type={field.includes("Date") ? "date" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="block border p-2 w-full"
            required={field !== "instructorBio" && field !== "instructorPhoto"}
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-primary w-full mt-8 text-white py-2 text-xl font-bold rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AddCourseForm;
