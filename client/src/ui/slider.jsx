

import React, { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoMdArrowDropleft } from "react-icons/io";
import { RiArrowRightSFill } from "react-icons/ri";

const Slider = ({
  title = "Top Picks For You",
  description = "Below are the top-picked info curated just for you.",
  info = [] // Accept info as a prop
}) => {
  const [currentIndex, setCurrentIndex] = useState(info.length); // Start in the middle of the duplicated array
  const [visibleCards, setVisibleCards] = useState(1); // Default to 1 visible card
  const [isTransitioning, setIsTransitioning] = useState(false); // Manage smooth transitions
  const [isDragging, setIsDragging] = useState(false); // Track drag state
  const [startX, setStartX] = useState(0); // Store the initial drag position
  const sliderRef = useRef(null);
  const autoplayRef = useRef(null);

  // Create a displayCourses array with info duplicated at the start and end
  const displayCourses = [...info, ...info, ...info];

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

  // Handle drag start
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX); // Track the starting X position
    clearInterval(autoplayRef.current); // Pause autoplay during drag
  };

  // Handle drag move
  const handleDragMove = (e) => {
    if (!isDragging) return;

    const currentX = e.clientX || e.touches[0].clientX;
    const diffX = currentX - startX; // Calculate the difference

    // Adjust the slider position temporarily
    sliderRef.current.style.transform = `translateX(calc(-${(currentIndex * 100) / visibleCards}% + ${diffX}px))`;
  };

  // Handle drag end
  const handleDragEnd = (e) => {
    if (!isDragging) return;

    setIsDragging(false);
    const endX = e.clientX || e.changedTouches[0].clientX;
    const diffX = endX - startX;

    // Determine if the user dragged far enough to change the slide
    if (Math.abs(diffX) > 50) {
      if (diffX < 0) {
        handleNext(); // Dragged to the left
      } else {
        handlePrev(); // Dragged to the right
      }
    } else {
      // Reset position if the drag was not far enough
      sliderRef.current.style.transform = `translateX(-${(currentIndex * 100) / visibleCards}%)`;
    }

    // Resume autoplay
    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 3000);
  };

  // Infinite loop logic
  useEffect(() => {
    const totalCards = info.length;

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
  }, [currentIndex, info.length]);

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
    <div className="relative w-full mx-auto p-4 reveal" style={{ width: '90vw' }}>
      <div className="items-center mb-6 mt-10 flex justify-between flex-wrap md:flex-nowrap">
        <div className="text-center md:text-left w-full md:w-auto ml-4">
          <h2 className="text-4xl font-header font-bold text-primary">
            {title}
          </h2>
          <p className="font-body text-gray-500 mt-4">
            {description}
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-auto w-full md:w-auto text-center">
          <button className="text-sm inline-flex items-center gap-2 font-body text-background rounded-sm bg-primary px-4 py-2 mr-4 hover:bg-secondary hover:text-primary group">
            View All
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Courses Wrapper */}
        <div
          ref={sliderRef}
          className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
          }}
        >
          {displayCourses.map((course, index) => (
            <div
              key={index}
              className={`${visibleCards === 1 ? "w-full" : "w-1/3"} px-2 flex-shrink-0`}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 transform hover:scale-105 transition-transform duration-300 h-[33rem] flex flex-col justify-between">
                <div>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2 min-h-[3rem]">
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
      <div className="absolute mt-[50%] md:mt-[10%] inset-y-0 left-0 flex items-center">
        <button
          onClick={handlePrev}
          className="bg-secondary text-primary text-xl md:text-2xl p-2 rounded-lg shadow-lg hover:bg-accent hover:text-primary"
        >
          <IoMdArrowDropleft />
        </button>
      </div>
      <div className="absolute mt-[50%] md:mt-[10%] inset-y-0 right-0 flex items-center">
        <button
          onClick={handleNext}
          className="bg-secondary text-primary text-xl md:text-2xl p-2 rounded-lg shadow-lg hover:bg-accent hover:text-primary"
        >
          <RiArrowRightSFill />
        </button>
      </div>
    </div>
  );
};

export default Slider;
