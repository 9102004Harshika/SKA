import express from "express";
import { deleteFile,deleteUrl,deleteVideoUrl ,requestStream, streamPdf} from "../controllers/fileController.js";
import multer from 'multer'
const router = express.Router();
// Route to delete a file
router.post("/deleteFile", deleteFile);
router.post("/deleteUrl", deleteUrl);
router.post("/deleteVideoUrl", deleteVideoUrl);
router.post("/requestStream",requestStream)
router.get("/getStream/:token",streamPdf)

export default router;
