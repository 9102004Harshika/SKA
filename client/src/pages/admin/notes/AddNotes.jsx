
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../../ui/imageUploader";
import FileUploader from "../../../ui/fileUploader";
import Select from "../../../ui/select";
import { toast } from "../../../components/use-toast";
import axios from "axios";
import { FaTimes ,FaSchool,FaBookOpen,FaClock,FaUpload,FaInfoCircle} from "react-icons/fa";
import TextInput from "../../../ui/textInput";
import TextAreaInput from "../../../ui/textarea";
import { Button } from "../../../ui/button";
import Modal from "../../../components/Modal";

// Configurations
const {
  boards,
  getClassOptions,
  getSubjects,
  streams,
} = require("../../../config");

const API_URL = process.env.REACT_APP_API_BASE_URL;

const AddNotes = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1); // 1 = Notes Details, 2 = Upload Files
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadType, setUploadType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    classFor: "",
    board: "",
    description: "",
    writtenBy: "",
    visibility: "free",
    coverImageUrl: "",
    pdfUrl: "",
    stream: "",
  });

  const openModal = (type) => {
    setUploadType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUploadType("");
  };

  const validateTab1 = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.board ||
      !formData.classFor ||
      !formData.subject ||
      !formData.writtenBy
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields before proceeding.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    openModal("submit");

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });

      const response = await axios.post(
        `${API_URL}api/notes/add`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(localStorage.getItem("token") && {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }),
          },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progress);
          },
        }
      );

      if (response.data?.success) {
        toast({
          title: "Success",
          description: "Notes have been created successfully.",
          variant: "success",
        });
        navigate("/admin/notes");
      } else {
        throw new Error(response.data?.message || "Failed to create notes");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create notes. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide font-header text-gray-900">
            Create New Notes
          </h1>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r">
            <div className="flex items-center">
              <FaTimes className="w-5 h-5 mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
           <nav className="flex -mb-px">
  <button
    onClick={() => setActiveTab(1)}
    className={`py-4 px-6 font-bold text-sm border-b-2 ${
      activeTab === 1
        ? "border-secondary text-secondary"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    Notes Details
  </button>
  
  <button
    onClick={() => {
      if (validateTab1()) setActiveTab(2);
    }}
    className={`py-4 px-6 font-bold text-sm border-b-2 ${
      activeTab === 2
        ? "border-secondary text-secondary"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    Upload Files
  </button>
</nav>

          </div>

          <form onSubmit={handleSubmit} className="p-8">
  {activeTab === 1 && (
    <div className="space-y-8">
  {/* First row: Basic Info + Notes Settings */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Basic Information */}
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
      <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
        <FaBookOpen className="w-5 h-5 mr-2 text-secondary" /> Basic Information
      </h3>
      <TextInput
        label="Notes Title *"
        required
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <TextAreaInput
        label="Description *"
        required
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
    </div>

    {/* Notes Settings */}
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
      <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
        <FaClock className="w-5 h-5 mr-2 text-secondary" /> Notes Settings
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="free"
                checked={formData.visibility === "free"}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
              /> Free
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="paid"
                checked={formData.visibility === "paid"}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
              /> Paid
            </label>
          </div>
        </div>
        <TextInput
          label="Written By *"
          required
          value={formData.writtenBy}
          onChange={(e) => setFormData({ ...formData, writtenBy: e.target.value })}
        />
      </div>
    </div>
  </div>

  {/* Second row: Academic Information full width */}
  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
      <FaSchool className="w-5 h-5 mr-2 text-secondary" /> Academic Information
    </h3>
   
   <div className="mb-5">
     <Select
        menuTitle="Board *"
        submenuItems={boards}
        onSelect={(board) => setFormData({ ...formData, board, classFor: "" })}
        
      />
   </div>
     <div className="mb-5">
       <Select
        menuTitle="Class *"
        submenuItems={getClassOptions(formData.board)}
        onSelect={(cls) => setFormData({ ...formData, classFor: cls, stream: undefined, subject: "" })}
        disabled={!formData.board}
      />
     </div>
     <div className="mb-5">
       {formData.classFor > 10 && (
        <Select
          menuTitle="Stream *"
          submenuItems={streams}
          onSelect={(stream) => setFormData({ ...formData, stream, subject: "" })}
        />
      )}
     </div>
      <Select
        menuTitle="Subject *"
        submenuItems={getSubjects(formData.classFor, formData.stream)}
        onSelect={(subject) => setFormData({ ...formData, subject })}
        disabled={!formData.classFor || (formData.classFor > 10 && !formData.stream)}
      />
  
  </div>

  {/* Footer Buttons */}
  <div className="flex justify-between pt-4 border-t border-gray-200">
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
    >
      Cancel
    </button>
    <button
      type="button"
      onClick={() => { if (validateTab1()) setActiveTab(2); }}
      className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
    >
      Next: Upload Files
    </button>
  </div>
</div>

  )}

  {activeTab === 2 && (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
            <FaUpload className="w-5 h-5 mr-2 text-secondary" /> Upload Cover Image
          </h3>
          <div className="flex justify-center mb-10 mt-10">

            <ImageUploader  label="Upload File" required onChange={(file) => setFormData({ ...formData, coverImageUrl: file })} />
            
          </div>
          <p className="text-xs text-center">*select a file or drag and drop to add file</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
            <FaUpload className="w-5 h-5 mr-2 text-secondary" /> Upload Pdf
          </h3>
         <div className="flex justify-center mb-10 mt-10">
<FileUploader label="Upload File" required onChange={(file) => setFormData({ ...formData, pdfUrl: file })} />
          </div>
           <p className="text-xs text-center">*select a file or drag and drop to add file</p>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button type="button" onClick={() => setActiveTab(1)} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors">
          Back
        </button>
        <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-70 disabled:cursor-not-allowed transition-colors">
          {isSubmitting ? "Creating Notes..." : "Create Notes"}
        </button>
      </div>
    </div>
  )}
</form>
   
        </div>
      </div>
     
    </div>
  );
};

export default AddNotes;

// <h2 className="mb-10 font-header text-3xl font-semibold md:tracking-wide text-center">
//   Create New Notes
// </h2>
