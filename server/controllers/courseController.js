import Course from "../models/Course.js";
import { createNotification } from "./notificationController.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const course = new Course(courseData);
    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
    await createNotification(
      {
        body: {
          title: "New Course Available",
          type: "promotion",
          description: `New Course: ${newNote.title} is available now.`,
          userId: null,
        },
      },
      {
        status: () => ({
          json: () => {},
        }),
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Courses
export const getCourses = async (req, res) => {
  try {
    // Get page & limit from query params (defaults: page=1, limit=10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Count total courses
    const totalCourses = await Course.countDocuments();

    // Fetch courses with pagination + populates
    const courses = await Course.find()
      .skip(skip)
      .limit(limit)
      .populate({
        path: "instructor",
        populate: {
          path: "user",
          select: "fullName", // only fullName for instructor's user
        },
      })
      .populate({
        path: "notes",
        select: "title subject classFor", // keep it light for dashboard
      })
      .populate({
        path: "quizzes",
        select: "title subject totalMarks", // keep only summary info
      });

    // Send response
    res.status(200).json({
      courses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page,
      totalCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching courses", error });
  }
};


export const getAll = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};
// Get a specific course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    .populate({
      path: "instructor",
      populate: {
        path: "user", // field inside instructor schema
      },
    })
    .populate("notes")
    .populate("quizzes");
  
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update course details
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
