import React, { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";
import { Button } from "../../ui/button";
import Select from "../../ui/select";
import { boards, category, getClassOptions, streams } from "../../config";
import ImageUploader from "../../ui/imageUploader";
import { Checkbox } from "../../ui/checkBox";
import { getSubjects } from "../../config";
import Modal from "../../components/Modal";
import useAddCourse, {
  calculateDiscountPercentage,
} from "../../logic/course/addCourse";
import VideoUploader from "../../ui/videoUploader";

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
    classFor: "",
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
  const { handleSubmit, loading, progress } = useAddCourse();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [notes, setNotes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isNotesChecked, setIsNotesChecked] = useState(false);
  const [isQuizzesChecked, setIsQuizzesChecked] = useState(false);
  const [uploadType, setUploadType] = useState();
  const [index, setIndex] = useState();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    if (!courseData.subject || !courseData.classFor) return; // Fetch only when both are selected

    const fetchData = async () => {
      try {
        const instructorsRes = axios.get(
          "http://localhost:5000/api/instructors/get"
        );
        const notesRes = axios.get(
          `http://localhost:5000/api/notes/getPaid?subject=${courseData.subject}&classFor=${courseData.classFor}`
        );
        const quizzesRes = axios.get("http://localhost:5000/api/quizzes/get");

        const [instructors, notes, quizzes] = await Promise.all([
          instructorsRes,
          notesRes,
          quizzesRes,
        ]);

        setInstructors(instructors.data);
        setNotes(notes.data);
        setQuizzes(quizzes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [courseData.subject, courseData.classFor]);
  const handleChange = (e) => {
    if (e?.target) {
      const { name, value } = e.target;
      setCourseData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleFileChange = (file) => {
    setCourseData((prev) => ({
      ...prev,
      courseImage: file,
    }));
  };

  console.log(notes);
  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setCourseData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const handleModuleChange = (index, event) => {
    const { name, value } = event.target;
    setCourseData((prevData) => {
      const updatedModules = [...prevData.modules];
      updatedModules[index] = { ...updatedModules[index], [name]: value };
      return { ...prevData, modules: updatedModules };
    });
  };

  const addModule = () => {
    setCourseData((prevData) => {
      console.log("Existing Modules:", prevData.modules); // Log previous modules
      return {
        ...prevData,
        modules: [
          ...prevData.modules,
          { name: "", estimatedTime: "", videoFile: null }, // New empty module
        ],
      };
    });
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

  const handleNotesChange = () => {
    setIsNotesChecked(!isNotesChecked); // First, toggle the checkbox state

    setCourseData((prevData) => {
      const updatedKeyFeatures = Array.isArray(prevData.keyFeatures)
        ? [...prevData.keyFeatures]
        : []; // Ensure it's an array

      if (!isNotesChecked) {
        updatedKeyFeatures.push("notes"); // Add "Notes" if checked
      } else {
        const index = updatedKeyFeatures.indexOf("notes");
        if (index !== -1) updatedKeyFeatures.splice(index, 1); // Remove "Notes" if unchecked
      }

      return {
        ...prevData,
        keyFeatures: updatedKeyFeatures,
      };
    });
  };

  const handleQuizzesChange = () => {
    setIsQuizzesChecked(!isQuizzesChecked); // First, toggle the checkbox state

    setCourseData((prevData) => {
      const updatedKeyFeatures = Array.isArray(prevData.keyFeatures)
        ? [...prevData.keyFeatures]
        : []; // Ensure it's an array

      if (!isQuizzesChecked) {
        updatedKeyFeatures.push("quizzes"); // Add "Notes" if checked
      } else {
        const index = updatedKeyFeatures.indexOf("quizzes");
        if (index !== -1) updatedKeyFeatures.splice(index, 1); // Remove "Notes" if unchecked
      }

      return {
        ...prevData,
        keyFeatures: updatedKeyFeatures,
      };
    });
  };
  const resetForm = () => {
    setCourseData((prev) => ({
      ...prev, // Spread previous state to maintain reactivity
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
      classFor: "",
      board: "",
      subject: "",
      stream: "",
      category: "",
      keyFeatures: [...[]], // Force state update
      topicsCovered: [...[]], // Force state update
      modules: [{ name: "", estimatedTime: "", videoLink: "" }],
      instructor: "",
      notes: [],
      quizzes: [],
    }));
  };
  const handleVideoChange = (index, file) => {
    setCourseData((prevData) => {
      const updatedModules = [...prevData.modules];
      updatedModules[index] = { ...updatedModules[index], videoLink: file };
      return { ...prevData, modules: updatedModules };
    });
  };

  return (
    <div className="min-h-screen my-2">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-semibold md:tracking-wide font-header text-center mb-6">
          Create New Course
        </h1>
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              courseData,
              setCourseData,
              openModal,
              closeModal,
              resetForm,
              setUploadType,
              setIndex
            )
          }
          className="space-y-6 flex flex-col"
        >
          {/* Text Fields */}
          <div className="flex gap-4 items-center justify-between">
            <div className="flex-1">
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
              id="courseImage"
              required
              onChange={(file) => handleFileChange(file)}
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
            <div className="text-md p-[14px] font-bold border-b-[1px] border-primary">
              Discount Percentage:{" "}
              {calculateDiscountPercentage(
                courseData.originalPrice,
                courseData.discountedPrice
              )}
              %
            </div>
          </div>
          <Select
            menuTitle="Board"
            submenuItems={boards}
            onSelect={(selectedBoard) => {
              setCourseData({
                ...courseData,
                board: selectedBoard,
                classFor: "",
              });
            }}
          />

          <Select
            menuTitle="Class"
            submenuItems={getClassOptions(courseData.board)}
            onSelect={(selectedClass) => {
              setCourseData({
                ...courseData,
                classFor: selectedClass,
                stream: undefined,
                subject: "",
              });
            }}
            disabled={!courseData.board}
          />

          {/* Hide Stream dropdown if class is between 1 and 10 */}
          {!(
            parseInt(courseData.classFor) > 0 &&
            parseInt(courseData.classFor) <= 10
          ) && (
            <Select
              menuTitle="Stream"
              submenuItems={streams}
              onSelect={(selectedStream) => {
                setCourseData({
                  ...courseData,
                  stream: selectedStream || undefined,
                  subject: "",
                });
              }}
              disabled={!courseData.board}
            />
          )}

          <Select
            menuTitle="Subject"
            submenuItems={getSubjects(courseData.classFor, courseData.stream)}
            onSelect={(selectedSubject) => {
              setCourseData({ ...courseData, subject: selectedSubject });
            }}
            disabled={
              !courseData.classFor ||
              (courseData.classFor > 10 && !courseData.stream)
            }
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
                {/* Video Upload Section */}
                <div>
                  <VideoUploader
                    label="Add Video"
                    onChange={(file) => handleVideoChange(index, file)} // Pass module index
                  />
                </div>

                {/* Module Details */}
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
                </div>
              </div>
            ))}

            {/* Add / Remove Module Buttons */}
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
              />
            </div>
          </div>

          {/* Key Features */}
          <div className="flex space-x-4">
            <Checkbox
              text="Include Notes"
              checked={isNotesChecked}
              onChange={handleNotesChange}
            />
            <Checkbox
              text="Include Quizzes"
              checked={isQuizzesChecked}
              onChange={handleQuizzesChange}
            />
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
          {isNotesChecked && (
            <select
              name="notes"
              value={courseData.notes}
              onChange={(e) => handleArrayChange(e, "notes")}
              className="select"
            >
              <option value="">Select a Note</option>
              {notes.map((note) => (
                <option key={note._id} value={note._id}>
                  {note.title}
                </option>
              ))}
            </select>
          )}

          {isQuizzesChecked && (
            <select
              name="quizzes"
              value={courseData.quizzes}
              onChange={(e) => handleArrayChange(e, "quizzes")}
              className="select"
            >
              <option value="">Select a Quiz</option>
              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz._id}>
                  {quiz.name}
                </option>
              ))}
            </select>
          )}
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
      <Modal isOpen={isModalOpen} progress={progress}>
        <h2 className="text-lg text-primary font-semibold">
          Please Wait,
          {uploadType === "video"
            ? ` Module ${index + 1} Video `
            : " Course Image "}
          is uploading...
        </h2>
      </Modal>
    </div>
  );
}

export default CourseForm;
