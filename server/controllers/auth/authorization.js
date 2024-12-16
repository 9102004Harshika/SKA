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

import { OAuth2Client } from "google-auth-library";


const client = new OAuth2Client("186528455819-lv45ts5lvieg87p536o2ka61qd5uaprc.apps.googleusercontent.com");

const registerWithGoogle = async (req, res) => {
  try {
    const { googleToken } = req.body; 
    if (!googleToken) {
      return res.status(400).json({ message: "Google token is required." });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: "186528455819-lv45ts5lvieg87p536o2ka61qd5uaprc.apps.googleusercontent.com", // Specify your client ID
    });
    const payload=ticket.payload
    // Check if the user already exists
    const existingUser = await User.findOne({ fullName: payload.name });
    if (existingUser) {
      return res.status(200).json({ success: true, user: existingUser });
    }

    // Create a new user
    const newUser = new User({
      fullName: payload.name,
      email: payload.email,
      password: null, // Google sign-up doesn't need a password
    });

    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error during Google registration:", error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
};



export { registerUser,registerWithGoogle };
