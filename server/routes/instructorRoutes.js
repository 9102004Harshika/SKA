import express from "express";
import {
  createInstructor,
  getAllInstructors,
} from "../controllers/instructorController.js";

const router = express.Router();

// Create a new instructor
router.post("/add", createInstructor);

// Get all instructors
router.get("/get", getAllInstructors);

export default router;
