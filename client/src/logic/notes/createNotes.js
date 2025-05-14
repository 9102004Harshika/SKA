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

      const compressPdf = async (pdfFile) => {
  setUploadType("Compress");
  console.log("Original PDF size:", (pdfFile.size / 1024).toFixed(2), "KB");

  const formData = new FormData();
  formData.append("pdf", pdfFile);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/api/files/compressPdf");
    xhr.responseType = "blob";

    let downloadProgressAvailable = false;

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const uploadPercent = Math.round((event.loaded / event.total) * 50);
        console.log(`Upload Progress: ${uploadPercent}%`);
        setProgress(uploadPercent);
      }
    };

    // Track download progress
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        downloadProgressAvailable = true;
        const downloadPercent = Math.round((event.loaded / event.total) * 50);
        console.log(`Download Progress: ${downloadPercent}%`);
        setProgress(50 + downloadPercent);
      }
    };

    // Fallback for when download progress is not available
    xhr.onloadstart = () => {
      if (!downloadProgressAvailable) {
        let simulatedProgress = 50;
        const interval = setInterval(() => {
          simulatedProgress += 5;
          if (simulatedProgress >= 99) {
            clearInterval(interval);
          } else {
            setProgress(simulatedProgress);
          }
        }, 500);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const compressedFile = new File([blob], "compressed.pdf", {
          type: "application/pdf",
        });
        console.log("Compressed PDF size:", (compressedFile.size / 1024).toFixed(2), "KB");
        setProgress(100); // Ensure progress is set to 100% upon completion
        resolve(compressedFile);
      } else {
        reject(new Error(`PDF compression failed. Status: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error during PDF compression"));
    };

    xhr.send(formData);
  });
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
        const compressedPdf=await compressPdf(pdfFile)
        setUploadType(compressedPdf.type.replace("$", "").split("/")[0].trim());
        pdfUrl = await uploadToCloudinary(compressedPdf, "Notes_Pdf");
      }

      setProgress(100);
      const updatedFormData = { ...formData, coverImageUrl, pdfUrl };
      console.log(updatedFormData)
      console.log("Data sent to backend:", updatedFormData);
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
      console.error("Failed to create notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, progress };
};

export default useAddNotes;
