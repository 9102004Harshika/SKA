

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: "dsnsi0ioz",
  api_key: "115164128321569 ",
  api_secret: "U4yfSAU5B1TDUPQh7eZFT3kGwp8",
});

// Function to extract public_id and resource_type from Cloudinary URL
const getPublicIdFromUrl = (fileUrl) => {
  try {
    // Extracts everything after '/upload/' and removes file extension
    const match = fileUrl.match(/\/upload\/(?:v\d+\/)?([^?]+)/);
    if (!match || !match[1]) throw new Error("Invalid file URL format.");

    let publicIdWithExt = match[1]; // This includes file extension
    let publicId = publicIdWithExt.replace(/\.[^.]+$/, ""); // Removes file extension

    let fileType = "image"; // Default type
    if (fileUrl.includes("/notes_pdf/")) fileType = "raw"; // PDFs should be "raw"
    else if (fileUrl.match(/\.(mp4|avi|mov|mkv|webm)$/)) fileType = "video";

    return { publicId, fileType };
  } catch (error) {
    throw new Error(`Error extracting public ID: ${error.message}`);
  }
};



// Delete from Cloudinary
export const deleteFile = async (req, res) => {
  try {
    const { coverImageUrl, pdfUrl } = req.body;
    if (!coverImageUrl && !pdfUrl) {
      return res.status(400).json({ message: "File URLs are required" });
    }

    const deletionResults = [];
    const fileUrls = [coverImageUrl, pdfUrl].filter(url => url); // Ensure no undefined values

    for (let fileUrl of fileUrls) {
      try {
        const { publicId, fileType } = getPublicIdFromUrl(fileUrl);
        console.log(`Deleting: ${publicId}, Type: ${fileType}`);

        const result = await cloudinary.uploader.destroy(publicId, { resource_type: fileType });
        console.log(`Cloudinary Response:`, result);

        deletionResults.push({
          file: fileUrl,
          status: result.result === "ok" ? "deleted" : "not found"
        });
      } catch (error) {
        console.error(`Failed to delete ${fileUrl}:`, error.message);
        deletionResults.push({ file: fileUrl, status: "failed" });
      }
    }

    return res.status(200).json({ message: "File deletion process completed", results: deletionResults });
  } catch (error) {
    console.error("Error in deleteFile function:", error);
    return res.status(500).json({ message: "Failed to delete files", error: error.message });
  }
};


