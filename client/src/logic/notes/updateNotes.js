import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const useUpdateNotes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    description: "",
    writtenBy: "",
    subject: "",
    classFor: "",
    board: "",
    coverImageUrl: "",
    pdfUrl: "",
    visibility: "free",
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
      navigate("/admin/notes/update");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return { note, handleChange, handleSubmit, setNote };
};

export default useUpdateNotes;
