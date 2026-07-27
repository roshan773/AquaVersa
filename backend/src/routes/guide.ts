import { Router } from 'express';
import Guide from '../models/guide';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// GET all guides
router.get('/', async (req, res) => {
  try {
    const { search, category, difficulty } = req.query;
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

    const guides = await Guide.find(query).sort({ publishedAt: -1 });
    return res.json(guides);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// GET single guide by slug
router.get('/:slug', async (req, res) => {
  try {
    const guide = await Guide.findOne({ slug: req.params.slug });
    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }
    return res.json(guide);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST create (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const item = new Guide(req.body);
    await item.save();
    return res.status(201).json(item);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT update (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Guide not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Guide.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Guide not found' });
    return res.json({ message: 'Guide deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
