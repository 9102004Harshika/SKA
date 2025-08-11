import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../../../components/use-toast";
import axios from "axios";
import {
  FaSearch,
  FaPlus,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilePdf,
  FaLock,
  FaLockOpen,
  FaTimes
} from "react-icons/fa";
import BookLoader from "../../../components/BookLoader";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const NotesDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const notesPerPage = 10;

  // Fetch notes from API
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}api/notes/get`);
        // Transform the data to match our UI structure
        const transformedNotes = response.data.map((note) => ({
          ...note,
          // Add any necessary transformations here
          // For example, ensure all required fields have default values
          coverImageUrl:
            note.coverImageUrl ||
            `https://picsum.photos/120/80?random=${note._id}`,
          pdfUrl: note.pdfUrl || `#${note._id}`,
          visibility: note.visibility || "free",
          classFor: note.classFor || "General",
          board: note.board || "CBSE",
          subject: note.subject || "General",
          createdOn: new Date(note.createdAt || Date.now()),
        }));
        setAllNotes(transformedNotes);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to fetch notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    return allNotes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (note.writtenBy &&
          note.writtenBy.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSubject =
        filterSubject === "All" || note.subject === filterSubject;
      return matchesSearch && matchesSubject;
    });
  }, [allNotes, searchTerm, filterSubject]);

  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const startIndex = (currentPage - 1) * notesPerPage;
  const currentNotes = filteredNotes.slice(
    startIndex,
    startIndex + notesPerPage
  );

  // Get unique subjects and classes for filters
  const subjects = useMemo(() => {
    const uniqueSubjects = new Set(allNotes.map((note) => note.subject));
    return ["All", ...Array.from(uniqueSubjects).filter(Boolean)];
  }, [allNotes]);

  const classes = useMemo(() => {
    const uniqueClasses = new Set(allNotes.map((note) => note.classFor));
    return ["All", ...Array.from(uniqueClasses).filter(Boolean)];
  }, [allNotes]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
// Open delete confirmation modal
  const handleDeleteNotes = (id) => {
    setNoteToDelete(id);
    setDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    try {
      const res = await axios.delete(
        `${API_URL}api/notes/delete/${noteToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

     if (res.data?.success || res.status === 200) {
  const updatedNotes = allNotes.filter((note) => note._id !== noteToDelete);
  setAllNotes(updatedNotes);

  toast({
    title: "Success",
    description: "Note deleted successfully.",
    variant: "success",
  });
} else {
  throw new Error(res.data?.message || "Failed to delete note");
}

    } catch (err) {
      toast({
        title: "Error",
        description:
          err.response?.data?.message ||
          err.message ||
          "Failed to delete note.",
        variant: "destructive",
      });
    } finally {
      setDeleteModalOpen(false);
      setNoteToDelete(null);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  return (
    <div className="min-h-screen bg-background text-tertiary px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold font-header tracking-wide text-primary">
            Notes Dashboard
          </h1>
        </header>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="w-full sm:w-auto flex-grow relative group">
            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-accent transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search notes or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-primary rounded-lg focus:ring-2 focus:ring-accent outline-none transition-all text-primary hover:border-secondary focus:border-accent placeholder:text-primary"
            />
          </div>

          <div className="w-full sm:w-auto flex items-center gap-4">
            {/* Subject Filter */}
            <div className="w-full sm:w-48 relative">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-white border border-primary rounded-lg focus:ring-2 focus:ring-accent outline-none transition-all text-primary hover:border-secondary focus:border-accent placeholder:text-primary"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <FaChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none group-focus-within:text-accent transition-colors"
                size={20}
              />
            </div>

            {/* Add New Note Button */}
            <button 
              onClick={() => navigate("/admin/notes/add")}
              className="flex-shrink-0 bg-accent hover:bg-yellow-500 text-primary font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105"
            >
              <FaPlus size={20} />
              <span>Add Note</span>
            </button>
          </div>
        </div>

        {/* Notes Table */}
        <div className="bg-background rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary text-background">
                  <th className="p-4 font-semibold text-left">Note Details</th>
                  <th className="p-4 font-semibold text-center">Subject</th>
                  <th className="p-4 font-semibold text-center">Class</th>
                  <th className="p-4 font-semibold text-center">Board</th>
                  <th className="p-4 font-semibold text-center">Author</th>
                  <th className="p-4 font-semibold text-center">Created On</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-24">
                          <BookLoader />
                        </div>
                        <p className="text-tertiary">Loading notes...</p>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center gap-4 p-6 bg-red-50 rounded-lg border border-red-200">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-red-800">
                            Error Loading Notes
                          </h3>
                          <p className="text-red-600 mt-1">{error}</p>
                        </div>
                        <button
                          onClick={() => window.location.reload()}
                          className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                        >
                          Retry
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : currentNotes.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-tertiary">
                      No notes found. Try adjusting your search or filters.
                    </td>
                  </tr>
                ) : (
                  currentNotes.map((note) => (
                    <tr
                      key={note.id}
                      className="border-b border-gray-100 hover:bg-background/50"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={note.coverImageUrl}
                              alt={note.title}
                              className="w-8 h-12 rounded-md object-cover"
                            />
                            <div className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow">
                              {note.visibility === "paid" ? (
                                <FaLock className="text-amber-600" size={12} />
                              ) : (
                                <FaLockOpen
                                  className="text-green-600"
                                  size={12}
                                />
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-secondary">
                              {note.title}
                            </div>
                            <div className="text-xs text-tertiary/70 line-clamp-1">
                              {note.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-semibold">
                          {note.subject}
                        </span>
                      </td>
                      <td className="p-4 text-center font-medium text-tertiary">
                        {note.classFor}
                      </td>
                      <td className="p-4 text-center text-tertiary font-medium">
                        {note.board}
                      </td>
                      <td className="p-4 text-center text-tertiary">
                        {note.writtenBy}
                      </td>
                      <td className="p-4 text-center text-tertiary text-sm">
                        {formatDate(note.createdOn)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={note.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-secondary hover:bg-secondary/10 rounded-full transition-colors"
                            title="View PDF"
                          >
                            <FaFilePdf size={18} />
                          </a>
                          <button
                            className="p-2 text-accent hover:bg-accent/10 rounded-full transition-colors"
                            title="Edit"
                            onClick={() => navigate(`/admin/notes/update/${note._id}`)}
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            className="p-2 text-error hover:bg-error/10 rounded-full transition-colors"
                            title="Delete"
                              onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotes(note._id);
                          }}
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-tertiary/80">
              Showing{" "}
              <span className="font-bold text-primary">
                {startIndex + 1}-
                {Math.min(startIndex + notesPerPage, filteredNotes.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-primary">
                {filteredNotes.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
              >
                <FaChevronLeft size={20} />
              </button>
              <span className="px-4 py-2 bg-white border border-gray-200 rounded-md font-semibold text-primary">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
       {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Notes
              </h3>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default NotesDashboard;
