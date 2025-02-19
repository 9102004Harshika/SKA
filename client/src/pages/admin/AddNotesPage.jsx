import React, { useState } from "react";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";
import ImageUploader from "../../ui/imageUploader";
import FileUploader from "../../ui/fileUploader";
import { Button } from "../../ui/button";
import { RadioButton } from "../../ui/radioButton";
import axios from "axios";
import { toast } from "../../components/use-toast";
import Modal from '../../components/Modal'
const AddNotesPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    classFor: "",
    board:"",
    description: "",
    writtenBy: "",
    visibility: "free",
    coverImageUrl: "",
    pdfUrl: "",

  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const[progress,setProgress]=useState()
  const visibilityOptions = [
    { value: "paid", text: "Paid" },
    { value: "free", text: "Free" },
  ];
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   openModal()
  //   setProgress(0)
  //   try {
  //     // Function to upload file to Cloudinary with dynamic preset based on file type
  //     const uploadToCloudinary = async (file, preset) => {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       formData.append("upload_preset", preset);
      
  //       try {
  //         const response = await axios.post(
  //           "https://api.cloudinary.com/v1_1/dsnsi0ioz/upload",
  //           formData,
  //           {
  //             onUploadProgress: (progressEvent) => {
  //               const fileProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
  //               setProgress(fileProgress);
  //             },
  //           }
  //         );
      
  //         return response.data.secure_url; // Return uploaded file URL
  //       } catch (error) {
  //         console.error("Error uploading file:", error);
  //         throw error;
  //       }
  //     };
      
  //     // Convert Blob URL to File before uploading
  //     const convertBlobUrlToFile = async (blobUrl, filename) => {
  //       const response = await fetch(blobUrl);
  //       const blob = await response.blob();
  //       const file = new File([blob], filename, { type: blob.type });
  //       return file;
  //     };
  
  //     // Function to determine which preset to use
  //     const getUploadPreset = (fileType) => {
  //       // Different presets for image and PDF
  //       if (fileType.startsWith("image/")) {
  //         return "Shree Kalam Academy"; // Image preset (you can configure this in Cloudinary)
  //       } else if (fileType === "application/pdf") {
  //         return "Notes_Pdf"; // PDF preset (you can configure this in Cloudinary)
  //       }
  //       return "default"; // Default preset if no match
  //     };
  
  //     // Upload cover image if available
  //     const coverImageUrl = formData.coverImageUrl
  //       ? await convertBlobUrlToFile(formData.coverImageUrl, "cover_image.jpg").then((file) =>
  //           uploadToCloudinary(file, getUploadPreset(file.type)) // Use preset based on file type
  //         )
  //       : null;
  
  //     // Upload PDF if available
  //     const pdfUrl = formData.pdfUrl
  //       ? await convertBlobUrlToFile(formData.pdfUrl, "note.pdf").then((file) =>
  //           uploadToCloudinary(file, getUploadPreset(file.type)) // Use preset based on file type
  //         )
  //       : null;
  
  //     // Update form data with uploaded URLs
  //     const updatedFormData = {
  //       ...formData,
  //       coverImageUrl,
  //       pdfUrl,
  //     };
  //     const response1 = await axios.post(
  //       "http://localhost:5000/api/notes/add",
  //       updatedFormData
  //     );
  //     toast({
  //       title: "Notes Created Successfully",
  //       description: `You have successfully created notes for the subject ${updatedFormData.subject}`,
  //       variant: "success",
  //     })
   
  //   } catch (error) {
  //     console.error("Error uploading files:", error);
  //   } finally {
  //     setLoading(false);
  //     closeModal()
      
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    openModal();
    setProgress(0);
  
    try {
      const uploadToCloudinary = async (file, preset, setFileProgress) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset);
  
        return axios.post("https://api.cloudinary.com/v1_1/dsnsi0ioz/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const fileProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setFileProgress(fileProgress);
          },
        }).then((response) => response.data.secure_url);
      };
  
      const convertBlobUrlToFile = async (blobUrl, filename) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
      };
  
      const getUploadPreset = (fileType) => {
        if (fileType.startsWith("image/")) return "Shree Kalam Academy";
        if (fileType === "application/pdf") return "Notes_Pdf";
        return "default";
      };
  
      let coverProgress = 0;
      let pdfProgress = 0;
  
      const setCoverProgress = (value) => {
        coverProgress = value;
        setProgress(Math.round((coverProgress + pdfProgress) / 2)); // Keep progress within 0-100
      };
  
      const setPdfProgress = (value) => {
        pdfProgress = value;
        setProgress(Math.round((coverProgress + pdfProgress) / 2)); // Keep progress within 0-100
      };
  
      // Convert & Upload Both Files in Parallel
      const coverImageFile = formData.coverImageUrl
        ? await convertBlobUrlToFile(formData.coverImageUrl, "cover_image.jpg")
        : null;
      const pdfFile = formData.pdfUrl
        ? await convertBlobUrlToFile(formData.pdfUrl, "note.pdf")
        : null;
  
      const [coverImageUrl, pdfUrl] = await Promise.all([
        coverImageFile ? uploadToCloudinary(coverImageFile, getUploadPreset(coverImageFile.type), setCoverProgress) : null,
        pdfFile ? uploadToCloudinary(pdfFile, getUploadPreset(pdfFile.type), setPdfProgress) : null,
      ]);
  
      // Ensure progress reaches 100% only when everything is done
      setProgress(100);
  
      // Send form data to backend
      const updatedFormData = { ...formData, coverImageUrl, pdfUrl };
      await axios.post("http://localhost:5000/api/notes/add", updatedFormData);
  
      // Close modal & Show success toast
      closeModal();
      toast({
        title: "Notes Created Successfully",
        description: `You have successfully created notes for ${updatedFormData.subject}`,
        variant: "success",
      });
  
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
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
                onChange={(file)=> setFormData({ ...formData, coverImageUrl: file})}
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
                onChange={(file)=> setFormData({ ...formData, pdfUrl: file})}
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
            <TextInput
                label="Board"
                type="number"
                required
                value={formData.board}
                onChange={(e) =>
                  setFormData({ ...formData, board: e.target.value })
                }
              />
            
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
          
          
          <label className="block text-lg  font-bold ">Access Type</label>
           <RadioButton 
           name="visibility"
           options={visibilityOptions}
           checked={formData.visibility}
           onChange={(e) =>
            setFormData({ ...formData, visibility: e.target.value })}
           />
         
              
                  
          <div className="flex justify-between mt-1 gap-6">
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
      <Modal isOpen={isModalOpen} onClose={closeModal} progress={progress} >
        <h2 className="text-lg text-primary font-semibold">Please Wait , Content is uploading...</h2>
      </Modal>
    </div>
  );
};

export default AddNotesPage;
