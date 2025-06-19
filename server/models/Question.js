// models/Question.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String },
  marks: { type: Number, default: 1 },
  diagram: { type: String }, // Optional diagram (URL or base64)
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
