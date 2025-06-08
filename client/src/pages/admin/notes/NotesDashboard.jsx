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
import Modal from "../../components/Modal";

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
        const response = await axios.get("http://localhost:5000/api/notes/get");

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

  const chartData = {
    labels: ["Paid Notes", "Free Notes"],
    datasets: [
      {
        label: "Number of Notes",
        data: [notesData.paid, notesData.free],
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderColor: ["#FF6384", "#36A2EB"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-secondary shadow-md rounded-lg ml-8">
      <h2 className="text-2xl font-semibold text-primary">Notes Dashboard</h2>
      {loading ? (
        <Modal>Fetching Notes</Modal>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-lg font-medium text-primary">
            Paid Notes: <span className="font-bold">{notesData.paid}</span>
          </p>
          <p className="text-lg font-medium text-primary">
            Free Notes: <span className="font-bold">{notesData.free}</span>
          </p>
          <div className="mt-6">
            <Bar data={chartData} />
          </div>
        </>
      )}
    </div>
  );
};

export default NotesDashboard;
