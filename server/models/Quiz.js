import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  private: { type: String },
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
