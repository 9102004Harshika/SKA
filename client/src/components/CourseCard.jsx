import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUniversity, FaArrowRight } from "react-icons/fa";
import { MdStream } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { PiBookOpenTextFill } from "react-icons/pi";
import { MdSubject } from "react-icons/md";
import { BsStars } from "react-icons/bs";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleCourseClick = (id) => {
    navigate(`/app/coursedetail/${id}`);
  };

  // Function to render star rating
  const renderStarRating = (rating = 4.5) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-accent"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-accent"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfGradient)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }

    // Empty stars to make 5 total
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div
      key={course._id}
      className="group relative flex flex-col bg-background border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] cursor-pointer h-[400px] rounded-sm"
      onClick={() => handleCourseClick(course._id)}
    >
      {/* Image Container with fixed height */}
      <div className="relative h-[176px] w-full overflow-hidden">
        <img
          src={course.courseImage}
          alt={course.courseTitle}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 hover:brightness-105"
        />

        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category badge */}
        <div className="absolute top-3 right-3 transform translate-x-44 group-hover:translate-x-[-5px] transition-transform duration-300 ease-out">
          <span className="bg-accent text-primary text-xs font-bold px-3 py-1 shadow-sm">
            {course.category}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="relative flex flex-col flex-grow p-4 z-[2]">
        {/* Title */}
        <h2 className="text-xl font-bold font-header text-secondary line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {course.courseTitle}
        </h2>

        {/* Price section - always visible */}
        <div className="mt-3">
          {course.discountedPrice ? (
            <div className="flex items-center">
              <span className="text-lg font-bold text-primary">
                ₹{course.discountedPrice}
              </span>
              <span className="ml-2 text-sm text-tertiary line-through">
                ₹{course.originalPrice}
              </span>
              <span className="ml-2 text-xs bg-accent/20 text-primary px-2 py-0.5 font-bold">
                {course.discountPercentage}% OFF
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-primary">
              ₹{course.originalPrice}
            </span>
          )}
        </div>

        {/* Course details with tag-like design */}
        <div className="mt-3 space-y-2">
          {/* Details section header with animated underline */}
          <div className="relative pb-1 mb-2">
            <span className="text-sm font-semibold text-tertiary">
              COURSE DETAILS
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-32 transition-all duration-500 ease-out"></span>
          </div>

          {/* Details displayed as modern tags with icons */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center bg-secondary/10 px-2 py-1 transform group-hover:bg-secondary/20 transition-all duration-200">
              <FaUniversity className="text-tertiary mr-1 h-3 w-3" />
              <span className="text-xs font-semibold text-tertiary mr-1">
                Board:
              </span>
              <span className="text-xs font-bold text-primary">
                {course.board.includes("(")
                  ? course.board.match(/\(([^)]+)\)/)[1]
                  : course.board}
              </span>
            </div>

            <div className="flex items-center bg-secondary/10 px-2 py-1 transform group-hover:bg-secondary/20 transition-all duration-200">
              <IoBook className="text-tertiary mr-1 h-3 w-3" />
              <span className="text-xs font-semibold text-tertiary mr-1">
                Class:
              </span>
              <span className="text-xs font-bold text-primary">
                {course.class}
              </span>
            </div>

            {course.class === "11" || course.class === "12" ? (
              <div className="flex items-center bg-secondary/10 px-2 py-1 transform group-hover:bg-secondary/20 transition-all duration-200">
                <MdStream className="text-tertiary mr-1 h-3 w-3" />
                <span className="text-xs font-semibold text-tertiary mr-1">
                  Stream:
                </span>
                <span className="text-xs font-bold text-primary">
                  {course.stream}
                </span>
              </div>
            ) : null}

            <div className="flex items-center bg-secondary/10 px-2 py-1 transform group-hover:bg-secondary/20 transition-all duration-200">
              <MdSubject className="text-tertiary mr-1 h-3 w-3" />
              <span className="text-xs font-semibold text-tertiary mr-1">
                Subject:
              </span>
              <span className="text-xs font-bold text-primary">
                {course.subject}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom section with star rating and student count */}
        <div className="mt-auto pt-3 flex justify-between items-center border-t border-gray-200 mt-2">
          <div className="flex flex-col">
            <div className="flex items-center">
              {renderStarRating(4.5)}
              <span className="ml-1 text-xs font-bold text-secondary">4.5</span>
            </div>
            <p className="text-xs text-tertiary">
              <span className="font-bold text-secondary">
                {course.studentCount}+
              </span>{" "}
              students enrolled
            </p>
          </div>

          {/* Animated button with icon */}
          <div className="relative overflow-hidden">
            <button className="px-3 py-1.5 bg-primary text-background text-xs font-bold transform group-hover:scale-105 transition-transform duration-300 group-hover:bg-secondary">
              <span className="relative z-10 flex items-center">
                Explore
                <FaArrowRight className="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* "New" ribbon-style badge - positioned on top left */}
      {/* "New" Bookmark-style tag */}
      <div className="absolute top-0 left-0 z-10">
        <div className="relative overflow-hidden">
          <div className="bg-secondary/90 text-background text-xs font-bold py-1 pl-3 pr-2 shadow-sm flex items-center before:content-[''] before:absolute before:top-0 before:right-[-8px] before:border-t-[10px] before:border-t-transparent before:border-l-[8px] before:border-l-secondary/90 before:border-b-[10px] before:border-b-transparent">
            <BsStars className="h-3 w-3 mr-1" />
            <span>New</span>
          </div>
        </div>
      </div>

      {/* Subtle hover indicator at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default CourseCard;
