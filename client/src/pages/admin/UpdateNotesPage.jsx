import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";
import ImageUploader from "../../ui/imageUploader";
import FileUploader from "../../ui/fileUploader";
import { Button } from "../../ui/button";
import { RadioButton } from "../../ui/radioButton";
import { toast } from "../../components/use-toast";
import Modal from "../../components/Modal";

const UpdateNotesPage = () => {
  const { noteId } = useParams(); // Get noteId from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
    coverImageUrl: "",
    pdfUrl: "",
    board: "",
    subject: "",
    classFor: "",
    writtenBy: "",
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch the existing note details
    const fetchNote = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/notes/${noteId}`);
        setFormData({
          title: data.title,
          description: data.description,
          visibility: data.visibility,
          coverImageUrl: data.coverImageUrl,
          pdfUrl: data.pdfUrl,
          board: data.board,
          subject: data.subject,
          classFor: data.classFor,
          writtenBy: data.writtenBy,
        });
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsModalOpen(true);
    setProgress(50);

    try {
      await axios.put(`/api/notes/${noteId}`, formData);
      setProgress(100);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/admin/notes"); // Redirect after update
      }, 1000);
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      visibility: "public",
      coverImageUrl: "",
      pdfUrl: "",
      board: "",
      subject: "",
      classFor: "",
      writtenBy: "",
    });
  };

  return (
    <div className="mx-10 font-body">
      <h2 className="mb-10 font-header text-3xl font-semibold text-center">
        Update Notes
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
                <label className="block text-lg font-bold">Access Type:</label>
                <RadioButton
                  name="visibility"
                  options={["public", "private"]}
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
              {formData.coverImageUrl && (
                <img
                  src={formData.coverImageUrl}
                  alt="Cover"
                  className="w-32 h-32 object-cover rounded-md"
                />
              )}
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
              text="Update Notes"
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
              onClick={resetForm}
            />
          </div>
        </form>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        progress={progress}
      >
        <h2 className="text-lg text-primary font-semibold">
          Please Wait, Content is updating...
        </h2>
      </Modal>
    </div>
  );
};

export default UpdateNotesPage;
