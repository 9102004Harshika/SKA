import React, { useState } from "react";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";
import ImageUploader from "../../ui/imageUploader";
import FileUploader from "../../ui/fileUploader";
import { Button } from "../../ui/button";
import { RadioButton } from "../../ui/radioButton";
import Modal from "../../components/Modal";
import useAddNotes from "../../logic/notes/createNotes";
const AddNotesPage = () => {
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
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit, loading, progress } = useAddNotes();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const visibilityOptions = [
    { value: "paid", text: "Paid" },
    { value: "free", text: "Free" },
  ];

 
  const resetForm = () => {
    setFormData({
      title: "",
      subject: "",
      classFor: "",
      description: "",
      writtenBy: "",
      board: "",
      visibility: "free",
      coverImageUrl: "",
      pdfUrl: "",
    });
    setCoverImage(null);
    setPdfFile(null);
  };

  return (
    <div className="mx-10 font-body">
      <h2 className="mb-10 font-header text-3xl font-semibold md:tracking-wide text-center">
        Create New Notes
      </h2>
      <div className="space-y-6 mx-10">
        <form  onSubmit={(e) =>
            handleSubmit(e, formData, setFormData, openModal, closeModal, resetForm)
          } className="flex flex-col gap-6">
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
              <div className="flex gap-6">
                <label className="block text-lg  font-bold ">
                  Access Type:
                </label>
                <RadioButton
                  name="visibility"
                  options={visibilityOptions}
                  checked={formData.visibility}
                  onChange={(e) =>
                    setFormData({ ...formData, visibility: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-10 items-center justify-center p-8 border-2 border-primary rounded-md">
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
            <div className="flex flex-col gap-10 items-center justify-center p-8 border-2 border-primary rounded-md">
              <label htmlFor="pdfUpload">Add The PDF File</label>
              <FileUploader
                label="Upload PDF"
                id="pdfUpload"
                required
                onChange={(file) => setFormData({ ...formData, pdfUrl: file })}
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <TextInput
                label="Board"
                type="text"
                required
                value={formData.board}
                onChange={(e) =>
                  setFormData({ ...formData, board: e.target.value })
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
              disabled={loading}
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
      <Modal isOpen={isModalOpen} onClose={closeModal} progress={progress}>
        <h2 className="text-lg text-primary font-semibold">
          Please Wait, Content is uploading...
        </h2>
      </Modal>
    </div>
  );
};

export default AddNotesPage;
