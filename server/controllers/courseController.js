import Course from "../models/Course.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const course = new Course(courseData);
    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor notes quizzes");
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

export const getAll=async(req,res)=>{
  try{
    const courses=await Course.find({});
    res.status(200).json(courses)
  }
  catch(error){
    res.status(500).json({message:"Error fetching courses",error:error.message})
  }
}
// Get a specific course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor notes quizzes");
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
      runValidators:true
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
