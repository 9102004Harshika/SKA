import mongoose from "mongoose";

// Course Schema
const courseSchema = new mongoose.Schema({
  courseId: { type: String, unique: true, required: true },
  courseImage: { type: String, required: true },
  courseTitle: { type: String, required: true },
  courseDescription: { type: String, required: true },
  moduledescription: { type: String, required: true },
  demoVideo: { type: String },
  studentCount: { type: String, required: true },
  totalLectures: { type: String, required: true },
  totalEstimatedTime: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  discountPercentage: { type: Number },
  class: { type: String, required: true },
  board: { type: String, required: true },
  subject: { type: String, required: true },
  stream: { type: String },
  category: { type: String, required: true },
  keyFeatures: { type: [String], required: true },
  topicsCovered: { type: [String], required: true },
  modules: [
    {
      name: { type: String, required: true },
      estimatedTime: { type: String },
      videoLink: { type: String },
    },
  ],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notes" }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
