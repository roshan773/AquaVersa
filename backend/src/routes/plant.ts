import { Router } from 'express';
import Plant from '../models/plant';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// GET all plants
router.get('/', async (req, res) => {
  try {
    const { search, category, difficulty, co2Needs, lightingNeeds, growthRate } = req.query;
    const query: any = {};

    if (search) {
      query.$text = { $search: search as string };
    }
    if (category) {
      query.category = category;
    }
    if (difficulty) {
      query.difficulty = difficulty;
    }
    if (co2Needs) {
      query.co2Needs = co2Needs === 'true';
    }
    if (lightingNeeds) {
      query.lightingNeeds = lightingNeeds;
    }
    if (growthRate) {
      query.growthRate = growthRate;
    }

    const plants = await Plant.find(query);
    return res.json(plants);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// GET single plant by slug
router.get('/:slug', async (req, res) => {
  try {
    const plant = await Plant.findOne({ slug: req.params.slug })
      .populate('compatibleFish', 'commonName scientificName slug images difficulty');

    if (!plant) {
      return res.status(404).json({ error: 'Plant species not found' });
    }
    return res.json(plant);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST create plant (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const newPlant = new Plant(req.body);
    await newPlant.save();
    return res.status(201).json(newPlant);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT update plant (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Plant species not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE plant (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Plant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Plant species not found' });
    return res.json({ message: 'Plant species deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
