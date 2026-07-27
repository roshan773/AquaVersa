import { Router } from 'express';
import Newsletter from '../models/newsletter';

const router = Router();

import { sendWelcomeEmail } from '../services/emailService';

// POST subscribe email
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Please provide an email address' });
    }

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'This email is already subscribed to our newsletter' });
    }

    const newSub = new Newsletter({ email });
    await newSub.save();

    // Trigger welcome email
    await sendWelcomeEmail(email.toLowerCase());

    return res.status(201).json({ message: 'Successfully subscribed to the newsletter!' });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// GET all subscriptions (Admin only - optional view)
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const subs = await Newsletter.find().sort({ subscribedAt: -1 });
    return res.json(subs);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
