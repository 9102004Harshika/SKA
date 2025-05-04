import express from "express";
import {
  createNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/add", createNotification);
router.get("/list", getNotifications);
router.patch("/read/:id", markAsRead);

export default router;
