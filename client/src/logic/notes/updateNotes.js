

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "../../components/use-toast";

const useUpdateNotes = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    writtenBy: "",
    subject: "",
    classFor: "",
    board: "",
    coverImageUrl: null, // Can be string URL or File
    pdfUrl: null,        // Can be string URL or File
    visibility: "free",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const[success,setSuccess] = useState("");

  const [modalType, setModalType] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // Modal control
  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}api/notes/${id}`);
        
        setNote(res.data);

        
       
      } catch (err) {
        console.error("Error fetching note details:", err);
        setError("Failed to load note details.");
      }
    };

    fetchNoteDetails();
  }, [id]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess(""); // ✅ Clear success at start
  setIsSubmitting(true);
  openModal("submit");

  try {
    const uploadToCloudinary = async (file, preset) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dsnsi0ioz/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const total = Number(progressEvent.total) || 0;
            const loaded = Number(progressEvent.loaded) || 0;

            if (total > 0) {
              setProgress(Math.round((loaded / total) * 100));
            } else {
              setProgress((prev) => (prev < 95 ? prev + 5 : prev));
            }
          },
        }
      );

      return res.data.secure_url;
    };

    const updatedNote = { ...note };

    if (note.coverImageUrl instanceof File) {
      updatedNote.coverImageUrl = await uploadToCloudinary(
        note.coverImageUrl,
        "Kalp Academy"
      );
    }

    if (note.pdfUrl instanceof File) {
      updatedNote.pdfUrl = await uploadToCloudinary(note.pdfUrl, "Notes_Pdf");
    }

    const res = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}api/notes/update/${id}`,
      updatedNote,
      {
        headers: {
          ...(localStorage.getItem("token") && {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }),
        },
        withCredentials: true,
      }
    );

    console.log("Update Note Response:", res); // ✅ Debugging log

    if (res.status === 200) {
      setProgress(100);
       toast({
    title: "Success",
    description: res.data.message || "Note updated successfully."
  });
      setSuccess(res.data.message); // ✅ Message instead of boolean

      navigate("/admin/notes");
    } else {
      throw new Error(res.data?.message || "Failed to update note.");
    }
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      err.message ||
      "Failed to update note. Please try again.";
    setError(msg);
  } finally {
    setIsSubmitting(false);
    closeModal();
  }
};


  const deleteFile = async (url) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/files/deleteUrl`, {
        url,
        note: note._id,
      });
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };
  return {
    note,
    setNote,
    handleChange,
    handleSubmit,
    deleteFile,
    isSubmitting,
    progress,
    error,
    modalType,
    openModal,
    closeModal,
    setProgress,
    setSuccess,
    success
  };
};

export default useUpdateNotes;
