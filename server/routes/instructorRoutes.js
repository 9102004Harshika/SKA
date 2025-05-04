import express from "express";
import {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
  getInstructorByUserId,
} from "../controllers//instructorController.js";

const router = express.Router();

// Create a new instructor
router.post("/add", createInstructor);

// Get all instructors
router.get("/get", getAllInstructors);

// Get instructor by ID
router.get("/get/:id", getInstructorById);

// Get instructor by user ID
router.get("/user/:userId", getInstructorByUserId);

// Update instructor
router.put("/update/:id", updateInstructor);

// Delete instructor
router.delete("/delete/:id", deleteInstructor);

export default router;
