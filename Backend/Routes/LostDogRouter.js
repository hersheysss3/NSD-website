import express from 'express';
import LostDog from '../Schemas/LostDogSchema.js';

const router = express.Router();

// Get all lost dogs
router.get('/', async (req, res) => {
  try {
    const lostDogs = await LostDog.find({ status: 'lost' }).sort({ dateLost: -1 });
    res.json(lostDogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get lost dogs near a location
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, maxDistance } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const distance = maxDistance ? parseInt(maxDistance) : 10000; // Default 10km

    const lostDogs = await LostDog.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: distance,
        },
      },
      status: 'lost',
    });

    res.json(lostDogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single lost dog
router.get('/:id', async (req, res) => {
  try {
    const dog = await LostDog.findById(req.params.id);
    if (!dog) {
      return res.status(404).json({ message: 'Lost dog report not found' });
    }
    res.json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Report a lost dog
router.post('/', async (req, res) => {
  try {
    const { name, description, breed, color, contact, dateLost, lat, lng, image, userId } = req.body;

    if (!name || !description || !contact || !dateLost || !lat || !lng) {
      return res.status(400).json({ message: 'Required fields: name, description, contact, dateLost, lat, lng' });
    }

    const dog = new LostDog({
      name,
      description,
      breed,
      color,
      contact,
      dateLost,
      lat,
      lng,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
      },
      image,
      reportedBy: userId || null,
    });

    const newDog = await dog.save();
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a lost dog report
router.put('/:id', async (req, res) => {
  try {
    const dog = await LostDog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!dog) {
      return res.status(404).json({ message: 'Lost dog report not found' });
    }

    res.json(dog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark a dog as found
router.patch('/:id/found', async (req, res) => {
  try {
    const dog = await LostDog.findByIdAndUpdate(
      req.params.id,
      { status: 'found', isFound: true },
      { new: true }
    );

    if (!dog) {
      return res.status(404).json({ message: 'Lost dog report not found' });
    }

    res.json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a lost dog report
router.delete('/:id', async (req, res) => {
  try {
    const dog = await LostDog.findByIdAndDelete(req.params.id);
    if (!dog) {
      return res.status(404).json({ message: 'Lost dog report not found' });
    }
    res.json({ message: 'Lost dog report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
