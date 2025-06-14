import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Star,
  Users,
} from "lucide-react";

// Sample data generation (no changes needed here)
const generateCourseData = () => {
  const courseNames = [
    "Advanced React Development",
    "Python for Data Science",
    "Digital Marketing Fundamentals",
    "JavaScript ES6+ Mastery",
    "UI/UX Design Principles",
    "Machine Learning Basics",
    "WordPress Development",
    "Graphic Design with Photoshop",
    "Mobile App Development",
    "Cybersecurity Essentials",
    "Cloud Computing with AWS",
    "Database Management",
    "SEO Optimization Strategies",
    "Content Writing Mastery",
    "Excel Advanced Techniques",
    "Photography Basics",
    "Video Editing Pro",
    "Social Media Marketing",
    "E-commerce Business",
    "Project Management",
    "Blockchain Technology",
    "Artificial Intelligence",
    "Game Development Unity",
    "Web Development Bootcamp",
    "Financial Analysis",
    "Leadership Skills",
    "Public Speaking",
    "Creative Writing",
    "Music Production",
    "Fitness Training",
  ];
  const instructors = [
    "Dr. Sarah Johnson",
    "Prof. Michael Chen",
    "Ms. Emily Davis",
    "Mr. David Wilson",
    "Dr. Lisa Anderson",
    "Prof. James Brown",
    "Ms. Jessica Taylor",
    "Mr. Robert Garcia",
    "Dr. Amanda White",
    "Prof. Kevin Lee",
    "Ms. Rachel Martinez",
    "Mr. Thomas Miller",
  ];
  const subjects = [
    "Computer Science",
    "Mathematics",
    "Business",
    "Design",
    "Marketing",
    "Science",
    "Arts",
    "Engineering",
    "Psychology",
    "Finance",
  ];
  return Array.from({ length: 87 }, (_, i) => ({
    id: i + 1,
    title: courseNames[i % courseNames.length],
    instructor: instructors[i % instructors.length],
    subject: subjects[i % subjects.length],
    students: Math.floor(Math.random() * 500) + 10,
    rating: (Math.random() * 2 + 3).toFixed(1),
    price: Math.floor(Math.random() * 200) + 50,
    thumbnail: `https://picsum.photos/120/80?random=${i + 1}`,
  }));
};

const CourseDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10; // Reduced for better single-page view

  const allCourses = useMemo(() => generateCourseData(), []);

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject =
        filterSubject === "All" || course.subject === filterSubject;
      return matchesSearch && matchesSubject;
    });
  }, [allCourses, searchTerm, filterSubject]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  const subjects = [
    "All",
    "Computer Science",
    "Mathematics",
    "Business",
    "Design",
    "Marketing",
    "Science",
    "Arts",
    "Engineering",
    "Psychology",
    "Finance",
  ];

  return (
    <div className="min-h-screen bg-background text-tertiary px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold font-header tracking-wide text-primary">
            Course Dashboard
          </h1>
        </header>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="w-full sm:w-auto flex-grow relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary/50"
              size={20}
            />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="w-full sm:w-auto flex items-center gap-4">
            {/* Filter Dropdown */}
            <div className="w-full sm:w-48 relative">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary/50"
                size={20}
              />
            </div>

            {/* Add New Course Button */}
            <button className="flex-shrink-0 bg-accent hover:bg-yellow-500 text-primary font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105">
              <Plus size={20} />
              <span>Add Course</span>
            </button>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-background rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary text-background">
                  <th className="p-4 font-semibold text-left">
                    Course Details
                  </th>
                  <th className="p-4 font-semibold text-left">Subject</th>
                  <th className="p-4 font-semibold text-left">Instructor</th>
                  <th className="p-4 font-semibold text-center">Students</th>
                  <th className="p-4 font-semibold text-center">Rating</th>
                  <th className="p-4 font-semibold text-center">Price</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b border-gray-100 hover:bg-background/50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-20 h-14 rounded-md object-cover"
                        />
                        <div>
                          <div className="font-bold text-secondary">
                            {course.title}
                          </div>
                          <div className="text-xs text-tertiary/70">
                            {course.instructor}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1">
                        <BookOpen size={14} /> {course.subject}
                      </span>
                    </td>
                    <td className="p-4 text-tertiary font-medium">
                      {course.instructor}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2 font-semibold text-tertiary">
                        <Users size={16} className="text-tertiary/70" />
                        {course.students.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1 font-bold text-amber-600">
                        <Star size={16} className="text-accent fill-current" />{" "}
                        {course.rating}
                      </div>
                    </td>
                    <td className="p-4 text-center font-bold text-green-600">
                      ${course.price}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-2 text-tertiary/70 hover:text-blue-500 transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-2 text-tertiary/70 hover:text-green-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-2 text-tertiary/70 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-tertiary/80">
              Showing{" "}
              <span className="font-bold text-primary">
                {startIndex + 1}-
                {Math.min(startIndex + coursesPerPage, filteredCourses.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-primary">
                {filteredCourses.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="px-4 py-2 bg-white border border-gray-200 rounded-md font-semibold text-primary">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDashboard;
