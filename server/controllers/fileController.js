import Notes from "../models/Notes.js";
import Course from '../models/Course.js'
import {cloudinary} from "../utils/cloudinary.js"
cloudinary.config({
  cloud_name: "dsnsi0ioz",
  api_key: "151826192584142",
  api_secret: "GVb2kmMNVYdTXdVkMt8NedfPpK8",
});
const getUrl=(link)=>{
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
      courseData.courseImage = null;
    } else {
      courseData.modules.forEach(async (module) => {
        if (module.videoLink === url) {
          fileResult = await cloudinary.uploader.destroy(file, { resource_type: "video" });
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
