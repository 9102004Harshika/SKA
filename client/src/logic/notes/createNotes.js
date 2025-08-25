import { useState } from "react";
import axios from "axios";
import { toast } from "../../components/use-toast";
const CLOUDINARY_URL=process.env.CLOUDINARY_URL;
const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/";

const useAddNotes = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

const handleSubmit = async (
  e,
  formData,
  setFormData,
  openModal,
  closeModal,
  resetForm,
  setUploadType
) => {
  e.preventDefault();
  setLoading(true);
  openModal();
  setProgress(0);
  try {
    const uploadToCloudinary = async (file, preset) => {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", preset);

      const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dsnsi0ioz/upload",
        form,
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

    let coverImageUrl = "";
    let pdfUrl = "";

    if (formData.coverImageUrl instanceof File) {
      setUploadType(
        formData.coverImageUrl.type.replace("$", "").split("/")[0].trim()
      );
      coverImageUrl = await uploadToCloudinary(
        formData.coverImageUrl,
        "Kalp Academy"
      );
    }

    if (formData.pdfUrl instanceof File) {
      setUploadType(
        formData.pdfUrl.type.replace("$", "").split("/")[0].trim()
      );
      pdfUrl = await uploadToCloudinary(
        formData.pdfUrl,
        "Notes_Pdf"
      );
    }

    setProgress(100);

    const updatedFormData = {
      ...formData,
      coverImageUrl,
      pdfUrl,
    };

    console.log("Data sent to backend:", updatedFormData);
     
    await axios.post(
        `${API_URL}api/notes/add`,
      updatedFormData
    );

    toast({
      title: "Notes Created Successfully",
      description: `You have successfully created notes for ${updatedFormData.subject}`,
      variant: "success",
    });

    resetForm();
    closeModal();
  } catch (error) {
    console.error("Error creating notes:", error);
    toast({
      title: "Failed to create notes",
      description: "Please try again.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

  return { handleSubmit, loading, progress };
};

export default useAddNotes;
