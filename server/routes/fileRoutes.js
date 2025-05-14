import express from "express";
import { deleteFile,deleteUrl,deleteVideoUrl,compressPdf } from "../controllers/fileController.js";
import multer from 'multer'
const router = express.Router();
const upload = multer({ dest: "temp_uploads/" });
// Route to delete a file
router.post("/deleteFile", deleteFile);
router.post("/deleteUrl", deleteUrl);
router.post("/deleteVideoUrl", deleteVideoUrl);
router.post("/compressPdf", upload.single("pdf"), compressPdf);

export default router;
