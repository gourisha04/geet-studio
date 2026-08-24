import express from 'express';
import Event from '../models/Event.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// GET /api/events — Public listing
router.get('/', async (req, res, next) => {
  try {
    const { status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    let events = [];
    try {
      events = await Event.find(filter).sort({ date: 1 });
    } catch (err) {
      events = [];
    }

    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    next(error);
  }
});

// GET /api/events/:id — Event detail
router.get('/:id', async (req, res, next) => {
  try {
    let event = null;
    try {
      event = await Event.findById(req.params.id);
    } catch (err) {
      event = null;
    }

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
});

// POST /api/events — Admin create event
router.post('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const eventData = req.body;
    const slug = eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    const newEvent = new Event({
      title: eventData.title,
      slug,
      description: eventData.description,
      date: eventData.date || new Date(),
      time: eventData.time || '7:00 PM',
      location: eventData.location || 'Geet Studio, Indore',
      media: eventData.media || { url: 'https://images.unsplash.com/photo-1545959570-a94084071b5d?w=800&q=80' },
      type: eventData.type || 'Showcase',
      registrationRequired: Boolean(eventData.registrationRequired),
      seats: eventData.seats || 50,
      status: eventData.status || 'UPCOMING',
    });

    await newEvent.save();
    res.status(201).json({ success: true, message: 'Event created successfully', data: newEvent });
  } catch (error) {
    next(error);
  }
});

// PUT /api/events/:id — Admin edit event
router.put('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, message: 'Event updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/events/:id — Admin delete event
router.delete('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
