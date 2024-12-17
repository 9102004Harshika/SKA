import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    // Allow null value for password but only if no other value is provided
    validate: {
      validator: function(value) {
        // Allow null or undefined as a valid value for password
        if (value === null || value === undefined) {
          return true;
        }
        // Otherwise, ensure it's a string and non-empty
        return typeof value === "string" && value.length > 0;
      },
      message: "Password cannot be empty if provided.",
    },
    default: null,  // Set default to null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
