import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa"; // Import edit icon

const UpdateNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notes/get");
        setNotes(response.data);
      } catch (err) {
        setError("Failed to fetch notes.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/admin/notes/edit/${id}`); // Navigate to update page with note ID
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="md:ml-8">
      <h2 className="text-3xl font-header font-semibold md:tracking-wide text-center mb-6">
        Update Notes
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by notes title..."
        className="w-full p-3 border border-primary bg-background focus:border-accent outline-none rounded-sm mb-6"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-600">Loading!!! Please Wait...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredNotes.length === 0 ? (
        <p className="text-gray-600">No notes found.</p>
      ) : (
        <div className="overflow-x-auto rounded-sm">
          <table className="min-w-full border-collapse border border-primary">
            <thead>
              <tr className="border-primary">
                <th className="border bg-accent border-primary p-3">Title</th>
                <th className="border bg-accent border-primary p-3 text-center">
                  Class
                </th>
                <th className="border bg-accent border-primary p-3 text-center">
                  Board
                </th>
                <th className="border bg-accent border-primary p-3">Subject</th>
                <th className="border bg-accent border-primary p-3 text-center">
                  Time
                </th>
                <th className="border bg-accent border-primary p-3 text-center">
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.map((note) => (
                <tr key={note._id} className="hover:border-accent">
                  <td className="border border-primary p-3">{note.title}</td>
                  <td className="border border-primary p-3 text-center">
                    {note.classFor}
                  </td>
                  <td className="border border-primary p-3 text-center">
                    {note.board}
                  </td>
                  <td className="border border-primary p-3">{note.subject}</td>
                  <td className="border border-primary p-3 text-center">
                    {new Date(note.createdOn).toLocaleString()}
                  </td>
                  <td className="border border-primary p-3 text-center">
                    <button
                      onClick={() => handleUpdate(note._id)}
                      className="px-4 py-2 bg-accent text-background rounded-md hover:bg-secondary"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpdateNotesPage;
