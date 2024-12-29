


// import React, { useState } from "react";
// import { courseMaterialConfig } from "../config/index.js"; // Ensure you have the correct import
// import {
//   FaBook,
//   FaClipboardCheck,
//   FaLink,
//   FaChevronDown,
//   FaChevronUp,
//   FaUserTie,
// } from "react-icons/fa"; // Import icons

// const MAX_DESCRIPTION_LENGTH = 100; // Adjust the character limit as needed

// const QuizAndNotesDetails = () => {
//   const { notes, quizzes, instructor } = courseMaterialConfig[0];

//   const [showMoreNotes, setShowMoreNotes] = useState(false);
//   const [showMoreQuizzes, setShowMoreQuizzes] = useState(false);
//   const [showMoreInstructor, setShowMoreInstructor] = useState(false);

//   const toggleShowMore = (setState) => setState((prev) => !prev);

//   const renderDescription = (description, isExpanded, toggleExpand) => (
//     <div>
//       <p className="text-gray-600 text-sm">
//         {isExpanded
//           ? description
//           : `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`}
//       </p>
//       {description.length > MAX_DESCRIPTION_LENGTH && (
//         <button
//           onClick={toggleExpand}
//           className={`text-primary font-semibold flex items-center ${isExpanded ? 'mt-1' : 'mt-[1px]'}`} // Conditional margin
//         >
//           {isExpanded ? (
//             <>
//               See Less <FaChevronUp className="ml-1" />
//             </>
//           ) : (
//             <>
//               See More <FaChevronDown className="ml-1" />
//             </>
//           )}
//         </button>
//       )}
//     </div>
//   );
  
//   return (
//     <div className="p-6 rounded-md flex flex-col space-y-8">
//       {/* Notes and Quizzes Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {/* Notes Section */}
//         <div className="p-6 rounded-md">
//           <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
//             <FaBook className="mr-2" />
//             Notes
//           </h3>
//           {notes && notes.name ? (
//             <div className="space-y-4">
//              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
//   {notes.image && (
//     <div className="w-44 aspect-w-4 aspect-h-3 flex-shrink-0">
//       <img
//         src={notes.image}
//         alt={notes.name}
//         className="w-full h-full object-cover rounded-md shadow-sm transition-all duration-300 ease-in-out"
//       />
//     </div>
//   )}
//   <div className="flex flex-col space-y-4">
//     <p className="text-lg font-semibold">{notes.name}</p>
//     {renderDescription(
//       notes.description || "No description provided",
//       showMoreNotes,
//       () => toggleShowMore(setShowMoreNotes)
//     )}
//     {notes.link ? (
//       <a
//         href={notes.link}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="bg-primary text-white px-4 py-2 rounded-md text-center font-semibold hover:bg-secondary inline-block w-auto"
//       >
//         <FaLink className="inline-block mr-2" />
//         View Notes
//       </a>
//     ) : (
//       <p className="text-gray-500">No link available</p>
//     )}
//   </div>
// </div>

//             </div>
//           ) : (
//             <p className="text-gray-500">No notes details available.</p>
//           )}
//         </div>

//         {/* Quizzes Section */}
//         <div className="p-6 rounded-md">
//           <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
//             <FaClipboardCheck className="mr-2" />
//             Quizzes
//           </h3>
//           {quizzes && quizzes.name ? (
//             <div className="space-y-4">
//               <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
//                 {quizzes.image && (
//                   <div className="w-44 aspect-w-4 aspect-h-3 flex-shrink-0">
//                     <img
//                       src={quizzes.image}
//                       alt={quizzes.name}
//                       className="w-full h-full object-cover rounded-md shadow-sm transition-all duration-300 ease-in-out"
//                     />
//                   </div>
//                 )}
//                 <div className="flex flex-col space-y-4 flex-grow">
//                   <p className="text-lg font-semibold">{quizzes.name}</p>
//                   {renderDescription(
//                     quizzes.description || "No description provided",
//                     showMoreQuizzes,
//                     () => toggleShowMore(setShowMoreQuizzes)
//                   )}
//                   {quizzes.link ? (
//                     <a
//                       href={quizzes.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="bg-primary text-white px-4 py-2 rounded-md text-center font-semibold hover:bg-secondary inline-block w-auto"
//                     >
//                       <FaLink className="inline-block mr-2" />
//                       Take Quiz
//                     </a>
//                   ) : (
//                     <p className="text-gray-500">No link available.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-500">No quiz details available.</p>
//           )}
//         </div>
//       </div>

