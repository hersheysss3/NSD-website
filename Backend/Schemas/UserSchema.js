import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide name"],
    trim: true
  },
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Provide email"],
    trim: true,
    unique: true,
    lowercase: true
  },
  occupation: {
    type: String,
    required: [true, "Provide occupation"],
    trim: true
  },
  dob: {
    type: Date,
    required: [true, "Provide date of birth"]
  },
  password: {
    type: String,
    required: [true, "Provide password"],
    trim: true
  },
  image: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    required: [true, "Provide phone number"],
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }],
  dogsForAdoption: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dog'
  }],
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  favorites: {
    blogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }],
    dogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dog'
    }]
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


const User = mongoose.model("User", UserSchema);
export default User;