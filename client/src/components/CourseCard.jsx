import React from "react";
import { courses } from "../config";

const Courses = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-wrap gap-4 justify-center">
        {courses.map((course, index) => (
          <div
            key={index}
            className="border border-primary shadow-lg rounded-lg p-4 w-72 flex-shrink-0 bg-background"
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="rounded-t-lg w-full h-40 object-cover"
              />
              <span className="absolute top-2 left-2 bg-accent text-primary text-xs font-bold px-2 py-1 rounded-md">
                {course.notesType}
              </span>
            </div>

            {/* Course Details */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-primary mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-secondary mb-1">{course.instructor}</p>
              <ul className="text-sm text-secondary mb-2 space-y-1">
                {course.details.map((item, idx) => (
                  <li key={idx}>&bull; {item}</li>
                ))}
              </ul>
              <p className="text-xs text-secondary mb-4">{course.validity}</p>

              {/* Discount Offer */}
              {course.discount && (
                <p className="text-sm text-accent font-bold mb-2">
                  {course.discount}
                </p>
              )}

              {/* Pricing */}
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-primary">
                  ₹{course.price}
                </span>
                <span className="text-sm text-secondary line-through">
                  ₹{course.originalPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
