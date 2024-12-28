import express from "express";
import { addCourse, getCourses } from "../controllers/courseController.js";
const router = express.Router();

// Route to add a course
router.post("/", addCourse);

// Route to get all courses
router.get("/", getCourses);

// module.exports = router;
export default router;
