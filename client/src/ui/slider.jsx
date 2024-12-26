import React, { useState, useEffect } from "react";
import { courses } from "../config";
// Import courses

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1); // Default to 1 visible card

  // Function to update visible cards count based on screen size
  const updateVisibleCards = () => {
    if (window.innerWidth >= 768) { // Large screen (desktop)
      setVisibleCards(3); // Show 3 cards at a time on desktop
    } else { // Mobile devices
      setVisibleCards(1); // Show 1 card at a time on mobile
    }
  };

  // Handle next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil(courses.length / visibleCards) - 1;
      return prevIndex === maxIndex ? 0 : prevIndex + 1;
    });
  };

  // Handle previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil(courses.length / visibleCards) - 1;
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  // Update visible cards on window resize
  useEffect(() => {
    updateVisibleCards(); // Initial check for visible cards
    window.addEventListener("resize", updateVisibleCards); // Add resize event listener

    return () => {
      window.removeEventListener("resize", updateVisibleCards); // Cleanup the listener
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Top Courses</h2>
      <div className="overflow-hidden">
        {/* Courses Wrapper */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
          }}
        >
          {courses.map((course, index) => (
            <div
              key={index}
              className={`${
                visibleCards === 1
                  ? "w-full" // Full width for mobile
                  : "w-1/3" // 1/3 width for large screens (3 cards)
              } px-2 flex-shrink-0`} // Adjust for 3 visible cards on desktop
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 transform hover:scale-105 transition-transform duration-300 h-[30rem] flex flex-col justify-between">
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
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary"
      >
        &gt;
      </button>
    </div>
  );
};

export default Slider;
