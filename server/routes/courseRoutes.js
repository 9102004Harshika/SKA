import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAll,
} from "../controllers/courseController.js";

const router = express.Router();

// Routes for Course
router.post("/add", createCourse); // Create a new course
router.get("/get", getCourses); // Get all courses
router.get("/getAll", getAll); // Get all courses
router.get("/:id", getCourseById); // Get a single course by ID
router.put("/update/:id", updateCourse); // Update a course by ID
router.delete("/:id", deleteCourse); // Delete a course by ID

export default router;
