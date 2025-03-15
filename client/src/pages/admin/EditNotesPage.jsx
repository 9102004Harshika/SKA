import React, { useState } from "react";
import useUpdateNotes from "../../logic/notes/updateNotes.js";
import TextAreaInput from "../../ui/textarea";
import TextInput from "../../ui/textInput";
import { Button } from "../../ui/button";
import FileUploader from "../../ui/fileUploader";
import ImageUploader from "../../ui/imageUploader";
import { RadioButton } from "../../ui/radioButton";
import { boards, getClassOptions, getSubjects, streams } from "../../config/index.js";
import Select from "../../ui/select.jsx";

const EditNotesPage = () => {
  const { note, handleChange, handleSubmit, setNote ,deleteFile} = useUpdateNotes();
  const [isImageRemoved,setIsImageRemoved]=useState(false)
  const [isPdfRemoved,setIsPdfRemoved]=useState(false)
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
        <form onSubmit={(e)=>handleSubmit(e,isImageRemoved,isPdfRemoved)} className="flex flex-col gap-6">
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
                    onClick={() => {
                      setIsImageRemoved(true)
                      setNote({ ...note, coverImageUrl: "" })
                      deleteFile(note.coverImageUrl)
                    }}
                  />
                </div>
              ) : (
                <ImageUploader
                label="Upload Image"
                id="imageUpload"
                required
                onChange={(file) =>
                  setNote({ ...note, coverImageUrl: file })
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
                    onClick={() => {
                      setIsPdfRemoved(true)
                      setNote({ ...note, pdfUrl: "" })
                      deleteFile(note.pdfUrl)}}
                  />
                </div>
              ) : (
                <FileUploader
                label="Upload PDF"
                id="pdfUpload"
                required
                onChange={(file) => setNote({ ...note, pdfUrl: file })}
              />
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between space-y-6 ">

            <Select
  menuTitle="Board"
  submenuItems={boards}
  value={note.board} // Display the current selected board
  onSelect={(selectedBoard) => {
    setNote({
      ...note,
      board: selectedBoard, // Update the board selection
      classFor: "", // Reset class selection if needed
    });
    
  }}
/>
<Select
  menuTitle="Class"
  submenuItems={getClassOptions(note.board)}
  value={note.classFor}
  onSelect={(selectedClass) => {
    setNote({
      ...note,
      classFor: selectedClass,
      stream: selectedClass >= 11 ? "" : undefined, // Show stream dropdown without value for 11th & 12th
      subject: "",
    });
  }}
  disabled={!note.board}
/>
{parseInt(note.classFor) >= 11 && (
  <Select
    menuTitle="Stream"
    value={note.stream}
    submenuItems={streams}
    onSelect={(selectedStream) => {
      setNote({ ...note, stream: selectedStream || "",subject: selectedStream ? note.subject : undefined,}) // Clear subject if stream is undefined or empty });
    }}
    disabled={!note.board}
  />
)}

<Select
  menuTitle="Subject"
  submenuItems={getSubjects(note.classFor, note.stream)}
  onSelect={(selectedSubject) => {
    setNote({ ...note, subject: selectedSubject });
  }}
  disabled={!note.classFor || (note.classFor > 10 && !note.stream)} // Disable if classFor > 10 but no stream selected
  value={note.subject}
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
              onClick={console.log("updated succesfully")}
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
