import Razorpay from 'razorpay';
import crypto from 'crypto';
import Donation from '../Schemas/DonationSchema.js'; 
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function createOrder(req, res) {
  try {
    const { amount, donorName, donorEmail, donorPhone } = req.body;

    if (!amount || !donorName || !donorEmail || !donorPhone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `donation_${Date.now()}`,
      notes: {
        donor_name: donorName,
        donor_email: donorEmail,
        donor_phone: donorPhone,
      },
    };

    const order = await razorpay.orders.create(options);

    const donation = new Donation({
      orderId: order.id,
      amount,
      donorName,
      donorEmail,
      donorPhone,
      status: 'created',
    });

    await donation.save();

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
}

async function verifyPayment(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: 'paid',
          updatedAt: new Date(),
        }
      );
      return res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          status: 'failed',
          updatedAt: new Date(),
        }
      );
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
}

async function getDonation(req, res) {
  try {
    const { orderId } = req.params;
    const donation = await Donation.findOne({ orderId });

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    res.json({
      success: true,
      donation: {
        orderId: donation.orderId,
        amount: donation.amount,
        donorName: donation.donorName,
        donorEmail: donation.donorEmail,
        status: donation.status,
        createdAt: donation.createdAt,
      },
    });
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch donation details' });
  }
}

async function getAllDonations(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const donations = await Donation.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-signature');

    const total = await Donation.countDocuments();

    res.json({
      success: true,
      donations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch donations' });
  }
}

export {
  createOrder,
  verifyPayment,
  getDonation,
  getAllDonations,
};
