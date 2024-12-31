import Instructor from "../models/Instructor.js";

// Create a new instructor
export const createInstructor = async (req, res) => {
  try {
    const newInstructor = new Instructor(req.body);
    await newInstructor.save();
    res
      .status(201)
      .json({ message: "Instructor created successfully", newInstructor });
  } catch (error) {
    res.status(400).json({ message: "Error creating instructor", error });
  }
};

// Get all instructors
export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (error) {
    res.status(400).json({ message: "Error fetching instructors", error });
  }
};
