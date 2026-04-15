import express from 'express';

const router = express.Router();

// Proxy route to fetch vet clinics from OpenStreetMap Overpass API
// This bypasses CORS issues when calling Overpass from the browser
router.get('/vet-clinics', async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    const latitude = lat || 21.1458;
    const longitude = lng || 79.0882;
    const searchRadius = radius || 15000;

    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="veterinary"](around:${searchRadius},${latitude},${longitude});
        way["amenity"="veterinary"](around:${searchRadius},${latitude},${longitude});
        relation["amenity"="veterinary"](around:${searchRadius},${latitude},${longitude});
        node["amenity"="animal_hospital"](around:${searchRadius},${latitude},${longitude});
        node["shop"="pet"](around:${searchRadius},${latitude},${longitude});
      );
      out center;
    `;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!response.ok) {
      throw new Error(`Overpass API returned ${response.status}`);
    }

    const data = await response.json();

    const clinics = data.elements
      .filter((element) => element.lat || (element.center && element.center.lat))
      .map((element) => {
        const elLat = element.lat || (element.center && element.center.lat) || latitude;
        const elLng = element.lon || (element.center && element.center.lon) || longitude;
        return {
          _id: `osm_${element.type}_${element.id}`,
          name: element.tags?.name || element.tags?.brand || 'Veterinary Clinic',
          lat: elLat,
          lng: elLng,
          address: element.tags?.['addr:street']
            ? `${element.tags['addr:street']} ${element.tags['addr:housenumber'] || ''}, ${element.tags['addr:city'] || 'Nagpur'}`
            : 'Nagpur',
          phone: element.tags?.phone || element.tags?.['contact:phone'] || null,
          hours: element.tags?.opening_hours || null,
          website: element.tags?.website || element.tags?.['contact:website'] || null,
          type: 'vet',
        };
      });

    res.json(clinics);
  } catch (error) {
    console.error('Error fetching from Overpass API:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
