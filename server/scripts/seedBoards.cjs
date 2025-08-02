// scripts/seedBoards.js
const mongoose = require("mongoose");
require("dotenv").config();

// Define the board schema
const boardSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  grades: { type: [Number], required: true },
});

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Board = mongoose.model("Board", boardSchema);

// Boards data to be inserted
const boardsData = [
  {
    name: "IGCSE",
    grades: [4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    name: "CBSE",
    grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    name: "ICSE",
    grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    name: "IB",
    grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    name: "State Board",
    grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Board.deleteMany({});
    console.log("Cleared existing boards data");

    // Insert new data
    const result = await Board.insertMany(boardsData);
    console.log(`Successfully inserted ${result.length} boards`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Execute the seed function
seedDatabase();
