import { Router } from 'express';
import Fish from '../models/fish';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';
import { broadcastToSubscribers } from '../services/emailService';

const router = Router();

// GET all fish with filtering, sorting, search and pagination
router.get('/', async (req, res) => {
  try {
    const { search, difficulty, waterType, temperament, minTankSize, limit = 12, page = 1 } = req.query;
    const query: any = {};

    if (search) {
      query.$text = { $search: search as string };
    }
    if (difficulty) {
      query.difficulty = difficulty;
    }
    if (waterType) {
      query['waterParams.waterType'] = waterType;
    }
    if (temperament) {
      query.temperament = temperament;
    }
    if (minTankSize) {
      query['minTankSize.gallons'] = { $lte: parseInt(minTankSize as string) };
    }

    const limitNum = Math.min(100, parseInt(limit as string));
    const skipNum = (parseInt(page as string) - 1) * limitNum;

    const fishes = await Fish.find(query)
      .limit(limitNum)
      .skip(skipNum);

    const total = await Fish.countDocuments(query);

    return res.json({
      fishes,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// GET single fish by slug with full joins
router.get('/:slug', async (req, res) => {
  try {
    const fish = await Fish.findOne({ slug: req.params.slug })
      .populate('compatibleMates', 'commonName scientificName slug images difficulty')
      .populate('notCompatibleMates', 'commonName scientificName slug images difficulty')
      .populate('idealPlants', 'name scientificName slug category difficulty images')
      .populate('idealEquipment', 'name slug category brand images price')
      .populate({
        path: 'proneDiseases',
        populate: { path: 'medicines' }
      });

    if (!fish) {
      return res.status(404).json({ error: 'Species profile not found' });
    }

    // Related species check: same family or same water type, max 4
    const related = await Fish.find({
      _id: { $ne: fish._id },
      $or: [
        { family: fish.family },
        { 'waterParams.waterType': fish.waterParams.waterType, difficulty: fish.difficulty }
      ]
    }).limit(4).select('commonName scientificName slug images difficulty');

    return res.json({ fish, related });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST create new fish (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const newFish = new Fish(req.body);
    await newFish.save();

    // Trigger newsletter broadcast notification
    await broadcastToSubscribers(
      'New Fish Care Profile Published!',
      `<p>A brand new fish species profile has been published on AquaGuide:</p>
       <h3>${newFish.commonName} (<em>${newFish.scientificName}</em>)</h3>
       <p>Learn care details, ideal plants, and tank size constraints at <a href="http://localhost:5173/fish/${newFish.slug}">AquaGuide Care Encyclopedia</a>.</p>`
    );

    return res.status(201).json(newFish);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT update fish (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Fish.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Species profile not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE fish (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Fish.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Species profile not found' });
    return res.json({ message: 'Species profile deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