//       {/* Instructor Section */}
//       <div className="p-6 rounded-md mt-8">
//         <h3 className="text-2xl font-semibold text-primary mb-4 flex items-center">
//           <FaUserTie className="mr-2" />
//           Instructor
//         </h3>
//         {instructor && instructor.name ? (
//           <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0">
//             {instructor.photo ? (
//               <img
//                 src={instructor.photo}
//                 alt={instructor.name}
//                 className="w-28 h-28 rounded-full object-cover border-4 border-primary transition-all duration-300 ease-in-out"
//               />
//             ) : (
//               <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center">
//                 <span className="text-white text-xl">N/A</span>
//               </div>
//             )}
//             <div className="md:ml-6 text-justify md:text-left flex-grow">
//               <p className="text-2xl font-semibold text-primary">
//                 {instructor?.name}
//               </p>
//               <p className="text-lg text-gray-600">
//                 {instructor?.role || "Instructor Role"}
//               </p>
//               <p className=" font-semibold">{instructor?.education}</p>
//               <p className="mb-1 text-gray-600">{instructor?.experience}</p>
//               {renderDescription(
//                 instructor?.bio || "No bio available",
//                 showMoreInstructor,
//                 () => toggleShowMore(setShowMoreInstructor)
//               )}
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500">No instructor details available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizAndNotesDetails;



import React, { useState } from "react";
import { courseMaterialConfig } from "../config/index.js";
import {
  FaBook,
  FaClipboardCheck,
  FaLink,
  FaChevronDown,
  FaChevronUp,
  FaUserTie,
} from "react-icons/fa";

const MAX_DESCRIPTION_LENGTH = 100;

const QuizAndNotesDetails = () => {
  const { notes, quizzes, instructor } = courseMaterialConfig[0];

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
          className={`text-primary font-semibold flex items-center ${isExpanded ? 'mt-1 ml-1' : 'mt-[1px]'}`}
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
    <div className="p-6 rounded-md flex flex-col space-y-8">
      {/* Notes and Quizzes Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Notes Section */}
        <div className="p-6 rounded-md">
          <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
            <FaBook className="mr-2" />
            Notes
          </h3>
          {notes && notes.name ? (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                {notes.image && (
                  <div className="w-44 aspect-w-4 aspect-h-3 flex-shrink-0">
                    <img
                      src={notes.image}
                      alt={notes.name}
                      className="w-full h-full object-cover rounded-md shadow-sm transition-all duration-300 ease-in-out"
                    />
                  </div>
                )}
                <div className="flex flex-col space-y-4">
                  <p className="text-lg font-semibold">{notes.name}</p>
                  {renderDescription(
                    notes.description || "No description provided",
                    showMoreNotes,
                    () => toggleShowMore(setShowMoreNotes)
                  )}
                  {notes.link ? (
                    <a
                      href={notes.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-4 py-2 rounded-md text-center font-semibold hover:bg-secondary inline-block w-auto"
                    >
                      <FaLink className="inline-block mr-2" />
                      View Notes
                    </a>
                  ) : (
                    <p className="text-gray-500">No link available</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No notes details available.</p>
          )}
        </div>

        {/* Quizzes Section */}
        <div className="p-6 rounded-md">
          <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
            <FaClipboardCheck className="mr-2" />
            Quizzes
          </h3>
          {quizzes && quizzes.name ? (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                {quizzes.image && (
                  <div className="w-44 aspect-w-4 aspect-h-3 flex-shrink-0">
                    <img
                      src={quizzes.image}
                      alt={quizzes.name}
                      className="w-full h-full object-cover rounded-md shadow-sm transition-all duration-300 ease-in-out"
                    />
                  </div>
                )}
                <div className="flex flex-col space-y-4 flex-grow">
                  <p className="text-lg font-semibold">{quizzes.name}</p>
                  {renderDescription(
                    quizzes.description || "No description provided",
                    showMoreQuizzes,
                    () => toggleShowMore(setShowMoreQuizzes)
                  )}
                  {quizzes.link ? (
                    <a
                      href={quizzes.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-4 py-2 rounded-md text-center font-semibold hover:bg-secondary inline-block w-auto"
                    >
                      <FaLink className="inline-block mr-2" />
                      Take Quiz
                    </a>
                  ) : (
                    <p className="text-gray-500">No link available.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No quiz details available.</p>
          )}
        </div>
      </div>

      {/* Instructor Section */}
      <div className="p-6 rounded-md mt-8">
        <h3 className="text-2xl font-semibold text-primary mb-4 flex items-center">
          <FaUserTie className="mr-2" />
          Instructor
        </h3>
        {instructor && instructor.name ? (
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0">
            {instructor.photo ? (
              <img
                src={instructor.photo}
                alt={instructor.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-primary transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">N/A</span>
              </div>
            )}
            <div className="md:ml-6 text-justify md:text-left flex-grow">
              <p className="text-2xl font-semibold text-primary">
                {instructor?.name}
              </p>
              <p className="text-lg text-gray-600">
                {instructor?.role || "Instructor Role"}
              </p>
              <p className="font-semibold">{instructor?.education}</p>
              <p className="mb-1 text-gray-600">{instructor?.experience}</p>
              {renderDescription(
                instructor?.bio || "No bio available",
                showMoreInstructor,
                () => toggleShowMore(setShowMoreInstructor)
              )}
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
