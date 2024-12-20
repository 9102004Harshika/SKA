import express from "express";
import { loginUser, registerUser,enrollUser} from "../controllers/auth/authorization.js";
const router = express.Router();

// Register route
router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/enroll", enrollUser);
export default router;
