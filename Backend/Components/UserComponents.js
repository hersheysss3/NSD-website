import User from "../Schemas/UserSchema.js";
import uploadImageCloudinary from "../Utils/uploadImage.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { userIdCreation } from "../Utils/UserIdCreation.js";

// Helper function to create comprehensive JWT tokens
const createUserToken = (user) => {
  const tokenPayload = {
    _id: user._id,
    userId: user.userId,
    name: user.name,
    email: user.email,
    image: user.image,
    occupation: user.occupation,
    dob: user.dob,
    phone: user.phone,
    address: user.address,
    blogs: user.blogs,
    dogsForAdoption: user.dogsForAdoption,
    favorites: user.favorites,
    // Add token expiration (7 days)
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
  return token;
};

export async function Register(req, res) {
  const { name, email, password, confirmPassword, occupation, dob, phone, address } = req.body;
  const file = req.file;

  // Validation
  if (!name || !email || !password || !confirmPassword || !occupation || !dob || !phone) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  try {
    // Check if user exists - optimized to single query
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Handle image upload
    let imageUrl = null;
    if (file) {
      const uploadResult = await uploadImageCloudinary(file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      email,
      occupation,
      dob,
      phone,
      address: address || null, // Handle optional address
      userId: userIdCreation(),
      password: hashedPassword,
      image: imageUrl,
    });

    console.log("JWT Secret is:", process.env.JWT_SECRET);
    
    // Generate comprehensive JWT token
    const token = createUserToken(newUser);

    // Return response without sensitive data
    const userResponse = {
      _id: newUser._id,
      userId: newUser.userId,
      name: newUser.name,
      email: newUser.email,
      occupation: newUser.occupation,
      dob: newUser.dob,
      phone: newUser.phone,
      address: newUser.address,
      image: newUser.image,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
      token: token
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function Signin(req, res) {
  const { email, password } = req.body;
  
  try {
    // Find user and populate related data
    const user = await User.findOne({ email }).populate('blogs dogsForAdoption favorites');
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist"
      });
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate comprehensive JWT token
    const token = createUserToken(user);

    return res.status(200).json({
      success: true,
      message: "User successfully logged in",
      token: token,
      user: {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        image: user.image,
        occupation: user.occupation,
        phone: user.phone,
        address: user.address,
        blogs: user.blogs,
        dogsForAdoption: user.dogsForAdoption,
        favorites: user.favorites
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Optional: Function to verify token without middleware (for manual verification)
export const verifyUserToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { success: true, user: decoded };
  } catch (error) {
    return { success: false, message: 'Token invalid or expired' };
  }
};

// Optional: Function to get user data from token
export const getUserFromToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).populate('blogs dogsForAdoption favorites');
    return { success: true, user };
  } catch (error) {
    return { success: false, message: 'Token invalid or user not found' };
  }
};