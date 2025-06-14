import Quiz from "../models/Quiz.js";

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const { name, description, image, link, questions } = req.body;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Questions are required." });
    }

    const questionIds = [];
    let totalMarks = 0;

    for (const q of questions) {
      const newQuestion = new Question(q);
      const savedQuestion = await newQuestion.save();
      questionIds.push(savedQuestion._id);
      totalMarks += savedQuestion.marks || 0;
    }

    const newQuiz = new Quiz({
      name,
      description,
      image,
      questions: questionIds,
      totalMarks,
    });

    await newQuiz.save();

    res.status(201).json({
      message: "Quiz and questions created successfully",
      quiz: newQuiz,
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Error creating quiz", error });
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

// Get a quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json({ message: "Error fetching quiz", error });
  }
};

// Delete a quiz by ID
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting quiz", error });
  }
};

// Update a quiz by ID
export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated quiz
      runValidators: true, // Run validators for the updated data
    });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    res.status(400).json({ message: "Error updating quiz", error });
  }
};
