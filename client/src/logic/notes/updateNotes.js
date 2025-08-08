// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const useUpdateNotes = () => {
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [note, setNote] = useState({
//     title: "",
//     description: "",
//     writtenBy: "",
//     subject: "",
//     classFor: "",
//     board: "",
//     coverImageUrl: "",
//     pdfUrl: "",
//     visibility: "free",
//   });

//   useEffect(() => {
//     const fetchNoteDetails = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}api/notes/${id}`
//         );
//         setNote(response.data);
//       } catch (error) {
//         console.error("Error fetching note details:", error);
//       }
//     };

//     fetchNoteDetails();
//   }, [id]);

//   const handleChange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e,isImageRemoved,isPdfRemoved) => {
//     e.preventDefault();
//     setLoading(true);
  
//     try {
//       const uploadToCloudinary = async (file, preset) => {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", preset);
  
//         const response = await axios.post(
//           "https://api.cloudinary.com/v1_1/dsnsi0ioz/upload",
//           formData,
//           {
//             onUploadProgress: (progressEvent) => {
//               const fileProgress = Math.round(
//                 (progressEvent.loaded / progressEvent.total) * 100
//               );
//               setProgress(fileProgress);
//             },
//           }
//         );
//         return response.data.secure_url;
//       };
  
//       const convertBlobUrlToFile = async (blobUrl, filename) => {
//         const response = await fetch(blobUrl);
//         const blob = await response.blob();
//         return new File([blob], filename, { type: blob.type });
//       };
  
//       let coverImageUrl = note.coverImageUrl || "";
//       let pdfUrl = note.pdfUrl || "";
//       if (isImageRemoved && note.coverImageUrl?.startsWith("blob")) {
//         const coverImageFile = await convertBlobUrlToFile(note.coverImageUrl, "cover_image.jpg");
//         coverImageUrl = await uploadToCloudinary(coverImageFile, "Kalp Academy");
//     }

//     // Upload new PDF if removed
//     if (isPdfRemoved && note.pdfUrl?.startsWith("blob")) {
//         const pdfFile = await convertBlobUrlToFile(note.pdfUrl, "note.pdf");
//         pdfUrl = await uploadToCloudinary(pdfFile, "Notes_Pdf");
//     }
  
//       setProgress(100);
  
//       const updatedNote = { ...note, coverImageUrl, pdfUrl };
  
//       await axios.put(`${process.env.REACT_APP_API_BASE_URL}api/notes/update/${id}`, updatedNote);
  
//       alert("Note updated successfully!");
//       navigate("/admin/notes/update");
//     } catch (error) {
//       console.error("Error updating note:", error);
//       alert("Failed to update note. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const deleteFile=async(Url)=>{
//     try{
//       await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/files/deleteUrl`, {
//         url: Url,
//         note:note._id
//       });

//     }
//     catch{
//         console.log("Error occured during deletion of file")
//     }

//   }
//   return { note, handleChange, handleSubmit, setNote ,deleteFile};
// };

// export default useUpdateNotes;



// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const useUpdateNotes = () => {
//   const [note, setNote] = useState({
//     title: "",
//     description: "",
//     writtenBy: "",
//     subject: "",
//     classFor: "",
//     board: "",
//     coverImageUrl: null,
//     pdfUrl: null,
//     visibility: "free",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState("");
//   const [modalType, setModalType] = useState(null);

//   const navigate = useNavigate();
//   const { id } = useParams();

//   // Modal control
//   const openModal = (type) => setModalType(type);
//   const closeModal = () => setModalType(null);

//   useEffect(() => {
//     const fetchNoteDetails = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}api/notes/${id}`);
//         setNote(res.data);
//       } catch (err) {
//         console.error("Error fetching note details:", err);
//         setError("Failed to load note details.");
//       }
//     };

//     fetchNoteDetails();
//   }, [id]);

//   const handleChange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsSubmitting(true);
//     openModal("submit");

//     try {
//       const uploadToCloudinary = async (file, preset) => {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", preset);

//         const res = await axios.post("https://api.cloudinary.com/v1_1/dsnsi0ioz/upload", formData, {
//           onUploadProgress: (progressEvent) => {
//             const prog = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setProgress(prog);
//           },
//         });

//         return res.data.secure_url;
//       };

//       const updatedNote = { ...note };

//       if (note.coverImageUrl instanceof File) {
//         updatedNote.coverImageUrl = await uploadToCloudinary(note.coverImageUrl, "Kalp Academy");
//       }

//       if (note.pdfUrl instanceof File) {
//         updatedNote.pdfUrl = await uploadToCloudinary(note.pdfUrl, "Notes_Pdf");
//       }

//       setProgress(100);

//       const res = await axios.put(
//         `${process.env.REACT_APP_API_BASE_URL}api/notes/update/${id}`,
//         updatedNote,
//         {
//           headers: {
//             ...(localStorage.getItem("token") && {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             }),
//           },
//           withCredentials: true,
//         }
//       );

//       if (res.data?.success) {
//         navigate("/admin/notes");
//       } else {
//         throw new Error(res.data?.message || "Failed to update note.");
//       }
//     } catch (err) {
//       const msg =
//         err.response?.data?.message || err.message || "Failed to update note. Please try again.";
//       setError(msg);
//     } finally {
//       setIsSubmitting(false);
//       closeModal();
//     }
//   };

//   const deleteFile = async (url) => {
//     try {
//       await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/files/deleteUrl`, {
//         url,
//         note: note._id,
//       });
//     } catch (err) {
//       console.error("Error deleting file:", err);
//     }
//   };

//   return {
//     note,
//     handleChange,
//     setNote,
//     handleSubmit,
//     deleteFile,
//     isSubmitting,
//     progress,
//     error,
//     modalType,
//     openModal,
//     closeModal,
//     setProgress,
//   };
// };

// export default useUpdateNotes;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

  // These are purely for prefilled uploader previews
  const [initialCoverImage, setInitialCoverImage] = useState(null);
  const [initialPdfFile, setInitialPdfFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
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

        // Set prefilled file preview data
        if (res.data.coverImageUrl) {
          setInitialCoverImage({
            url: res.data.coverImageUrl,
            name: "Existing Cover Image",
          });
        }
        if (res.data.pdfUrl) {
          setInitialPdfFile({
            url: res.data.pdfUrl,
            name: "Existing PDF File",
          });
        }
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
    setIsSubmitting(true);
    openModal("submit");

    try {
      const uploadToCloudinary = async (file, preset) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset);

        const res = await axios.post("https://api.cloudinary.com/v1_1/dsnsi0ioz/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const prog = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(prog);
          },
        });

        return res.data.secure_url;
      };

      const updatedNote = { ...note };

      // Upload only if a new file (File instance) is selected
      if (note.coverImageUrl instanceof File) {
        updatedNote.coverImageUrl = await uploadToCloudinary(note.coverImageUrl, "Kalp Academy");
      }

      if (note.pdfUrl instanceof File) {
        updatedNote.pdfUrl = await uploadToCloudinary(note.pdfUrl, "Notes_Pdf");
      }

      setProgress(100);

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

      if (res.data?.success) {
        navigate("/admin/notes");
      } else {
        throw new Error(res.data?.message || "Failed to update note.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Failed to update note. Please try again.";
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

    // For prefilled uploaders
    initialCoverImage,
    initialPdfFile,
  };
};

export default useUpdateNotes;
