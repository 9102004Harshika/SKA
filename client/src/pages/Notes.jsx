import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaFilePdf, FaUniversity } from "react-icons/fa";
import { IoBook } from "react-icons/io5";
import gsap from "gsap";
import Filters from "../components/Filters";
import PdfViewer from "../components/PdfViewer";
import Select from "../ui/select";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FaStickyNote } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const [selectedFilters, setSelectedFilters] = useState({
    subject: {},
    classFor: {},
    board: {},
  });

  const navigate = useNavigate();
  const cardsRef = useRef(null);
  const filtersRef = useRef(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/notes/getFree"
        );
        setNotes(response.data);
      } catch (err) {
        setError("Failed to fetch notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    // Animate Filters section
    if (filtersRef.current) {
      gsap.from(filtersRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    // Animate Notes Cards
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, [notes]);

  const sortOptions = ["Latest", "A to Z", "Z to A", "Older"];

  const formatClassFor = (classFor) => `${classFor}th`;

  const filteredNotes = notes.filter((note) => {
    const selectedBoards = Object.keys(selectedFilters.board).filter(
      (b) => selectedFilters.board[b]
    );
    const selectedClasses = Object.keys(selectedFilters.classFor).filter(
      (c) => selectedFilters.classFor[c]
    );
    const selectedSubjects = Object.keys(selectedFilters.subject).filter(
      (s) => selectedFilters.subject[s]
    );

    const boardMatch =
      selectedBoards.length === 0 ||
      selectedBoards.includes(note.board.match(/\((.*?)\)/)?.[1] || note.board);
    const formattedClassFor = formatClassFor(
      note.classFor.match(/\d+/)?.[0] || note.classFor
    );
    const classMatch =
      selectedClasses.length === 0 ||
      selectedClasses.includes(formattedClassFor);
    const subjectMatch =
      selectedSubjects.length === 0 || selectedSubjects.includes(note.subject);

    return boardMatch && classMatch && subjectMatch;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortOption === "Latest") {
      return new Date(b.createdOn) - new Date(a.createdOn);
    } else if (sortOption === "Older") {
      return new Date(a.createdOn) - new Date(b.createdOn);
    } else if (sortOption === "A to Z") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "Z to A") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center col-span-full text-error mt-10">
        <MdOutlineReportGmailerrorred className="text-4xl text-error mb-2" />
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="flex min-h-screen">
      <div>
        <Filters
          notes={notes}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
      <div className="flex-1 px-6">
        <div className="flex justify-between items-center mt-10">
          <div className="text-lg font-semibold border-b-[1px]">
            Books Available:{" "}
            <span className="text-secondary">{sortedNotes.length}</span>
          </div>
          <div className="min-w-32">
            <Select
              menuTitle="Sort By"
              onClick={() => setShowPdf(false)}
              submenuItems={sortOptions}
              onSelect={(option) => setSortOption(option)}
            />
          </div>
        </div>
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
        >
          {sortedNotes.length > 0 ? (
            sortedNotes.map((note, index) => (
              <div
                onClick={() => navigate(`/app/notes/${note._id}`)}
                key={index}
                className="bg-accent rounded-md shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={note.coverImageUrl}
                    alt={note.title}
                    className="w-full h-60 object-cover object-top"
                  />
                  <div className="px-4 pt-4">
                    <h2 className="text-lg font-semibold text-secondary mb-1">
                      {note.title} ({note.subject})
                    </h2>
                    <div className="text-sm text-tertiary">
                      <div className="flex items-center gap-1">
                        <FaUniversity className="text-tertiary" />
                        <span>
                          Board: {note.board.split("(").pop().replace(")", "")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaFilePdf className="text-tertiary" />
                        <span>Class: {note.classFor}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 self-end p-4">
                  <button
                    onClick={() => setShowPdf(true)}
                    className="bg-primary text-white px-3 py-2 rounded flex items-center gap-2"
                  >
                    <IoBook /> View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center col-span-full text-primary mt-10">
              <FaStickyNote className="text-4xl text-primary mb-2" />
              <p className="text-lg font-semibold">No notes available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Notes;
