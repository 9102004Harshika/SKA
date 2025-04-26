import mongoose from "mongoose";

// Instructor Schema
const instructorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the User model (admin or user with role=admin)
      required: true,
    },
    photo: { type: String },
    bio: { type: String },
    contact: { type: Number, required: true },
    education: { type: String },
    experience: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;
