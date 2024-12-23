import User from "../../models/Users.js";
import argon2 from "argon2";

/**
 * Register a new user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, loginMode } = req.body;

    let hashedPassword;

    // Validate request body
    if (!fullName || !email || !loginMode) {
      return res.status(400).json({
        message: "Looks like you have submitted incorrect form, Please provide neccessary details to proceed .",
      });
    }

    // Validate login mode
    const validLoginModes = ["email", "google"];
    if (!validLoginModes.includes(loginMode)) {
      return res.status(400).json({ 
        message: "Invalid login mode. Allowed values are 'email' and 'google'.",
      });
    }

    // For email login mode, password is mandatory
    if (loginMode === "email" && (!password || password.trim() === "")) {
      return res.status(400).json({
        message: "Password is mandatory for completing registration. Please provide a valid password",
      });
    }

    // Handle password hashing only if provided
    if (password) {
      hashedPassword = await argon2.hash(password); // Hash the password if provided
    } else {
      hashedPassword = null; // Set password to null for Google login
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
      loginMode, // Store the login mode (email/google)
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

const loginUser = async (req, res) => {
  const { email, password, loginMode } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not known,please check email again or register" });
    }

    // If the user registered with Google (no password), allow only Google login
    if (user.password === null) {
      if (loginMode === "google") {
        return res.status(200).json({
          message: "Google login detected. Please use Google to sign in.",
          user: user,
        });
      }
      return res.status(400).json({ message: "Looks like you have registered using google , please login using google only ." });
    }

    // If the user registered with email, they can log in with either email or Google
    if (loginMode === "email") {
      // Ensure that the password is provided for email login
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      // Verify the password with the stored hash
      const isValid = await argon2.verify(user.password, password);
      if (!isValid) {
        return res.status(400).json({ message: "Invalid password" });
      }

      // Successful email login
      return res.status(200).json({
        message: "Login successful",
        user: user, // Send user data back
      });
    }

    // If loginMode is Google, allow Google login if user has registered with email and password
    if (loginMode === "google") {
      return res.status(200).json({
        message: "Google login detected. Please use Google to sign in.",
        user: user,
      });
    }

    // If loginMode is neither email nor google, respond with an error
    return res.status(400).json({ message: "Invalid login mode" });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const enrollUser = async (req, res) => {
  try {
    const { email, mobile, dob, state, city, board, class:StudentClass ,stream,gender} = req.body;

    // Validate the request data
    
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // Ensure the user is not already enrolled
    if (user.isEnrolled) {
      return res.status(400).json({ message: "You are already enrolled." });
    }

    // Update the user's enrollment details and mark them as enrolled
    user.isEnrolled = true;
   const enrollmentDetails = {
      mobile,
      dob,
      state,
      city,
      board,
      class:StudentClass,
      gender
    };
    if (StudentClass === "11th" || StudentClass === "12th") {
      enrollmentDetails.stream = stream;
    }

    user.enrollmentDetails = enrollmentDetails;
    // Save the updated user data to the database
    await user.save();

    // Respond with success
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
    res.status(500).json({ message: "An error occurred during enrollment. Please try again later." });
  }
};





export { registerUser,loginUser,enrollUser };
