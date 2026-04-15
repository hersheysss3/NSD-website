import Dog from "../Schemas/DogSchema.js";
import User from "../Schemas/UserSchema.js";
import { v2 as cloudinaryV2 } from "cloudinary";

// Configure Cloudinary
cloudinaryV2.config({
  cloud_name: "doczqznfj",
  api_key: "331487941319189",
  api_secret: "ZxPE3EDiA6M8dnsv8TiI3bRHqjE",
});

// Upload dog images to Cloudinary
export const uploadDogImages = async (req, res) => {
  try {
    // const { userId } = req.params;
    // console.log("User ID:", userId);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded." });
    }

    const uploadPromises = req.files.map(async (file) => {
      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      
      const result = await cloudinaryV2.uploader.upload(base64Image, {
        folder: "Wooferz/Dogs",
        timeout: 60000,
      });
      
      return result.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromises);

    res.status(200).json({
      message: "Dog images uploaded successfully.",
      imageUrls: imageUrls,
    });
  } catch (error) {
    console.error("Error uploading dog images:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
export const getAllDogs = async (req, res) => {
  console.log("yes");
  try {
    const { page = 1, limit = 12, city, breed, size, urgent } = req.query;
    
    // Build filter object
    const filter = { isAdopted: false };
    
    if (city && city.trim()) {
      filter['location.city'] = { $regex: city.trim(), $options: 'i' };
    }
    
    if (breed && breed.trim()) {
      filter.breed = { $regex: breed.trim(), $options: 'i' };
    }
    
    if (size && size.trim()) {
      filter.size = size.trim();
    }
    
    if (urgent === 'true') {
      filter.urgent = true;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get total count for pagination
    const totalDogs = await Dog.countDocuments(filter);
    const totalPages = Math.ceil(totalDogs / parseInt(limit));

    // Fetch dogs with only card-required fields
    const dogs = await Dog.find(filter)
      .select('name breed age gender size color images location.city location.state healthStatus.vaccinated healthStatus.neutered urgent views createdAt')
      .sort({ urgent: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.json({
      success: true,
      dogs,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalDogs,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Error fetching dogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dogs',
      error: error.message
    });
  }
};


















// Get all dogs with filters and pagination
// export const getAllDogs = async (req, res) => {
//   try {
//     const { city, breed, size, page = 1, limit = 12 } = req.query;
    
//     const query = { isAdopted: false };
    
//     if (city) query['location.city'] = new RegExp(city, 'i');
//     if (breed) query.breed = new RegExp(breed, 'i');
//     if (size) query.size = size;

//     const dogs = await Dog.find(query)
//       .populate('owner', 'name email phone address')
//       .sort({ urgent: -1, createdAt: -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit);

//     const totalDogs = await Dog.countDocuments(query);

//     res.json({
//       success: true,
//       dogs,
//       totalPages: Math.ceil(totalDogs / limit),
//       currentPage: page,
//       totalDogs
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Get single dog details
export const getDogById = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id)
      .populate('owner', 'name email occupation phone image ');
    
    if (!dog) {
      return res.status(404).json({ success: false, message: 'Dog not found' });
    }

    res.json({ success: true, dog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new dog for adoption
export const createDog = async (req, res) => {
  try {
    const { name, owner } = req.body;

    // Check if the owner already has a dog with the same name
    const existingDog = await Dog.findOne({ name: name.trim(), owner });

    if (existingDog) {
      return res.status(400).json({
        success: false,
        message: 'You have already listed a dog with this name.'
      });
    }

    const dogData = {
      ...req.body
    };

    console.log('New Dog Data:', dogData);

    const dog = new Dog(dogData);
    await dog.save();

    // Add dog to user's dogsForAdoption array
    await User.findByIdAndUpdate(
      dogData.owner,
      { $push: { dogsForAdoption: dog._id } }
    );

    res.status(201).json({ success: true, dog });
  } catch (error) {
    console.error('Error creating dog:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};


// Update dog details
export const updateDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    
    if (!dog) {
      return res.status(404).json({ success: false, message: 'Dog not found' });
    }

    if (dog.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const updatedDog = await Dog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ success: true, dog: updatedDog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Mark dog as adopted
export const adoptDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    
    if (!dog) {
      return res.status(404).json({ success: false, message: 'Dog not found' });
    }

    if (dog.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only owner can mark as adopted' });
    }

    dog.isAdopted = true;
    dog.adoptedBy = req.body.adoptedBy; // ID of adopter (optional)
    dog.adoptedAt = new Date();
    
    await dog.save();

    res.json({ success: true, message: 'Dog marked as adopted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete dog listing
export const deleteDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    
    if (!dog) {
      return res.status(404).json({ success: false, message: 'Dog not found' });
    }

    if (dog.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Dog.findByIdAndDelete(req.params.id);
    
    // Remove from user's dogsForAdoption array
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { dogsForAdoption: req.params.id } }
    );

    res.json({ success: true, message: 'Dog listing deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's posted dogs
export const getUserDogs = async (req, res) => {
  try {
    const dogs = await Dog.find({ owner: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ success: true, dogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get trending/featured dogs
export const getTrendingDogs = async (req, res) => {
  try {
    const dogs = await Dog.find({ isAdopted: false })
      .populate('owner', 'name email phone address')
      .sort({ urgent: -1, createdAt: -1 })
      .limit(6);

    res.json({ success: true, dogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get dogs by specific breed
export const getDogsByBreed = async (req, res) => {
  try {
    const { breed } = req.body;
    
    const dogs = await Dog.find({ 
      breed: new RegExp(breed, 'i'), 
      isAdopted: false 
    })
      .populate('owner', 'name email phone address')
      .sort({ urgent: -1, createdAt: -1 });

    res.json({ success: true, dogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get dogs by location
export const getDogsByLocation = async (req, res) => {
  try {
    const { city, state } = req.body;
    
    const query = { isAdopted: false };
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (state) query['location.state'] = new RegExp(state, 'i');

    const dogs = await Dog.find(query)
      .populate('owner', 'name email phone address')
      .sort({ urgent: -1, createdAt: -1 });

    res.json({ success: true, dogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};