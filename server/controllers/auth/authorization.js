import User from "../../models/Users.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Register a new user
 */
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, loginMode } = req.body;
    let hashedPassword;

    if (!fullName || !email || !loginMode) {
      return res.status(400).json({
        message:
          "Looks like you have submitted incorrect form, Please provide necessary details to proceed.",
      });
    }

    const validLoginModes = ["email", "google"];
    if (!validLoginModes.includes(loginMode)) {
      return res.status(400).json({
        message: "Invalid login mode. Allowed values are 'email' and 'google'.",
      });
    }

    if (loginMode === "email" && (!password || password.trim() === "")) {
      return res.status(400).json({
        message:
          "Password is mandatory for completing registration. Please provide a valid password.",
      });
    }

    if (password) {
      hashedPassword = await argon2.hash(password);
    } else {
      hashedPassword = null;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered. Please log in instead.",
      });
    }

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      loginMode,
      role: "user", // default role
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully! Welcome to our platform!",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
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

/**
 * Login user
 */
const loginUser = async (req, res) => {
  const { email, password, loginMode } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not known, please check email again or register",
      });
    }

    if (user.password === null) {
      if (loginMode === "google") {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        );
        return res.status(200).json({
          message: "Google login detected. Please use Google to sign in.",
          token,
          user,
        });
      }
      return res.status(400).json({
        message:
          "Looks like you have registered using Google, please login using Google only.",
      });
    }

    if (loginMode === "email") {
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const isValid = await argon2.verify(user.password, password);
      if (!isValid) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          isEnrolled: user.isEnrolled,
          role: user.role,
          instructor: user.instructor,
          enrollmentDetails: user.enrollmentDetails || {},
        },
      });
    }

    if (loginMode === "google") {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );
      return res.status(200).json({
        message: "Google login detected. Please use Google to sign in.",
        token,
        user,
      });
    }

    return res.status(400).json({ message: "Invalid login mode" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Enroll user
 */
const enrollUser = async (req, res) => {
  try {
    const {
      email,
      mobile,
      dob,
      state,
      city,
      board,
      class: StudentClass,
      stream,
      gender,
    } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }

    if (user.isEnrolled) {
      return res.status(400).json({ message: "You are already enrolled." });
    }

    user.isEnrolled = true;
    const enrollmentDetails = {
      mobile,
      dob,
      state,
      city,
      board,
      class: StudentClass,
      gender,
    };

    if (StudentClass === "11th" || StudentClass === "12th") {
      enrollmentDetails.stream = stream;
    }

    user.enrollmentDetails = enrollmentDetails;
    await user.save();

    res.status(200).json({
      message: "Enrollment successful!",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isEnrolled: user.isEnrolled,
        enrollmentDetails: user.enrollmentDetails,
      },
    });
  } catch (error) {
    console.error("Error enrolling user:", error);
    res.status(500).json({
      message: "An error occurred during enrollment. Please try again later.",
    });
  }
};

/**
 * Register a new admin
 */
const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message:
          "Full name, email, and password are required to register an admin.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered. Please use another email.",
      });
    }

    const hashedPassword = await argon2.hash(password);

    const newAdmin = new User({
      fullName,
      email,
      password: hashedPassword,
      loginMode: "email",
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin registered successfully!",
      user: {
        id: newAdmin._id,
        fullName: newAdmin.fullName,
        email: newAdmin.email,
        role: newAdmin.role,
        createdAt: newAdmin.createdAt,
      },
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({
      message:
        "An error occurred during admin registration. Please try again later.",
    });
  }
};

export { registerUser, loginUser, enrollUser, registerAdmin };
