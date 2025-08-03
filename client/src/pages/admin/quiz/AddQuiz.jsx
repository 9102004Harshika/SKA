import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../../../components/use-toast";
import {
  FaQuestion,
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaClock,
  FaBookOpen,
  FaAward,
  FaUsers,
  FaBook,
  FaGraduationCap,
  FaSchool,
  FaCheck,
  FaChevronDown,
  FaCheckCircle,
  FaCircle,
} from "react-icons/fa";

import axios from "axios";

// API Configuration
const API_URL = process.env.REACT_APP_API_BASE_URL;

const AddQuiz = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "free",
    board: "",
    class: "",
    timeLimit: 30,
    subject: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctOption: 0,
        marks: 1,
        explanation: "",
      },
    ],
    totalMarks: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const questions = [...formData.questions];
    questions[index] = {
      ...questions[index],
      [name]:
        name === "correctOption" || name === "marks" ? parseInt(value) : value,
    };
    setFormData((prev) => ({
      ...prev,
      questions,
    }));
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const questions = [...formData.questions];
    questions[qIndex].options[oIndex] = value;
    setFormData((prev) => ({
      ...prev,
      questions,
    }));
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctOption: 0,
          marks: 1,
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    if (formData.questions.length <= 1) return;
    const questions = formData.questions.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      questions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Calculate total marks
      const totalMarks = formData.questions.reduce(
        (total, question) => total + (parseInt(question.marks) || 0),
        0
      );

      // Prepare the quiz data for submission
      const quizData = {
        ...formData,
        totalMarks,
        questions: formData.questions.map((q) => ({
          ...q,
          options: q.options
            .filter((opt) => opt.trim() !== "") // Remove empty options
            .map((opt, index) => ({
              text: opt,
              isCorrect: index === parseInt(q.correctOption)
            })),
          correctOption: parseInt(q.correctOption) || 0,
        })),
      };

      const response = await axios.post(`${API_URL}api/quizzes/add`, quizData, {
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("token") && {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }),
        },
        withCredentials: true,
      });

      if (response.data && response.data.success) {
        toast({
          title: "Success",
          description: "Quiz has been created successfully.",
          variant: "success",
        });
        navigate("/admin/quiz");
      } else {
        throw new Error(
          response.data?.message || "Unexpected response from server"
        );
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create quiz. Please try again.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      console.error("Error creating quiz:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide font-header text-gray-900">
            Create New Quiz
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
          {/* Form Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 px-6 font-bold text-sm border-b-2 ${
                  activeTab === "details"
                    ? "border-secondary text-secondary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Quiz Details
              </button>
              <button
                onClick={() => setActiveTab("questions")}
                className={`py-4 px-6 font-bold text-sm border-b-2 ${
                  activeTab === "questions"
                    ? "border-secondary text-secondary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Questions ({formData.questions.length})
              </button>
            </nav>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {activeTab === "details" ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
                        <FaBookOpen className="w-5 h-5 mr-2 text-secondary" />
                        Basic Information
                      </h3>
                      <div className="space-y-4">
                        <div className="relative z-0">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="name"
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                          >
                            Quiz Name *
                          </label>
                        </div>

                        <div className="relative z-0 mt-6">
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer resize-none"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="description"
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                          >
                            Description *
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
                        <FaSchool className="w-5 h-5 mr-2 text-secondary" />
                        Academic Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative z-0">
                          <input
                            type="text"
                            name="board"
                            value={formData.board}
                            onChange={handleChange}
                            className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer"
                            placeholder=" "
                          />
                          <label
                            htmlFor="board"
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                          >
                            Board
                          </label>
                        </div>
                        <div className="relative z-0">
                          <input
                            type="text"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer"
                            placeholder=" "
                          />
                          <label
                            htmlFor="class"
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                          >
                            Class
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
                        <FaClock className="w-5 h-5 mr-2 text-secondary" />
                        Quiz Settings
                      </h3>
                      <div className="space-y-4">
                        <div className="relative z-0">
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="subject"
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                          >
                            Subject *
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative z-0">
                            <input
                              type="number"
                              name="timeLimit"
                              min="1"
                              value={formData.timeLimit}
                              onChange={handleChange}
                              className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="timeLimit"
                              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                            >
                              Time Limit (minutes) *
                            </label>
                          </div>

                          <div className="relative z-0">
                            <select
                              name="visibility"
                              value={formData.visibility}
                              onChange={handleChange}
                              className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer"
                              required
                            >
                              <option value="free">Free</option>
                              <option value="paid">Paid</option>
                            </select>
                            <label
                              htmlFor="visibility"
                              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                            >
                              Visibility *
                            </label>
                            <FaChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
                        <FaAward className="w-5 h-5 mr-2 text-secondary" />
                        Summary
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-500">
                            Total Questions
                          </p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {formData.questions.length}
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-500">Total Marks</p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {formData.questions.reduce(
                              (sum, q) => sum + (parseInt(q.marks) || 0),
                              0
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <div className="space-x-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab("questions")}
                      className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
                    >
                      Next: Add Questions
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-6">
                  {formData.questions.map((q, qIndex) => (
                    <div
                      key={qIndex}
                      className="bg-gray-50 p-6 rounded-lg border border-gray-200 relative group"
                    >
                      {formData.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove question"
                        >
                          <FaTimes size={18} />
                        </button>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                          <FaQuestion className="mr-2" />
                          Question {qIndex + 1}
                        </h4>
                        <div className="w-32">
                          <div className="relative z-0">
                            <input
                              type="number"
                              name="marks"
                              min="1"
                              value={q.marks}
                              onChange={(e) => handleQuestionChange(qIndex, e)}
                              className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer"
                              required
                            />
                            <label
                              htmlFor="marks"
                              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                            >
                              Marks *
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="relative z-0">
                          <input
                            type="text"
                            name="question"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, e)}
                            className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="question"
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                          >
                            Question Text *
                          </label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Options * (Select the correct answer)
                          </label>
                          {q.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className="flex items-center group/option gap-3"
                            >
                              <div className="mt-1 flex items-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const event = {
                                      target: {
                                        name: "correctOption",
                                        value: oIndex.toString(),
                                      },
                                    };
                                    handleQuestionChange(qIndex, event);
                                  }}
                                  className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                                    q.correctOption === oIndex
                                      ? "bg-green-500 border-green-500 text-background"
                                      : "border-error text-error hover:border-error"
                                  }`}
                                >
                                  {q.correctOption === oIndex ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3.5 w-3.5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : q.correctOption !== null &&
                                    q.correctOption !== oIndex ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3.5 w-3.5 text-error"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : null}
                                </button>
                              </div>
                              <div className="relative z-0 flex-1">
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      qIndex,
                                      oIndex,
                                      e.target.value
                                    )
                                  }
                                  className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer"
                                  placeholder=" "
                                  required
                                />
                                <label
                                  htmlFor={`option-${qIndex}-${oIndex}`}
                                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                  Option {oIndex + 1} *
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-accent hover:bg-accent/5 transition-colors"
                  >
                    <FaPlus className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="text-sm font-medium text-gray-600">
                      Add Another Question
                    </span>
                  </button>
                </div>

                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <div className="space-x-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab("details")}
                      className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? "Creating Quiz..." : "Create Quiz"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
