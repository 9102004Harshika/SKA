import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  private: { type: String },
});

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
