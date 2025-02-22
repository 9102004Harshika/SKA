// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "../ui/button";
// import { FaFilePdf, FaBook, FaUser, FaUniversity } from "react-icons/fa";
// import { Checkbox } from "../ui/checkBox";

// const Notes = () => {
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSubjects, setSelectedSubjects] = useState({});
//   const [selectedClass,setSelectedClass]=useState({})
//   // Handle checkbox change
//   const handleCheckboxChange = (subject) => {
//     setSelectedSubjects((prev) => ({
//       ...prev,
//       [subject]: !prev[subject], // Toggle the checked state
//     }));
//   };

//   // Fetch Notes
//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/notes/get`);
//         setNotes(response.data);
//       } catch (err) {
//         setError("Failed to fetch notes. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotes();
//   }, []);

//   // Check if any filter is applied
//   const isFilterApplied = Object.values(selectedSubjects).some((checked) => checked);

//   // Filter Notes
//   const filteredNotes = isFilterApplied
//     ? notes.filter((note) => selectedSubjects[note.subject])
//     : notes;

//   console.log(selectedSubjects);

//   // Loading Animation
//   if (loading)
//     return (
//       <p className="text-center text-gray-600">
//         Loading...(animation baad mein daal denge)
//       </p>
//     );
//   if (error) return <p className="text-center text-red-600">{error}</p>;

//   return (
//     <div className="flex min-h-screen">
//       {/* Filter Sidebar */}
//       <aside className="w-1/4 h-[200vh] bg-background border-r-2 border-gray-200 p-6 hidden lg:flex flex-col ">
//         {/* Subject Filter */}
//         <div>
//           <h2 className="font-header text-xl  font-bold">Subject</h2>
//           <div className="mt-2 ml-4">
//             {[...new Set(notes.map((note) => note.subject))].map((subject, index) => (
//              <Checkbox
//              key={index}
//              text={<div className="flex flex-col items-start md:flex-row md:items-center gap-1">{subject}</div>}
//              checked={selectedSubjects[subject] || false}
//              onChange={() => handleCheckboxChange(subject)}
//            />
//             ))}
//           </div>
//         </div>
//         {/* Class Filter */}
//         <div>
//         <h2 className="font-header text-xl  font-bold mt-4">Class</h2>
//         <div className="mt-2 ml-4">
//   {[...new Set(notes.map((note) => note.classFor))].map((std, index) => (
//     <Checkbox
//       key={index}
//       text={<div className="flex flex-col items-start md:flex-row md:items-center gap-1">{std}</div>}
//       checked={selectedSubjects[std] || false}
//       onChange={() => handleCheckboxChange(std)}
//     />
//   ))}
// </div>
//         </div>
//       </aside>

//       {/* Notes Grid */}
//       <div className="w-3/4 p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredNotes.length > 0 ? (
//             filteredNotes.map((note, index) => (
//               <div key={index} className="bg-secondary rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 max-w-md mx-auto">
//                 {/* Cover Image */}
//                 <div className="w-full flex justify-center">
//                   <img src={note.coverImageUrl} alt={note.title} className="w-full h-52 object-cover" />
//                 </div>

//                 {/* Card Content */}
//                 <div className="p-4">
//                   {/* Title */}
//                   <h2 className="text-xl font-semibold font-header tracking-wide text-primary mb-1">{note.title}</h2>

//                   {/* Description */}
//                   <p className="text-gray-600 text-sm line-clamp-3 font-body">
//                     {note.description.split(" ").slice(0, 30).join(" ")}
//                     {note.description.split(" ").length > 30 && "..."}
//                   </p>

