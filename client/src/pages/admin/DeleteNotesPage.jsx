import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "../../components/use-toast";

const DeleteNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleDelete = async (note) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      // Step 1: Delete the image and PDF from Cloudinary
      await axios.post("http://localhost:5000/api/deleteFile", {
        coverImageUrl: note.coverImageUrl,
        pdfUrl: note.pdfUrl,
      });

      // Step 2: Delete the note from the database
      await axios.delete(`http://localhost:5000/api/notes/delete/${note._id}`);

      // Step 3: Update state to remove deleted note
      setNotes(notes.filter((n) => n._id !== note._id));

      // Step 4: Show success toast
      toast({
        title: "Notes Deleted Successfully",
        description: `You have successfully deleted the note for ${note.subject}`,
        variant: "success",
      });
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Failed to delete the note.");
      toast({
        title: "Error Deleting Note",
        description: "Something went wrong while deleting the note.",
        variant: "destructive",
      });
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="md:ml-8">
      <h2 className="text-3xl font-header font-semibold md:tracking-wide text-center mb-6">
        Delete Notes
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
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredNotes.length === 0 ? (
        <p className="text-gray-600">No notes found.</p>
      ) : (
        <div className="overflow-x-auto rounded-sm  overflow-hidden">
          <table className="min-w-full border-collapse border border-primary rounded-sm">
            <thead>
              <tr className="border-primary">
                <th className="border bg-secondary  border-primary p-3 text-left">
                  Title
                </th>
                <th className="border bg-secondary border-primary p-3 text-center">
                  Class
                </th>
                <th className="border bg-secondary border-primary p-3 text-center">
                  Board
                </th>
                <th className="border bg-secondary border-primary p-3 text-left">
                  Subject
                </th>
                <th className="border bg-secondary border-primary p-3 text-center">
                  Time
                </th>
                <th className="border bg-secondary border-primary p-3 text-center">
                  Delete
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
                  <td className="border border-primary p-3 text-left">
                    {note.subject}
                  </td>
                  <td className="border border-primary p-3 text-center">
                    {new Date(note.createdOn).toLocaleString()}
                  </td>
                  <td className="border border-primary p-3 text-center">
                    <button
                      onClick={() => handleDelete(note)}
                      className="px-4 py-2 bg-accent text-background rounded-md hover:bg-red-600"
                    >
                      <RiDeleteBin6Line />
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

export default DeleteNotesPage;
