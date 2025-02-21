import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TextAreaInput from "../../ui/textarea";
import TextInput from "../../ui/textInput";
import { Button } from "../../ui/button";
import FileUploader from "../../ui/fileUploader";
import ImageUploader from "../../ui/imageUploader";
import { RadioButton } from "../../ui/radioButton";

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
    coverImageUrl: "",
    pdfUrl: "",
  });

  const visibilityOptions = [
    { value: "paid", text: "Paid" },
    { value: "free", text: "Free" },
  ];

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

  const removeFile = async (type) => {
    try {
      const fileUrl = type === "image" ? note.coverImageUrl : note.pdfUrl;
      if (!fileUrl) return;

      await axios.delete("http://localhost:5000/api/deleteFile", {
        data: { fileUrl },
      });

      setNote((prev) => ({
        ...prev,
        [type === "image" ? "coverImageUrl" : "pdfUrl"]: "",
      }));
    } catch (error) {
      console.error(`Error removing ${type}:`, error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/notes/update/${id}`, note);
      alert("Note updated successfully!");
      navigate("/admin/notes/update");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="mx-10 font-body">
      <h2 className="mb-10 font-header text-3xl md:tracking-wide font-semibold text-center">
        Edit This Notes
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
                name="title"
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
                <RadioButton
                  name="visibility"
                  options={visibilityOptions}
                  // checked={formData.visibility}
                  // onChange={(e) =>
                  // setFormData({ ...formData, visibility: e.target.value })
                  // }
                />
              </div>
            </div>

            <div className="flex flex-col  items-center justify-center px-4 py-2 border-2 border-primary rounded-md">
              <label>Cover Image</label>
              {note.coverImageUrl ? (
                <div className="flex flex-col items-center">
                  <img
                    src={note.coverImageUrl}
                    alt="Cover"
                    className="w-30 h-40 object-cover rounded-md"
                  />
                  <Button
                    text="Remove Image"
                    variant="secondary"
                    size="xs"
                    onClick={() => removeFile("image")}
                  />
                </div>
              ) : (
                <ImageUploader
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNote({ ...note, coverImageUrl: e.target.files[0] })
                  }
                />
              )}
            </div>
          </div>

          <div className="flex gap-10">
            <div className="flex flex-col gap-4 items-center justify-center p-8 border-2 border-primary rounded-md">
              <label>PDF File</label>
              {note.pdfUrl ? (
                <div className="flex flex-col items-center">
                  <embed
                    src={note.pdfUrl}
                    type="application/pdf"
                    width="200"
                    height="150"
                  />
                  <Button
                    text="Remove PDF"
                    variant="danger"
                    onClick={() => removeFile("pdf")}
                  />
                </div>
              ) : (
                <FileUploader
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    setNote({ ...note, pdfUrl: e.target.files[0] })
                  }
                />
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <TextInput
                label="Board"
                type="text"
                required
                value={note.board}
                onChange={handleChange}
                name="board"
              />
              <TextInput
                label="Subject For"
                type="text"
                required
                value={note.subject}
                onChange={handleChange}
                name="subject"
              />
              <TextInput
                label="Class For"
                type="number"
                required
                value={note.classFor}
                onChange={handleChange}
                name="classFor"
              />
              <TextInput
                label="Written By"
                type="text"
                required
                value={note.writtenBy}
                onChange={handleChange}
                name="writtenBy"
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
            />
            <Button
              text="Clear All"
              size="lg"
              variant="accent"
              type="reset"
              className="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotesPage;
