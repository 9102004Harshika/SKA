import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to extract public_id from Cloudinary URL
const getPublicIdFromUrl = (fileUrl) => {
  const parts = fileUrl.split("/");
  let filename = parts[parts.length - 1].split("?")[0]; // Remove query params if present
  const filenameParts = filename.split(".");

  // Ensure filename has an extension
  if (filenameParts.length < 2) {
    throw new Error("Invalid file URL format.");
  }

  const extension = filenameParts.pop().toLowerCase(); // Get the last part as extension
  const publicId = filenameParts.join("."); // Join the remaining parts as the public ID

  // Determine file type
  let fileType = "image"; // Default type
  if (["pdf", "docx", "pptx"].includes(extension)) {
    fileType = "raw";
  } else if (["mp4", "avi", "mov", "mkv", "webm"].includes(extension)) {
    fileType = "video";
  }

  return { publicId, fileType };
};

// Delete from cloudinary
export const deleteFile = async (req, res) => {
  try {
    const { coverImageUrl, pdfUrl } = req.body;
    if (!coverImageUrl && !pdfUrl) {
      return res.status(400).json({ message: "File URLs are required" });
    }

    if (coverImageUrl) {
      const { publicId, fileType } = getPublicIdFromUrl(coverImageUrl);
      await cloudinary.uploader.destroy(publicId, { resource_type: fileType });
    }

    if (pdfUrl) {
      const { publicId, fileType } = getPublicIdFromUrl(pdfUrl);
      await cloudinary.uploader.destroy(publicId, { resource_type: fileType });
    }

    res.status(200).json({ message: "Files deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Failed to delete files" });
  }
};
