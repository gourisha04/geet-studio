import express from 'express';
import Gallery from '../models/Gallery.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// GET /api/gallery — Public listing with category filter
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { active: true };
    if (category && category !== 'All') {
      filter.category = category;
    }

    let items = [];
    try {
      items = await Gallery.find(filter).sort({ createdAt: -1 });
    } catch (err) {
      items = [];
    }

    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
});

// POST /api/gallery — Admin add gallery item
router.post('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const { title, category, mediaUrl, publicId, mediaType } = req.body;

    const newItem = new Gallery({
      title: title || 'Studio Performance',
      category: category || 'Dance',
      mediaUrl,
      publicId: publicId || `pub_${Date.now()}`,
      mediaType: mediaType || 'image',
      active: true,
    });

    await newItem.save();
    res.status(201).json({ success: true, message: 'Gallery item added successfully', data: newItem });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/gallery/:id — Admin delete gallery item
router.delete('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
