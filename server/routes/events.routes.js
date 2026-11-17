import express from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event.js';
import EventRegistration from '../models/EventRegistration.js';
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

// GET /api/events/admin/registrations — Admin view event registrations
router.get('/admin/registrations', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const registrations = await EventRegistration.find().populate('eventId').sort({ createdAt: -1 });
    res.json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    next(error);
  }
});

// Helper: Verify that MongoDB connection supports multi-document transactions
const verifyTransactionSupport = () => {
  if (mongoose.connection.readyState !== 1) {
    const err = new Error('Database is not connected. MongoDB transactions cannot be initiated.');
    err.status = 503;
    throw err;
  }
  const topologyType = mongoose.connection.client?.topology?.description?.type;
  if (topologyType === 'Single') {
    const err = new Error('TRANSACTIONS_UNAVAILABLE: MongoDB transactions require a replica set or MongoDB Atlas cluster. A standalone Single topology cannot guarantee multi-document atomicity.');
    err.status = 500;
    throw err;
  }
};

// PATCH /api/events/admin/registrations/:id/status — Admin update event registration status
router.patch('/admin/registrations/:id/status', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['NEW', 'CONTACTED', 'CONFIRMED', 'CANCELLED'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid registration status.' });
    }

    const isNowCancelled = status === 'CANCELLED';

    if (isNowCancelled) {
      verifyTransactionSupport();
      const session = await mongoose.startSession();
      let updatedDoc = null;
      let alreadyCancelledDoc = null;

      try {
        await session.withTransaction(async () => {
          // 1. Atomic status transition within transaction: matches only if NOT already CANCELLED
          const previousNonCancelled = await EventRegistration.findOneAndUpdate(
            { _id: req.params.id, status: { $ne: 'CANCELLED' } },
            {
              $set: { status: 'CANCELLED' },
              $unset: { activeRegistrationKey: 1 },
            },
            { new: false, session }
          );

          if (previousNonCancelled) {
            // 2. Restore seat counters in the exact same transaction!
            if (previousNonCancelled.eventId) {
              const seatsToRestore = Math.max(1, Number(previousNonCancelled.seats) || 1);
              await Event.updateOne(
                { _id: previousNonCancelled.eventId },
                { $inc: { enrolledSeats: -seatsToRestore, availableSeats: seatsToRestore } },
                { session }
              );
            }
          } else {
            // Already cancelled or document not found
            alreadyCancelledDoc = await EventRegistration.findById(req.params.id).session(session);
          }
        });
      } finally {
        await session.endSession();
      }

      if (alreadyCancelledDoc) {
        return res.json({ success: true, message: 'Registration is already cancelled.', data: alreadyCancelledDoc });
      }

      updatedDoc = await EventRegistration.findById(req.params.id);
      if (!updatedDoc) {
        return res.status(404).json({ success: false, message: 'Event registration not found.' });
      }

      return res.json({ success: true, message: 'Registration status updated.', data: updatedDoc });
    }

    // Active status transition (NEW, CONTACTED, CONFIRMED)
    verifyTransactionSupport();
    const session = await mongoose.startSession();
    let updatedDoc = null;

    try {
      await session.withTransaction(async () => {
        const existingReg = await EventRegistration.findById(req.params.id).session(session);
        if (!existingReg) {
          const err = new Error('NOT_FOUND');
          err.code = 'NOT_FOUND';
          throw err;
        }

        const wasCancelled = existingReg.status === 'CANCELLED';
        const activeRegistrationKey = `${existingReg.eventId}_${existingReg.email}`;

        if (wasCancelled) {
          // Re-activating a previously cancelled registration: check and deduct seats within transaction
          const seatsToDeduct = Math.max(1, Number(existingReg.seats) || 1);
          const allocated = await Event.findOneAndUpdate(
            {
              _id: existingReg.eventId,
              status: 'UPCOMING',
              availableSeats: { $gte: seatsToDeduct },
            },
            {
              $inc: { enrolledSeats: seatsToDeduct, availableSeats: -seatsToDeduct },
            },
            { new: true, session }
          );

          if (!allocated) {
            const err = new Error('INSUFFICIENT_CAPACITY');
            err.code = 'INSUFFICIENT_CAPACITY';
            throw err;
          }
        }

        updatedDoc = await EventRegistration.findByIdAndUpdate(
          req.params.id,
          { status, activeRegistrationKey },
          { new: true, session }
        );
      });
    } catch (txnErr) {
      if (txnErr.code === 'NOT_FOUND') {
        return res.status(404).json({ success: false, message: 'Event registration not found.' });
      }
      if (txnErr.code === 'INSUFFICIENT_CAPACITY') {
        return res.status(409).json({
          success: false,
          message: 'Cannot re-activate registration: the event no longer has sufficient seats available.',
        });
      }
      if (txnErr.code === 11000 || txnErr.message?.includes('E11000')) {
        return res.status(409).json({
          success: false,
          message: 'Cannot re-activate registration: another active registration exists for this attendee and event.',
        });
      }
      throw txnErr;
    } finally {
      await session.endSession();
    }

    return res.json({ success: true, message: 'Registration status updated.', data: updatedDoc });
  } catch (error) {
    next(error);
  }
});

