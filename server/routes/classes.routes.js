import express from 'express';
import mongoose from 'mongoose';
import Class from '../models/Class.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// GET /api/classes — Public listing with category & level filtering
router.get('/', async (req, res, next) => {
  try {
    const { category, type, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.registrationStatus = status;

    let items = [];
    try {
      items = await Class.find(filter).populate('serviceId instructorId').sort({ createdAt: -1 });
    } catch (err) {
      items = await Class.find(filter).sort({ createdAt: -1 });
    }

    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
});

// POST /api/classes — Admin create class/workshop
router.post('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const classData = req.body;
    const totalSeats = Number(classData.totalSeats) || 20;
    const dummyId = new mongoose.Types.ObjectId();

    const newClass = new Class({
      name: classData.name || classData.title || 'New Dance Class',
      type: classData.type === 'workshop' ? 'workshop' : 'class',
      serviceId: classData.serviceId || dummyId,
      instructorId: classData.instructorId || dummyId,
      description: classData.description || 'Studio dance instruction at Geet Studio.',
      startDate: classData.startDate || new Date(),
      endDate: classData.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      days: classData.days || ['Monday', 'Wednesday', 'Friday'],
      classTiming: classData.classTiming || '6:00 PM - 7:00 PM',
      classDuration: classData.classDuration || '1 Hour',
      courseDuration: classData.courseDuration || '1 Month',
      isOnline: Boolean(classData.isOnline),
      location: classData.location || 'Geet Studio, Indore',
      batches: classData.batches || [
        { batchId: 'b1', name: 'Batch A', timing: '6:00 PM', totalSeats, confirmedSeats: 0, reservedSeats: 0 },
      ],
      totalSeats,
      availableSeats: totalSeats,
      fees: Number(classData.fees) || 3000,
      discount: Number(classData.discount) || 0,
      finalPayableAmount: Math.round((Number(classData.fees) || 3000) * (1 - (Number(classData.discount) || 0) / 100)),
      registrationStatus: classData.registrationStatus || 'OPEN',
      images: Array.isArray(classData.images) && classData.images.length > 0
        ? classData.images
        : [{ url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80' }],
      whatsAppGroupLink: classData.whatsAppGroupLink || 'https://chat.whatsapp.com/GeetStudioOfficialGroup',
      termsAndConditions: classData.termsAndConditions || 'Standard studio rules apply.',
      cancellationPolicy: 'Contact Geet Studio administration for refund policies.',
    });

    await newClass.save();
    res.status(201).json({ success: true, message: 'Class created successfully', data: newClass });
  } catch (error) {
    next(error);
  }
});

// PUT /api/classes/:id — Admin edit class
router.put('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (updateData.type) {
      updateData.type = updateData.type === 'workshop' ? 'workshop' : 'class';
    }
    const updated = await Class.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }
    res.json({ success: true, message: 'Class updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/classes/:id — Admin delete class
router.delete('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// GET /api/classes/:id — Public detail view (MUST BE AFTER / and specific routes)
router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Invalid class ID.' });
    }

    let item = null;
    try {
      item = await Class.findById(req.params.id).populate('serviceId instructorId');
    } catch (err) {
      item = await Class.findById(req.params.id);
    }

    if (!item) {
      return res.status(404).json({ success: false, message: 'Class/Workshop not found.' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

export default router;
