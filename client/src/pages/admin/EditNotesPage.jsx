import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TextAreaInput from "../../ui/textarea";
import TextInput from "../../ui/textInput";
import { RadioButton } from "../../ui/radioButton";
import ImageUploader from "../../ui/imageUploader";
import FileUploader from "../../ui/fileUploader";
import { Button } from "../../ui/button";

const EditNotesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    description: "",
    writtenBy: "",
    subject: "",
    classFor: "",
    board: "",
  });

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/notes/${id}`
        );
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note details:", error);
      }
    };

    fetchNoteDetails();
  }, [id]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/notes/update/${id}`, note);
      alert("Note updated successfully!");
      navigate("/admin/notes/update"); // Redirect back
    } catch (error) {
      console.error("Error updating note:", error);
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
                value={note.title}
                onChange={handleChange}
              />
              <TextAreaInput
                label="Description"
                name="description"
                required
                value={note.description}
                onChange={handleChange}
              />
              <div className="flex gap-6">
                <label className="block text-lg  font-bold ">
                  Access Type:
                </label>
                {/* <RadioButton
                  name="visibility"
                  // options={visibilityOptions}
                  checked={note.visibility}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, visibility: e.target.value })
                  // }
                /> */}
              </div>
            </div>
            <div className="flex flex-col gap-10 items-center justify-center p-8 border-2 border-primary rounded-md">
              <label htmlFor="imageUpload">Add Cover Image</label>
              <ImageUploader
                label="Upload Image"
                id="imageUpload"
                required
                // onChange={(file) =>
                //   setFormData({ ...formData, coverImageUrl: file })
                // }
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
                // onChange={(file) =>
                //   setFormData({ ...formData, pdfUrl: file })
                // }
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <TextInput
                label="Board"
                type="text"
                required
                value={note.board}
                onChange={handleChange}
              />
              <TextInput
                label="Subject For"
                type="text"
                required
                value={note.subject}
                onChange={handleChange}
              />
              <TextInput
                label="Class For"
                type="number"
                required
                value={note.classFor}
                onChange={handleChange}
              />

              <TextInput
                label="Written By"
                type="text"
                required
                value={note.writtenBy}
                onChange={handleChange}
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
              // disabled={loading}
            />
            <Button
              text="Clear All"
              size="lg"
              variant="accent"
              type="reset"
              className="w-full"
              // onClick={() => resetForm()}
            />
          </div>
        </form>
      </div>
      {/* <Modal isOpen={isModalOpen} onClose={closeModal} progress={progress}>
          <h2 className="text-lg text-primary font-semibold">
            Please Wait, Content is uploading...
          </h2>
        </Modal> */}
    </div>
  );
};

export default EditNotesPage;
