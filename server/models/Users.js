import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        if (value === null || value === undefined) {
          return true;
        }
        return typeof value === "string" && value.length > 0;
      },
      message: "Password cannot be empty if provided.",
    },
    default: null,
  },
  loginMode: {
    type: String,
    required: true,
    default: "email",
    enum: ["email", "google", "facebook"],
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"], // add more roles if needed
    default: "user",
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  enrollmentDetails: {
    mobile: { type: String },
    dob: { type: Date },
    state: { type: String },
    city: { type: String },
    board: { type: String },
    class: { type: String },
    stream: { type: String, default: null },
    gender: { type: String },
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook for role-based enrollmentDetails validation and password validation
userSchema.pre("save", function (next) {
  // Enforce password for email login
  if (
    this.loginMode === "email" &&
    (!this.password || this.password.trim() === "")
  ) {
    return next(
      new Error(
        "Password is mandatory for completing registration. Please provide a valid password."
      )
    );
  }

  // If role is not 'user', clear enrollmentDetails and isEnrolled
  if (this.role !== "user") {
    this.enrollmentDetails = undefined;
    this.isEnrolled = false;
  }

  next();
});

const User = mongoose.model("User", userSchema);
export default User;
