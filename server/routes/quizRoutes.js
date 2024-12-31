import express from "express";
import { createQuiz, getAllQuizzes } from "../controllers/quizController.js";

const router = express.Router();

// Create a new quiz
router.post("/add", createQuiz);

// Get all quizzes
router.get("/get", getAllQuizzes);

export default router;
