import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "../../../components/use-toast";
import {
  FaQuestion,
  FaTimes,
  FaPlus,
  FaClock,
  FaBookOpen,
  FaAward,
  FaSchool,
  FaChevronDown,
} from "react-icons/fa";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const UpdateQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${API_URL}api/quizzes/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const quiz = response.data.quiz;

          setFormData({
            name: quiz.name,
            description: quiz.description,
            visibility: quiz.visibility,
            board: quiz.board || "",
            class: quiz.class || "",
            timeLimit: quiz.timeLimit,
            subject: quiz.subject,
            questions: quiz.questions.map((q) => ({
              question: q.question,
              options: q.options.map((opt) => opt.text),
              correctOption: q.options.findIndex((opt) => opt.isCorrect),
              marks: q.marks,
              explanation: q.explanation || "",
            })),
          });
        } else {
          toast({
            title: "Error",
            description: "Quiz not found.",
            variant: "destructive",
          });
          navigate("/admin/quiz");
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
        toast({
          title: "Error",
          description: "Failed to load quiz details.",
          variant: "destructive",
        });
        navigate("/admin/quiz");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [id, navigate]);

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
      [name]: name === "correctOption" || name === "marks" ? parseInt(value) : value,
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
          explanation: "",
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
    setIsSubmitting(true);

    try {
      const totalMarks = formData.questions.reduce(
        (sum, q) => sum + (parseInt(q.marks) || 0),
        0
      );

      const updatedQuiz = {
        ...formData,
        totalMarks,
        questions: formData.questions.map((q) => ({
          ...q,
          options: q.options
            .filter((opt) => opt.trim() !== "")
            .map((opt, index) => ({
              text: opt,
              isCorrect: index === parseInt(q.correctOption),
            })),
        })),
      };

      const response = await axios.put(
        `${API_URL}api/quizzes/update/${id}`,
        updatedQuiz,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
   
      if (response.status === 200 || response.data.success) {
        toast({
          title: "Success",
          description: "Quiz updated successfully.",
          variant: "success",
        });
        navigate("/admin/quiz");
      } else {
        throw new Error(response.data.message || "Update failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          error.message ||
          "Failed to update quiz.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading quiz details...</div>;
  }

  if (!formData) {
    return <div className="p-8 text-center">Quiz data not available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide font-header text-gray-900">
            Update Quiz
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                {/* Same UI as AddQuiz for Details */}
                {/* Basic Info */}
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
                          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4">
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
                          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4">
                            Description *
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Academic Info */}
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
                          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4">
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
                          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4">
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
                          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4">
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
                            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4">
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
                            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4">
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
                          <p className="text-sm text-gray-500">Total Questions</p>
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
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <div className="space-x-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab("questions")}
                      className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90"
                    >
                      Next: Edit Questions
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
                          className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500"
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
                              className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
                              required
                            />
                            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4">
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
                            className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
                            placeholder=" "
                            required
                          />
                          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4">
                            Question Text *
                          </label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Options * (Select the correct answer)
                        </label>
                        {q.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center gap-3">
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
                                className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                                  q.correctOption === oIndex
                                    ? "border-accent bg-accent"
                                    : "border-gray-300"
                                }`}
                              >
                                {q.correctOption === oIndex && (
                                  <div className="h-2 w-2 bg-white rounded-full" />
                                )}
                              </button>
                            </div>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(qIndex, oIndex, e.target.value)
                              }
                              className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
                              placeholder={`Option ${oIndex + 1}`}
                              required
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <div className="relative z-0">
                          <textarea
                            name="explanation"
                            value={q.explanation}
                            onChange={(e) => handleQuestionChange(qIndex, e)}
                            rows="2"
                            className="block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none resize-none"
                            placeholder=" "
                          />
                          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4">
                            Explanation (optional)
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addQuestion}
                  className="inline-flex items-center px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-colors"
                >
                  <FaPlus className="w-4 h-4 mr-2" />
                  Add Another Question
                </button>

                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveTab("details")}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Back to Details
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50"
                  >
                    {isSubmitting ? "Updating..." : "Update Quiz"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuiz;
