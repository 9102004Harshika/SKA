import express from "express";
import {
  createNote,
  deleteNote,
  getAllFreeNotes,
  getAllNotes,
  getAllPaidNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

// Get all notes
router.get("/getPaid", getAllPaidNotes);
router.get("/getFree", getAllFreeNotes);
router.get("/get", getAllNotes);
// Route to get a note by ID
router.get("/:id", getNoteById);

// Create a new note
router.post("/add", createNote);

// Route to update a note by ID
router.put("/update/:id", updateNote);

// Route to delete a note by ID
router.delete("/delete/:id", deleteNote);

export default router;
