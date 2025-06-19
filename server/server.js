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
import quotesRoutes from "./routes/quotesRoute.js";
import cron from "node-cron";
import { cleanupCachedPdfs } from "./utils/cleanupCachedPdfs.js";

const app = express();
app.use(cors());
app.use(express.json()); // Make sure JSON parsing is enabled for incoming requests

dotenv.config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

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

  cron.schedule("* * * * *", async () => {
    console.log("⏰ Running scheduled PDF cache cleanup...");
    await cleanupCachedPdfs();
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
app.use("/api/quotes", quotesRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
