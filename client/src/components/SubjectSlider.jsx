import React, { useState, useRef, useEffect } from "react";
import {
  MdTranslate,
  MdHistoryEdu,
  MdComputer,
  MdPsychology,
  MdCalculate,
  MdAccountBalance,
  MdOutlineScience,
  MdOutlineBiotech,
  MdOutlineBarChart,
  MdOutlineReceipt,
} from "react-icons/md";
import { TbLanguageHiragana, TbMathSymbols } from "react-icons/tb";
import { FaCalculator, FaBusinessTime } from "react-icons/fa";
import { GiDna2, GiChemicalDrop, GiEarthAmerica } from "react-icons/gi";
import { SiGoogleanalytics } from "react-icons/si";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlineShapeLine, MdOutlineElectricBolt } from "react-icons/md";

const subjects = [
  // Science Stream
  { label: "Mathematics", icon: <FaCalculator size={24} /> },
  { label: "Algebra", icon: <TbMathSymbols size={24} /> },
  { label: "Geometry", icon: <MdOutlineShapeLine size={24} /> },
  { label: "Physics", icon: <MdOutlineScience size={24} /> },
  { label: "Chemistry", icon: <GiChemicalDrop size={24} /> },
  { label: "Biology", icon: <GiDna2 size={24} /> },
  { label: "Computer", icon: <MdComputer size={24} /> },
  { label: "Electronics", icon: <MdOutlineElectricBolt size={24} /> },
  { label: "Biotechnology", icon: <MdOutlineBiotech size={24} /> },
  { label: "Statistics", icon: <MdOutlineBarChart size={24} /> },

  // Commerce Stream
  { label: "Accountancy", icon: <MdCalculate size={24} /> },
  { label: "Business", icon: <FaBusinessTime size={24} /> },
  { label: "Economics", icon: <SiGoogleanalytics size={24} /> },
  { label: "Statistics", icon: <BsGraphUp size={24} /> },
  { label: "Taxation", icon: <MdOutlineReceipt size={24} /> },

  // Languages and Humanities
  { label: "English", icon: <MdTranslate size={24} /> },
  { label: "Hindi", icon: <TbLanguageHiragana size={24} /> },
  { label: "History", icon: <MdHistoryEdu size={24} /> },
  { label: "Psychology", icon: <MdPsychology size={24} /> },
  { label: "Geography", icon: <GiEarthAmerica size={24} /> },
  { label: "Political Science", icon: <MdAccountBalance size={24} /> },
];

const duplicatedSubjects = [...subjects, ...subjects];

const SubjectSlider = () => {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollSubjects = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Adjust as needed
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const startScrolling = () => {
      if (isPaused) return;
      intervalRef.current = setInterval(() => {
        if (scrollContainer) {
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          }
          scrollContainer.scrollLeft += 1;
        }
      }, 25); // Adjust for speed
    };

    const stopScrolling = () => {
      clearInterval(intervalRef.current);
    };

    startScrolling();

    const pauseOnInteraction = () => setIsPaused(true);
    const resumeOnMouseLeave = () => setIsPaused(false);

    if (scrollContainer) {
      scrollContainer.addEventListener("mouseenter", pauseOnInteraction);
      scrollContainer.addEventListener("mouseleave", resumeOnMouseLeave);
    }

    return () => {
      stopScrolling();
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", pauseOnInteraction);
        scrollContainer.removeEventListener("mouseleave", resumeOnMouseLeave);
      }
    };
  }, [isPaused]);

  return (
    <div className="relative w-full py-2 px-2">
      {/* Scrollable Subject Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto whitespace-nowrap scrollbar-hide py-2 px-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {duplicatedSubjects.map((subject, index) => (
          <div
            key={index}
            className="inline-flex flex-col items-center justify-center mx-4 min-w-[64px] text-xs group text-tertiary"
          >
            <div className="p-3 mb-2 rounded-full bg-background text-secondary transition-all duration-200 transform group-hover:scale-110 group-hover:bg-secondary group-hover:text-background border border-secondary">
              {subject.icon}
            </div>
            <span className="text-center whitespace-nowrap group-hover:text-secondary">
              {subject.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectSlider;
