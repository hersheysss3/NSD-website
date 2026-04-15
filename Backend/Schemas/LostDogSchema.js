import mongoose from 'mongoose';

const lostDogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
  },
  dateLost: {
    type: Date,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isFound: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['lost', 'found', 'resolved'],
    default: 'lost',
  },
}, {
  timestamps: true,
});

// Create geospatial index
lostDogSchema.index({ location: '2dsphere' });

const LostDog = mongoose.model('LostDog', lostDogSchema);

export default LostDog;
