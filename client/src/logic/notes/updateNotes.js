import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const useUpdateNotes = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
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

  const handleSubmit = async (e,isImageRemoved,isPdfRemoved) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const uploadToCloudinary = async (file, preset) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset);
  
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dsnsi0ioz/upload",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const fileProgress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setProgress(fileProgress);
            },
          }
        );
        return response.data.secure_url;
      };
  
      const convertBlobUrlToFile = async (blobUrl, filename) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
      };
  
      let coverImageUrl = note.coverImageUrl || "";
      let pdfUrl = note.pdfUrl || "";
      if (isImageRemoved && note.coverImageUrl?.startsWith("blob")) {
        const coverImageFile = await convertBlobUrlToFile(note.coverImageUrl, "cover_image.jpg");
        coverImageUrl = await uploadToCloudinary(coverImageFile, "Shree Kalam Academy");
    }

    // Upload new PDF if removed
    if (isPdfRemoved && note.pdfUrl?.startsWith("blob")) {
        const pdfFile = await convertBlobUrlToFile(note.pdfUrl, "note.pdf");
        pdfUrl = await uploadToCloudinary(pdfFile, "Notes_Pdf");
    }
  
      setProgress(100);
  
      const updatedNote = { ...note, coverImageUrl, pdfUrl };
  
      await axios.put(`http://localhost:5000/api/notes/update/${id}`, updatedNote);
  
      alert("Note updated successfully!");
      navigate("/admin/notes/update");
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Failed to update note. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const deleteFile=async(Url)=>{
    try{
      await axios.post("http://localhost:5000/api/files/deleteUrl", {
        url: Url,
        note:note._id
      });

    }
    catch{
        console.log("Error occured during deletion of file")
    }

  }
  return { note, handleChange, handleSubmit, setNote ,deleteFile};
};

export default useUpdateNotes;
