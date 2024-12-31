import Quiz from "../models/Quiz.js";

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json({ message: "Quiz created successfully", newQuiz });
  } catch (error) {
    res.status(400).json({ message: "Error creating quiz", error });
  }
};

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ message: "Error fetching quizzes", error });
  }
};
