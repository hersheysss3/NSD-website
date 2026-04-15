import express from 'express';
import VetClinic from '../Schemas/VetClinicSchema.js';

const router = express.Router();

// Get all vet clinics
router.get('/', async (req, res) => {
  try {
    const clinics = await VetClinic.find({ isVerified: true }).sort({ createdAt: -1 });
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get clinics near a location
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, maxDistance } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const distance = maxDistance ? parseInt(maxDistance) : 10000; // Default 10km

    const clinics = await VetClinic.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: distance,
        },
      },
      isVerified: true,
    });

    res.json(clinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single clinic
router.get('/:id', async (req, res) => {
  try {
    const clinic = await VetClinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }
    res.json(clinic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new vet clinic
router.post('/', async (req, res) => {
  try {
    const { name, address, phone, hours, lat, lng, userId } = req.body;

    if (!name || !address || !phone || !hours || !lat || !lng) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const clinic = new VetClinic({
      name,
      address,
      phone,
      hours,
      lat,
      lng,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
      },
      addedBy: userId || null,
    });

    const newClinic = await clinic.save();
    res.status(201).json(newClinic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a clinic
router.put('/:id', async (req, res) => {
  try {
    const clinic = await VetClinic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    res.json(clinic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a clinic
router.delete('/:id', async (req, res) => {
  try {
    const clinic = await VetClinic.findByIdAndDelete(req.params.id);
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }
    res.json({ message: 'Clinic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
