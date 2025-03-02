import express from "express";
import { deleteFile,deleteUrl } from "../controllers/fileController.js";

const router = express.Router();
// Route to delete a file
router.post("/deleteFile", deleteFile);
router.post("/deleteUrl", deleteUrl);

export default router;
