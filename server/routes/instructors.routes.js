import express from 'express';
import Instructor from '../models/Instructor.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// GET /api/instructors — Public listing
router.get('/', async (req, res, next) => {
  try {
    let instructors = [];
    try {
      instructors = await Instructor.find({ active: true }).sort({ createdAt: -1 });
    } catch (err) {
      instructors = [];
    }
    res.json({ success: true, count: instructors.length, data: instructors });
  } catch (error) {
    next(error);
  }
});

// GET /api/instructors/:id — Instructor detail
router.get('/:id', async (req, res, next) => {
  try {
    let instructor = null;
    try {
      instructor = await Instructor.findById(req.params.id);
    } catch (err) {
      instructor = null;
    }

    if (!instructor) {
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    }

    res.json({ success: true, data: instructor });
  } catch (error) {
    next(error);
  }
});

// POST /api/instructors — Admin create instructor
router.post('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const data = req.body;
    const newInstructor = new Instructor({
      name: data.name,
      profileImage: data.profileImage || { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80' },
      bio: data.bio || 'Professional studio instructor at Geet Studio.',
      specialization: data.specialization || ['Bollywood', 'Choreography'],
      experience: data.experience || '5+ Years',
      socialLinks: data.socialLinks || { instagram: 'https://www.instagram.com/the_geetstudio/' },
      active: true,
    });

    await newInstructor.save();
    res.status(201).json({ success: true, message: 'Instructor created successfully', data: newInstructor });
  } catch (error) {
    next(error);
  }
});

// PUT /api/instructors/:id — Admin edit instructor
router.put('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const updated = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Instructor not found' });
    res.json({ success: true, message: 'Instructor updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/instructors/:id — Admin deactivate / delete instructor
router.delete('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    await Instructor.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Instructor deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
