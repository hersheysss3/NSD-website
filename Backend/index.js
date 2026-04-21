import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRouter from "./Routes/UserRouter.js";
import blogRouter from "./Routes/BlogRouter.js";
import dogRouter from "./Routes/DogRouter.js";
import volunteerRouter from "./Routes/VolunteerRouter.js";
import User from "./Schemas/UserSchema.js";
import Blog from "./Schemas/BlogSchema.js";
import Dog from "./Schemas/DogSchema.js";
import Donationrouter from "./Routes/DonationRouter.js";
import vetClinicRouter from "./Routes/VetClinicRouter.js";
import lostDogRouter from "./Routes/LostDogRouter.js";
import overpassRouter from "./Routes/OverpassRouter.js";
import { verifyToken } from "./Middleware/auth.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path'
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express();
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
const allowedOrigins = [
  "http://localhost:5173",
  "https://wooferz.onrender.com",
  "https://nsd-backend-wooferz-v1234.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Only if using cookies or auth
}));
app.use(express.json());
const PORT=process.env.PORT || 8000;
app.use("/api/user",userRouter);
app.use("/blog",blogRouter);
app.use("/api/dog",dogRouter);
app.use("/api/volunteer",volunteerRouter);
app.use("/api/donation",Donationrouter);
app.use("/api/vet-clinics", vetClinicRouter);
app.use("/api/lost-dogs", lostDogRouter);
app.use("/api/overpass", overpassRouter);


// Get user profile
app.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate({
        path: 'dogsForAdoption',
        match: { isAdopted: false } // Only show non-adopted dogs
      })
      .populate({
        path: 'blogs',
        select: 'title banner publishedAt activity',
        options: { sort: { publishedAt: -1 } }
      })
      .exec();
      
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a dog
// Delete a dog
app.delete('/dog/:dogId', verifyToken, async (req, res) => {
  try {
    const { dogId } = req.params;
    const { userId } = req.body;
    
    const dog = await Dog.findById(dogId);
    
    if (!dog) {
      return res.status(404).json({ message: 'Dog not found' });
    }
    
    // Verify user owns the dog
    if (dog.owner.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Remove dog from user's dogsForAdoption array
    await User.findByIdAndUpdate(userId, {
      $pull: { dogsForAdoption: dogId }
    });
    
    // Delete the dog
    await Dog.findByIdAndDelete(dogId);
    
    res.json({ message: 'Dog removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a blog
app.delete('/blog/:blogId', verifyToken, async (req, res) => {
  try {
    const { blogId } = req.params;
    const { userId } = req.body;
    
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Verify user is the author
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Remove blog from user's blogs array
    await User.findByIdAndUpdate(userId, {
      $pull: { blogs: blogId }
    });
    
    // Delete the blog
    await Blog.findByIdAndDelete(blogId);
    
    res.json({ message: 'Blog removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// app.use("/api/problem",ProblemRouter);
// app.listen(PORT,()=>{
//     console.log(`server listening on port ${PORT}`);
// })
const MONGODB_URL=process.env.MONGODB_URL;
if(!MONGODB_URL){
    console.log("url not found");
}
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    console.log("Server will start without MongoDB connection");
  });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});