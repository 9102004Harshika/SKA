import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilePdf, FaBook, FaUniversity } from "react-icons/fa";
import Filters from "../components/Filters";
import PdfViewer from "../components/PdfViewer";
import { IoBook } from "react-icons/io5";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
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
    const selectedBoards = Object.keys(selectedFilters.board).filter(
      (b) => selectedFilters.board[b]
    );
    const selectedClasses = Object.keys(selectedFilters.classFor).filter(
      (c) => selectedFilters.classFor[c]
    );
    const selectedSubjects = Object.keys(selectedFilters.subject).filter(
      (s) => selectedFilters.subject[s]
    );

    // Apply board filter
    const boardMatch =
      selectedBoards.length === 0 || selectedBoards.includes(note.board);

    // Convert backend classFor to frontend format before filtering
    const formattedClassFor = formatClassFor(note.classFor);
    const classMatch =
      selectedClasses.length === 0 ||
      selectedClasses.includes(formattedClassFor);

    // Apply subject filter
    const subjectMatch =
      selectedSubjects.length === 0 || selectedSubjects.includes(note.subject);

    return boardMatch && classMatch && subjectMatch;
  });
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="flex min-h-screen">
      <Filters
        notes={notes}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div>
        <div className="flex justify-between px-10 mt-10 ">
          <div>Total Number of items</div>
          <div>Total Number of items</div>
        </div>
        <div className="flex flex-wrap px-10 pb-20 pt-10 gap-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <div
                key={index}
                className="bg-secondary rounded-md shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 flex-wrap"
                style={{ minWidth: "180px", maxWidth: "250px" }} // More flexibility in width
              >
                {/* Cover Image */}
                <div className="w-full flex justify-center">
                  <img
                    src={note.coverImageUrl}
                    alt={note.title}
                    className="w-full h- sm:h-36 md:h-40 object-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="p-3 md:p-4">
                  <h2 className="text-lg sm:text-sm md:text-base font-semibold font-header tracking-wide text-primary mb-1">
                    {note.title} ({note.subject})
                  </h2>
                  <div className="mt-2 space-y-1 text-xs sm:text-xs md:text-sm text-gray-600 font-body">
                    {/* <div className="flex items-center gap-1">
                      <FaBook className="text-gray-500 text-sm sm:text-xs" />{" "}
                      <span>Subject: </span>
                    </div> */}
                    <div className="flex items-center gap-1">
                      <FaUniversity className="text-gray-500 text-sm sm:text-xs" />{" "}
                      <span>Board: {note.board}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaFilePdf className="text-gray-500 text-sm sm:text-xs" />{" "}
                      <span>Class: {note.classFor}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-start items-center font-body">
                    {note.pdfUrl && (
                      <button
                        onClick={() => setShowPdf(true)}
                        className="bg-primary text-white px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm rounded flex items-center gap-2 "
                      >
                        <IoBook />
                        Open Book
                      </button>
                    )}
                    {showPdf && (
                      <PdfViewer
                        pdfUrl={note.pdfUrl}
                        onClose={() => setShowPdf(false)}
                      />
                    )}
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
