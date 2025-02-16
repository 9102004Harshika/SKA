import React, { useState } from "react";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";
import ImageUploader from "../../ui/imageUploader";
import FileUploader from "../../ui/fileUploader";
import { Button } from "../../ui/button";
import { RadioButton } from "../../ui/radioButton";
import axios from "axios";

const AddNotesPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    classFor: "",
    description: "",
    writtenBy: "",
    visibility: "free",
    coverImageUrl: "",
    pdfUrl: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const visibilityOptions = [
    { value: "paid", text: "Paid" },
    { value: "free", text: "Free" },
  ];

  // Upload File to Cloudinary
  const uploadToCloudinary = async (file, folder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Set Cloudinary preset
    formData.append("folder", folder); // Cloudinary folder

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloudinary_name/upload",
        formData
      );
      return response.data.secure_url; // Get file URL
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageUrl = formData.coverImageUrl;
      let pdfUrl = formData.pdfUrl;

      // Upload Cover Image
      if (coverImage) {
        coverImageUrl = await uploadToCloudinary(coverImage, "notes_covers");
      }

      // Upload PDF
      if (pdfFile) {
        pdfUrl = await uploadToCloudinary(pdfFile, "notes_pdfs");
      }

      // Prepare data
      const payload = {
        ...formData,
        coverImageUrl,
        pdfUrl,
      };

      // Send data to backend
      await axios.post("your_backend_api_url/notes", payload);

      alert("Notes created successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting notes.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-10 font-body">
      <h2 className="mb-10 font-header text-3xl font-semibold text-center">
        Create New Notes
      </h2>
      <div className="space-y-6 mx-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-10">
            <div className="flex-1 flex flex-col justify-between">
              <TextInput
                label="Title of Notes"
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <TextInput
                label="Subject For"
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
              <TextInput
                label="Class For"
                type="number"
                required
                value={formData.classFor}
                onChange={(e) =>
                  setFormData({ ...formData, classFor: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-10 items-center justify-center p-8 border-2 border-primary rounded-md">
              <label htmlFor="imageUpload">Add Cover Image</label>
              <ImageUploader
                label="Upload Image"
                id="imageUpload"
                required
                onChange={(file) => setCoverImage(file)}
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 items-center justify-center p-8 border-2 border-primary rounded-md">
              <label htmlFor="pdfUpload">Add The PDF File</label>
              <FileUploader
                label="Upload PDF"
                id="pdfUpload"
                required
                onChange={(file) => setPdfFile(file)}
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <TextAreaInput
                label="Description"
                name="description"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <TextInput
                label="Written By"
                type="text"
                required
                value={formData.writtenBy}
                onChange={(e) =>
                  setFormData({ ...formData, writtenBy: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex align-center">
            <RadioButton
              name="visibility"
              options={visibilityOptions}
              checked={formData.visibility}
              onChange={(e) =>
                setFormData({ ...formData, visibility: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between mt-6 gap-6">
            <Button
              text="Create Notes"
              size="lg"
              variant="primary"
              type="submit"
              className="w-full"
              disabled={loading}
            />
            <Button
              text="Clear All"
              size="lg"
              variant="accent"
              type="reset"
              className="w-full"
              onClick={() =>
                setFormData({
                  title: "",
                  subject: "",
                  classFor: "",
                  description: "",
                  writtenBy: "",
                  visibility: "free",
                  coverImageUrl: "",
                  pdfUrl: "",
                })
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotesPage;
