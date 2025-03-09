import express from "express";
import { deleteFile,deleteUrl,deleteVideoUrl } from "../controllers/fileController.js";

const router = express.Router();
// Route to delete a file
router.post("/deleteFile", deleteFile);
router.post("/deleteUrl", deleteUrl);
router.post("/deleteVideoUrl", deleteVideoUrl);

export default router;
