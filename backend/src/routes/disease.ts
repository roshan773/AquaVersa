import { Router } from 'express';
import Disease from '../models/disease';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// GET all diseases
router.get('/', async (req, res) => {
  try {
    const { search, environment } = req.query;
    const query: any = {};

    if (search) {
      query.name = { $regex: search as string, $options: 'i' };
    }
    if (environment === 'freshwater') {
      query.isFreshwater = true;
    } else if (environment === 'saltwater') {
      query.isSaltwater = true;
    }

    const items = await Disease.find(query).populate('medicines');
    return res.json(items);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// GET single disease by slug
router.get('/:slug', async (req, res) => {
  try {
    const item = await Disease.findOne({ slug: req.params.slug }).populate('medicines');
    if (!item) {
      return res.status(404).json({ error: 'Disease not found' });
    }
    return res.json(item);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST create (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const item = new Disease(req.body);
    await item.save();
    return res.status(201).json(item);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT update (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Disease.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Disease not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Disease.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Disease not found' });
    return res.json({ message: 'Disease deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
