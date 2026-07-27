import { Router } from 'express';
import Food from '../models/food';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// GET all food
router.get('/', async (req, res) => {
  try {
    const { search, type } = req.query;
    const query: any = {};

    if (search) {
      query.$text = { $search: search as string };
    }
    if (type) {
      query.type = type;
    }

    const items = await Food.find(query);
    return res.json(items);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// GET single food by slug
router.get('/:slug', async (req, res) => {
  try {
    const item = await Food.findOne({ slug: req.params.slug })
      .populate('recommendedFish', 'commonName scientificName slug images');

    if (!item) {
      return res.status(404).json({ error: 'Food profile not found' });
    }
    return res.json(item);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST create (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const item = new Food(req.body);
    await item.save();
    return res.status(201).json(item);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT update (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Food not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Food.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Food not found' });
    return res.json({ message: 'Food deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
