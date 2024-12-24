import React, { useState } from "react";
import CourseCard from "./CourseCard";

const CourseCarousel = () => {
  const courses = Array(6).fill({}); // Default values for cards
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? courses.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === courses.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-8">
      {/* Header */}
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Top Picks For You
      </h2>

      {/* Carousel Wrapper */}
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {courses.map((_, index) => (
            <div
              key={index}
              className="flex justify-center items-center min-w-full"
            >
              <CourseCard />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
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

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {courses.map((_, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default CourseCarousel;