// POST /api/events/register (or /api/events/:id/register) — Public Event Registration
const handleEventRegistration = async (req, res, next) => {
  try {
    const eventId = req.params.id || req.body.eventId;
    const { name, attendeeName, email, phone, seats, message } = req.body;
    const finalName = (attendeeName || name || '').trim();
    const finalEmail = String(email || '').trim().toLowerCase();
    const finalPhone = String(phone || '').trim();
    const seatsRequested = Math.max(1, Number(seats) || 1);

    if (!finalName || !finalEmail || !finalPhone) {
      return res.status(400).json({ success: false, message: 'Attendee name, email, and phone number are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(finalEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    if (!eventId || !mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ success: false, message: 'A valid event selection (eventId) is required.' });
    }

    let eventDoc = await Event.findById(eventId);
    if (!eventDoc) {
      return res.status(404).json({ success: false, message: 'The selected event could not be found.' });
    }

    if (eventDoc.status !== 'UPCOMING') {
      return res.status(400).json({ success: false, message: 'This event is not open for registration.' });
    }

    const hasCapacityLimit = typeof eventDoc.seats === 'number' && eventDoc.seats > 0;

    // Lazy-initialize availableSeats on legacy records if missing/null
    if (hasCapacityLimit && (eventDoc.availableSeats === undefined || eventDoc.availableSeats === null)) {
      const existingCount = await EventRegistration.aggregate([
        { $match: { eventId: eventDoc._id, status: { $ne: 'CANCELLED' } } },
        { $group: { _id: null, total: { $sum: { $ifNull: ['$seats', 1] } } } },
      ]);
      const actualEnrolled = existingCount[0]?.total || 0;
      const actualAvailable = Math.max(0, Number(eventDoc.seats) - actualEnrolled);

      await Event.updateOne(
        {
          _id: eventDoc._id,
          $or: [{ availableSeats: { $exists: false } }, { availableSeats: null }],
        },
        { $set: { availableSeats: actualAvailable, enrolledSeats: actualEnrolled } }
      );

      const refreshedEventDoc = await Event.findById(eventDoc._id);
      if (refreshedEventDoc) {
        eventDoc = refreshedEventDoc;
      }
    }

    // Multi-document ACID Transaction for Event Seat Allocation + Registration Record
    verifyTransactionSupport();
    const session = await mongoose.startSession();
    let savedRegistration = null;

    try {
      await session.withTransaction(async () => {
        // 1. Check duplicate active registration within the transaction
        const existingActiveReg = await EventRegistration.findOne(
          {
            eventId: eventDoc._id,
            email: finalEmail,
            status: { $ne: 'CANCELLED' },
          },
          null,
          { session }
        );

        if (existingActiveReg) {
          const err = new Error('ALREADY_REGISTERED');
          err.code = 'ALREADY_REGISTERED';
          throw err;
        }

        // 2. Atomic seat allocation within the transaction
        let allocatedEvent = null;
        if (hasCapacityLimit) {
          allocatedEvent = await Event.findOneAndUpdate(
            {
              _id: eventDoc._id,
              status: 'UPCOMING',
              availableSeats: { $gte: seatsRequested },
            },
            {
              $inc: { enrolledSeats: seatsRequested, availableSeats: -seatsRequested },
            },
            { new: true, session }
          );

          if (!allocatedEvent) {
            const err = new Error('INSUFFICIENT_CAPACITY');
            err.code = 'INSUFFICIENT_CAPACITY';
            throw err;
          }
        } else {
          allocatedEvent = await Event.findOneAndUpdate(
            {
              _id: eventDoc._id,
              status: 'UPCOMING',
            },
            {
              $inc: { enrolledSeats: seatsRequested },
            },
            { new: true, session }
          );

          if (!allocatedEvent) {
            const err = new Error('EVENT_NOT_OPEN');
            err.code = 'EVENT_NOT_OPEN';
            throw err;
          }
        }

        // 3. Create EventRegistration within the same transaction
        const registrationId = `EVT-REG-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
        const activeRegistrationKey = `${allocatedEvent._id}_${finalEmail}`;

        const createdArr = await EventRegistration.create(
          [
            {
              registrationId,
              eventId: allocatedEvent._id,
              eventTitle: allocatedEvent.title, // Always derived from DB
              attendeeName: finalName,
              email: finalEmail,
              phone: finalPhone,
              seats: seatsRequested,
              message: message || '',
              activeRegistrationKey,
              status: 'NEW',
            },
          ],
          { session }
        );

        savedRegistration = createdArr[0];
      });
    } catch (txnError) {
      if (txnError.code === 'ALREADY_REGISTERED' || txnError.code === 11000 || txnError.message?.includes('E11000')) {
        return res.status(409).json({
          success: false,
          message: 'You have already registered for this event. Please contact the studio if you need to update your booking.',
        });
      }
      if (txnError.code === 'INSUFFICIENT_CAPACITY') {
        return res.status(409).json({
          success: false,
          message: 'This event is either sold out or does not have enough remaining seats.',
        });
      }
      if (txnError.code === 'EVENT_NOT_OPEN') {
        return res.status(400).json({
          success: false,
          message: 'This event is not open for registration.',
        });
      }
      throw txnError;
    } finally {
      await session.endSession();
    }

    return res.status(201).json({
      success: true,
      message: 'Event registration submitted successfully. See you at Geet Studio!',
      data: savedRegistration,
    });
  } catch (error) {
    next(error);
  }
};

router.post('/register', handleEventRegistration);
router.post('/:id/register', handleEventRegistration);

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
    const seats = Number(eventData.seats) >= 0 ? Number(eventData.seats) : 50;

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
      seats,
      enrolledSeats: 0,
      availableSeats: seats,
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
    const updateData = { ...req.body };
    if (updateData.seats !== undefined) {
      const existing = await Event.findById(req.params.id);
      if (existing) {
        const newSeats = Number(updateData.seats) >= 0 ? Number(updateData.seats) : existing.seats;
        let currentEnrolled = Number(existing.enrolledSeats);
        if (isNaN(currentEnrolled) || existing.enrolledSeats === undefined || existing.enrolledSeats === null) {
          const regCount = await EventRegistration.aggregate([
            { $match: { eventId: existing._id, status: { $ne: 'CANCELLED' } } },
            { $group: { _id: null, total: { $sum: { $ifNull: ['$seats', 1] } } } },
          ]);
          currentEnrolled = regCount[0]?.total || 0;
        }
        updateData.seats = newSeats;
        updateData.enrolledSeats = currentEnrolled;
        updateData.availableSeats = Math.max(0, newSeats - currentEnrolled);
      }
    }

    const updated = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
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
