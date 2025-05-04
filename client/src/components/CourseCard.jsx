import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleCourseClick = (id) => {
    navigate(`/app/coursedetail/${id}`);
  };

  return (
    <div
    key={course._id}
    className="flex flex-col bg-background shadow-lg border border-secondary overflow-hidden hover:shadow-2xl transition-all duration-300 hover:rounded-lg p-1 hover:scale-105 hover:brightness-95 cursor-pointer h-[400px]" // Fixed height
    onClick={() => handleCourseClick(course._id)}
  >
    {/* Image Container */}
    <div className="h-48 w-full bg-background flex items-start justify-start overflow-hidden">
      <img
        src={course.courseImage}
        alt={course.courseTitle}
        className="w-full max-h-[90%] object-contain border-b border-primary"
      />
    </div>
  
    {/* Content */}
    <div className="flex flex-col flex-grow px-4 pb-4">
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
        <div className="flex gap-2">
          <span className="bg-accent text-background px-3 py-1 font-semibold rounded-full">
            {course.category}
          </span>
          <span className="bg-secondary text-background px-3 py-1 font-semibold rounded-full">
            New
          </span>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default CourseCard;
