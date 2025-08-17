import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../ui/imageUploader";
import VideoUploader from "../../ui/videoUploader"; // Assuming you already have this
import { Checkbox } from "../../ui/checkBox";
import Select from "../../ui/select";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";
import { Button } from "../../ui/button";
import { toast } from "../../components/use-toast";
import Modal from "../../components/Modal";
import {
  FaTimes,
  FaBookOpen,
  FaSchool,
  FaClock,
  FaUpload,
  FaCheckSquare,
  FaRegTrashAlt,
} from "react-icons/fa";
import useAddCourse from "../../logic/course/addCourse"; // your existing logic hook
import { BiLayerPlus } from "react-icons/bi"; // top of file
// Config
const {
  boards,
  getClassOptions,
  streams,
  getSubjects,
  category,
  subjects,
} = require("../../config");

const AddCourse = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [isNotesChecked, setIsNotesChecked] = useState(false);
  const [isQuizzesChecked, setIsQuizzesChecked] = useState(false);
  const { handleSubmit, loading: isSubmitting, progress } = useAddCourse();
  const [instructors, setInstructors] = useState([]);
  const [notes, setNotes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [formData, setFormData] = useState({
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
  });
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    if (!formData.subject || !formData.classFor) return; // Fetch only when both are selected

    const fetchData = async () => {
      try {
        const instructorsRes = axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/instructor/get`
        );
        const notesRes = axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/notes/getPaid?subject=${formData.subject}&classFor=${formData.classFor}`
        );
        const quizzesRes = axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/quizzes/get`
        );

        const [instructors, notes, quizzes] = await Promise.all([
          instructorsRes,
          notesRes,
          quizzesRes,
        ]);
        console.log(instructors)
        setInstructors(instructors.data);
        setNotes(notes.data);
        setQuizzes(quizzes.data.quizzes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [formData.subject, formData.classFor]);
  console.log(notes,formData.subject,formData.classFor);
  const validateTab1 = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.board ||
      !formData.classFor ||
      !formData.subject
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields before proceeding.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  const validateTab2 = () => {
    if (
      !formData.moduleDescription || // Global module description
      formData.modules.length === 0 || // At least one module required
      formData.modules.some(
        (module) =>
          !module.name ||
          !module.estimatedTime ||
          !module.videoLink // Or videoLink if that's what you use
      )
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill all required module fields before proceeding.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const resetForm = () => {
    setFormData({
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
    });
    setActiveTab(1);
  };
  const handleNotesChange = () => {
    const newValue = !isNotesChecked;
    setIsNotesChecked(newValue);

    setFormData((prevData) => {
      const updatedKeyFeatures = Array.isArray(prevData.keyFeatures)
        ? [...prevData.keyFeatures]
        : [];

      if (newValue) {
        if (!updatedKeyFeatures.includes("notes")) {
          updatedKeyFeatures.push("notes");
        }
      } else {
        const index = updatedKeyFeatures.indexOf("notes");
        if (index !== -1) updatedKeyFeatures.splice(index, 1);
      }

      return {
        ...prevData,
        keyFeatures: updatedKeyFeatures,
      };
    });
  };

  const handleQuizzesChange = () => {
    const newValue = !isQuizzesChecked;
    setIsQuizzesChecked(newValue);

    setFormData((prevData) => {
      const updatedKeyFeatures = Array.isArray(prevData.keyFeatures)
        ? [...prevData.keyFeatures]
        : [];

      if (newValue) {
        if (!updatedKeyFeatures.includes("quizzes")) {
          updatedKeyFeatures.push("quizzes");
        }
      } else {
        const index = updatedKeyFeatures.indexOf("quizzes");
        if (index !== -1) updatedKeyFeatures.splice(index, 1);
      }

      return {
        ...prevData,
        keyFeatures: updatedKeyFeatures,
      };
    });
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };
  const handleVideoChange = (index, file) => {
    setFormData((prevData) => {
      const updatedModules = [...prevData.modules];
      updatedModules[index] = {
        ...updatedModules[index],
        videoLink: file, // Store the file object, not the URL
      };
      return { ...prevData, modules: updatedModules };
    });
  };
  const handleModuleChange = (index, event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => {
      const updatedModules = [...prevData.modules];
      updatedModules[index] = {
        ...updatedModules[index],
        [name]: files ? files[0] : value, // Handle file uploads and text inputs
      };
      return { ...prevData, modules: updatedModules };
    });
  };
  const addModule = () => {
    setFormData((prevData) => {
      console.log("Existing Modules:", prevData.modules); // Log previous modules
      return {
        ...prevData,
        modules: [
          ...prevData.modules,
          { name: "", estimatedTime: "", videoLink: null }, // New empty module
        ],
      };
    });
  };
  const removeModule = (index) => {
    setFormData((prevData) => {
      console.log("Removing Module at index:", index);
      return {
        ...prevData,
        modules: prevData.modules.filter((_, i) => i !== index),
      };
    });
  };
  const handleChange = (e) => {
    if (e?.target) {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide font-header text-gray-900">
            Create New Course
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r">
            <div className="flex items-center">
              <FaTimes className="w-5 h-5 mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab(1)}
                className={`py-4 px-6 font-bold text-sm border-b-2 ${
                  activeTab === 1
                    ? "border-secondary text-secondary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Course Details
              </button>

              <button
                onClick={() => {
                  if (validateTab1()) setActiveTab(2);
                }}
                className={`py-4 px-6 font-bold text-sm border-b-2 ${
                  activeTab === 2
                    ? "border-secondary text-secondary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Module Details
              </button>
              <button
                onClick={() => {
                  if (validateTab1()) setActiveTab(3);
                }}
                className={`py-4 px-6 font-bold text-sm border-b-2 ${
                  activeTab === 3
                    ? "border-secondary text-secondary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pricing & Availability
              </button>
            </nav>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) =>
              handleSubmit(
                e,
                formData,
                setFormData,
                openModal,
                closeModal,
                resetForm,
                setUploadType
              )
            }
            className="p-8"
          >
            {/* Tab 1: Course Details */}
            {activeTab === 1 && (
              <div className="space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
                      <FaBookOpen className="w-5 h-5 mr-2 text-secondary" />{" "}
                      Basic Information
                    </h3>

                    {/* Course Title */}
                    <TextInput
                      label="Course Title *"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />

                    {/* Course Description */}
                    <TextAreaInput
                      label="Course Description *"
                      required
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />

                    {/* About Course */}
                    <TextAreaInput
                      label="About Course *"
                      required
                      value={formData.aboutCourse}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aboutCourse: e.target.value,
                        })
                      }
                    />

                    {/* Topics Covered */}
                    <TextInput
                      label="Topics Covered (comma-separated)"
                      value={formData.topicsCovered}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          topicsCovered: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Academic Info */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
                      <FaSchool className="w-5 h-5 mr-2 text-secondary" />{" "}
                      Academic Information
                    </h3>

                    <div className="mb-5">
                      <Select
                        menuTitle="Board *"
                        required
                        value={formData.board}
                        submenuItems={boards}
                        onSelect={(board) =>
                          setFormData({ ...formData, board, classFor: "" })
                        }
                      />
                    </div>

                    <div className="mb-5 mt-10">
                      <Select
                        menuTitle="Class *"
                        required
                        value={formData.classFor}
                        submenuItems={getClassOptions(formData.board)}
                        onSelect={(cls) =>
                          setFormData({
                            ...formData,
                            classFor: cls,
                            stream: undefined,
                            subject: "",
                          })
                        }
                        disabled={!formData.board}
                      />
                    </div>

                    {parseInt(formData.classFor) > 10 && (
                      <div className="mb-5 mt-10">
                        <Select
                          menuTitle="Stream *"
                          value={formData.stream}
                          submenuItems={streams}
                          onSelect={(stream) =>
                            setFormData({ ...formData, stream, subject: "" })
                          }
                        />
                      </div>
                    )}

                    <div className="mb-5 mt-10">
                      {" "}
                      <Select
                        menuTitle="Subject *"
                        required
                        value={formData.subject}
                        submenuItems={getSubjects(
                          formData.classFor,
                          formData.stream
                        )}
                        onSelect={(subject) =>
                          setFormData({ ...formData, subject })
                        }
                        disabled={
                          !formData.classFor ||
                          (formData.classFor > 10 && !formData.stream)
                        }
                      />
                    </div>

                    <div className="mb-5 mt-10">
                      {" "}
                      <Select
                        menuTitle="Category *"
                        value={formData.category}
                        submenuItems={category}
                        required
                        onSelect={(selectedCategory) => {
                          setFormData({
                            ...formData,
                            category: selectedCategory,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateTab1()) setActiveTab(2);
                    }}
                    className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90"
                  >
                    Next: Module Details
                  </button>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
                  <FaBookOpen className="w-5 h-5 mr-2 text-secondary" />{" "}
                    Module Information
                  </h3>

                  {/* Global Module Description */}
                  <TextAreaInput
                    label="Module Description *"
                    required
                    value={formData.moduleDescription || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        moduleDescription: e.target.value,
                      })

                    }
                    className="mt-3"
                  />
                  
                  

                  <div className="space-y-6 mt-6">
                    {formData.modules.map((module, index) => (
                      <div
                        key={index}
                        className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm flex flex-col md:flex-row items-start gap-4"
                      >
                        {/* Left: Video Uploader */}
                        <div className="w-full md:w-40 flex-shrink-0 flex justify-center md:justify-start mt-6">
                          <VideoUploader
                            label="Add Video"
                            onChange={(file) => handleVideoChange(index, file)}
                            required
                            FileUrl={module.videoLink}
                          />
                        </div>

                        {/* Right: Name & Estimated Time */}
                        <div className="flex-1 space-y-3 w-full">
                          <TextInput
                            type="text"
                            name="name"
                            label={`Module ${index + 1} Name *`}
                            value={module.name}
                            onChange={(e) => handleModuleChange(index, e)}
                            required
                          />
                          <TextInput
                            type="number"
                            name="estimatedTime"
                            label={`Module ${index + 1} Estimated Time  *`}
                            value={module.estimatedTime}
                            onChange={(e) => handleModuleChange(index, e)}
                            required
                          />
                        </div>

                        {/* Remove Button */}
                        <div className="w-full md:w-auto flex justify-center md:justify-start">
  <button
    type="button"
    onClick={() => removeModule(index)}
    className="flex items-center gap-2 px-6 py-2.5 bg-error text-white rounded-lg shadow-md  hover:bg-error/90  hover:shadow-lg transition-all duration-200 ease-in-out mt-2 md:mt-[75px]"
  >
    <FaRegTrashAlt className="text-lg" />
    <span className="hidden sm:inline">Remove</span>
  </button>
</div>




                      </div>
                    ))}

                    {/* Add Module Button */}
                    <div className="flex justify-center">
  <button
    type="button"
    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200"
    onClick={addModule}
  >
    <BiLayerPlus className="text-lg" />
    Add Module
  </button>
</div>
                  </div>
                </div>
               {/* Footer Buttons */}
<div className="flex justify-between pt-4 border-t border-gray-200">
  <button
    type="button"
    onClick={() => {
      if (activeTab === 1) {
        navigate(-1); // Cancel = go back to previous page
      } else {
        setActiveTab(activeTab - 1); // Go to previous tab
      }
    }}
    className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90"
  >
    {activeTab === 1 ? "Cancel" : "Previous Course Details"}
  </button>

  <button
    type="button"
    onClick={() => {
      if (validateTab2()) setActiveTab(3);
    }}
    className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90"
  >
    Next: Upload Files
  </button>
</div>

              </div>
            )}

            {/* Tab 2: Upload Files */}
            {activeTab === 3 && (
  <div className="space-y-8">

    {/* Pricing Section */}
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
      <h3 className="text-lg font-bold text-secondary mb-4">
        Pricing Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Original Price */}
        <TextInput
          type="number"
          name="originalPrice"
          label="Original Price"
          value={formData.originalPrice}
          onChange={(e) =>
            setFormData({ ...formData, originalPrice: e.target.value })
          }
          required
        />

        {/* Discounted Price */}
        <TextInput
          type="number"
          name="discountedPrice"
          label="Discounted Price"
          value={formData.discountedPrice}
          onChange={(e) =>
            setFormData({ ...formData, discountedPrice: e.target.value })
          }
          required
        />

        {/* Discount Percentage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Percentage
          </label>
          <input
            type="text"
            readOnly
            value={
              formData.originalPrice && formData.discountedPrice
                ? `${Math.round(
                    ((formData.originalPrice - formData.discountedPrice) /
                      formData.originalPrice) *
                      100
                  )}%`
                : ""
            }
            className="w-full rounded-lg border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>

    {/* Course Options */}
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 space-y-6">
      <h3 className="text-lg font-bold text-secondary mb-4">
        Course Options
      </h3>

      {/* Include Notes & Quizzes */}
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

      {/* Instructor Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Instructor
        </label>
        <select
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          className="select w-full rounded-lg border-gray-300 shadow-sm"
          required
        >
          <option value="">Select Instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor._id} value={instructor._id}>
              {instructor.name}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional Notes Select */}
      {isNotesChecked && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select a Note
          </label>
          <select
            name="notes"
            value={formData.notes}
            onChange={(e) => handleArrayChange(e, "notes")}
            className="select w-full rounded-lg border-gray-300 shadow-sm"
          >
            <option value="">Select a Note</option>
            {notes.map((note) => (
              <option key={note._id} value={note._id}>
                {note.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Conditional Quizzes Select */}
      {isQuizzesChecked && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select a Quiz
          </label>
          <select
            name="quizzes"
            value={formData.quizzes}
            onChange={(e) => handleArrayChange(e, "quizzes")}
            className="select w-full rounded-lg border-gray-300 shadow-sm"
          >
            <option value="">Select a Quiz</option>
            {quizzes.map((quiz) => (
              <option key={quiz._id} value={quiz._id}>
                {quiz.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="flex justify-between pt-4 border-t border-gray-200">
      <button
        type="button"
        onClick={() => setActiveTab(1)}
        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white"
      >
        Back
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-70"
      >
        {isSubmitting ? "Creating Course..." : "Create Course"}
      </button>
    </div>
  </div>
)}


          </form>
        </div>
      </div>

      {/* Upload Progress Modal */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} progress={progress}>
        <p className="text-lg font-medium mb-2">Uploading {uploadType}...</p>
      </Modal>
    </div>
  );
};

export default AddCourse;
