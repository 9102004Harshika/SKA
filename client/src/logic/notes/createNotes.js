import axios from "axios";
import { toast } from "../../components/use-toast";

export const handleSubmit = async (
  e,
  formData,
  setFormData,
  setLoading,
  setProgress,
  openModal,
  closeModal,
  resetForm
) => {
  e.preventDefault();
  setLoading(true);
  openModal();

  try {
    // Upload Cover Image
    let coverImageUrl = "";
    if (formData.coverImageUrl) {
      const imageFormData = new FormData();
      imageFormData.append("file", formData.coverImageUrl);
      imageFormData.append("upload_preset", "your_cloudinary_preset");

      const imageRes = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        imageFormData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(progress);
          },
        }
      );
      coverImageUrl = imageRes.data.secure_url;
    }

    // Upload PDF File
    let pdfUrl = "";
    if (formData.pdfUrl) {
      const pdfFormData = new FormData();
      pdfFormData.append("file", formData.pdfUrl);
      pdfFormData.append("upload_preset", "your_cloudinary_preset");

      const pdfRes = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/raw/upload",
        pdfFormData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(progress);
          },
        }
      );
      pdfUrl = pdfRes.data.secure_url;
    }

    // Submit final form data
    const response = await axios.post("/api/notes", {
      title: formData.title,
      subject: formData.subject,
      classFor: formData.classFor,
      board: formData.board,
      description: formData.description,
      writtenBy: formData.writtenBy,
      visibility: formData.visibility,
      coverImageUrl,
      pdfUrl,
    });

    if (response.status === 201) {
      toast({
        title: "Notes Created Successfully",
        // description: `You have successfully created notes for ${updatedFormData.subject}`,
        variant: "success",
      });
      resetForm();
    }
  } catch (error) {
    console.error("Error creating notes:", error);
    toast.error("Failed to create notes. Please try again.");
  } finally {
    setLoading(false);
    closeModal();
  }
};
