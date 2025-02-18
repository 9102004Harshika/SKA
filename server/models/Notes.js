import mongoose from "mongoose";
const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  writtenBy: { type: String },
  coverImageUrl: { type: String },
  pdfUrl: { type: String },
  visibility: { type: String },
  subject:{type:String},
  classFor:{type:String},
  board:{type:String}
});

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
