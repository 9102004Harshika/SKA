import axios from "axios";
import { toast } from "../../components/use-toast";

export const deleteFile = async (note, setNotes) => {
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    // Step 1: Delete the image and PDF from Cloudinary
    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}api/files/deleteFile`,
      {
        Url: note.coverImageUrl,
      }
    );
    console.log("Deleted Image from Cloudinary!");
    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}api/files/deleteFile`,
      {
        Url: note.pdfUrl,
      }
    );
    console.log("Deleted Pdf from cloudinary");

    // // Step 2: Delete the note from the database
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}api/notes/delete/${note._id}`
    );
    console.log("Deleted from MongoDB!");

    // Step 3: Update state to remove deleted note
    setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));

    // Step 4: Show success toast
    toast({
      title: "Notes Deleted Successfully",
      description: `You have successfully deleted the note for ${note.subject}`,
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
