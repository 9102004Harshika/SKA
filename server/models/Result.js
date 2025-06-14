import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      selectedOption: String,
      isCorrect: Boolean,
    },
  ],
});

const Result = mongoose.model("Result", resultSchema);
export default Result;
