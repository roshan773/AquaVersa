import { Router } from 'express';
import WaterParameter from '../models/waterParameter';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// GET all
router.get('/', async (req, res) => {
  try {
    const params = await WaterParameter.find();
    return res.json(params);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const item = new WaterParameter(req.body);
    await item.save();
    return res.status(201).json(item);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await WaterParameter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Parameter not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await WaterParameter.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Parameter not found' });
    return res.json({ message: 'Parameter deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
