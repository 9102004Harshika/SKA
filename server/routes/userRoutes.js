import express from "express";
import {
  loginUser,
  registerUser,
  enrollUser,
  registerAdmin,
} from "../controllers/auth/authorization.js";
const router = express.Router();

// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/enroll", enrollUser);
router.post("/createAdmin", registerAdmin);
export default router;
