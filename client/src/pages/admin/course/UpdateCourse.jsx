

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaBookOpen, FaSchool, FaUpload, FaRegTrashAlt, FaVideo } from "react-icons/fa";
import { BiLayerPlus } from "react-icons/bi";
import { IoMdPricetags } from "react-icons/io";
import { LuSettings } from "react-icons/lu";

import TextInput from "../../../ui/textInput";
import TextAreaInput from "../../../ui/textarea";
import Select from "../../../ui/select";
import { Checkbox } from "../../../ui/checkBox";
import Button from "../../../ui/button";
import ImageUploader from "../../../ui/imageUploader";
import VideoUploader from "../../../ui/videoUploader";
import Modal from "../../../components/Modal";
import { toast } from "../../../components/use-toast";

import useUpdateCourse from "../../../logic/course/updateCourse";
import { boards, getClassOptions, streams, getSubjects, category } from "../../../config";
import axios from "axios";

const UpdateCourse = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [isNotesChecked, setIsNotesChecked] = useState(false);
  const [isQuizzesChecked, setIsQuizzesChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [notes, setNotes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const {
    course,
    setCourse,
    handleSubmit,
    deleteFile,
    handleChange,
    loading,
    progress,
  } = useUpdateCourse();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addModule = () => {
    setCourse({
      ...course,
      modules: [...course.modules, { name: "", estimatedTime: "", videoLink: "" }],
    });
  };
  useEffect(() => {
    if (!course.subject || !course.class) return; // Fetch only when both are selected

    const fetchData = async () => {
      try {
        const instructorsRes = axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/instructor/get`
        );
        const notesRes = axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/notes/getPaid?subject=${course.subject}&classFor=${course.class}`
        );
        const quizzesRes = axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/quizzes/get`
        );

        const [instructors, notes, quizzes] = await Promise.all([
          instructorsRes,
          notesRes,
          quizzesRes,
        ]);
        setInstructors(instructors.data);
        setNotes(notes.data);
        setQuizzes(quizzes.data.quizzes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [course.subject, course.class]);

  const removeModule = (index) => {
    setCourse({
      ...course,
      modules: course.modules.filter((_, i) => i !== index),
    });
  };

  const handleModuleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedModules = [...course.modules];
    updatedModules[index][name] = value;
    setCourse({ ...course, modules: updatedModules });
  };
  const handleVideoChange = (index, file) => {
    const updatedModules = [...course.modules];
    updatedModules[index].videoLink = file;
    setCourse({ ...course, modules: updatedModules });
  };

  const handleNotesChange = () => {
    const newVal = !isNotesChecked;
    setIsNotesChecked(newVal);
    setCourse((prev) => ({
      ...prev,
      keyFeatures: newVal
        ? [...prev.keyFeatures, "notes"]
        : prev.keyFeatures.filter((f) => f !== "notes"),
      notes: newVal ? prev.notes : [],
    }));
  };

  const handleQuizzesChange = () => {
    const newVal = !isQuizzesChecked;
    setIsQuizzesChecked(newVal);
    setCourse((prev) => ({
      ...prev,
      keyFeatures: newVal
        ? [...prev.keyFeatures, "quizzes"]
        : prev.keyFeatures.filter((f) => f !== "quizzes"),
      quizzes: newVal ? prev.quizzes : [],
    }));
  };

  const validateTab1 = () => {
    if (!course.courseTitle || !course.courseDescription || !course.aboutCourse || !course.board || !course.class || !course.subject || !course.category) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
     
      return false;
    }
    return true;
  };

  const validateTab2 = () => {
    if (!course.moduledescription || !course.modules.length) {
      toast({ title: "Error", description: "Please fill module details", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateTab3 = () => true;
  const handleArrayChange = (e, field) => {
    const selectedValues = e.target.selectedOptions
      ? Array.from(e.target.selectedOptions, (option) => option.value)
      : [];
  
    setCourse((prev) => ({
      ...prev,
      [field]: selectedValues, // always an array, even if empty
    }));
  };
console.log(course.courseImage)
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide font-header text-gray-900">Update Course</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab(1)}
                className={`flex-shrink-0 py-4 px-6 font-bold text-sm border-b-2 ${
                  activeTab === 1 ? "border-secondary text-secondary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Course Details
              </button>
              <button
                onClick={() => validateTab1() && setActiveTab(2)}
                className={`flex-shrink-0 py-4 px-6 font-bold text-sm border-b-2 ${
                  activeTab === 2 ? "border-secondary text-secondary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Module Details
              </button>
              <button
                onClick={() => validateTab2() && setActiveTab(3)}
                className={`flex-shrink-0 py-4 px-6 font-bold text-sm border-b-2 ${
                  activeTab === 3 ? "border-secondary text-secondary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pricing & Availability
              </button>
              <button
                onClick={() => validateTab3() && setActiveTab(4)}
                className={`flex-shrink-0 py-4 px-6 font-bold text-sm border-b-2 ${
                  activeTab === 4 ? "border-secondary text-secondary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Thumbnail Upload
              </button>
            </nav>
          </div>

          <form
            onSubmit={(e) => handleSubmit(e, true, true, openModal, closeModal)}
            className="p-8 space-y-8"
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
                      value={course.courseTitle}
                      onChange={(e) =>
                        setCourse({ ...course, courseTitle: e.target.value })
                      }
                      
                    />

                    {/* Course Description */}
                    <TextAreaInput
                      label="Course Description *"
                      required
                      value={course.courseDescription}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          courseDescription: e.target.value,
                        })
                       
                      }
                      className="mt-5"
                    />

                    {/* About Course */}
                    <TextAreaInput
                      label="About Course *"
                      required
                      value={course.aboutCourse}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          aboutCourse: e.target.value,
                        })
                      }
                      className="mt-5"
                    />

                    {/* Topics Covered */}
                    <TextInput
                      label="Topics Covered (comma-separated)"
                      value={course.topicsCovered}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          topicsCovered: e.target.value,
                        })
                      }
                      className="mt-5"
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
                        value={course.board}
                        submenuItems={boards}
                        onSelect={(board) =>
                          setCourse({ ...course, board, class: "" })
                        }
                      />
                    </div>

                    <div className="mb-5 mt-10">
                      <Select
                        menuTitle="Class *"
                        required
                        value={course.class}
                        submenuItems={getClassOptions(course.board)}
                        onSelect={(cls) =>
                          setCourse({
                            ...course,
                            class: cls,
                            stream: undefined,
                            subject: "",
                          })
                        }
                        disabled={!course.board}
                      />
                    </div>

                    {parseInt(course.class) > 10 && (
                      <div className="mb-5 mt-10">
                        <Select
                          menuTitle="Stream *"
                          value={course.stream}
                          submenuItems={streams}
                          onSelect={(stream) =>
                            setCourse({ ...course, stream, subject: "" })
                          }
                        />
                      </div>
                    )}

                    <div className="mb-5 mt-10">
                      {" "}
                      <Select
                        menuTitle="Subject *"
                        required
                        value={course.subject}
                        submenuItems={getSubjects(
                          course.class,
                          course.stream
                        )}
                        onSelect={(subject) =>
                          setCourse({ ...course, subject })
                        }
                        disabled={
                          !course.class ||
                          (course.class > 10 && !course.stream)
                        }
                      />
                    </div>

                    <div className="mb-5 mt-10">
                      {" "}
                      <Select
                        menuTitle="Category *"
                        value={course.category}
                        submenuItems={category}
                        required
                        onSelect={(selectedCategory) => {
                          setCourse({
                            ...course,
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

            {/* Tab 2: Module Details */}
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
                    value={course.moduledescription || ""}
                    onChange={(e) =>
                      setCourse({
                        ...course,
                        moduledescription: e.target.value,
                      })
                    }
                    className="mt-3"
                  />

                  <div className="space-y-6 mt-6">
                    {course.modules.map((module, index) => (
                      <div
                        key={index}
                        className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm flex flex-col md:flex-row items-start gap-4"
                      >
                        {/* Left: Video Uploader */}
                        <div className="w-full md:w-40 flex-shrink-0 flex justify-center md:justify-start mt-6">
                         
  {typeof module.videoLink === "string" && module.videoLink && module.videoLink.startsWith("http")? (
    // Show only existing PDF from DB until deleted
    <div className="flex flex-col items-center rounded">
      <FaVideo className="w-20 h-20 text-secondary" />
      <p className="mt-2 text-sm truncate w-40">
        {module.videoLink.split("/").pop()}
      </p>
      <button
        type="button"
        onClick={(file) => handleVideoChange(index, file)}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  ) : (
    <div className="flex flex-col items-center md:items-start md:mt-[-10px]">
    <VideoUploader
      label="Upload File"
      required={!module.videoLink}
      onChange={(file) => handleVideoChange(index, file)}
    />
    <p className="text-xs text-center mt-3">
      *select a file or drag and drop to add file
    </p>
  </div>
  
  )}
                        </div>

                        {/* Right: Name & Estimated Time */}
                        <div className="flex-1 space-y-4 mt-2 ml-3 w-full">
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
                    onClick={() => setActiveTab(1)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (validateTab2()) setActiveTab(3);
                    }}
                    className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90"
                  >
                    Next: Pricing & Availability
                  </button>
                </div>
              </div>
            )}


            
            {/* Tab 3: Pricing & Availability */}
{activeTab === 3 && (
  <div className="space-y-8">
    {/* Price Details */}
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
      <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
        <IoMdPricetags className="w-5 h-5 mr-2 text-secondary" />
        Price Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
        {/* Original Price */}
        <TextInput
          label="Original Price"
          type="number"
          name="originalPrice"
          value={course.originalPrice}
          onChange={handleChange}
          className="w-full"
        />

        {/* Discounted Price */}
        <TextInput
          label="Discounted Price"
          type="number"
          name="discountedPrice"
          value={course.discountedPrice}
          onChange={handleChange}
          className="w-full"
        />

        {/* Discount Percentage */}
        <div className="w-full">
          <label className="block text-sm font-medium text-primary  md:mt-[-90px] mb-1">
            Discount Percentage
          </label>
          <div className="h-[42px] flex items-center border-b border-primary px-2 font-bold text-gray-800">
            {course.originalPrice && course.discountedPrice
              ? `${Math.round(
                  ((course.originalPrice - course.discountedPrice) /
                    course.originalPrice) *
                    100
                )}%`
              : "0%"}
          </div>
        </div>
      </div>
    </div>

    {/* Course Options */}
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 space-y-6">
  <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
    <LuSettings className="w-5 h-5 mr-2 text-secondary" />
    Course Options
  </h3>

  {/* Include Notes & Quizzes */}
  <div className="flex space-x-4">
    <Checkbox
      text="Include Notes"
      checked={isNotesChecked || (course.notes?.length > 0)} // auto-check if notes exist
      onChange={handleNotesChange}
    />
    <Checkbox
      text="Include Quizzes"
      checked={isQuizzesChecked || (course.quizzes?.length > 0)} // auto-check if quizzes exist
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
      value={course?.instructor?._id || ""} // selected id
      onChange={handleChange}
      className="select w-full rounded-lg border-gray-300 shadow-sm"
      required
    >
      <option value="">Select Instructor</option>
      {instructors.map((instructor) => (
        <option key={instructor._id} value={instructor._id}>
          {instructor.user?.fullName}
        </option>
      ))}
    </select>
  </div>

  {/* Conditional Notes Select */}
  {(isNotesChecked || course.notes?.length > 0) && (
  <div>
    {notes.length > 0 ? (
      <>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select a Note
        </label>
        <select
          name="notes"
          value={
            course.notes?.[0]?._id || course.notes?.[0] || ""
          } // preselect saved note (works if it's object or ID)
          onChange={(e) => handleArrayChange(e, "notes")}
          className="select w-full rounded-lg border-gray-300 shadow-sm"
        >
          <option value="">Select a Note</option>
          {notes.map((note) => (
            <option key={note._id} value={note._id}>
              {note.title} {/* 👀 all available notes shown */}
            </option>
          ))}
        </select>
      </>
    ) : (
      <p className="text-sm text-error italic">
        No paid notes available for selected subject and class!
      </p>
    )}
  </div>
)}


  {/* Conditional Quizzes Select */}
  {(isQuizzesChecked || course.quizzes?.length > 0) && (
  <div>
    {quizzes.length > 0 ? (
      <>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select a Quiz
        </label>
        <select
          name="quizzes"
          value={course.quizzes?.[0]?._id || course.quizzes?.[0] || ""}
          onChange={(e) =>
            setCourse({ ...course, quizzes: [e.target.value] })
          }
          className="select w-full rounded-lg border-gray-300 shadow-sm"
        >
          <option value="">Select a Quiz</option>
          {quizzes.map((quiz) => (
            <option key={quiz._id} value={quiz._id}>
              {quiz.name} {/* 👀 all available quizzes listed */}
            </option>
          ))}
        </select>
      </>
    ) : (
      <p className="text-sm text-error italic">No quizzes available!</p>
    )}
  </div>
)}

</div>


    {/* Footer */}
    <div className="flex justify-between pt-4 border-t border-gray-200">
      <button
        type="button"
        onClick={() => setActiveTab(2)}
        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white"
      >
        Back
      </button>
      <button
        type="button"
        onClick={() => {
          if (validateTab3()) setActiveTab(4);
        }}
        className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90"
      >
        Next: Thumbnail Upload
      </button>
    </div>
  </div>
)}


            {/* Tab 4: Thumbnail Upload */}
            {activeTab === 4 && (
              <div className="space-y-8">
                
                 <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 w-full">
                 <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
                      <FaUpload className="w-5 h-5 mr-2 text-secondary" /> Upload Cover Image
                    </h3>
                    {typeof course.courseImage === "string" && course.courseImage && course.courseImage.startsWith("http") ? (
  // Show only existing image from DB until deleted
  <div className="flex flex-col items-center rounded">
    <img
      src={course.courseImage}
      alt="Course Cover"
      className="w-24 h-24 object-cover rounded"
    />
    <p className="mt-2 text-sm truncate w-40">
      {course.courseImage.split("/").pop()}
    </p>
    <button
      type="button"
      onClick={() => setCourse({ ...course, courseImage: "" })}
      className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Delete
    </button>
  </div>
) : (
<div className="flex flex-col items-center mt-[10px]">
  <ImageUploader
    label="Upload Cover Image"
    onChange={(file) => setCourse({ ...course, courseImage: file })}
    required={!course.courseImage}
  />
  <p className="text-xs text-center mt-3">
    *select a file or drag and drop to add file
  </p>
</div>

)}
                    
                  </div>
              

                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveTab(3)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-70"
                  >
                    {loading ? "Updating Course..." : "Update Course"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal} progress={progress}>
        <p className="text-lg font-medium mb-2">Uploading {uploadType}...</p>
      </Modal>
    </div>
  );
};

export default UpdateCourse;
