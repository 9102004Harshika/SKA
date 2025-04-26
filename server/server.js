import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import carouselRoutes from "./routes/carouselRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

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
app.use("/api/notes", notesRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/notification", notificationRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
