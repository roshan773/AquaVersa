import { Router } from 'express';
import FAQ from '../models/faq';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// GET all FAQs
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query: any = {};
    if (category) {
      query.category = category;
    }
    const faqs = await FAQ.find(query);
    return res.json(faqs);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST create FAQ (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    return res.status(201).json(faq);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT update FAQ (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'FAQ not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE FAQ (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await FAQ.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'FAQ not found' });
    return res.json({ message: 'FAQ deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
