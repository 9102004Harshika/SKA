import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  totalMarks: { type: Number, default: 0 },
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
