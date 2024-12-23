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
    validate: {
      validator: function (value) {
        // Allow null or undefined as a valid value for password
        if (value === null || value === undefined) {
          return true;
        }
        // Otherwise, ensure it's a string and non-empty
        return typeof value === "string" && value.length > 0;
      },
      message: "Password cannot be empty if provided.",
    },
    default: null, // Set default to null
  },
  loginMode: {
    type: String,
    required: true,
    default: "email",
    enum: ["email", "google","facebook"], // Ensure loginMode is only 'email' or 'google'
  },
  isEnrolled: {
    type: Boolean,
    default: false, // Set to true after form submission
  },
  enrollmentDetails: {
    mobile: { type: String },
    dob: { type: Date },
    state: { type: String },
    city: { type: String },
    board: { type: String },
    class: { type: String },
    stream:{type:String,default:null},
    gender:{type:String},
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to enforce password requirements based on loginMode
userSchema.pre("save", function (next) {
  if (this.loginMode === "email" && (!this.password || this.password.trim() === "")) {
    return next(new Error("Password is mandatory for completing registration. Please provide a valid password."));
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
