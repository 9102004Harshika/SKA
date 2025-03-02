import React from "react";
import useUpdateNotes from "../../logic/notes/updateNotes.js";
import TextAreaInput from "../../ui/textarea";
import TextInput from "../../ui/textInput";
import { Button } from "../../ui/button";
import FileUploader from "../../ui/fileUploader";
import ImageUploader from "../../ui/imageUploader";
import { RadioButton } from "../../ui/radioButton";

const EditNotesPage = () => {
  const { note, handleChange, handleSubmit, setNote } = useUpdateNotes();

  const visibilityOptions = [
    { value: "paid", text: "Paid" },
    { value: "free", text: "Free" },
  ];

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
                <label className="block text-lg font-bold">Access Type:</label>
                <RadioButton
                  name="visibility"
                  options={visibilityOptions}
                  value={note.visibility}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-4 py-2 border-2 border-primary rounded-md">
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
                    onClick={() => setNote({ ...note, coverImageUrl: "" })}
                  />
                </div>
              ) : (
                <ImageUploader
                  type="file"
                  accept="image/*"
                  label={"Upload Image"}
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
                    onClick={() => setNote({ ...note, pdfUrl: "" })}
                  />
                </div>
              ) : (
                <FileUploader
                  type="file"
                  accept="application/pdf"
                  label={"Upload PDF"}
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
