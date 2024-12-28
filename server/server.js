import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();
app.use(cors());
app.use(express.json()); // Make sure JSON parsing is enabled for incoming requests

dotenv.config();

const DB_URL = process.env.DB_URL;
const PORT = 5000;

// MongoDB Connection
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Define a sample route
app.get("/", (req, res) => {
  res.send("Shree Kalam Academy: Endless Possibilities!!!");
});

// API Routes
app.use("/api", userRoutes);
app.use("/api/courses", courseRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
