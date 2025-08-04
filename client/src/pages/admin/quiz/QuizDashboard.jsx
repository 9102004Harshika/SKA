import React, { useState, useEffect, useMemo } from "react";
import {
  FaSearch,
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
  FaPlus,
  FaEye,
  FaAward,
  FaTrash,
  FaEdit,
  FaEllipsisV,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "../../../components/use-toast";
import BookLoader from "../../../components/BookLoader";
import ViewQuiz from "./ViewQuiz";

const QuizDashboard = () => {
  // All state declarations at the top
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 10;
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewQuizModalOpen, setViewQuizModalOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [quizToDelete, setQuizToDelete] = useState(null);

  // Fetch quizzes from the backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        console.log(
          "Fetching quizzes from:",
          `${process.env.REACT_APP_API_BASE_URL}api/quizzes/get`
        );
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/quizzes/get`,
          { withCredentials: true } // Include credentials if needed
        );
        console.log("Quiz API Response:", response);

        if (response.data && response.data.success) {
          setQuizzes(response.data.quizzes || []);
          setError(null);
        } else {
          const errorMessage =
            response.data?.message || "Failed to fetch quizzes";
          console.error("API Error:", errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err) {
        console.error("Error fetching quizzes:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          config: {
            url: err.config?.url,
            method: err.config?.method,
            headers: err.config?.headers,
          },
        });

        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to load quizzes. Please check your connection and try again.";

        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesSearch = quiz.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSubject =
        filterSubject === "All" || quiz.subject === filterSubject;
      return matchesSearch && matchesSubject;
    });
  }, [quizzes, searchTerm, filterSubject]);

  if (loading) {
    return <BookLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </div>
    );
  }

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = filteredQuizzes.slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );
  const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);

  const subjects = [
    "All",
    "Computer Science",
    "Mathematics",
    "Science",
    "Engineering",
    "Business",
  ];

  const handleDeleteQuiz = (id) => {
    setQuizToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Filter out the quiz to be deleted
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizToDelete);
    setQuizzes(updatedQuizzes);
    setDeleteModalOpen(false);
    setQuizToDelete(null);
    // TODO: Add API call to delete quiz
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setQuizToDelete(null);
  };

  return (
    <div className="min-h-screen bg-background text-tertiary px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold font-header tracking-wide text-primary">
            Quiz Dashboard
          </h1>
        </header>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="w-full sm:w-auto flex-grow relative group">
            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-accent transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-primary rounded-lg focus:ring-2 focus:ring-accent outline-none transition-all text-primary hover:border-secondary focus:border-accent placeholder:text-primary"
            />
          </div>

          <div className="w-full sm:w-auto flex items-center gap-4">
            {/* Subject Filter */}
            <div className="w-full sm:w-48 relative group">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-3 bg-white border border-primary rounded-lg focus:ring-2 focus:ring-accent outline-none transition-all text-primary hover:border-secondary focus:border-accent placeholder:text-primary"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <FaChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none group-focus-within:text-accent transition-colors"
                size={18}
              />
            </div>

            {/* Leaderboard Button */}
            <button className="flex-shrink-0 bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105">
              <FaAward size={20} />
              <span className="hidden md:block">Leaderboard</span>
            </button>

            {/* Add New Quiz Button */}
            <button
              className="flex-shrink-0 bg-accent hover:bg-accent/90 text-primary font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105"
              onClick={() => navigate("/admin/quiz/add")}
            >
              <FaPlus size={20} />
              <span>Add</span>
              <span className="hidden md:block"> Quiz</span>
            </button>
          </div>
        </div>

        {/* Quizzes Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary text-background">
                  <th className="p-4 font-semibold text-center">
                    <div className="flex items-center justify-center">
                      <span>Quiz Title</span>
                    </div>
                  </th>
                  <th className="p-4 font-semibold text-center">Subject</th>
                  <th className="p-4 font-semibold text-center">
                    <div className="flex items-center justify-center">
                      <span>Time</span>
                    </div>
                  </th>
                  <th className="p-4 font-semibold text-center">Questions</th>
                  <th className="p-4 font-semibold text-center">Board</th>
                  <th className="p-4 font-semibold text-center">Class</th>
                  <th className="p-4 font-semibold text-center">
                    Participants
                  </th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentQuizzes.map((quiz) => (
                  <tr
                    key={quiz.id}
                    className="hover:bg-gray-50 transition-colors group cursor-pointer"
                    onClick={(e) => {
                      // Only trigger if click is directly on the row, not on action buttons
                      if (!e.target.closest(".action-button")) {
                        setSelectedQuizId(quiz._id);
                        setViewQuizModalOpen(true);
                      }
                    }}
                  >
                    <td className="px-4 py-2 font-bold text-secondary capitalize">
                      {quiz.name}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1 capitalize">
                        {quiz.subject}
                      </span>
                    </td>
                    <td className="p-4 text-center text-tertiary">
                      {quiz.timeLimit} min
                    </td>
                    <td className="p-4 text-center text-tertiary">
                      {quiz.questions ? quiz.questions.length : 0}
                    </td>
                    <td className="p-4 text-center text-tertiary">
                      {quiz.board}
                    </td>
                    <td className="p-4 text-center text-tertiary">
                      {quiz.class}th
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/20 text-primary border border-accent/80">
                          <FaUsers size={14} className="mr-1.5" />
                          {/* {quiz.participants.toLocaleString()} */}0
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div
                        className="flex justify-center space-x-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          title="Edit Quiz"
                          className="p-2 text-secondary hover:bg-secondary/20 rounded-full transition-colors action-button"
                        >
                          <FaEdit size={16} />
                        </button>

                        <button
                          title="View Leaderboard"
                          className="p-2 text-accent hover:bg-accent/20 rounded-full transition-colors action-button"
                        >
                          <FaAward size={16} />
                        </button>

                        <button
                          title="Delete Quiz"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQuiz(quiz.id);
                          }}
                          className="p-2 text-error hover:bg-error/20 rounded-full transition-colors action-button"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredQuizzes.length > quizzesPerPage && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-lg border ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-tertiary border-gray-300 hover:bg-gray-50"
                }`}
              >
                <FaChevronLeft size={18} className="mr-1" />
                Previous
              </button>
              <div className="flex items-center space-x-2">
                {Array.from(
                  {
                    length: Math.min(
                      5,
                      Math.ceil(filteredQuizzes.length / quizzesPerPage)
                    ),
                  },
                  (_, i) => {
                    // Show pages around current page
                    let pageNum;
                    if (
                      Math.ceil(filteredQuizzes.length / quizzesPerPage) <= 5
                    ) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (
                      currentPage >=
                      Math.ceil(filteredQuizzes.length / quizzesPerPage) - 2
                    ) {
                      pageNum =
                        Math.ceil(filteredQuizzes.length / quizzesPerPage) -
                        4 +
                        i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          currentPage === pageNum
                            ? "bg-accent text-primary font-bold"
                            : "text-tertiary hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(
                      Math.ceil(filteredQuizzes.length / quizzesPerPage),
                      p + 1
                    )
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredQuizzes.length / quizzesPerPage)
                }
                className={`flex items-center px-4 py-2 rounded-lg border ${
                  currentPage ===
                  Math.ceil(filteredQuizzes.length / quizzesPerPage)
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-tertiary border-gray-300 hover:bg-gray-50"
                }`}
              >
                Next
                <FaChevronRight size={18} className="ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Quiz
              </h3>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this quiz? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* View Quiz Modal */}
      <ViewQuiz
        quizId={selectedQuizId}
        isOpen={viewQuizModalOpen}
        onClose={() => setViewQuizModalOpen(false)}
      />
    </div>
  );
};

export default QuizDashboard;
