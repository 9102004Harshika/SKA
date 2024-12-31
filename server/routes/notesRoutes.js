import express from "express";
import { createNote, getAllNotes } from "../controllers/notesController.js";

const router = express.Router();

// Create a new note
router.post("/add", createNote);

// Get all notes
router.get("/get", getAllNotes);

export default router;
