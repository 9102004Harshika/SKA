import mongoose from "mongoose";

// Instructor Schema
const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  bio: { type: String },
  education: { type: String },
  role: { type: String },
  experience: { type: Number },
});

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;
