import VolunteerSchema from "../Schemas/VolunteerSchema,js";
export async function createVolunteer (req, res) {
  try {
    const volunteer = new VolunteerSchema(req.body);
    const savedVolunteer = await volunteer.save();
    res.status(201).json(savedVolunteer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};