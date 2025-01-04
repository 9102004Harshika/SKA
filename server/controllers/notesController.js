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

// Get a note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: "Error fetching note", error });
  }
};

// Update a note by ID
export const updateNote = async (req, res) => {
  try {
    const note = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated note
      runValidators: true, // Run validators for the updated data
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    res.status(400).json({ message: "Error updating note", error });
  }
};

// Delete a note by ID
export const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting note", error });
  }
};
