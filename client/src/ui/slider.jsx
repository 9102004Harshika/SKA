import React, { useState, useEffect, useRef } from "react";
import { courses } from "../config"; // Import courses
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(courses.length); // Start in the middle of the duplicated array
  const [visibleCards, setVisibleCards] = useState(1); // Default to 1 visible card
  const [isTransitioning, setIsTransitioning] = useState(false); // Manage smooth transitions
  const sliderRef = useRef(null);
  const autoplayRef = useRef(null);

  // Create a displayCourses array with courses duplicated at the start and end
  const displayCourses = [...courses, ...courses, ...courses];

  // Update visible cards count based on screen size
  const updateVisibleCards = () => {
    if (window.innerWidth >= 768) {
      setVisibleCards(3); // Show 3 cards on desktop
    } else {
      setVisibleCards(1); // Show 1 card on mobile
    }
  };

  // Move to the next slide
  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Move to the previous slide
  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Infinite loop logic
  useEffect(() => {
    const totalCards = courses.length;

    // Jump to the middle if the index is at the end of the duplicates
    if (currentIndex >= totalCards * 2) {
      setTimeout(() => {
        setIsTransitioning(false); // Temporarily disable transition
        setCurrentIndex((prevIndex) => prevIndex - totalCards); // Jump back to the middle
      }, 300); // Delay matches the CSS transition duration
    }

    // Jump to the middle if the index is at the start of the duplicates
    if (currentIndex < totalCards) {
      setTimeout(() => {
        setIsTransitioning(false); // Temporarily disable transition
        setCurrentIndex((prevIndex) => prevIndex + totalCards); // Jump forward to the middle
      }, 300); // Delay matches the CSS transition duration
    }
  }, [currentIndex, courses.length]);

  // Set up autoplay
  useEffect(() => {
    updateVisibleCards(); // Initial check for visible cards
    window.addEventListener("resize", updateVisibleCards); // Add resize listener

    autoplayRef.current = setInterval(() => {
      handleNext(); // Auto-slide every 3 seconds
    }, 3000);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
      clearInterval(autoplayRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Top Courses</h2>
      <div className="overflow-hidden">
        {/* Courses Wrapper */}
        <div
          ref={sliderRef}
          className={`flex ${
            isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
          }`}
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
          }}
        >
          {displayCourses.map((course, index) => (
            <div
              key={index}
              className={`${
                visibleCards === 1 ? "w-full" : "w-1/3"
              } px-2 flex-shrink-0`}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 transform hover:scale-105 transition-transform duration-300 h-[33rem] flex flex-col justify-between">
                <div>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{course.instructor}</p>
                  <ul className="text-sm text-gray-600 mb-2 min-h-[4.5rem]">
                    {course.details.map((detail, idx) => (
                      <li key={idx}>&bull; {detail}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 mb-4">{course.validity}</p>
                </div>
                <div>
                  <p className="text-sm text-accent font-bold mb-2">{course.discount}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary">₹{course.price}</span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{course.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary hover:text-primary"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary hover:text-primary"
      >
        &gt;
      </button>
    </div>
  );
};

export default Slider;
