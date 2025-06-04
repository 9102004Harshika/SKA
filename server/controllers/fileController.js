import Notes from "../models/Notes.js";
import Course from '../models/Course.js'
import {cloudinary} from "../utils/cloudinary.js"
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import PdfStream from "../models/PdfStream.js";
import https from "https";
import http from "http";
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
// export const requestStream = async (req, res) => {
//   try {
//     const { pdfUrl } = req.body;

//     if (!pdfUrl) {
//       return res.status(400).json({ error: "PDF URL is required" });
//     }

//     // Delete existing DB records for this pdfUrl
//     await PdfStream.deleteMany({ pdfUrl });

//     // Generate token for this PDF
//     const token = uuidv4();

//     // Save record with just token + pdfUrl (no local filePath)
//     await PdfStream.create({ pdfUrl, token });

//     res.status(200).json({
//       success: true,
//       message: "PDF URL registered for streaming",
//       token,
//     });
//   } catch (err) {
//     console.error("Error in requestStream:", err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };
// export const streamPdf = async (req, res) => {
//   try {
//     const token = req.query.token;
//     if (!token) {
//       return res.status(400).json({ message: "Token required" });
//     }

//     const record = await PdfStream.findOne({ token });
//     if (!record) {
//       return res.status(404).json({ message: "Invalid or expired token" });
//     }

//     const pdfUrl = record.pdfUrl;
//     if (!pdfUrl) {
//       return res.status(500).json({ message: "PDF URL missing" });
//     }

//     const client = pdfUrl.startsWith("https") ? https : http;

//     // For now, simple full streaming (no Range support)
//     client.get(pdfUrl, (response) => {
//       if (response.statusCode !== 200) {
//         return res.status(response.statusCode).json({ message: "Failed to fetch PDF" });
//       }

//       res.setHeader("Content-Type", "application/pdf");
//       response.pipe(res);
//     }).on("error", (err) => {
//       console.error("Error streaming PDF:", err);
//       res.status(500).json({ message: "Error streaming PDF" });
//     });
//   } catch (err) {
//     console.error("Streaming error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// 1) Create token or redirect to Cloudinary (requestStream)
export const requestStream = async (req, res) => {
  try {
    const { pdfUrl, stream = false, token } = req.body;

    // Step 1: Create token for pdfUrl
    if (pdfUrl && !stream) {
      await PdfStream.deleteMany({ pdfUrl });

      const newToken = uuidv4();
      await PdfStream.create({ pdfUrl, token: newToken });

      return res.status(200).json({
        success: true,
        message: "Token created",
        token: newToken,
      });
    }

    // Step 2: If streaming requested, redirect to Cloudinary URL directly (Cloudinary supports Range)
    if (!token) {
      return res.status(400).json({ error: "Token required" });
    }

    const entry = await PdfStream.findOne({ token });
    if (!entry) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    await PdfStream.findByIdAndUpdate(entry._id, { $inc: { usageCount: 1 } });

    // Redirect to Cloudinary URL (Cloudinary handles range internally)
    return res.redirect(entry.pdfUrl);
  } catch (err) {
    console.error("Error in requestStream:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 2) Stream PDF with Range support (streamPdf)
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

    const pdfUrl = record.pdfUrl;
    if (!pdfUrl) {
      return res.status(500).json({ message: "PDF URL missing" });
    }

    const urlObj = new URL(pdfUrl);
    const client = urlObj.protocol === "https:" ? https : http;

    const range = req.headers.range;

    if (!range) {
      // No range: stream entire PDF
      client.get(pdfUrl, (response) => {
        if (response.statusCode !== 200) {
          return res.status(response.statusCode).json({ message: "Failed to fetch PDF" });
        }
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Accept-Ranges", "bytes");
        response.pipe(res);
      }).on("error", (err) => {
        console.error("Error streaming PDF:", err);
        res.status(500).json({ message: "Error streaming PDF" });
      });
    } else {
      // Range request: partial content
      const bytesPrefix = "bytes=";
      if (!range.startsWith(bytesPrefix)) {
        return res.status(416).json({ message: "Invalid Range format" });
      }

      const [startStr, endStr] = range.substring(bytesPrefix.length).split("-");
      const start = parseInt(startStr, 10);
      let end = endStr ? parseInt(endStr, 10) : null;

      // HEAD request to get content length
      const headOptions = {
        method: "HEAD",
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        port: urlObj.port || (urlObj.protocol === "https:" ? 443 : 80),
      };

      const headReq = client.request(headOptions, (headRes) => {
        const contentLength = parseInt(headRes.headers["content-length"], 10);
        if (!contentLength) {
          return res.status(500).json({ message: "Could not get content length" });
        }

        if (isNaN(start) || start >= contentLength) {
          return res.status(416).json({ message: "Range Not Satisfiable" });
        }

        if (end === null || end >= contentLength) {
          end = contentLength - 1;
        }

        const chunkSize = end - start + 1;

        // Set response headers for partial content
        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${contentLength}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "application/pdf",
        });

        // Request partial content from remote with Range header
        const rangeOptions = {
          method: "GET",
          hostname: urlObj.hostname,
          path: urlObj.pathname + urlObj.search,
          port: urlObj.port || (urlObj.protocol === "https:" ? 443 : 80),
          headers: {
            Range: `bytes=${start}-${end}`,
          },
        };

        const rangeReq = client.request(rangeOptions, (rangeRes) => {
          if (![200, 206].includes(rangeRes.statusCode)) {
            return res.status(rangeRes.statusCode).json({ message: "Failed to fetch PDF range" });
          }
          rangeRes.pipe(res);
        });

        rangeReq.on("error", (err) => {
          console.error("Error fetching PDF range:", err);
          res.status(500).json({ message: "Error fetching PDF range" });
        });

        rangeReq.end();
      });

      headReq.on("error", (err) => {
        console.error("Error on HEAD request:", err);
        res.status(500).json({ message: "Error fetching PDF metadata" });
      });

      headReq.end();
    }
  } catch (err) {
    console.error("Streaming error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
