import Notes from "../models/Notes.js";
import Course from '../models/Course.js'
import {cloudinary} from "../utils/cloudinary.js"
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PdfStream from "../models/PdfStream.js";
import { cachePdf, CACHE_DIR } from "../utils/cachePdf.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
cloudinary.config({
  cloud_name: "dsnsi0ioz",
  api_key: "151826192584142",
  api_secret: "GVb2kmMNVYdTXdVkMt8NedfPpK8",
});
export const getUrl=(link)=>{
   const urlArray=link.split('/')
   const image=urlArray[urlArray.length-1]
   const imageName=image.split('.')[0]
   const url=`${urlArray[urlArray.length-3]}/${urlArray[urlArray.length-2]}/${imageName}`
   return url
}

// Delete from Cloudinary
export const deleteFile = async (req, res) => {
  try {
    const { Url } = req.body;

    if (!Url) {
      return res.status(400).json({ message: "File URL is required" });
    }

    const file = getUrl(Url);

    // Determine the resource type
    let resourceType = "image"; // Default
    if (Url.includes("/video/upload/")) {
      resourceType = "video";
    } else if (Url.includes("/raw/upload/") || Url.endsWith(".pdf")) {
      resourceType = "raw"; // PDFs and raw files
    }

    // Delete from Cloudinary
    const fileResult = await cloudinary.uploader.destroy(file, { resource_type: resourceType });

    res.status(200).json({ message: "File deleted successfully", fileResult });
  } catch (error) {

    res.status(500).json({ message: "Error deleting file", error });
  }
};

export const deleteUrl=async(req,res)=>{
  try{
     const {url,note}=req.body
     const notes = await Notes.findById(note);
    if (!notes) {
      return res.status(404).json({ message: "Course not found" });
    }
     const file=getUrl(url)
     const fileResult=await cloudinary.uploader.destroy(file);
     notes.coverImageUrl = null;
     notes.pdfUrl = null;
    await notes.save();
     res.status(200).json({message:"File deleted successfully",fileResult})
  }
  catch(error){
      console.error(error)
      res.status(500).json({message:"Error Deleting files",er})
  }
}


export const deleteVideoUrl = async (req, res) => {
  try {
    const { url, course } = req.body;
    const courseData = await Course.findById(course);
    if (!courseData) {
      return res.status(404).json({ message: "Course not found" });
    }

    const file = getUrl(url);
    let fileResult;

    if (courseData.courseImage === url) {
      fileResult = await cloudinary.uploader.destroy(file, { resource_type: "image" });

      // Instead of setting to null, assign a placeholder image or remove the field
      courseData.courseImage = ""; // Use a default image URL if needed
    } else {
      courseData.modules.forEach((module) => {
        if (module.videoLink === url) {
          fileResult = cloudinary.uploader.destroy(file, { resource_type: "video" });
          module.videoLink = null;
        }
      });
    }

    await courseData.save();

    res.status(200).json({ message: "Media deleted successfully", fileResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting media file", error });
  }
};



export const requestStream = async (req, res) => {
  try {
    const { pdfUrl, stream = false } = req.body;

    if (!pdfUrl) {
      return res.status(400).json({ error: "PDF URL is required." });
    }

    // STEP 1: Create token if it doesn't exist
    if (!stream) {
      // console.log("🔍 Checking existing cache for:", pdfUrl);

      const existingEntry = await PdfStream.findOne({ pdfUrl }).sort({ createdAt: -1 });

      // If already cached, return existing token
      if (existingEntry && existingEntry.token && existingEntry.localPath && fs.existsSync(existingEntry.localPath)) {
        // console.log("✅ Token and cached PDF already exist. Skipping creation.");
        return res.status(200).json({
          success: true,
          message: "Token already exists and PDF is cached.",
          token: existingEntry.token,
        });
      }

      // console.log("🆕 Creating new token and caching PDF...");
      await PdfStream.deleteMany({ pdfUrl }); // Optional cleanup

      const newToken = uuidv4();
      const entry = await PdfStream.create({
        pdfUrl,
        token: newToken,
        usageCount: 0,
        localPath: null,
      });

      // Trigger caching in background
      cachePdf(pdfUrl, newToken, entry._id);

      return res.status(200).json({
        success: true,
        message: "Token created. PDF caching in progress.",
        token: newToken,
      });
    }

    // STEP 2: Serve cached file
    const entry = await PdfStream.findOne({ pdfUrl }).sort({ createdAt: -1 });

    if (!entry) {
      return res.status(404).json({ error: "No token found for this PDF URL." });
    }

    const { token } = entry;
    const localPath = path.join(CACHE_DIR, `${token}.pdf`);

    if (fs.existsSync(localPath)) {
      // console.log("📂 Serving cached PDF:", localPath);
      await PdfStream.findByIdAndUpdate(entry._id, { $inc: { usageCount: 1 } });
      return res.sendFile(localPath);
    }

    return res.status(202).json({
      message: "PDF is still being cached. Please try again shortly.",
    });
  } catch (err) {
    console.error("❌ Error in requestStream:", err.message || err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const streamPdf = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(400).json({ message: "Token required" });
    }

    const record = await PdfStream.findOne({ token });
    if (!record) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    const cachedFilePath = path.resolve("pdf-cache", `${token}.pdf`);
    if (!fs.existsSync(cachedFilePath)) {
      return res.status(404).json({ message: "Cached PDF file not found" });
    }

    const stat = fs.statSync(cachedFilePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
      // No range header, send entire file
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "application/pdf",
        "Accept-Ranges": "bytes",
      });
      fs.createReadStream(cachedFilePath).pipe(res);
    } else {
      const bytesPrefix = "bytes=";
      if (!range.startsWith(bytesPrefix)) {
        return res.status(416).json({ message: "Invalid Range format" });
      }

      const [startStr, endStr] = range.replace(bytesPrefix, "").split("-");
      const start = parseInt(startStr, 10);
      const end = endStr ? parseInt(endStr, 10) : fileSize - 1;

      if (
        isNaN(start) ||
        isNaN(end) ||
        start >= fileSize ||
        end >= fileSize ||
        end < start
      ) {
        return res.status(416).json({
          message: "Requested Range Not Satisfiable",
          details: `Valid range: 0-${fileSize - 1}`,
        });
      }

      const chunkSize = end - start + 1;

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "application/pdf",
      });

      const stream = fs.createReadStream(cachedFilePath, { start, end });
      stream.pipe(res);
    }
  } catch (err) {
    console.error("Streaming error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};