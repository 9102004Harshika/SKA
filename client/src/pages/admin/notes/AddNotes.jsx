import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../../ui/imageUploader";
import FileUploader from "../../../ui/fileUploader";
import Select from "../../../ui/select";
import { toast } from "../../../components/use-toast";
import {
  FaArrowLeft,
  FaTimes,
  FaBookOpen,
  FaGraduationCap,
  FaChevronDown,
  FaImage,
  FaFilePdf,
  FaUserEdit,
} from "react-icons/fa";
import axios from "axios";

// UI Components
import TextInput from "../../../ui/textInput";
import TextAreaInput from "../../../ui/textarea";
import { Button } from "../../../ui/button";
import Modal from "../../../components/Modal";

// API Configuration
const API_URL = process.env.REACT_APP_API_BASE_URL;

// Configurations
const {
  boards,
  getClassOptions,
  getSubjects,
  streams,
} = require("../../../config");
const AddNotes = () => {
  const navigate = useNavigate();
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadType, setUploadType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (type) => {
    setUploadType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUploadType("");
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

  const resetForm = () => {
    setFormData({
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
    setError("");
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "image" && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return;
    }

    if (type === "pdf" && file.type !== "application/pdf") {
      setError("Please upload a valid PDF file");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [type === "image" ? "coverImageUrl" : "pdfUrl"]: file,
    }));
    openModal(type);
  };

  return (
    <div className="mx-10 font-body">
      <h2 className="mb-10 font-header text-3xl font-semibold md:tracking-wide text-center">
        Create New Notes
      </h2>
      <div className="space-y-6 mx-10">
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              formData,
              setFormData,
              openModal,
              closeModal,
              resetForm,
              setUploadType
            )
          }
          className="flex flex-col gap-6"
        >
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
              <TextAreaInput
                label="Description"
                name="description"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Access Type <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="h-4 w-4 text-primary focus:ring-primary"
                      name="visibility"
                      value="free"
                      checked={formData.visibility === "free"}
                      onChange={(e) =>
                        setFormData({ ...formData, visibility: e.target.value })
                      }
                    />
                    <span className="ml-2 text-gray-700">Free</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="h-4 w-4 text-primary focus:ring-primary"
                      name="visibility"
                      value="paid"
                      checked={formData.visibility === "paid"}
                      onChange={(e) =>
                        setFormData({ ...formData, visibility: e.target.value })
                      }
                    />
                    <span className="ml-2 text-gray-700">Paid</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 items-center justify-center p-8 border-[1px] border-primary rounded-md">
              <label htmlFor="imageUpload">Add Cover Image</label>
              <ImageUploader
                label="Upload Image"
                id="imageUpload"
                required
                onChange={(file) =>
                  setFormData({ ...formData, coverImageUrl: file })
                }
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 items-center justify-center p-8 border-[1px] border-primary rounded-md">
              <label htmlFor="pdfUpload">Add The PDF File</label>
              <FileUploader
                label="Upload PDF"
                id="pdfUpload"
                required
                onChange={(file) => setFormData({ ...formData, pdfUrl: file })}
              />
            </div>

            <div className="flex-1 flex flex-col justify-between space-y-6">
              <Select
                menuTitle="Board"
                submenuItems={boards}
                onSelect={(selectedBoard) => {
                  setFormData({
                    ...formData,
                    board: selectedBoard,
                    classFor: "",
                  });
                }}
              />
              <Select
                menuTitle="Class"
                submenuItems={getClassOptions(formData.board)}
                onSelect={(selectedClass) => {
                  setFormData({
                    ...formData,
                    classFor: selectedClass,
                    stream: undefined,
                    subject: "",
                  });
                }}
                disabled={!formData.board}
              />
              {!(
                parseInt(formData.classFor) > 0 &&
                parseInt(formData.classFor) <= 10
              ) && (
                <Select
                  menuTitle="Stream"
                  submenuItems={streams}
                  onSelect={(selectedStream) => {
                    setFormData({
                      ...formData,
                      stream: selectedStream || undefined,
                      subject: "",
                    });
                  }}
                  disabled={!formData.board}
                />
              )}
              <Select
                menuTitle="Subject"
                submenuItems={getSubjects(formData.classFor, formData.stream)}
                onSelect={(selectedSubject) => {
                  setFormData({ ...formData, subject: selectedSubject });
                }}
                disabled={
                  !formData.classFor ||
                  (formData.classFor > 10 && !formData.stream)
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

          <div className="flex justify-between mt-1 gap-6">
            <Button
              text="Create Notes"
              size="lg"
              variant="primary"
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            />
            <Button
              text="Clear All"
              size="lg"
              variant="accent"
              type="reset"
              className="w-full"
              onClick={() => resetForm()}
            />
          </div>
        </form>
      </div>
      <Modal isOpen={isModalOpen} progress={progress}>
        <h2 className="text-lg text-primary font-semibold">
          {uploadType === "Compress" ? (
            "Please wait, Pdf is being compressed..."
          ) : (
            <>
              Please wait,
              {uploadType === "image" ? " Cover Image " : " Notes PDF "} is
              uploading...
            </>
          )}
        </h2>
      </Modal>
    </div>
  );
};

export default AddNotes;
