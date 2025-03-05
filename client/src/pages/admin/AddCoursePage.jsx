import React, { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";
import { Button } from "../../ui/button";
import FileUploader from "../../ui/fileUploader";
import Select from "../../ui/select";
import {
  boards,
  category,
  getClassOptions,
  streams,
  subjects,
} from "../../config";
import ImageUploader from "../../ui/imageUploader";

function CourseForm() {
  const initialState = {
    courseTitle: "",
    courseDescription: "",
    courseImage: "",
    originalPrice: "",
    discountedPrice: "",
    aboutCourse: "",
    moduledescription: "",
    demoVideo: "",
    studentCount: "",
    lastUpdated: "",
    class: "",
    board: "",
    subject: "",
    stream: "",
    category: "",
    keyFeatures: [],
    topicsCovered: [],
    modules: [{ name: "", estimatedTime: "", videoLink: "" }],
    instructor: "",
    notes: [],
    quizzes: [],
  };
  const [courseData, setCourseData] = useState(initialState);

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

  const calculateDiscountPercentage = () => {
    const { originalPrice, discountedPrice } = courseData;
    if (originalPrice && discountedPrice) {
      const discount =
        ((originalPrice - discountedPrice) / originalPrice) * 100;
      return discount.toFixed(2);
    }
    return 0;
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
    const { name } = e.target;
    setCourseData((prev) => {
      const updatedKeyFeatures = { ...prev.keyFeatures };
      updatedKeyFeatures[name] = name; // Set true or false based on checked state
      return {
        ...prev,
        keyFeatures: updatedKeyFeatures,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...courseData,
      discountPercentage: calculateDiscountPercentage(),
      keyFeatures: Array.isArray(courseData.keyFeatures)
        ? courseData.keyFeatures
        : Object.values(courseData.keyFeatures), // Convert object to array of strings if needed
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/courses/add",
        formattedData
      );
      console.log("Course Created:", response.data);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="min-h-screen my-2">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-semibold md:tracking-wide font-header text-center mb-6">
          Create New Course
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
          {/* Text Fields */}
          <div className="flex gap-4 items-center justify-between">
            <div className="flex-1">
              <input
                type="text"
                name="courseImage"
                value={courseData.courseImage}
                onChange={handleChange}
                placeholder="Course Image URL"
                className="input"
                required
              />

              <TextInput
                type="text"
                name="courseTitle"
                value={courseData.courseTitle}
                onChange={handleChange}
                label={"Course Title"}
                required
              />
              <TextAreaInput
                name="courseDescription"
                value={courseData.courseDescription}
                onChange={handleChange}
                label="Course Description"
                required
              />
            </div>
            <ImageUploader
              label="Upload Image"
              id="imageUpload"
              // required
              // onChange={(file) =>
              //   setFormData({ ...formData, coverImageUrl: file })
              // }
            />
          </div>

          <TextAreaInput
            name="aboutCourse"
            value={courseData.aboutCourse}
            onChange={handleChange}
            label="About Course"
            required
          />
          <TextAreaInput
            name="moduledescription"
            value={courseData.moduledescription}
            onChange={handleChange}
            label="Module Description"
            required
          />
          <TextInput
            type="text"
            name="topicsCovered"
            onChange={(e) => handleArrayChange(e, "topicsCovered")}
            label={"Topics Covered (comma-separated)"}
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
          <TextInput
            type="number"
            name="studentCount"
            value={courseData.studentCount}
            onChange={handleChange}
            label="Number of Students"
          />
          <input
            type="date"
            name="lastUpdated"
            value={courseData.lastUpdated}
            onChange={handleChange}
            placeholder="Last Updated"
            className="input"
          />
          <div className="flex items-center justify-between space-x-4">
            <TextInput
              label="Original Price"
              type="number"
              name="originalPrice"
              value={courseData.originalPrice}
              onChange={handleChange}
            />
            <TextInput
              label="Discounted Price"
              type="number"
              name="discountedPrice"
              value={courseData.discountedPrice}
              onChange={handleChange}
            />
            {/* Display Discount Percentage */}
            <div className="text-md p-[14px] rounded-[4px] font-bold border-2 border-primary">
              Discount Percentage: {calculateDiscountPercentage()}%
            </div>
          </div>
          <Select
            menuTitle="Board"
            submenuItems={boards}
            onSelect={(selectedBoard) => {
              setCourseData({ ...courseData, board: selectedBoard, class: "" });
            }}
          />

          <Select
            menuTitle="Class"
            submenuItems={getClassOptions(courseData.board)}
            onSelect={(selectedClass) => {
              setCourseData({ ...courseData, class: selectedClass });
            }}
            disabled={!courseData.board}
          />
          <Select
            menuTitle="Subject"
            submenuItems={subjects}
            onSelect={(selectedSubject) => {
              setCourseData({ ...courseData, subject: selectedSubject });
            }}
            disabled={!courseData.stream}
          />

          <Select
            menuTitle="Stream"
            submenuItems={streams}
            onSelect={(selectedStream) => {
              setCourseData({ ...courseData, stream: selectedStream });
            }}
            disabled={!courseData.board}
          />
          <Select
            menuTitle="Category"
            submenuItems={category}
            onSelect={(selectedCategory) => {
              setCourseData({ ...courseData, category: selectedCategory });
            }}
          />
          {/* Modules */}
          <div className="space-y-4">
            {courseData.modules.map((module, index) => (
              <div
                key={index}
                className="space-y-2 flex gap-4 items-center justify-between"
              >
                <div className="">
                  <FileUploader label={"Add Video"} />
                </div>
                <div className="flex-1">
                  <TextInput
                    type="text"
                    name="name"
                    value={module.name}
                    onChange={(e) => handleModuleChange(index, e)}
                    label={`Module ${index + 1} Name`}
                    className="input"
                    required
                  />
                  <TextInput
                    type="number"
                    name="estimatedTime"
                    value={module.estimatedTime}
                    onChange={(e) => handleModuleChange(index, e)}
                    label={`Module ${index + 1} Estimated Time`}
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
              </div>
            ))}
            <div className="flex justify-evenly items-center gap-10">
              <Button
                type="button"
                onClick={addModule}
                text="Remove Module"
                size="sm"
                variant="accent"
                className=""
              />
              <Button
                type="button"
                onClick={addModule}
                text="Add Module"
                size="sm"
                variant="primary"
                className=""
              />
            </div>
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
              <option key={instructor.id} value={instructor._id}>
                {instructor.name}
              </option>
            ))}
          </select>
          <select
            name="notes"
            value={courseData.notes}
            onChange={(e) => handleArrayChange(e, "notes")}
            className="select"
          >
            {notes.map((note) => (
              <option key={note.id} value={note._id}>
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
              <option key={quiz.id} value={quiz._id}>
                {quiz.name}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="reset"
              className="button w-full"
              variant="accent"
              text={"Reset"}
              onClick={() => setCourseData(initialState)}
            />
            <Button
              type="submit"
              className="button w-full"
              variant="primary"
              text="Create Notes"
              size="lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseForm;
