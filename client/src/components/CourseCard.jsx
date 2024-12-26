import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-background">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-primary mb-2">
          {course.title}
        </h3>
        <p className="text-sm text-secondary mb-4">{course.instructor}</p>
        <ul className="text-sm text-secondary mb-4 list-disc list-inside">
          {course.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        <div className="text-sm text-secondary mb-2">
          <strong className="text-primary">Notes Type:</strong>{" "}
          {course.notesType}
        </div>
        <div className="text-sm text-secondary mb-4">
          <strong className="text-primary">Validity:</strong> {course.validity}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-semibold text-primary">
              ₹{course.price}
            </span>{" "}
            <span className="line-through text-sm text-gray-500">
              ₹{course.originalPrice}
            </span>
          </div>
          <span className="text-sm font-bold text-accent">
            {course.discount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
