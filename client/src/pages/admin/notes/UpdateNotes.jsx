

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../../ui/imageUploader";
import FileUploader from "../../../ui/fileUploader";
import Select from "../../../ui/select";
import TextInput from "../../../ui/textInput";
import TextAreaInput from "../../../ui/textarea";
import Modal from "../../../components/Modal";
import { toast } from "../../../components/use-toast";
import { FaFilePdf } from "react-icons/fa";
import {
  FaTimes,
  FaSchool,
  FaBookOpen,
  FaClock,
  FaUpload,
} from "react-icons/fa";
import useUpdateNotes from "../../../logic/notes/updateNotes";

const {
  boards,
  getClassOptions,
  getSubjects,
  streams,
} = require("../../../config");

const UpdateNotes = () => {
  const navigate = useNavigate();
  const {
    note,
    setNote,
    handleChange,
    handleSubmit,
    isSubmitting,
    progress,
    error,
    modalType,
    closeModal,
  } = useUpdateNotes();

  const [activeTab, setActiveTab] = useState(1);
 const [existingImage, setExistingImage] = useState("");
const [existingPdf, setExistingPdf] = useState("");

useEffect(() => {
  if (note.coverImageUrl) {
    setExistingImage(note.coverImageUrl);
  }
}, [note.coverImageUrl]);
useEffect(() => {
  if (note.pdfUrl) {
    setExistingPdf(note.pdfUrl);
  }
}, [note.pdfUrl]);


console.log(existingImage)
  const validateTab1 = () => {
    if (
      !note.title ||
      !note.description ||
      !note.board ||
      !note.classFor ||
      !note.subject ||
      !note.writtenBy
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

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide font-header text-gray-900">
            Update Notes
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Basic Info */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
                      <FaBookOpen className="w-5 h-5 mr-2 text-secondary" /> Basic Information
                    </h3>
                    <TextInput
                      label="Notes Title *"
                      required
                      name="title"
                      value={note.title}
                      onChange={handleChange}
                    />
                    <TextAreaInput
                      label="Description *"
                      required
                      name="description"
                      value={note.description}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Settings */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
                      <FaClock className="w-5 h-5 mr-2 text-secondary" /> Notes Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Visibility
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              value="free"
                              checked={note.visibility === "free"}
                              onChange={(e) =>
                                setNote({ ...note, visibility: e.target.value })
                              }
                            />
                            Free
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              value="paid"
                              checked={note.visibility === "paid"}
                              onChange={(e) =>
                                setNote({ ...note, visibility: e.target.value })
                              }
                            />
                            Paid
                          </label>
                        </div>
                      </div>
                      <TextInput
                        label="Written By *"
                        required
                        name="writtenBy"
                        value={note.writtenBy}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Info */}
               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
  <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
    <FaSchool className="w-5 h-5 mr-2 text-secondary" /> Academic Information
  </h3>

  {/* Board */}
  <div className="mb-5">
    <Select
      menuTitle="Board *"
      submenuItems={boards}
      value={note.board} // prefilled board
      onSelect={(board) => setNote({ ...note, board, classFor: "" })}
    />
  </div>

  {/* Class */}
  <div className="mb-5">
    <Select
      menuTitle="Class *"
      submenuItems={getClassOptions(note.board)}
      value={note.classFor} // prefilled class
      onSelect={(cls) =>
        setNote({
          ...note,
          classFor: cls,
          stream: undefined,
          subject: "",
        })
      }
      disabled={!note.board}
    />
  </div>

  {/* Stream */}
  <div className="mb-5">
    {note.classFor > 10 && (
      <Select
        menuTitle="Stream *"
        submenuItems={streams}
        value={note.stream} // prefilled stream if applicable
        onSelect={(stream) => setNote({ ...note, stream, subject: "" })}
      />
    )}
  </div>

  {/* Subject */}
  <Select
    menuTitle="Subject *"
    submenuItems={getSubjects(note.classFor, note.stream)}
    value={note.subject} // prefilled subject
    onSelect={(subject) => setNote({ ...note, subject })}
    disabled={!note.classFor || (note.classFor > 10 && !note.stream)}
  />
</div>


                {/* Nav Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateTab1()) setActiveTab(2);
                    }}
                    className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90"
                  >
                    Next: Upload Files
                  </button>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
{/* Cover Image */}
<div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
  <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
    <FaUpload className="w-5 h-5 mr-2 text-secondary" /> Upload Cover Image
  </h3>

  {typeof note.coverImageUrl === "string" && note.coverImageUrl ? (
    // Show only existing image from DB
    <div className="flex flex-col items-center rounded">
      <img
        src={note.coverImageUrl}
        alt="Current cover"
        className="w-20 h-20 object-cover rounded"
      />
      <p className="mt-2 text-sm truncate w-40">
        {note.coverImageUrl.split("/").pop()}
      </p>
      <button
        type="button"
        onClick={() => {
          setNote((prev) => ({ ...prev, coverImageUrl: null }));
        }}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  ) : (
    // Show uploader if no DB image exists
    <div className="my-10">
      <div className="flex justify-center">
        <ImageUploader
          label="Upload File"
          required={!note.coverImageUrl}
          onChange={(file) =>
            setNote((prev) => ({ ...prev, coverImageUrl: file }))
          }
        />
      </div>
      <p className="text-xs text-center mt-3">
        *select a file or drag and drop to add file
      </p>
    </div>
  )}
</div>



{/* PDF Upload */}
<div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
  <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
    <FaUpload className="w-5 h-5 mr-2 text-secondary" /> Upload PDF
  </h3>

  {typeof note.pdfUrl === "string" && note.pdfUrl ? (
    // Show only existing PDF from DB until deleted
    <div className="flex flex-col items-center rounded">
      <FaFilePdf className="w-20 h-20 text-secondary" />
      <p className="mt-2 text-sm truncate w-40">
        {note.pdfUrl.split("/").pop()}
      </p>
      <button
        type="button"
        onClick={() => {
          setNote(prev => ({ ...prev, pdfUrl: null })); // null = ready to pick new file
        }}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  ) : (
     <div className="my-10">
      <div className="flex justify-center">
      <FileUploader
        label="Upload File"
        required={!note.pdfUrl}
        onChange={(file) => setNote(prev => ({ ...prev, pdfUrl: file }))}
      />
    </div>
  <p className="text-xs text-center mt-3">
    *select a file or drag and drop to add file
  </p>
    </div>
  )}

 
</div>


                </div>

                {/* Nav Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveTab(1)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-70"
                  >
                    {isSubmitting ? "Updating Notes..." : "Update Notes"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal isOpen={!!modalType} closeModal={closeModal}>
        <p className="text-lg font-medium mb-2">Uploading...</p>
        <div className="w-full bg-gray-200 h-4 rounded">
          <div
            className="h-4 bg-green-500 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm">{progress}% completed</p>
      </Modal>
    </div>
  );
};

export default UpdateNotes;
