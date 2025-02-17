import mongoose from "mongoose";
const notesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String },
  coverImage: { type: String },
  notesSrc: { type: String },
  visibility: { type: String },
});

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
