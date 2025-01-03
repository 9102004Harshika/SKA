import React, { useState, useEffect } from "react";
import axios from "axios";

function CourseForm() {
  const [courseData, setCourseData] = useState({
    courseId: "",
    courseImage: "",
    courseTitle: "",
    courseDescription: "",
    moduledescription: "",
    demoVideo: "", // Added field
    studentCount: "", // Added field
    totalLectures: "", // Added field
    totalEstimatedTime: "", // Added field
    lastUpdated: "", // Added field
    originalPrice: "", // Added field
    discountedPrice: "", // Added field
    class: "", // Added field
    board: "", // Added field
    subject: "", // Added field
    stream: "", // Added field
    category: "", // Added field
    keyFeatures: {
      notes: false,
      quizzes: false,
      videos: false,
    },
    topicsCovered: [],
    modules: [{ name: "", estimatedTime: "", videoLink: "" }],
    instructor: "",
    notes: [],
    quizzes: [],
  });

  const [instructors, setInstructors] = useState([]);
  const [notes, setNotes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/instructors/get")
      .then((res) => setInstructors(res.data));
    axios
      .get("http://localhost:5000/api/notes/get")
      .then((res) => setNotes(res.data));
    axios
      .get("http://localhost:5000/api/quizzes/get")
      .then((res) => setQuizzes(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setCourseData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const handleModuleChange = (index, e) => {
    const { name, value } = e.target;
    const modules = [...courseData.modules];
    modules[index][name] = value;
    setCourseData((prev) => ({ ...prev, modules }));
  };

  const addModule = () => {
    setCourseData((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        { name: "", estimatedTime: "", videoLink: "" },
      ],
    }));
  };

  const handleNestedChange = (e, field) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [name]: value,
      },
    }));
  };

  const handleKeyFeaturesChange = (e) => {
    const { name, checked } = e.target;
    setCourseData((prev) => ({
      ...prev,
      keyFeatures: {
        ...prev.keyFeatures,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/courses",
        courseData
      );
      console.log("Course Created:", response.data);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Course
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
          {/* Text Fields */}
          <input
            type="text"
            name="courseId"
            value={courseData.courseId}
            onChange={handleChange}
            placeholder="Course ID"
            className="input"
            required
          />
          <input
            type="text"
            name="courseImage"
            value={courseData.courseImage}
            onChange={handleChange}
            placeholder="Course Image URL"
            className="input"
            required
          />
          <input
            type="text"
            name="courseTitle"
            value={courseData.courseTitle}
            onChange={handleChange}
            placeholder="Course Title"
            className="input"
            required
          />
          <textarea
            name="courseDescription"
            value={courseData.courseDescription}
            onChange={handleChange}
            placeholder="Course Description"
            className="textarea"
            required
          />
          <textarea
            name="moduledescription"
            value={courseData.moduledescription}
            onChange={handleChange}
            placeholder="Module Description"
            className="textarea"
            required
          />
          <input
            type="text"
            name="topicsCovered"
            onChange={(e) => handleArrayChange(e, "topicsCovered")}
            placeholder="Topics Covered (comma-separated)"
            className="input"
            required
          />
          {/* New Fields */}
          <input
            type="text"
            name="demoVideo"
            value={courseData.demoVideo}
            onChange={handleChange}
            placeholder="Demo Video URL"
            className="input"
          />
          <input
            type="number"
            name="studentCount"
            value={courseData.studentCount}
            onChange={handleChange}
            placeholder="Number of Students"
            className="input"
          />
          <input
            type="number"
            name="totalLectures"
            value={courseData.totalLectures}
            onChange={handleChange}
            placeholder="Total Lectures"
            className="input"
          />
          <input
            type="text"
            name="totalEstimatedTime"
            value={courseData.totalEstimatedTime}
            onChange={handleChange}
            placeholder="Total Estimated Time"
            className="input"
          />
          <input
            type="date"
            name="lastUpdated"
            value={courseData.lastUpdated}
            onChange={handleChange}
            placeholder="Last Updated"
            className="input"
          />
          <div className="flex space-x-4">
            <input
              type="number"
              name="originalPrice"
              value={courseData.originalPrice}
              onChange={handleChange}
              placeholder="Original Price"
              className="input"
            />
            <input
              type="number"
              name="discountedPrice"
              value={courseData.discountedPrice}
              onChange={handleChange}
              placeholder="Discounted Price"
              className="input"
            />
          </div>
          <input
            type="text"
            name="class"
            value={courseData.class}
            onChange={handleChange}
            placeholder="Class"
            className="input"
          />
          <input
            type="text"
            name="board"
            value={courseData.board}
            onChange={handleChange}
            placeholder="Board"
            className="input"
          />
          <input
            type="text"
            name="subject"
            value={courseData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="input"
          />
          <input
            type="text"
            name="stream"
            value={courseData.stream}
            onChange={handleChange}
            placeholder="Stream"
            className="input"
          />
          <input
            type="text"
            name="category"
            value={courseData.category}
            onChange={handleChange}
            placeholder="Category"
            className="input"
          />

          {/* Modules */}
          <div className="space-y-4">
            {courseData.modules.map((module, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={module.name}
                  onChange={(e) => handleModuleChange(index, e)}
                  placeholder={`Module ${index + 1} Name`}
                  className="input"
                  required
                />
                <input
                  type="text"
                  name="estimatedTime"
                  value={module.estimatedTime}
                  onChange={(e) => handleModuleChange(index, e)}
                  placeholder={`Module ${index + 1} Estimated Time`}
                  className="input"
                  required
                />
                <input
                  type="text"
                  name="videoLink"
                  value={module.videoLink}
                  onChange={(e) => handleModuleChange(index, e)}
                  placeholder={`Module ${index + 1} Video Link`}
                  className="input"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addModule} className="button">
              Add Module
            </button>
          </div>

          {/* Key Features */}
          <div className="flex space-x-4">
            <label>
              <input
                type="checkbox"
                name="notes"
                checked={courseData.keyFeatures.notes}
                onChange={handleKeyFeaturesChange}
              />
              Notes
            </label>
            <label>
              <input
                type="checkbox"
                name="quizzes"
                checked={courseData.keyFeatures.quizzes}
                onChange={handleKeyFeaturesChange}
              />
              Quizzes
            </label>
            <label>
              <input
                type="checkbox"
                name="videos"
                checked={courseData.keyFeatures.videos}
                onChange={handleKeyFeaturesChange}
              />
              Videos
            </label>
          </div>
          {/* Select Fields */}
          <select
            name="instructor"
            value={courseData.instructor}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">Select Instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.name}>
                {instructor.name}
              </option>
            ))}
          </select>
          <select
            name="notes"
            multiple
            value={courseData.notes}
            onChange={(e) => handleArrayChange(e, "notes")}
            className="select"
          >
            {notes.map((note) => (
              <option key={note.id} value={note.name}>
                {note.name}
              </option>
            ))}
          </select>
          <select
            name="quizzes"
            multiple
            value={courseData.quizzes}
            onChange={(e) => handleArrayChange(e, "quizzes")}
            className="select"
          >
            {quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.name}>
                {quiz.name}
              </option>
            ))}
          </select>
          {/* Submit Button */}
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CourseForm;
