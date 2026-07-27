import { Router } from 'express';
import Medicine from '../models/medicine';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// GET all medicines
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const query: any = {};

    if (search) {
      query.name = { $regex: search as string, $options: 'i' };
    }

    const items = await Medicine.find(query);
    return res.json(items);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// GET single medicine by slug
router.get('/:slug', async (req, res) => {
  try {
    const item = await Medicine.findOne({ slug: req.params.slug })
      .populate('safeFish', 'commonName scientificName slug images')
      .populate('unsafeFish', 'commonName scientificName slug images');

    if (!item) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    return res.json(item);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST create (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const item = new Medicine(req.body);
    await item.save();
    return res.status(201).json(item);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT update (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Medicine not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Medicine not found' });
    return res.json({ message: 'Medicine deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
