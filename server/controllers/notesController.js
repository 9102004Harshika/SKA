import Notes from "../models/Notes.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const newNote = new Notes(req.body);
    await newNote.save();
    res.status(201).json({ message: "Note created successfully", newNote });
  } catch (error) {
    res.status(400).json({ message: "Error creating note", error });
  }
};

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ message: "Error fetching notes", error });
  }
};




