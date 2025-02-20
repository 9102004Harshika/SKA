import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditNotesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    description: "",
    writtenBy: "",
    subject: "",
    classFor: "",
    board: "",
  });

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/notes/${id}`
        );
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note details:", error);
      }
    };

    fetchNoteDetails();
  }, [id]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/notes/update/${id}`, note);
      alert("Note updated successfully!");
      navigate("/update-notes"); // Redirect back
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
          placeholder="Title"
        />
        <textarea
          name="description"
          value={note.description}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
          placeholder="Description"
        />
        <input
          type="text"
          name="writtenBy"
          value={note.writtenBy}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
          placeholder="Written By"
        />
        <input
          type="text"
          name="subject"
          value={note.subject}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
          placeholder="Subject"
        />
        <input
          type="text"
          name="classFor"
          value={note.classFor}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
          placeholder="Class"
        />
        <input
          type="text"
          name="board"
          value={note.board}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
          placeholder="Board"
        />
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded-md"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditNotesPage;
