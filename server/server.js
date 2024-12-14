import dotenv from "dotenv";

import mongoose from "mongoose";
import express from "express";
const app = express();
dotenv.config();
// const DB_URL =
//   "mongodb+srv://ShreeKalamAcademy:69696969@ska.qi4ln.mongodb.net/?retryWrites=true&w=majority&appName=SKA";
// const PORT = 5000;
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
  res.send("Shree Kalam Academy: Endless Possiblities!!!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
