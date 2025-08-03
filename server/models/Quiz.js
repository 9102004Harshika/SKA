// models/Quiz.js
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [optionSchema],
  correctOption: { type: Number, required: true },
  marks: { type: Number, default: 1 },
  explanation: { type: String, default: "" }
});

const quizSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Quiz name is required'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true
  },
  visibility: {
    type: String,
    enum: {
      values: ["free", "paid"],
      message: '{VALUE} is not a valid visibility status'
    },
    default: "free",
    required: true,
  },
  board: { 
    type: String,
    required: [true, 'Board is required'],
    trim: true
  },
  class: { 
    type: String,
    required: [true, 'Class is required'],
    trim: true
  },
  timeLimit: { 
    type: Number, 
    min: [1, 'Time limit must be at least 1 minute'],
    default: 30 
  },
  subject: { 
    type: String, 
    required: [true, 'Subject is required'],
    trim: true
  },
  questions: [questionSchema],
  totalMarks: { 
    type: Number, 
    default: 0,
    min: [0, 'Total marks cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate total marks before saving
quizSchema.pre('save', function(next) {
  if (this.questions && this.questions.length > 0) {
    this.totalMarks = this.questions.reduce((total, question) => {
      return total + (question.marks || 0);
    }, 0);
  } else {
    this.totalMarks = 0;
  }
  next();
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
