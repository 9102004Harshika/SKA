import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Loading Animation
  if (loading)
    return (
      <p className="text-center text-gray-600">
        Loading...(amination baad mein daal denge)
      </p>
    );
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6">
      {/* <h2 className="text-3xl font-semibold text-center mb-6">Notes</h2> */}
      <div className="flex flex-col gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="flex flex-col md:flex-row items-start overflow-hidden py-10 px-4 border-b border-primary"
          >
            <img
              src={note.coverImageUrl}
              alt={note.title}
              className="w-33 h-44 object-cover rounded-md border-2 border-primary"
            />
            <div className="flex flex-col justify-between px-4 flex-1">
              <h3 className="text-xl font-bold text-primary">{note.title}</h3>
              <p className="text-sm text-accent">
                {note.subject} (Class {note.classFor}) || {note.board}
              </p>
              <p className="text-gray-700 line-clamp-3">{note.description}</p>
              <p className="text-gray-500 text-sm mt-2">
                Written by: {note.writtenBy}
              </p>
              <div className="mt-4">
                <a
                  href={note.pdfUrl}
                  rel="noopener noreferrer"
                  className="bg-primary text-background px-4 py-2 rounded-md hover:bg-secondary"
                >
                  View Notes
                </a>
                {/* <Button
                  text={"View Notes"}
                  variant="primary"
                  size="xs"
                  className="w-fit"
                /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
