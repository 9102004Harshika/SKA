import express from "express";
import { deleteFile } from "../controllers/fileController.js";

const router = express.Router();
// Route to delete a file
router.post("/deleteFile", deleteFile);

export default router;
