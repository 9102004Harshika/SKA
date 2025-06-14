import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import Modal from "../../components/Modal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const NotesDashboard = () => {
  const [notesData, setNotesData] = useState({ paid: 0, free: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/notes/get`
        );

        const paidNotes = response.data.filter(
          (note) => note.visibility === "paid"
        ).length;
        const freeNotes = response.data.filter(
          (note) => note.visibility === "free"
        ).length;

        setNotesData({ paid: paidNotes, free: freeNotes });
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
    </div>
  );
};

export default NotesDashboard;