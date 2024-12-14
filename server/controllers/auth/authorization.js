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

    // Validate request body
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message:
          "All fields are required. Please provide fullName, email, and password.",
      });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered. Please log in instead.",
      });
    }

    // Encrypt the password
    const hashedPassword = await argon2.hash(password);

    // Create a new user instance
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
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
