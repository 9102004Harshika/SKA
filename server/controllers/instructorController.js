import Instructor from "../models/Instructor.js";
import User from "../models/Users.js";

// Create a new instructor
export const createInstructor = async (req, res) => {
  try {
    const { userId, photo, bio, contact, education, experience } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res.status(400).json({ error: "User not found or not an admin" });
    }

    // Create Instructor
    const instructor = await Instructor.create({
      user: userId,
      photo,
      bio,
      contact,
      education,
      experience,
    });

    // Update user with instructor reference
    user.instructor = instructor._id;
    await user.save();

    res.status(201).json({ message: "Instructor created", instructor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all instructors
export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().populate(
      "user",
      "fullName email role"
    );
    res.status(200).json(instructors);
  } catch (error) {
    console.error("Get All Instructors Error:", error);
    res.status(400).json({ message: "Error fetching instructors", error });
  }
};

// Get instructor by ID
export const getInstructorById = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findById(id).populate(
      "user",
      "fullName email role"
    );

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json(instructor);
  } catch (error) {
    console.error("Get Instructor By ID Error:", error);
    res.status(400).json({ message: "Error fetching instructor", error });
  }
};

// Get instructor by userId
export const getInstructorByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const instructor = await Instructor.findOne({ user: userId }).populate(
      "user",
      "fullName email role"
    );

    if (!instructor) {
      return res
        .status(404)
        .json({ message: "Instructor not found for this user" });
    }

    res.status(200).json(instructor);
  } catch (error) {
    console.error("Error fetching instructor by userId:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update instructor
export const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { photo, bio, conatct, education, experience } = req.body;

    const updatedInstructor = await Instructor.findByIdAndUpdate(
      id,
      { photo, bio, contact, education, experience },
      { new: true }
    );

    if (!updatedInstructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json({
      message: "Instructor updated successfully",
      instructor: updatedInstructor,
    });
  } catch (error) {
    console.error("Update Instructor Error:", error);
    res.status(400).json({ message: "Error updating instructor", error });
  }
};

// Delete instructor

export const deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Assuming the instructor document has a reference to user/admin in a `user` field
    const userId = instructor.user;

    // Delete the instructor
    await Instructor.findByIdAndDelete(req.params.id);

    // Delete the associated user/admin
    if (userId) {
      await User.findByIdAndDelete(userId);
    }

    res
      .status(200)
      .json({ message: "Instructor and associated user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting instructor", error });
  }
};
