import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropleft } from "react-icons/io";
import { RiArrowRightSFill } from "react-icons/ri";

const Slider = ({ items = [], CardComponent }) => {
  const [currentIndex, setCurrentIndex] = useState(items.length);
  const [visibleCards, setVisibleCards] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);
  const autoplayRef = useRef(null);

  const displayItems = [...items, ...items, ...items];

  const updateVisibleCards = () => {
    setVisibleCards(window.innerWidth >= 768 ? 3 : 1);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const totalItems = items.length;
    if (currentIndex >= totalItems * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => prev - totalItems);
      }, 300);
    }
    if (currentIndex < totalItems) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => prev + totalItems);
      }, 300);
    }
  }, [currentIndex, items.length]);

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    autoplayRef.current = setInterval(() => handleNext(), 3000);
    return () => {
      window.removeEventListener("resize", updateVisibleCards);
      clearInterval(autoplayRef.current);
    };
  }, []);

  return (
    <div className="relative w-full mx-auto p-4" style={{ width: "97vw" }}>
      <div className="overflow-hidden">
        <div
          ref={sliderRef}
          className={`flex ${
            isTransitioning
              ? "transition-transform duration-700 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
          }}
        >
          {displayItems.map((item, index) => (
            <div
              key={index}
              className={`${
                visibleCards === 1 ? "w-full" : "w-1/3"
              } px-2 flex-shrink-0`}
            >
              <CardComponent course={item} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary text-background text-2xl p-2 rounded-lg shadow-lg hover:bg-accent hover:text-primary"
      >
        <IoMdArrowDropleft />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary text-background text-2xl p-2 rounded-lg shadow-lg hover:bg-accent hover:text-primary"
      >
        <RiArrowRightSFill />
      </button>
    </div>
  );
};

export default Slider;
