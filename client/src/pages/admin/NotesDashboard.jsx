import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal";

const NotesDashboard = () => {
  const [notesCount, setNotesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notes/get");
        setNotesCount(response.data.length);
      } catch (err) {
        setError("Failed to fetch notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="p-6 bg-secondary shadow-md rounded-lg ml-8">
      <h2 className="text-2xl font-semibold text-primary">Notes Dashboard</h2>
      {loading ? (
        <Modal>Fetching Notes</Modal>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-lg font-medium text-primary">
          Total Notes: <span className="font-bold">{notesCount}</span>
        </p>
      )}
    </div>
  );
};

export default NotesDashboard;
