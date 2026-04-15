import mongoose from "mongoose";

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide dog's name"],
    trim: true
  },
  breed: {
    type: String,
    required: [true, "Provide breed"],
    trim: true
  },
  age: {
    type: Number,
    required: [true, "Provide age in months"]
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, "Provide gender"]
  },
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    required: [true, "Provide size"]
  },
  color: {
    type: String,
    required: [true, "Provide color"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Provide description"],
    maxlength: 1000
  },
  images: [{
    type: String, // Cloudinary URLs
    required: true
  }],
  healthStatus: {
    vaccinated: {
      type: Boolean,
      default: false
    },
    neutered: {
      type: Boolean,
      default: false
    },
    medicalHistory: {
      type: String,
      default: ""
    }
  },
  location: {
    city: {
      type: String,
      required: [true, "Provide city"],
      trim: true
    },
    state: {
      type: String,
      required: [true, "Provide state"],
      trim: true
    },
    pincode: {
      type: String,
      required: [true, "Provide pincode"],
      trim: true
    },
    address: {
      type: String,
      trim: true
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isAdopted: {
    type: Boolean,
    default: false
  },
  adoptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  adoptedAt: {
    type: Date,
    default: null
  },
  contactPreference: {
    type: String,
    enum: ['phone', 'email', 'both'],
    default: 'both'
  },
  urgent: {
    type: Boolean,
    default: false
  },
  // Additional fields for better functionality
  temperament: {
    type: [String], // e.g., ['Friendly', 'Energetic', 'Calm']
    default: []
  },
  goodWith: {
    children: {
      type: Boolean,
      default: false
    },
    cats: {
      type: Boolean,
      default: false
    },
    dogs: {
      type: Boolean,
      default: false
    }
  },
  energyLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  specialNeeds: {
    type: String,
    default: ""
  },
  adoptionFee: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  inquiries: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

// Indexes for better search performance
DogSchema.index({ 'location.city': 1, breed: 1, isAdopted: 1 });
DogSchema.index({ size: 1, isAdopted: 1 });
DogSchema.index({ urgent: -1, createdAt: -1 });
DogSchema.index({ owner: 1 });

// Pre-save middleware to increment views
DogSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

const Dog = mongoose.model("Dog", DogSchema);
export default Dog;