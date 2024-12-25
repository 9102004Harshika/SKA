import CourseCard from "./CourseCard";
import React, { useState } from "react";

const CourseCarousel = ({ courses = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 8; // Number of cards visible at once

  if (!courses?.length) {
    return <p className="text-center text-gray-500">No courses available</p>;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(courses.length / itemsPerView) - 1
        : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(courses.length / itemsPerView) - 1
        ? 0
        : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mx-auto my-8">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(courses.length / itemsPerView) * 100}%`,
          }}
        >
          {courses.map((course, index) => (
            <div
              key={index}
              className="w-1/3 p-2 box-border"
              style={{ flexShrink: 0 }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-md hover:bg-primary-light"
        aria-label="Previous"
      >
        &larr;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-md hover:bg-primary-light"
        aria-label="Next"
      >
        &rarr;
      </button>
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: Math.ceil(courses.length / itemsPerView) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? "bg-primary"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default CourseCarousel;
