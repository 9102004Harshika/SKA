import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Filters from "../components/Filters";
import { boards } from "../config";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState("");

  // Extract unique boards from courses
  const uniqueBoards = [
    ...new Set(
      boards.map((board) => board.split("(")[1]?.replace(")", "").trim())
    ),
  ].filter(Boolean); // Remove undefined values if any

  // Filter courses based on selected board
  const filteredCourses = courses.filter((course) => {
    const courseBoard = course.board.split("(")[1]?.replace(")", "").trim();
    const boardMatches = selectedBoard ? courseBoard === selectedBoard : true;
    return boardMatches;
  });
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/courses/getAll"
        );
        setCourses(response.data);
      } catch (err) {
        console.log("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (id) => {
    navigate(`/app/coursedetail/${id}`);
  };

  return (
    <div className="p-10 pt-20">
      <div>
        <select
          onChange={(e) => setSelectedBoard(e.target.value)}
          value={selectedBoard}
        >
          <option value="">All Boards</option>
          {uniqueBoards.map((board) => (
            <option key={board} value={board}>
              {board}
            </option>
          ))}
        </select>
      </div>
      {courses.length === 0 ? (
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          No courses available
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="flex flex-col bg-background shadow-lg overflow-hidden border hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="h-48 w-full bg-background flex items-center justify-center overflow-hidden">
                <img
                  src={course.courseImage}
                  alt={course.courseTitle}
                  className="w-full max-h-[90%] object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-4">
                <h2 className="text-lg font-semibold text-secondary">
                  {course.courseTitle}
                </h2>

                <div className=" mt-">
                  <div className="flex gap-6 text-tertiary">
                    <p>
                      Board :{" "}
                      <span>
                        {course.board.includes("(")
                          ? course.board.match(/\(([^)]+)\)/)[1]
                          : course.board}
                      </span>
                    </p>
                    <p>
                      Class : <span>{course.class}</span>
                    </p>
                  </div>
                  <div className="flex gap-4 text-tertiary">
                    {course.class === "11" && (
                      <p>
                        Stream : <span>{course.stream}</span>
                      </p>
                    )}
                    <p>
                      Subject : <span>{course.subject}</span>
                    </p>
                  </div>
                </div>

                {/* Spacer to push button down */}
                <div className="flex-grow"></div>

                {/* Button */}
                <button
                  className="mt-4 w-full bg-primary text-background py-2 hover:bg-secondary transition"
                  onClick={() => handleCourseClick(course._id)}
                >
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
