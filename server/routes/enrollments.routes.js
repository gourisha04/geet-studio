import express from 'express';
import mongoose from 'mongoose';
import Enrollment from '../models/Enrollment.js';
import Class from '../models/Class.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

const handleCreateEnrollmentRequest = async (req, res, next) => {
  try {
    const { classId, className, name, studentName, email, phone, message, batch } = req.body;
    const finalStudentName = studentName || name;

    if (!finalStudentName || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Student name, email, and phone number are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const enrollmentId = `ENR-REQ-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    let targetClassId = classId;
    if (classId) {
      try {
        if (mongoose.Types.ObjectId.isValid(classId)) {
          const cls = await Class.findById(classId);
          if (cls) targetClassId = cls._id;
        } else {
          const cls = await Class.findOne({ $or: [{ name: classId }, { title: classId }] });
          if (cls) targetClassId = cls._id;
        }
      } catch (e) {
        console.warn('Class lookup note:', e.message);
      }
    }

    let savedEnrollment;
    try {
      savedEnrollment = await Enrollment.create({
        enrollmentId,
        classId: targetClassId || classId,
        className: className || '',
        studentName: finalStudentName,
        email,
        phone,
        message: message || (batch ? `Batch: ${batch}` : ''),
        requestStatus: 'NEW',
      });
    } catch (dbErr) {
      console.error('Enrollment DB save error:', dbErr.message);
      return res.status(500).json({ success: false, message: 'Failed to save enrollment request in database.' });
    }

    return res.status(201).json({
      success: true,
      message: 'Enrollment request submitted successfully. Our team will contact you shortly.',
      data: savedEnrollment,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/enrollments — Primary Enrollment Request endpoint
router.post('/', handleCreateEnrollmentRequest);

// POST /api/enrollments/register — Backward-compatible alias for modal forms
router.post('/register', handleCreateEnrollmentRequest);

// GET /api/enrollments — Admin list enrollments
router.get('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    let enrollments = [];
    try {
      enrollments = await Enrollment.find().populate('classId').sort({ createdAt: -1 });
    } catch (err) {
      enrollments = await Enrollment.find().sort({ createdAt: -1 });
    }
    res.json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/enrollments/:id/status — Admin update enrollment request status
router.patch('/:id/status', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['NEW', 'CONTACTED', 'CONFIRMED', 'CLOSED'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}` });
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { requestStatus: status },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment request not found.' });
    }

    try {
      if (mongoose.Types.ObjectId.isValid(enrollment.classId)) {
        await enrollment.populate('classId');
      }
    } catch (popErr) {
      // Ignore populate errors for non-ObjectId string classIds
    }

    res.json({ success: true, message: 'Enrollment status updated.', data: enrollment });
  } catch (error) {
    next(error);
  }
});

export default router;
