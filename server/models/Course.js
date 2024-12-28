import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseId: { type: String, unique: true, required: true }, // Unique identifier for the course
  courseImage: { type: String, required: true }, // URL to the course image
  courseTitle: { type: String, required: true },
  instructor: {
    name: { type: String, required: true },
    photo: { type: String }, // URL to instructor photo
    bio: { type: String },
    education: { type: String }, // Instructor's education details
  },
  studentCount: { type: String, required: true },
  keyFeatures: { type: [String], required: true }, // Array of strings for features
  totalLectures: { type: String, required: true },
  price: {
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    discountPercentage: { type: Number },
  },
  class: { type: String, required: true }, // Class level (e.g., Class 10)
  board: { type: String, required: true }, // Educational board (e.g., ICSE)
  subject: { type: String, required: true }, // Subject (e.g., Mathematics)
  stream: { type: String }, // Stream (e.g., Commerce, Science)
  category: { type: [String], required: true }, // Array for categories and levels
  topicsCovered: { type: [String], required: true }, // Array for topics
  courseDescription: { type: String, required: true },
  rating: {
    stars: { type: Number, required: true },
    reviews: { type: [String] }, // Array for reviews
  },
  totalEstimatedTime: { type: String, required: true },
  uploadedDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, required: true },
  notes: {
    name: { type: String }, // Name of the notes
    description: { type: String },
    link: { type: String }, // URL for notes link
  },
  testQuiz: {
    name: { type: String }, // Name of the test or quiz
    description: { type: String },
    link: { type: String }, // URL for quiz link
  },
  video1: { type: String }, // URL for the first video
  video2: { type: String }, // URL for the second video
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
