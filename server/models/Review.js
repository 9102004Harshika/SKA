import mongoose from "mongoose";

// Review Schema
const reviewSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.String,
    ref: "Course",
    required: true,
  },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
