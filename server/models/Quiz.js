// models/Quiz.js
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  visibility: {
    type: String,
    enum: ["free", "paid"],
    default: "free",
    required: true,
  },
  board: { type: String },
  class: { type: String },
  timeLimit: { type: Number, default: 30 },
  subject: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  totalMarks: { type: Number, default: 0 },
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
