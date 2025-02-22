import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilePdf, FaBook, FaUniversity } from "react-icons/fa";
import Filters from "../components/Filters";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    subject: {},
    classFor: {},
    board: {},
  });
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notes/get");
        setNotes(response.data);
      } catch (err) {
        setError("Failed to fetch notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  const formatClassFor = (classFor) => `${classFor}th`;

const filteredNotes = notes.filter((note) => {
  // Get selected filters
  const selectedBoards = Object.keys(selectedFilters.board).filter((b) => selectedFilters.board[b]);
  const selectedClasses = Object.keys(selectedFilters.classFor).filter((c) => selectedFilters.classFor[c]);
  const selectedSubjects = Object.keys(selectedFilters.subject).filter((s) => selectedFilters.subject[s]);

  // Apply board filter
  const boardMatch = selectedBoards.length === 0 || selectedBoards.includes(note.board);

  // Convert backend classFor to frontend format before filtering
  const formattedClassFor = formatClassFor(note.classFor);
  const classMatch = selectedClasses.length === 0 || selectedClasses.includes(formattedClassFor);

  // Apply subject filter
  const subjectMatch = selectedSubjects.length === 0 || selectedSubjects.includes(note.subject);

  return boardMatch && classMatch && subjectMatch;
});
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="flex min-h-screen">
      <Filters notes={notes} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>
      <div >
      <div className="flex justify-between px-10 mt-10 ">
            <div>Total Number of items</div>
            <div>Total Number of items</div>
          </div>
        <div className="flex flex-wrap px-10 pb-20 pt-10  gap-4">

         
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