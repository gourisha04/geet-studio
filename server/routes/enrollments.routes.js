import express from 'express';
import Enrollment from '../models/Enrollment.js';
import { PaymentProvider } from '../services/paymentProvider.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { sendRegistrationInterestEmail } from '../services/emailService.js';

const router = express.Router();

// POST /api/enrollments/register — Registration interest (no payment)
router.post('/register', async (req, res, next) => {
  try {
    const { classId, name, email, phone, age, batch } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone are required.' });
    }

    // Send email to admin
    sendRegistrationInterestEmail({ classId, name, email, phone, age, batch })
      .catch((e) => console.warn('Registration email note:', e.message));

    res.status(201).json({
      success: true,
      message: 'Registration interest submitted and emailed to studio team.',
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/enrollments — Start Enrollment & Hold Seat for 5 Minutes
router.post('/', async (req, res, next) => {
  try {
    const { classId, batchId, studentDetails, amountPaid } = req.body;

    if (!classId || !studentDetails?.name || !studentDetails?.email || !studentDetails?.phone) {
      return res.status(400).json({ success: false, message: 'Class ID and complete student details are required.' });
    }

    const result = await PaymentProvider.createPayment({
      classId,
      batchId,
      studentDetails,
      amountPaid,
      userId: req.user?._id || req.user?.id,
    });

    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// POST /api/enrollments/:id/verify-payment — Complete Payment before 5-min expiry
router.post('/:id/verify-payment', async (req, res, next) => {
  try {
    const { paymentId, signature } = req.body;
    const result = await PaymentProvider.verifyPayment({
      enrollmentId: req.params.id,
      paymentId,
      signature,
    });

    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// POST /api/enrollments/:id/fail-payment — Explicit Payment Failure & Atomic Seat Release
router.post('/:id/fail-payment', async (req, res, next) => {
  try {
    const result = await PaymentProvider.failPayment({ enrollmentId: req.params.id });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// POST /api/enrollments/:id/expire — Expiration Trigger & Idempotent Seat Release
router.post('/:id/expire', async (req, res, next) => {
  try {
    const result = await PaymentProvider.expirePayment({ enrollmentId: req.params.id });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/enrollments — Admin list enrollments
router.get('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    let enrollments = [];
    try {
      enrollments = await Enrollment.find().populate('classId userId').sort({ createdAt: -1 });
    } catch (err) {
      enrollments = [];
    }
    res.json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    next(error);
  }
});

export default router;
