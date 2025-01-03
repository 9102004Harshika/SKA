import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const notesSchema = new mongoose.Schema({
  notesId: { type: String, unique: true, default: uuidv4 },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  private: { type: String },
});

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
