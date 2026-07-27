import { Router } from 'express';
import Bookmark from '../models/bookmark';
import { verifyToken, AuthRequest } from '../middlewares/authMiddleware';

const router = Router();

// GET all bookmarks for the logged-in user
router.get('/', verifyToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;
    const bookmarks = await Bookmark.find({ user: userId });
    return res.json(bookmarks);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST toggle bookmark (add or remove)
router.post('/', verifyToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;
    const { itemType, itemId } = req.body;

    if (!itemType || !itemId) {
      return res.status(400).json({ error: 'Please specify itemType and itemId' });
    }

    const existing = await Bookmark.findOne({ user: userId, itemType, itemId });
    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      return res.json({ bookmarked: false, message: 'Bookmark removed successfully' });
    }

    const newBookmark = new Bookmark({
      user: userId,
      itemType,
      itemId
    });
    await newBookmark.save();
    return res.status(201).json({ bookmarked: true, bookmark: newBookmark });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
