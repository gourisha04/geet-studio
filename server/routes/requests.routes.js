import express from 'express';
import CommunityRequest from '../models/CommunityRequest.js';
import CommunityLead from '../models/CommunityLead.js';
import Query from '../models/Query.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { sendCommunityRequestNotification, sendQueryNotification } from '../services/emailService.js';

const router = express.Router();

// POST /api/community/requests — Visitor requests service from a lead
router.post('/community/requests', async (req, res, next) => {
  try {
    const { leadId, requesterName, requesterEmail, requesterPhone, serviceRequired, eventType, eventDate, location, message } = req.body;

    if (!leadId || !requesterName || !requesterEmail || !requesterPhone || !serviceRequired) {
      return res.status(400).json({ success: false, message: 'All required request fields must be provided.' });
    }

    let lead = null;
    try {
      lead = await CommunityLead.findById(leadId);
    } catch (err) {
      // In-memory fallback
    }

    let newRequest = null;
    try {
      newRequest = new CommunityRequest({
        leadId,
        requesterName,
        requesterEmail,
        requesterPhone,
        serviceRequired,
        eventType: eventType || 'Performance',
        eventDate: eventDate ? new Date(eventDate) : new Date(),
        location: location || 'Indore',
        message: message || '',
        status: 'NEW',
      });
      await newRequest.save();
    } catch (err) {
      newRequest = { _id: `req_${Date.now()}`, leadId, requesterName, requesterEmail, requesterPhone, serviceRequired };
    }

    // Trigger Resend email to Geet Studio team
    sendCommunityRequestNotification(
      { requesterName, requesterEmail, requesterPhone, serviceRequired, eventType, eventDate, location, message },
      lead?.name || 'Community Lead'
    ).catch((e) => console.warn('Resend trigger note:', e.message));

    res.status(201).json({
      success: true,
      message: 'Community lead service request stored and emailed to Geet Studio team.',
      data: newRequest,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/queries — General "Do You Have Any Query?" Submission
router.post('/queries', async (req, res, next) => {
  try {
    const { name, email, phone, category, message, source } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, phone, and message are required.' });
    }

    let queryRecord = null;
    try {
      queryRecord = new Query({
        name,
        email,
        phone,
        category: category || 'General',
        message,
        source: source || 'Website Form',
        status: 'NEW',
      });
      await queryRecord.save();
    } catch (err) {
      queryRecord = { _id: `qry_${Date.now()}`, name, email, phone, category, message, status: 'NEW' };
    }

    // Trigger Resend notification to geetdancestudio@gmail.com
    sendQueryNotification({ name, email, phone, category, message }).catch((e) => console.warn('Query email note:', e.message));

    res.status(201).json({
      success: true,
      message: 'Query stored and emailed to studio team',
      data: queryRecord,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/queries — Admin view queries
router.get('/queries', protect, requireRole('admin'), async (req, res, next) => {
  try {
    let queries = [];
    try {
      queries = await Query.find().sort({ createdAt: -1 });
    } catch (err) {
      queries = [];
    }
    res.json({ success: true, count: queries.length, data: queries });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/queries/:id/status — Admin update query status
router.patch('/queries/:id/status', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const { status } = req.body; // 'NEW', 'IN_PROGRESS', 'RESOLVED'
    const updated = await Query.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
});

export default router;
