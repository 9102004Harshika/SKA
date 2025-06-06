import mongoose from "mongoose";

// Course Schema
const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseDescription: { type: String, required: true },
  courseImage: { type: String },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number },
  discountPercentage: { type: Number },
  aboutCourse: { type: String, required: true },
  moduledescription: { type: String, required: true },
  demoVideo: { type: String },
  studentCount: { type: String, required: true, default: "100" },
  lastUpdated: { type: Date, default: Date.now },
  class: { type: String, required: true },
  board: { type: String, required: true },
  subject: { type: String, required: true },
  stream: { type: String, default: "General" }, 
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
  notes: { type: mongoose.Schema.Types.ObjectId, ref: "Notes" },
  quizzes: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;