import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  boards,
  getClassOptions,
  getSubjects,
  streams,
  category,
} from "../config/index";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // A-Z or Z-A sorting

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/courses/getAll"
        );
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (id) => {
    navigate(`/app/coursedetail/${id}`);
  };

  // Filter courses based on selected criteria
  const filteredCourses = courses
    .filter((course) =>
      selectedBoard
        ? course.board.includes(selectedBoard.split("(")[1]?.replace(")", ""))
        : true
    )
    .filter((course) => (selectedClass ? course.class === selectedClass : true))
    .filter((course) =>
      selectedStream ? course.stream === selectedStream : true
    )
    .filter((course) =>
      selectedSubject ? course.subject === selectedSubject : true
    )
    .filter((course) =>
      selectedCategory ? course.category === selectedCategory : true
    )
    .sort((a, b) => {
      if (sortOrder === "AtoZ")
        return a.courseTitle.localeCompare(b.courseTitle);
      if (sortOrder === "ZtoA")
        return b.courseTitle.localeCompare(a.courseTitle);
      return 0;
    });

  return (
    <div className="p-10 pt-20">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Board Select */}
        <select
          className="border p-2 rounded"
          onChange={(e) => {
            setSelectedBoard(e.target.value);
            setSelectedClass(""); // Reset class when board changes
            setSelectedStream(""); // Reset stream
            setSelectedSubject(""); // Reset subject
          }}
          value={selectedBoard}
        >
          <option value="">Select Board</option>
          {boards.map((board) => (
            <option key={board} value={board}>
              {board}
            </option>
          ))}
        </select>

        {/* Class Select */}
        <select
          className="border p-2 rounded"
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setSelectedStream(""); // Reset stream when class changes
            setSelectedSubject(""); // Reset subject
          }}
          value={selectedClass}
          disabled={!selectedBoard}
        >
          <option value="">Select Class</option>
          {getClassOptions(selectedBoard).map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        {/* Stream Select (only for 11th & 12th) */}
        {["11th", "12th"].includes(selectedClass) && (
          <select
            className="border p-2 rounded"
            onChange={(e) => setSelectedStream(e.target.value)}
            value={selectedStream}
          >
            <option value="">Select Stream</option>
            {streams.map((stream) => (
              <option key={stream} value={stream}>
                {stream}
              </option>
            ))}
          </select>
        )}

        {/* Subject Select */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setSelectedSubject(e.target.value)}
          value={selectedSubject}
          disabled={!selectedClass}
        >
          <option value="">Select Subject</option>
          {getSubjects(selectedClass, selectedStream).map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        {/* Video Type Select */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Select Video Type</option>
          {category.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Sorting Select */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="">Sort By</option>
          <option value="AtoZ">A-Z</option>
          <option value="ZtoA">Z-A</option>
        </select>
      </div>

      {/* Course List */}
      {filteredCourses.length === 0 ? (
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          No courses available
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="flex flex-col bg-background shadow-lg overflow-hidden border hover:shadow-2xl transition-all duration-300 hover:rounded-lg p-1 hover:scale-105 hover:brightness-95 cursor-pointer"
            >
              {/* Image Container */}
              <div
                className="h-48 w-full bg-background flex items-center justify-start overflow-hidden"
                onClick={() => handleCourseClick(course._id)}
              >
                <img
                  src={course.courseImage}
                  alt={course.courseTitle}
                  className="w-full max-h-[90%] object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-4">
                <h2 className="text-lg font-semibold font-header text-secondary">
                  {course.courseTitle}
                </h2>

                <div className="mt-2 text-tertiary">
                  <p>
                    Board:{" "}
                    <span>
                      {course.board.includes("(")
                        ? course.board.match(/\(([^)]+)\)/)[1]
                        : course.board}
                    </span>
                  </p>
                  <p>
                    Class: <span>{course.class}</span>
                  </p>
                  {course.class === "11" || course.class === "12" ? (
                    <p>
                      Stream: <span>{course.stream}</span>
                    </p>
                  ) : null}
                  <p>
                    Subject: <span>{course.subject}</span>
                  </p>
                  <p>
                    Category: <span>{course.category}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
