import Quiz from "../models/Quiz.js";

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const {
      name,
      description,
      visibility,
      board,
      class: classLevel,
      timeLimit,
      subject,
      questions,
      totalMarks,
    } = req.body;

    if (!name || !description || !subject) {
      return res
        .status(400)
        .json({ message: "Name, description, and subject are required." });
    }

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one question is required." });
    }

    // Validate each question
    for (const [index, question] of questions.entries()) {
      if (!question.question || question.question.trim() === "") {
        return res
          .status(400)
          .json({ message: `Question ${index + 1} text is required` });
      }

      // Validate options structure and filter out any invalid ones
      const validOptions = question.options.filter((opt) => {
        return (
          opt &&
          typeof opt === "object" &&
          "text" in opt &&
          typeof opt.text === "string" &&
          opt.text.trim() !== "" &&
          "isCorrect" in opt &&
          typeof opt.isCorrect === "boolean"
        );
      });

      if (validOptions.length < 2) {
        return res
          .status(400)
          .json({
            message: `Question ${index + 1} must have at least 2 valid options`,
          });
      }

      // Find the index of the correct option
      const correctOptionIndex = validOptions.findIndex((opt) => opt.isCorrect);

      if (correctOptionIndex === -1) {
        return res.status(400).json({
          message: `Question ${index + 1} must have exactly one correct option`,
        });
      }

      // Update the correctOption index to match the filtered array
      question.correctOption = correctOptionIndex;
    }

    const newQuiz = new Quiz({
      name,
      description,
      visibility: visibility || "free",
      board,
      class: classLevel,
      timeLimit: parseInt(timeLimit) || 30,
      subject,
      questions,
      totalMarks:
        parseInt(totalMarks) ||
        questions.reduce((sum, q) => sum + (parseInt(q.marks) || 1), 0),
    });

    await newQuiz.save();

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      quiz: newQuiz,
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Error creating quiz", error });
  }
};

// Get all quizzes
// controllers/Quiz.js

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({
      success: true, // Add this property
      quizzes: quizzes, // Wrap the quizzes array in an object
      message: "Quizzes fetched successfully", // Optional: Add a success message
    });
  } catch (error) {
    console.error("Error in getAllQuizzes:", error); // Log the server-side error for debugging
    res
      .status(500)
      .json({ message: "Error fetching quizzes", error: error.message }); // Send a 500 for server errors
  }
};

// Get a quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quiz fetched successfully",
      quiz,
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching quiz",
    });
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