//                   {/* Meta Info */}
//                   <div className="mt-3 space-y-2 text-sm text-gray-600 font-body">
//                     <div className="flex items-center gap-2">
//                       <FaUser className="text-gray-500" /> <span>Professor: {note.writtenBy}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FaBook className="text-gray-500" /> <span>Subject: {note.subject}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FaUniversity className="text-gray-500" /> <span>Board: {note.board}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//            <FaFilePdf className="text-gray-500" /> <span>Class: {note.classFor}</span>
//            </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="mt-4 flex justify-between items-center font-body">
//                     {note.pdfUrl && (
//                       <a
//                         href={note.pdfUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-primary font-medium flex items-center gap-1 hover:underline"
//                       >
//                         <FaFilePdf /> View PDF
//                       </a>
//                     )}
//                     <button className="bg-primary text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 hover:bg-blue-600">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center col-span-full">No notes available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notes;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { FaFilePdf, FaBook, FaUser, FaUniversity } from "react-icons/fa";
import { Checkbox } from "../ui/checkBox";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [selectedClasses, setSelectedClasses] = useState({});
  const [selectedBoard, setSelectedBoard] = useState({});
  // Handle checkbox change for subjects
  const handleSubjectCheckboxChange = (subject) => {
    setSelectedSubjects((prev) => ({
      ...prev,
      [subject]: !prev[subject],
    }));
  };

  // Handle checkbox change for classes
  const handleClassCheckboxChange = (std) => {
    setSelectedClasses((prev) => ({
      ...prev,
      [std]: !prev[std],
    }));
  };
  const handleBoardCheckboxChange = (board) => {
    setSelectedBoard((prev) => ({
      ...prev,
      [board]: !prev[board],
    }));
  };
  // Fetch Notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notes/get`);
        setNotes(response.data);
      } catch (err) {
        setError("Failed to fetch notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Check if any filter is applied
  const isSubjectFilterApplied = Object.values(selectedSubjects).some(
    (checked) => checked
  );
  const isClassFilterApplied = Object.values(selectedClasses).some(
    (checked) => checked
  );
  const isBoardFilterApplied = Object.values(selectedBoard).some(
    (checked) => checked
  );

  // Filter Notes
  const filteredNotes = notes.filter((note) => {
    const subjectMatch =
      !isSubjectFilterApplied || selectedSubjects[note.subject];
    const classMatch = !isClassFilterApplied || selectedClasses[note.classFor];
    const boardMatch = !isBoardFilterApplied || selectedBoard[note.board];
    return subjectMatch && classMatch && boardMatch;
  });

  // Loading Animation
  if (loading)
    return (
      <p className="text-center text-gray-600">
        Loading...(animation baad mein daal denge)
      </p>
    );
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="flex min-h-screen">
      {/* Filter Sidebar */}
      <aside className="w-72 h-[200vh] bg-background border-r-2 border-gray-200 p-6 hidden lg:flex flex-col ">
        {/* Subject Filter */}
        <div>
          <h2 className="font-header text-accent text-xl font-bold">Subject</h2>
          <div className="mt-2 ml-4">
            {[...new Set(notes.map((note) => note.subject))].map(
              (subject, index) => (
                <Checkbox
                  key={index}
                  text={
                    <div className="flex flex-col items-start md:flex-row md:items-center gap-1">
                      {subject}
                    </div>
                  }
                  checked={selectedSubjects[subject] || false}
                  onChange={() => handleSubjectCheckboxChange(subject)}
                />
              )
            )}
          </div>
        </div>
        {/* Class Filter */}
        <div>
          <h2 className="font-header text-accent text-xl font-bold mt-4">
            Class
          </h2>
          <div className="mt-2 ml-4">
            {[...new Set(notes.map((note) => note.classFor))].map(
              (std, index) => (
                <Checkbox
                  key={index}
                  text={
                    <div className="flex flex-col items-start md:flex-row md:items-center gap-1">
                      {std}
                    </div>
                  }
                  checked={selectedClasses[std] || false}
                  onChange={() => handleClassCheckboxChange(std)}
                />
              )
            )}
          </div>
        </div>
        {/* Board Filter */}
        <div>
          <h2 className="font-header text-accent text-xl font-bold mt-4">
            Board
          </h2>
          <div className="mt-2 ml-4">
            {[...new Set(notes.map((note) => note.board))].map(
              (board, index) => (
                <Checkbox
                  key={index}
                  text={
                    <div className="flex flex-col items-start md:flex-row md:items-center gap-1">
                      {board}
                    </div>
                  }
                  checked={selectedBoard[board] || false}
                  onChange={() => handleBoardCheckboxChange(board)}
                />
              )
            )}
          </div>
        </div>
      </aside>

      {/* Notes Grid */}
      <div className="">
        <div className="flex flex-wrap gap-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <div
                key={index}
                className="bg-secondary rounded-md shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 max-w-xs flex-grow"
                style={{ minWidth: "250px", maxWidth: "280px" }} // Adjust min/max width to maintain 4 in a row
              >
                {/* Cover Image */}
                <div className="w-full flex justify-center">
                  <img
                    src={note.coverImageUrl}
                    alt={note.title}
                    className="w-full h-52 object-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold font-header tracking-wide text-primary mb-1">
                    {note.title}
                  </h2>
                  <div className="mt-3 space-y-2 text-sm text-gray-600 font-body">
                    <div className="flex items-center gap-2">
                      <FaBook className="text-gray-500" />{" "}
                      <span>Subject: {note.subject}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUniversity className="text-gray-500" />{" "}
                      <span>Board: {note.board}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaFilePdf className="text-gray-500" />{" "}
                      <span>Class: {note.classFor}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center font-body">
                    {note.pdfUrl && (
                      <a
                        href={note.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-medium flex items-center gap-1 hover:underline"
                      >
                        <FaFilePdf /> View PDF
                      </a>
                    )}
                    <button className="bg-primary text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 hover:bg-blue-600">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">
              No notes available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
