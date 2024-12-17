import User from "../../models/Users.js";
import argon2 from "argon2";

/**
 * Register a new user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    let hashedPassword
    // Validate request body
    if (!fullName || !email) {
      return res.status(400).json({
        message: "All fields except password are required. Please provide fullName and email.",
      });
    }
    // If password is provided, hash it. Otherwise, set it to null.
  if (password == null){
    hashedPassword = null
  }
    if (password !== undefined && password !== null) {
      hashedPassword = await argon2.hash(password); // Hash password if provided
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered. Please log in instead.",
      });
    }

    // Create a new user instance
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword, // Password will be either null or hashed
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({
      message: "User registered successfully! Welcome to our platform!",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "An error occurred during registration. Please try again later.",
    });
  }
};









export { registerUser };
