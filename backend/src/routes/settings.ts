import { Router } from 'express';
import Settings from '../models/settings';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// GET settings (public)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({
        siteName: 'Fish Versa',
        siteTagline: 'The Ultimate Aquarium & Fish Encyclopedia',
        siteDescription: 'Learn care parameters, calculate gear, and build your aquascapes.',
        contactEmail: 'support@fishversa.com'
      });
      await settings.save();
    }
    return res.json(settings);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// PUT update settings (Admin only)
router.put('/', verifyToken, isAdmin, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    return res.json(settings);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
