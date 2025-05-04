import { useState } from "react";
import axios from "axios";
import { toast } from "../../components/use-toast";

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

      let coverImageUrl = "";
      let pdfUrl = "";

      if (formData.coverImageUrl) {
        const coverImageFile = await convertBlobUrlToFile(
          formData.coverImageUrl,
          "cover_image.jpg"
        );
        setUploadType(
          coverImageFile.type.replace("$", "").split("/")[0].trim()
        );
        coverImageUrl = await uploadToCloudinary(
          coverImageFile,
          "Shree Kalam Academy"
        );
      }

      if (formData.pdfUrl) {
        const pdfFile = await convertBlobUrlToFile(formData.pdfUrl, "note.pdf");
        setUploadType(pdfFile.type.replace("$", "").split("/")[0].trim());
        pdfUrl = await uploadToCloudinary(pdfFile, "Notes_Pdf");
      }

      setProgress(100);

      const updatedFormData = { ...formData, coverImageUrl, pdfUrl };
      await axios.post("http://localhost:5000/api/notes/add", updatedFormData);

      toast({
        title: "Notes Created Successfully",
        description: `You have successfully created notes for ${updatedFormData.subject}`,
        variant: "success",
      });

      resetForm();
      closeModal();
    } catch (error) {
      console.error("Error creating notes:", error);
      toast.error("Failed to create notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, progress };
};

export default useAddNotes;
