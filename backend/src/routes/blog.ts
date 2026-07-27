import { Router } from 'express';
import Blog from '../models/blog';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';
import { broadcastToSubscribers } from '../services/emailService';

const router = Router();

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const { search, category, tag } = req.query;
    const query: any = {};

    if (search) {
      query.$text = { $search: search as string };
    }
    if (category) {
      query.category = category;
    }
    if (tag) {
      query.tags = tag;
    }

    const blogs = await Blog.find(query).sort({ publishedAt: -1 });
    return res.json(blogs);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// GET single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    return res.json(blog);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST create blog (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();

    // Trigger newsletter broadcast notification
    await broadcastToSubscribers(
      'New Blog Post Published!',
      `<p>A brand new blog post has been published on AquaGuide:</p>
       <h3>${newBlog.title}</h3>
       <p>${newBlog.excerpt}</p>
       <p>Read the full article at <a href="http://localhost:5173/blog/${newBlog.slug}">AquaGuide Blog</a>.</p>`
    );

    return res.status(201).json(newBlog);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT update blog (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Blog post not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE blog (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Blog post not found' });
    return res.json({ message: 'Blog post deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
