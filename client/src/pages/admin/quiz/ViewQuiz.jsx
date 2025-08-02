import React, { useState, useEffect } from "react";
import BookLoader from "../../../components/BookLoader";
import { Button } from "../../../ui/button"; // Assuming this is your Shadcn/ui Button or similar
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
  FaListOl,
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

        // Assuming your API returns the quiz object directly for getQuizById
        setQuiz(response.data);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError(err.response?.data?.message || "Failed to load quiz");
        toast({
          // Using your toast from use-toast
          title: "Error",
          description:
            err.response?.data?.message ||
            "Failed to load quiz details. Please try again.",
          variant: "destructive",
        });
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-body">
      {" "}
      {/* Darker overlay, set global font */}
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95 animate-scaleIn" // Larger max-w, subtle animation
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-xl">
          {" "}
          {/* Enhanced header background */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-header font-extrabold text-primary tracking-wide">
              {" "}
              {/* Stronger title */}
              {quiz?.name || "Quiz Details"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-100" // Clearer close button
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {" "}
          {/* Increased padding, more vertical space */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px] py-16">
              {" "}
              {/* Min-height for loader */}
              <BookLoader />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              {" "}
              {/* Stronger error color */}
              <p className="mb-6 text-lg font-medium">{error}</p>
              <Button
                onClick={onClose}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg shadow-md transition-colors"
              >
                {" "}
                {/* Styled button */}
                Close
              </Button>
            </div>
          ) : quiz ? (
            <div className="space-y-8">
              {" "}
              {/* Overall spacing for sections */}
              {/* Quiz General Information Section */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Quiz Overview
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex items-start space-x-2">
                    <FaBook className="mt-1 text-primary/80 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-600 mb-1">Subject</p>
                      <p className="text-lg text-tertiary capitalize">
                        {quiz.subject || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaUserGraduate className="mt-1 text-primary/80 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-600 mb-1">Class</p>
                      <p className="text-lg text-tertiary">
                        {quiz.class || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaClipboardList className="mt-1 text-primary/80 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-600 mb-1">Board</p>
                      <p className="text-lg text-tertiary">
                        {quiz.board || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaEye className="mt-1 text-primary/80 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-600 mb-1">
                        Visibility
                      </p>
                      <p className="text-lg text-tertiary capitalize">
                        {quiz.visibility || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaClock className="mt-1 text-primary/80 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-600 mb-1">
                        Time Limit
                      </p>
                      <p className="text-lg text-tertiary">
                        {quiz.timeLimit
                          ? `${quiz.timeLimit} minutes`
                          : "No time limit"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaAward className="mt-1 text-primary/80 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-600 mb-1">
                        Total Marks
                      </p>
                      <p className="text-lg text-tertiary">
                        {quiz.totalMarks || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCalendarAlt className="mt-1 text-primary/80 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-600 mb-1">
                        Created At
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(quiz.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaEdit className="mt-1 text-primary/80 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-600 mb-1">
                        Last Updated
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(quiz.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Description Section */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Description
                </h3>
                <p className="text-tertiary leading-relaxed">
                  {quiz.description || "No description provided."}
                </p>
              </div>
              {/* Questions Section */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                {" "}
                {/* Distinct background for questions */}
                <div className="flex items-center space-x-3 mb-6">
                  <FaListOl className="text-2xl text-primary" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Questions
                  </h3>
                  <span className="px-3 py-1 bg-accent/20 text-primary rounded-full text-sm font-bold flex items-center">
                    {quiz.questions?.length || 0}
                  </span>
                </div>
                <div className="space-y-6">
                  {quiz.questions?.length > 0 ? (
                    quiz.questions.map((q, index) => (
                      <div
                        key={q._id || index}
                        className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        {" "}
                        {/* Unique key, border, shadow */}
                        <div className="flex items-start space-x-2 mb-3">
                          <FaQuestionCircle className="mt-1 text-primary/80 flex-shrink-0" />
                          <h4 className="font-bold text-gray-800 text-base">
                            {index + 1}. {q.question}
                          </h4>
                        </div>
                        {q.explanation && (
                          <p className="text-sm text-gray-500 mb-3 italic">
                            Explanation: {q.explanation}
                          </p>
                        )}
                        <div className="flex items-center space-x-2 mb-3">
                          <FaAward className="text-amber-500" />
                          <span className="text-sm font-medium text-gray-700">
                            Marks:{" "}
                            <span className="font-bold text-primary">
                              {q.marks || 1}
                            </span>
                          </span>
                        </div>
                        <div className="space-y-3">
                          {q.options?.map((opt, optIndex) => (
                            <div
                              key={opt._id || optIndex}
                              className={`p-3 rounded-md flex items-center transition-all duration-200 ${
                                opt.isCorrect
                                  ? "bg-primary/5 border border-secondary text-secondary font-medium"
                                  : "bg-gray-100 border border-gray-200 text-gray-700"
                              }`}
                            >
                              <span className="font-semibold text-sm mr-2 w-6 shrink-0">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>
                              <span className="flex-1 text-sm">{opt.text}</span>
                              {opt.isCorrect && (
                                <span className="ml-auto text-secondary text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary/10">
                                  Correct Answer
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No questions available for this quiz.
                    </p>
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

export default ViewQuiz;
