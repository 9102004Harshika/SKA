import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

// Create a new note
router.post("/add", createNote);

// Get all notes
router.get("/get", getAllNotes);

// Route to get a note by ID
router.get("/:id", getNoteById);

// Route to update a note by ID
router.put("/:id", updateNote);

// Route to delete a note by ID
router.delete("/:id", deleteNote);

export default router;
