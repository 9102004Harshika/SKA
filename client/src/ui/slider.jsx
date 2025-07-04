import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropleft } from "react-icons/io";
import { RiArrowRightSFill } from "react-icons/ri";

const Slider = ({ items = [], CardComponent, heading = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(items.length);
  const [visibleCards, setVisibleCards] = useState(1);
  const sliderRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const displayItems = [...items, ...items, ...items];
  const totalItems = items.length;

  const updateVisibleCards = () => {
    if (window.innerWidth >= 1280) {
      setVisibleCards(4);
    } else if (window.innerWidth >= 768) {
      setVisibleCards(3);
    } else {
      setVisibleCards(1);
    }
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % (totalItems * 2));

    // Reset position after animation completes
    const timer = setTimeout(() => {
      if (currentIndex >= totalItems * 2 - 1) {
        setCurrentIndex(totalItems);
      }
      setIsTransitioning(false);
    }, 500); // Match this with CSS transition duration

    return () => clearTimeout(timer);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalItems * 2) % (totalItems * 2));

    // Reset position after animation completes
    const timer = setTimeout(() => {
      if (currentIndex <= 0) {
        setCurrentIndex(totalItems);
      }
      setIsTransitioning(false);
    }, 500); // Match this with CSS transition duration

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  return (
    <div className="w-full mx-auto p-4" style={{ width: "97vw" }}>
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          {heading && (
            <h2 className="font-semibold font-header text-2xl md:text-4xl tracking-wide text-left text-primary">
              {heading}
            </h2>
          )}
          <div className="flex space-x-3">
            <button
              onClick={handlePrev}
              className="group relative w-10 h-10 flex items-center justify-center bg-background border-2 border-primary/20 text-primary rounded-md hover:bg-primary hover:text-background transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-sm hover:shadow-md"
              aria-label="Previous slide"
            >
              <IoMdArrowDropleft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span className="sr-only">Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="group relative w-10 h-10 flex items-center justify-center bg-background border-2 border-primary/20 text-primary rounded-md hover:bg-primary hover:text-background transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-sm hover:shadow-md"
              aria-label="Next slide"
            >
              <RiArrowRightSFill className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
              willChange: "transform",
            }}
          >
            {displayItems.map((item, index) => (
              <div
                key={index}
                className={`${
                  visibleCards === 1
                    ? "w-full"
                    : visibleCards === 3
                    ? "w-1/3"
                    : "w-1/4"
                } px-2 mb-4 flex-shrink-0`}
              >
                <CardComponent course={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
