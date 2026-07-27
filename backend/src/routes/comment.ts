import { Router } from 'express';
import Comment from '../models/comment';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// GET comments
router.get('/', async (req, res) => {
  try {
    const { targetType, targetId, approvedOnly } = req.query;
    const query: any = {};

    if (targetType) query.targetType = targetType;
    if (targetId) query.targetId = targetId;
    if (approvedOnly === 'true') {
      query.isApproved = true;
    }

    const comments = await Comment.find(query).sort({ createdAt: -1 });
    return res.json(comments);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST submit a comment
router.post('/', async (req, res) => {
  try {
    const { userName, content, targetType, targetId } = req.body;
    if (!userName || !content || !targetType || !targetId) {
      return res.status(400).json({ error: 'Please provide all comment fields' });
    }

    const comment = new Comment({
      userName,
      content,
      targetType,
      targetId,
      isApproved: false // requires admin approval
    });

    await comment.save();
    return res.status(201).json(comment);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT update/approve comment (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Comment not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE comment (Admin or owner)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Comment not found' });
    return res.json({ message: 'Comment deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
