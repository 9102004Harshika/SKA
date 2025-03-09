import axios from "axios";
import { toast } from "../../components/use-toast";

export const deleteFile = async (course, setCourses) => {
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    // Step 1: Delete the image and PDF from Cloudinary
    await axios.post("http://localhost:5000/api/files/deleteFile", {
      Url: course.courseImage,

    });
    await Promise.all(
        course.modules.map(async (module) => {
          if (module.videoLink) {
            try {
              await axios.post("http://localhost:5000/api/files/deleteFile", {
                Url: module.videoLink,
              });
              console.log(`Deleted Video: ${module.videoLink}`);
            } catch (error) {
              console.error(`Error deleting video: ${module.videoLink}`, error);
            }
          }
        })
      );
    // // Step 2: Delete the note from the database
    await axios.delete(`http://localhost:5000/api/courses/${course._id}`);
    console.log("Deleted from MongoDB!");

    // Step 3: Update state to remove deleted note
    setCourses((prevCourse) => prevCourse.filter((c) => c._id !== course._id));

    // Step 4: Show success toast
    toast({
      title: "Courses Deleted Successfully",
      description: `You have successfully deleted the note for ${course.subject}`,
      variant: "success",
    });
  } catch (err) {
    console.error("Error deleting note:", err);
    toast({
      title: "Error Deleting Note",
      description:
        "Something went wrong while deleting the note. Please try again later.",
      variant: "destructive",
    });
  }
};
