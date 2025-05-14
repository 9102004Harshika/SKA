import Notes from "../models/Notes.js";
import Course from '../models/Course.js'
import {cloudinary} from "../utils/cloudinary.js"
import fs from "fs-extra";
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
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

export const compressPdf = async (req, res) => {
  try {
    const inputPath = req.file.path;
    const outputFileName = `${uuidv4()}_compressed.pdf`;
    const outputPath = path.join(__dirname, "../temp_uploads", outputFileName);

    const command = `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
-dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;

    exec(command, async (error) => {
      if (error) {
        console.error("Ghostscript Error:", error);
        return res.status(500).json({ success: false, message: "Compression failed" });
      }

      const compressedFile = await fs.readFile(outputPath);
      res.contentType("application/pdf");
      res.send(compressedFile);

      await fs.remove(inputPath);
      await fs.remove(outputPath);
    });
  } catch (err) {
    console.error("Compression error:", err);
    res.status(500).json({ success: false, message: "Server error during compression" });
  }
};
