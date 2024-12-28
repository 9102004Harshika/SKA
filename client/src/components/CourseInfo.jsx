import React from "react";
import { courseMaterialConfig } from "../config/index.js"; // Ensure you have the correct import

const QuizAndNotesDetails = () => {
  const { notes, quizzes, instructor } = courseMaterialConfig[0];

  return (
    <div className="p-6 shadow-lg rounded-md flex flex-col space-y-8">
      {/* Notes and Quizzes Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Notes Section */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-primary">Notes</h3>
          {notes && notes.name ? (
            <div className="space-y-4">
              {notes.image && (
                <img
                  src={notes.image}
                  alt={notes.name}
                  className="w-full h-48 object-cover rounded-md shadow-sm"
                />
              )}
              <p className="text-lg">
                <span className="font-bold">Name:</span> {notes.name}
              </p>
              <p>
                <span className="font-bold">Description:</span>{" "}
                {notes.description || "No description provided"}
              </p>
              {notes.link ? (
                <a
                  href={notes.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Notes
                </a>
              ) : (
                <p className="text-gray-500">No link available</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No notes details available.</p>
          )}
        </div>

        {/* Quizzes Section */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-primary">Quizzes</h3>
          {quizzes && quizzes.name ? (
            <div className="space-y-4">
              {quizzes.image && (
                <img
                  src={quizzes.image}
                  alt={quizzes.name}
                  className="w-full h-48 object-cover rounded-md shadow-sm"
                />
              )}
              <p className="text-lg">
                <span className="font-bold">Name:</span> {quizzes.name}
              </p>
              <p>
                <span className="font-bold">Description:</span>{" "}
                {quizzes.description || "No description provided"}
              </p>
              {quizzes.link ? (
                <a
                  href={quizzes.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Take Quiz
                </a>
              ) : (
                <p className="text-gray-500">No link available.</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No quiz details available.</p>
          )}
        </div>
      </div>

      {/* Instructor Section - Enhanced Layout */}
      <div className="bg-white p-6 rounded-md shadow-md mt-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Instructor</h3>
        {instructor && instructor.name ? (
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0">
            {/* Instructor Photo */}
            {instructor.photo ? (
              <img
                src={instructor.photo}
                alt={instructor.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-primary"
              />
            ) : (
              <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">N/A</span>
              </div>
            )}

            {/* Instructor Information */}
            <div className="md:ml-6 text-center md:text-left">
              <p className="text-2xl font-semibold text-primary">
                {instructor?.name}
              </p>
              <p className="text-lg text-gray-600">
                {instructor?.role || "Instructor Role"}
              </p>

              <div className="mt-4 text-sm text-gray-700">
                <p>{instructor?.bio}</p>
                <p className="mt-2 font-semibold">{instructor?.education}</p>
                <p className="mt-1 text-gray-600">{instructor?.experience}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No instructor details available.</p>
        )}
      </div>
    </div>
  );
};

export default QuizAndNotesDetails;
