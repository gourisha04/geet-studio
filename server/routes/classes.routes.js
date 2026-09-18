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
    if (category && category !== 'ALL' && category !== 'All') filter.category = category;
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
    const totalSeats = Number(classData.totalSeats) >= 0 ? Number(classData.totalSeats) : 20;
    const enrolledSeats = Number(classData.enrolledSeats) >= 0 ? Number(classData.enrolledSeats) : 0;
    const availableSeats = Math.max(0, totalSeats - enrolledSeats);
    let registrationStatus = classData.registrationStatus || 'OPEN';
    if (availableSeats <= 0 && registrationStatus === 'OPEN') {
      registrationStatus = 'FULL';
    }

    const dummyId = new mongoose.Types.ObjectId();

    const newClass = new Class({
      name: classData.name || classData.title || 'New Class',
      type: classData.type === 'workshop' ? 'workshop' : 'class',
      category: classData.category || 'Dance',
      danceStyle: classData.danceStyle || (classData.style || 'Bollywood'),
      musicType: classData.musicType || '',
      fitnessType: classData.fitnessType || '',
      productionType: classData.productionType || '',
      instructor: classData.instructor || 'Arpit Mahor',
      serviceId: classData.serviceId || dummyId,
      instructorId: classData.instructorId || dummyId,
      description: classData.description || 'Studio instruction at Geet Studio.',
      startDate: classData.startDate || new Date(),
      endDate: classData.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      days: classData.days || (classData.schedule ? (Array.isArray(classData.schedule) ? classData.schedule : [classData.schedule]) : ['Monday', 'Wednesday', 'Friday']),
      classTiming: classData.classTiming || (classData.time || '6:00 PM - 7:00 PM'),
      classDuration: classData.classDuration || (classData.duration || '1 Hour'),
      courseDuration: classData.courseDuration || '1 Month',
      isOnline: Boolean(classData.isOnline),
      location: classData.location || 'Geet Studio, Indore',
      batches: classData.batches || [
        { batchId: 'b1', name: 'Batch A', timing: '6:00 PM', totalSeats, confirmedSeats: enrolledSeats, reservedSeats: 0 },
      ],
      totalSeats,
      enrolledSeats,
      availableSeats,
      fees: Number(classData.fees) || 3000,
      discount: Number(classData.discount) || 0,
      finalPayableAmount: Math.round((Number(classData.fees) || 3000) * (1 - (Number(classData.discount) || 0) / 100)),
      registrationStatus,
      images: Array.isArray(classData.images) && classData.images.length > 0
        ? classData.images
        : (classData.image ? [{ url: classData.image }] : [{ url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80' }]),
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

    if (updateData.totalSeats !== undefined || updateData.enrolledSeats !== undefined) {
      const existing = await Class.findById(req.params.id);
      if (existing) {
        const totalSeats = Number(updateData.totalSeats !== undefined ? updateData.totalSeats : existing.totalSeats);
        const enrolledSeats = Number(updateData.enrolledSeats !== undefined ? updateData.enrolledSeats : existing.enrolledSeats);
        updateData.totalSeats = totalSeats;
        updateData.enrolledSeats = enrolledSeats;
        updateData.availableSeats = Math.max(0, totalSeats - enrolledSeats);
        if (updateData.availableSeats <= 0 && (updateData.registrationStatus || existing.registrationStatus) === 'OPEN') {
          updateData.registrationStatus = 'FULL';
        }
      }
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
