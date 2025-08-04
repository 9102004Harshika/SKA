import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BookLoader from "../../../components/BookLoader";
import { Button } from "../../../ui/button";
import {
  FaTimes,
  FaBook,
  FaClock,
  FaUserGraduate,
  FaClipboardList,
  FaEye,
  FaCheckCircle,
  FaCalendarAlt,
  FaEdit,
  FaAward,
  FaQuestionCircle,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "../../../components/use-toast";

const ViewQuiz = ({ quizId, isOpen, onClose }) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/quizzes/${quizId}`,
          { withCredentials: true }
        );

        setQuiz(response.data);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        const errorMessage =
          err.response?.data?.message ||
          "Failed to load quiz details. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && quizId) {
      fetchQuiz();
    } else {
      // Reset state when closing to ensure fresh data on next open
      setQuiz(null);
      setError(null);
      setLoading(true); // Keep loading true until next fetch starts
    }
  }, [quizId, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-body">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Quiz Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/10"
              aria-label="Close modal"
              type="button"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <BookLoader />
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white/80 rounded-xl m-4">
              <p className="text-red-500 mb-6 text-lg">{error}</p>
              <Button
                onClick={onClose}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 hover:border-primary/80 transition-colors"
              >
                Close
              </Button>
            </div>
          ) : quiz ? (
            <div className="space-y-8">
              {/* Quiz Overview Section */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Quiz Overview
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* Subject */}
                  <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FaBook className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Subject
                      </p>
                      <p className="text-base font-medium text-gray-800 capitalize">
                        {quiz.subject || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Class */}
                  <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FaUserGraduate className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Class
                      </p>
                      <p className="text-base font-medium text-gray-800">
                        {quiz.class || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Board */}
                  <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FaClipboardList className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Board
                      </p>
                      <p className="text-base font-medium text-gray-800">
                        {quiz.board || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Visibility */}
                  <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FaEye className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Visibility
                      </p>
                      <p className="text-base font-medium text-gray-800 capitalize">
                        {quiz.visibility || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Time Limit */}
                  <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FaClock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Time Limit
                      </p>
                      <p className="text-base font-medium text-gray-800">
                        {quiz.timeLimit
                          ? `${quiz.timeLimit} minutes`
                          : "No time limit"}
                      </p>
                    </div>
                  </div>

                  {/* Total Marks */}
                  <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FaAward className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Total Marks
                      </p>
                      <p className="text-base font-medium text-gray-800">
                        {quiz.totalMarks || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Created At */}
                  <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FaCalendarAlt className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Created At
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                        {new Date(quiz.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FaEdit className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Last Updated
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                        {new Date(quiz.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {quiz.description && (
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Description
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {quiz.description}
                  </p>
                </div>
              )}

              {/* Questions Section */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Questions
                    </h3>
                    <span className="ml-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {quiz.questions?.length || 0}{" "}
                      {quiz.questions?.length === 1 ? "Question" : "Questions"}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {quiz.questions?.length > 0 ? (
                    quiz.questions.map((q, index) => (
                      <div
                        key={q._id || index}
                        className="border border-gray-100 rounded-xl p-6 bg-white/50 hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                {q.question}
                              </h4>
                              <div className="flex items-center bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium ml-4">
                                <FaAward className="mr-1.5" />
                                {q.marks || 1}{" "}
                                {q.marks === 1 ? "Mark" : "Marks"}
                              </div>
                            </div>
                            {q.explanation && (
                              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-300 rounded-r-lg">
                                <div className="flex">
                                  <div className="flex-shrink-0">
                                    <svg
                                      className="h-5 w-5 text-blue-400"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H9V9z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm text-blue-700">
                                      {q.explanation}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="space-y-3 mt-4">
                              {q.options?.map((opt, optIndex) => (
                                <div
                                  key={opt._id || optIndex}
                                  className={`p-4 rounded-xl flex items-center transition-all duration-200 ${
                                    opt.isCorrect
                                      ? "bg-green-50 border-2 border-green-200 text-green-800"
                                      : "bg-gray-50 border border-gray-100 text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  <div
                                    className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 flex-shrink-0 ${
                                      opt.isCorrect
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    <span className="text-sm font-medium">
                                      {String.fromCharCode(65 + optIndex)}
                                    </span>
                                  </div>
                                  <span className="text-base">{opt.text}</span>
                                  {opt.isCorrect && (
                                    <span className="ml-auto flex items-center text-green-600 text-sm font-medium px-3 py-1 rounded-full bg-green-50 border border-green-100">
                                      <FaCheckCircle className="mr-1.5" />
                                      Correct
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <div className="mx-auto w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                        <FaQuestionCircle className="w-10 h-10 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-700 mb-2">
                        No Questions Yet
                      </h4>
                      <p className="text-gray-500 max-w-md mx-auto">
                        This quiz doesn't have any questions added yet. Add some
                        questions to make it complete.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

ViewQuiz.propTypes = {
  quizId: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ViewQuiz.defaultProps = {
  quizId: "",
};

export default ViewQuiz;
