// models/Question.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String }, // optional
  marks: { type: Number, default: 1 },
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
