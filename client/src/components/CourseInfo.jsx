import React, { useState } from "react";
import { courseMaterialConfig } from "../config/index.js";
import {
  FaBook,
  FaClipboardCheck,
  FaLink,
  FaChevronDown,
  FaChevronUp,
  FaUserTie,
  FaVideo,
  FaPhoneAlt,
} from "react-icons/fa";

const MAX_DESCRIPTION_LENGTH = 100;

const QuizAndNotesDetails = () => {
  const { notes, quizzes, instructor, videos } = courseMaterialConfig[0];

  const [showMoreNotes, setShowMoreNotes] = useState(false);
  const [showMoreQuizzes, setShowMoreQuizzes] = useState(false);
  const [showMoreInstructor, setShowMoreInstructor] = useState(false);

  const toggleShowMore = (setState) => setState((prev) => !prev);

  const renderDescription = (description, isExpanded, toggleExpand) => (
    <div>
      <div
        className={`overflow-hidden transition-all duration-[600ms] ease-in-out ${
          isExpanded ? "max-h-[1000px] p-1" : "max-h-[60px] p-0"
        }`}
      >
        <p className="text-gray-600 text-sm">
          {isExpanded
            ? description
            : `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`}
        </p>
      </div>
      {description.length > MAX_DESCRIPTION_LENGTH && (
        <button
          onClick={toggleExpand}
          className={`text-primary font-semibold flex items-center ${
            isExpanded ? "mt-1 ml-1" : "mt-[1px]"
          }`}
        >
          {isExpanded ? (
            <>
              See Less <FaChevronUp className="ml-2 " />
            </>
          ) : (
            <>
              See More <FaChevronDown className="ml-1 " />
            </>
          )}
        </button>
      )}
    </div>
  );

  return (
    <div className="p-6 rounded-md flex flex-col space-y-8 ">

      {/* Notes and Quizzes Section */}
     
      {/* Instructor Section */}
     

      {/* Quries Section  */}
      <div className="p-6 rounded-md bg-background border-2 border-primary shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-primary">
          Have Any Questions?
        </h3>
        <p className="text-gray-700 mb-6">
          We're here to help! Feel free to reach out to us for any queries or
          support.
        </p>
        <a
          href="tel:+1234567890"
          className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-secondary transition-colors shadow-md"
        >
          <FaPhoneAlt className="mr-2" />
          Call Us: +91 93426 75932
        </a>
      </div>
    </div>
  );
};
export default  QuizAndNotesDetails