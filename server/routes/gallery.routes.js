import express from 'express';
import Gallery from '../models/Gallery.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// GET /api/gallery/admin — Admin listing including inactive records
router.get('/admin', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const items = await Gallery.find().sort({ displayOrder: 1, createdAt: 1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
});

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
      items = await Gallery.find(filter).sort({ displayOrder: 1, createdAt: 1 });
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
    const { title, category, mediaUrl, publicId, mediaType, displayOrder } = req.body;

    if (!mediaUrl) {
      return res.status(400).json({ success: false, message: 'Uploaded media is required.' });
    }

    const newItem = new Gallery({
      title: title || 'Studio Performance',
      category: category || 'Dance',
      mediaUrl,
      publicId: publicId || `pub_${Date.now()}`,
      mediaType: mediaType || 'image',
      displayOrder: Number(displayOrder) || 0,
      active: true,
    });

    await newItem.save();
    res.status(201).json({ success: true, message: 'Gallery item added successfully', data: newItem });
  } catch (error) {
    next(error);
  }
});

// PUT /api/gallery/:id — Admin update gallery item
router.put('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const updated = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, message: 'Gallery item updated successfully', data: updated });
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
