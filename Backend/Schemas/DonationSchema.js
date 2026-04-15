import mongoose from "mongoose"
const donationSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  paymentId: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  donorName: { type: String, required: true },
  donorEmail: { type: String, required: true },
  donorPhone: { type: String, required: true },
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
  signature: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation