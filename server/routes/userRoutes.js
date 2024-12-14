import express from "express";
import { registerUser } from "../controllers/auth/authorization";

const router = express.Router();

router.post("/register", registerUser);

export default router;
