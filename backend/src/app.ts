import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth';
import fishRoutes from './routes/fish';
import plantRoutes from './routes/plant';
import equipmentRoutes from './routes/equipment';
import foodRoutes from './routes/food';
import medicineRoutes from './routes/medicine';
import diseaseRoutes from './routes/disease';
import blogRoutes from './routes/blog';
import guideRoutes from './routes/guide';
import faqRoutes from './routes/faq';
import commentRoutes from './routes/comment';
import bookmarkRoutes from './routes/bookmark';
import settingsRoutes from './routes/settings';
import compatibilityRoutes from './routes/compatibility';
import waterParameterRoutes from './routes/waterParameter';
import speciesGroupRoutes from './routes/speciesGroup';
import newsletterRoutes from './routes/newsletter';

const app = express();

// Request logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Security middlewares
app.use(helmet());
app.use(cors());

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', apiLimiter);

// Register routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/fish', fishRoutes);
app.use('/api/v1/plants', plantRoutes);
app.use('/api/v1/equipment', equipmentRoutes);
app.use('/api/v1/food', foodRoutes);
app.use('/api/v1/medicines', medicineRoutes);
app.use('/api/v1/diseases', diseaseRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/guides', guideRoutes);
app.use('/api/v1/faqs', faqRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/bookmarks', bookmarkRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/compatibility', compatibilityRoutes);
app.use('/api/v1/water-parameters', waterParameterRoutes);
app.use('/api/v1/species-groups', speciesGroupRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Centralized error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack || err);
  const status = err.status || 500;
  const message = err.message || 'An unexpected error occurred';
  res.status(status).json({ error: message });
});

export default app;
