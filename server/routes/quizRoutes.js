import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

// Create a new quiz
router.post("/add", createQuiz);

// Get all quizzes
router.get("/get", getAllQuizzes);

// Route to get a quiz by ID
router.get("/:id", getQuizById);

// // Route to update a quiz by ID
router.put("/update/:id", updateQuiz);

// // Route to delete a quiz by ID
 router.delete("/delete/:id", deleteQuiz);

export default router;
