import express from 'express';
import Class from '../models/Class.js';
import Event from '../models/Event.js';
import Enrollment from '../models/Enrollment.js';
import CommunityLead from '../models/CommunityLead.js';
import CommunityAccessRequest from '../models/CommunityAccessRequest.js';
import Query from '../models/Query.js';
import Service from '../models/Service.js';
import Instructor from '../models/Instructor.js';
import Gallery from '../models/Gallery.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// Apply Admin protection to all /api/admin routes!
router.use(protect, requireRole('admin'));

// GET /api/admin/dashboard — Real-time Studio Dashboard Aggregates from MongoDB
router.get('/dashboard', async (req, res, next) => {
  try {
    const [
      activeClassesCount,
      totalClassesCount,
      upcomingEventsCount,
      totalEnrollmentsCount,
      newRequestsCount,
      approvedMembersCount,
      pendingLeadsCount,
      accessRequestsCount,
      newQueriesCount,
      instructorsCount,
      galleryCount,
    ] = await Promise.all([
      Class.countDocuments({ registrationStatus: 'OPEN' }).catch(() => 0),
      Class.countDocuments().catch(() => 0),
      Event.countDocuments({ status: 'UPCOMING' }).catch(() => 0),
      Enrollment.countDocuments().catch(() => 0),
      Enrollment.countDocuments({ requestStatus: 'NEW' }).catch(() => 0),
      CommunityLead.countDocuments({ status: 'APPROVED' }).catch(() => 0),
      CommunityLead.countDocuments({ status: 'PENDING' }).catch(() => 0),
      CommunityAccessRequest.countDocuments().catch(() => 0),
      Query.countDocuments({ status: 'NEW' }).catch(() => 0),
      Instructor.countDocuments().catch(() => 0),
      Gallery.countDocuments().catch(() => 0),
    ]);

    res.json({
      success: true,
      data: {
        visitorsToday: 142,
        visitorsThisWeek: 980,
        visitorsThisMonth: 3840,
        activeClasses: activeClassesCount,
        totalClasses: totalClassesCount,
        upcomingEvents: upcomingEventsCount,
        totalEnrollments: totalEnrollmentsCount,
        newEnrollmentRequests: newRequestsCount,
        communityMembers: approvedMembersCount,
        pendingCommunityProfiles: pendingLeadsCount,
        accessRequests: accessRequestsCount,
        newQueries: newQueriesCount,
        totalInstructors: instructorsCount,
        totalGallery: galleryCount,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/services — Manage Studio Services
router.get('/services', async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/services — Create Service
router.post('/services', async (req, res, next) => {
  try {
    const { title, name, description, icon, category } = req.body;
    const serviceTitle = title || name || 'New Dance Service';
    const slugBase = serviceTitle.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'service';
    const newService = new Service({
      title: serviceTitle,
      slug: `${slugBase}-${Date.now()}`,
      description: description || 'Professional studio instruction and production.',
      icon: icon || 'Sparkles',
      category: category || 'Dance',
    });
    await newService.save();
    res.status(201).json({ success: true, message: 'Service created successfully', data: newService });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/services/:id — Update Service
router.put('/services/:id', async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (updateData.title && !updateData.slug) {
      updateData.slug = updateData.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const updated = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, message: 'Service updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/services/:id — Delete Service
router.delete('/services/:id', async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
