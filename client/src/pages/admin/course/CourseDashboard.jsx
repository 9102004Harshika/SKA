import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../../../components/use-toast";
import axios from "axios";
import {
  FaSearch,
  FaPlus,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEdit,
  FaTrash,
  FaStar,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const CourseDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  // pagination state from backend
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 10;

  const subjects = ["All", "Computer Science", "Mathematics", "Business", "Design"];

  // Fetch courses from API with pagination
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_URL}api/courses/get?page=${currentPage}&limit=${coursesPerPage}`
        );

        setCourses(data.courses);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage]);

  // Filter courses (search + subject) client-side on current page
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "All" || course.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  if (loading) {
    return <div className="text-center py-10">Loading courses...</div>;
  }
  const handleDeleteCourse = (id) => {
    setCourseToDelete(id);
    setDeleteModalOpen(true);
  };

  // confirm delete
  const confirmDelete = async () => {
    try {
      const res = await axios.delete(`${API_URL}api/courses/${courseToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data?.success || res.status === 200) {
        setCourses((prev) => prev.filter((course) => course._id !== courseToDelete));
        toast({
          title: "Success",
          description: "Course deleted successfully.",
          variant: "success",
        });
      } else {
        throw new Error(res.data?.message || "Failed to delete course");
      }
    } catch (err) {
      toast({
        title: "Error",
        description:
          err.response?.data?.message ||
          err.message ||
          "Failed to delete course.",
        variant: "destructive",
      });
    } finally {
      setDeleteModalOpen(false);
      setCourseToDelete(null);
    }
  };

  // cancel delete
  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  return (
    <div className="min-h-screen bg-background text-tertiary px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold font-header tracking-wide text-primary">
            Course Dashboard
          </h1>
        </header>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="w-full sm:w-auto flex-grow relative group">
            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-accent transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-primary rounded-lg focus:ring-2 focus:ring-accent outline-none transition-all text-primary hover:border-secondary focus:border-accent placeholder:text-primary"
            />
          </div>

          <div className="w-full sm:w-auto flex items-center gap-4">
            <div className="w-full sm:w-48 relative">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-white border border-primary rounded-lg focus:ring-2 focus:ring-accent outline-none transition-all text-primary hover:border-secondary focus:border-accent placeholder:text-primary"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <FaChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none"
                size={20}
              />
            </div>

            <button
              onClick={() => navigate("/admin/course/add")}
              className="flex-shrink-0 bg-accent hover:bg-yellow-500 text-primary font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105"
            >
              <FaPlus size={20} />
              <span>Add Course</span>
            </button>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-background rounded-xl shadow-md border border-gray-100 overflow-hidden ">
          <div className="overflow-x-auto -mb-px overflow-x-auto scrollbar-hide">
            <table className="w-full text-sm ">
              <thead>
                <tr className="bg-secondary text-background -mb-px overflow-x-auto scrollbar-hide">
                  <th className="p-4 text-left font-semibold">Course</th>
                  <th className="p-4 text-center font-semibold">Subject</th>
                  <th className="p-4 text-center font-semibold">Instructor</th>
                  <th className="p-4 text-center font-semibold">Students</th>
                  <th className="p-4 text-center font-semibold">Rating</th>
                  <th className="p-4 text-center font-semibold">Price</th>
                  <th className="p-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="-mb-px overflow-x-auto scrollbar-hide">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-tertiary">
                      No courses found.
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => (
                    <tr
                      key={course._id}
                      className="border-b border-gray-100 hover:bg-background/50"
                    >
                      {/* Course */}
                      <td className="p-4 flex items-center gap-4">
                        <img
                          src={course.courseImage || "https://via.placeholder.com/80x50"}
                          alt={course.courseTitle}
                          className="w-20 h-14 rounded-md object-cover flex-shrink-0"
                        />
                        <div className="flex flex-col justify-center">
                          <div className="font-bold text-secondary">
                            {course.courseTitle.split(" ").slice(0, 4).join(" ")}
                          </div>
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="p-4 text-center align-middle">{course.subject || "-"}</td>

                      {/* Instructor */}
                      <td className="p-4 text-center align-middle">
                        {course.instructor?.user ? (
                          <span className="text-sm">{course.instructor.user.fullName}</span>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* Students */}
                      <td className="p-4 text-center align-middle">
                        <div className="flex items-center justify-center gap-2 font-semibold text-tertiary">
                          <FaUsers className="text-tertiary/70" />
                          {course.studentCount?.toLocaleString() || 0}
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="p-4 text-center align-middle">
                        <div className="flex items-center justify-center gap-1 font-bold text-amber-600">
                          <FaStar size={16} /> {course.rating || 0}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4 text-center align-middle font-bold text-green-600">
                        ₹
                        {course.discountedPrice > 0
                          ? course.discountedPrice
                          : course.originalPrice}
                      </td>

                      {/* Actions */}
                      <td className="p-4 flex items-center justify-center gap-2">
                        <button
                          className="p-2 text-secondary hover:bg-secondary/10 rounded-full transition-colors"
                          title="View"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          className="p-2 text-accent hover:bg-accent/10 rounded-full transition-colors"
                          title="Edit"
                          onClick={() =>
                            navigate(`/admin/course/update/${course._id}`)
                          }
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
  className="p-2 text-error hover:bg-error/10 rounded-full transition-colors"
  title="Delete"
  onClick={(e) => {
    e.stopPropagation();
    handleDeleteCourse(course._id); // ✅ Correct function
  }}
>
  <FaTrash size={18} />
</button>

                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-tertiary/80">
              Page{" "}
              <span className="font-bold text-primary">{currentPage}</span> of{" "}
              <span className="font-bold text-primary">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
              >
                <FaChevronLeft size={20} />
              </button>
              <span className="px-4 py-2 bg-white border border-gray-200 rounded-md font-semibold text-primary">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 font-header">
                Delete Course
              </h3>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-accent"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-primary rounded-lg text-primary hover:border-secondary hover:shadow-lg transition-colors"
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
    </div>
  );
};

export default CourseDashboard;
