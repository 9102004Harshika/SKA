import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const quizSchema = new mongoose.Schema({
  quizId: { type: String, unique: true, default: uuidv4 },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  private: { type: String },
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
