import express from 'express';
import mongoose from 'mongoose';
import CommunityLead from '../models/CommunityLead.js';
import CommunityAccessRequest from '../models/CommunityAccessRequest.js';
import AnalyticsEvent from '../models/AnalyticsEvent.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// -------------------------------------------------------------
// 1. ADMIN ROUTES
// -------------------------------------------------------------

// GET /api/community/admin/leads — Admin views all Community Members
router.get('/admin/leads', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const members = await CommunityLead.find().sort({ createdAt: -1 });
    res.json({ success: true, count: members.length, data: members });
  } catch (error) {
    next(error);
  }
});

// POST /api/community/admin/leads — Admin creates Community Member
router.post('/admin/leads', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const data = req.body;
    const newMember = new CommunityLead({
      userId: data.userId || new mongoose.Types.ObjectId(),
      name: data.name,
      category: data.category || 'Artists',
      profession: data.profession || 'Dancer',
      bio: data.bio || 'Community Member at Geet Studio.',
      experience: data.experience || '3+ Years',
      location: data.location || 'Indore',
      city: data.city || 'Indore',
      area: data.area || 'Vijay Nagar',
      phone: data.phone || '+91 87704 09447',
      email: data.email || `member_${Date.now()}@geetstudio.com`,
      status: data.status || 'PENDING',
      profileImage: typeof data.profileImage === 'string' ? { url: data.profileImage } : (data.profileImage || { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80' }),
      portfolioPhotos: Array.isArray(data.portfolioPhotos) ? data.portfolioPhotos.map(p => typeof p === 'string' ? { url: p } : p) : [],
      portfolioVideos: Array.isArray(data.portfolioVideos) ? data.portfolioVideos.map(v => typeof v === 'string' ? { url: v } : v) : [],
      services: Array.isArray(data.services) ? data.services : ['Choreography'],
      socialLinks: data.socialLinks || {},
    });
    await newMember.save();
    res.status(201).json({ success: true, message: 'Community Member created successfully', data: newMember });
  } catch (error) {
    console.error('Create community lead error:', error.message);
    next(error);
  }
});

// PUT /api/community/admin/leads/:id — Admin edits Community Member
router.put('/admin/leads/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const updated = await CommunityLead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Community Member not found.' });
    res.json({ success: true, message: 'Community Member updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/community/admin/leads/:id — Admin deletes Community Member
router.delete('/admin/leads/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    await CommunityLead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Community Member deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// GET /api/community/admin/access-requests — Admin views Community Member access requests
router.get('/admin/access-requests', protect, requireRole('admin'), async (req, res, next) => {
  try {
    let requests = [];
    try {
      requests = await CommunityAccessRequest.find().populate('communityLead').sort({ createdAt: -1 });
    } catch (err) {
      requests = await CommunityAccessRequest.find().sort({ createdAt: -1 });
    }
    res.json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/community/admin/leads/:id/status — Admin Approve / Reject / Suspend
router.patch('/admin/leads/:id/status', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const member = await CommunityLead.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Community Member not found.' });
    }

    member.status = status;
    if (status === 'APPROVED' && member.pendingChanges) {
      Object.assign(member, member.pendingChanges);
      member.pendingChanges = null;
    }

    await member.save();

    res.json({ success: true, message: `Community Member status updated to ${status}`, data: member });
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------------
// 2. COMMUNITY MEMBER ACCOUNT ROUTES
// -------------------------------------------------------------

// POST /api/community/register-lead — Member registration
router.post('/register-lead', protect, async (req, res, next) => {
  try {
    const leadData = req.body;
    const userId = req.user._id || req.user.id;

    let existingMember = await CommunityLead.findOne({ userId });
    if (existingMember) {
      return res.status(400).json({ success: false, message: 'You have already created a Community Member profile.' });
    }

    const newMember = new CommunityLead({
      userId,
      name: leadData.name || req.user.name,
      category: leadData.category || 'Artists',
      profession: leadData.profession || 'Dancer & Choreographer',
      bio: leadData.bio || 'Passionate artist associated with Geet Studio community.',
      experience: leadData.experience || '3+ Years',
      services: leadData.services || ['Solo Performance', 'Choreography'],
      location: leadData.location || 'Indore',
      profileImage: leadData.profileImage || { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80' },
      socialLinks: leadData.socialLinks || { instagram: 'https://www.instagram.com/the_geetstudio/' },
      phone: leadData.phone || req.user.phone || '+91 87704 09447',
      email: leadData.email || req.user.email,
      status: 'PENDING',
    });

    await newMember.save();

    res.status(201).json({
      success: true,
      message: 'Community Member profile submitted for studio approval.',
      data: newMember,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/community/lead/me — Member views own profile
router.get('/lead/me', protect, requireRole('lead', 'admin'), async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const email = req.user.email;
    let member = await CommunityLead.findOne({ $or: [{ userId }, { email }] });
    res.json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
});

// PUT /api/community/lead/me — Member creates or updates own profile
router.put('/lead/me', protect, requireRole('lead', 'admin'), async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const email = req.user.email || req.body.email;
    const updates = req.body;

    let member = await CommunityLead.findOne({ $or: [{ userId }, { email }] });

    if (!member) {
      member = new CommunityLead({
        userId,
        name: updates.name || req.user.name || 'Community Member',
        email: email || req.user.email,
        phone: updates.phone || req.user.phone || '+91 87704 09447',
        category: updates.category || 'Artists',
        profession: updates.profession || 'Choreographer',
        bio: updates.bio || 'Passionate artist associated with Geet Studio community.',
        experience: updates.experience || '3+ Years',
        services: Array.isArray(updates.services) ? updates.services : (updates.services ? updates.services.split(',') : ['Choreography']),
        location: updates.location || 'Indore',
        city: updates.city || 'Indore',
        area: updates.area || 'Vijay Nagar',
        profileImage: typeof updates.profileImage === 'string' ? { url: updates.profileImage } : (updates.profileImage || { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80' }),
        portfolioPhotos: Array.isArray(updates.portfolioPhotos) ? updates.portfolioPhotos.map(p => typeof p === 'string' ? { url: p } : p) : [],
        portfolioVideos: Array.isArray(updates.portfolioVideos) ? updates.portfolioVideos.map(v => typeof v === 'string' ? { url: v } : v) : [],
        socialLinks: updates.socialLinks || { instagram: updates.instagram || '', youtube: updates.youtube || '' },
        status: 'PENDING',
      });
    } else {
      if (updates.name) member.name = updates.name;
      if (updates.category) member.category = updates.category;
      if (updates.profession) member.profession = updates.profession;
      if (updates.bio) member.bio = updates.bio;
      if (updates.experience) member.experience = updates.experience;
      if (updates.phone) member.phone = updates.phone;
      if (updates.email) member.email = updates.email;
      if (updates.location) member.location = updates.location;
      if (updates.city) member.city = updates.city;
      if (updates.area) member.area = updates.area;
      if (updates.services) member.services = Array.isArray(updates.services) ? updates.services : updates.services.split(',');
      if (updates.profileImage) member.profileImage = typeof updates.profileImage === 'string' ? { url: updates.profileImage } : updates.profileImage;
      if (updates.portfolioPhotos) member.portfolioPhotos = Array.isArray(updates.portfolioPhotos) ? updates.portfolioPhotos.map(p => typeof p === 'string' ? { url: p } : p) : member.portfolioPhotos;
      if (updates.portfolioVideos) member.portfolioVideos = Array.isArray(updates.portfolioVideos) ? updates.portfolioVideos.map(v => typeof v === 'string' ? { url: v } : v) : member.portfolioVideos;
      if (updates.socialLinks || updates.instagram || updates.youtube) {
        member.socialLinks = {
          instagram: updates.instagram || updates.socialLinks?.instagram || member.socialLinks?.instagram || '',
          youtube: updates.youtube || updates.socialLinks?.youtube || member.socialLinks?.youtube || '',
        };
      }
    }

    await member.save();

    res.json({
      success: true,
      message: 'Community Member profile saved successfully to MongoDB',
      data: member,
    });
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------------
// 3. PUBLIC VISITOR FLOWS
// -------------------------------------------------------------

// POST /api/community/leads/:leadId/access — Visitor requests member details
const handleAccessDetails = async (req, res, next) => {
  try {
    const leadId = req.params.leadId || req.params.id;
    const name = req.body.name || req.body.visitorName || req.body.requesterName;
    const email = req.body.email || req.body.visitorEmail || req.body.requesterEmail;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Please enter a valid name and email address.' });
    }

    if (!mongoose.Types.ObjectId.isValid(leadId)) {
      return res.status(404).json({ success: false, message: 'This Community Member profile is not currently available.' });
    }

    const member = await CommunityLead.findOne({ _id: leadId, status: 'APPROVED' });
    if (!member) {
      return res.status(404).json({ success: false, message: 'This Community Member profile is not currently available.' });
    }

    const savedAccessRequest = await CommunityAccessRequest.create({
      communityLead: member._id,
      communityMemberName: member.name,
      visitorName: name,
      visitorEmail: email,
    });

    res.json({
      success: true,
      message: 'Access granted.',
      phone: member.phone,
      email: member.email,
      contactInfo: { phone: member.phone, email: member.email },
      data: savedAccessRequest,
    });
  } catch (error) {
    next(error);
  }
};

router.post('/leads/:leadId/access', handleAccessDetails);
router.post('/:id/reveal-contact', handleAccessDetails);

// GET /api/community — Public directory (Returns ONLY APPROVED Community Members)
router.get('/', async (req, res, next) => {
  try {
    const { category, search, city, area } = req.query;
    const filter = { status: 'APPROVED' };

    if (category && category !== 'All') filter.category = category;
    if (city && city !== 'All') filter.city = city;
    if (area && area !== 'All') filter.area = area;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { profession: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
      ];
    }

    const members = await CommunityLead.find(filter)
      .select('-email -phone -pendingChanges')
      .sort({ isFeatured: -1, createdAt: -1 });

    res.json({ success: true, count: members.length, data: members });
  } catch (error) {
    next(error);
  }
});

// GET /api/community/:id — Public detail page
router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: 'This Community Member profile is not currently available.' });
    }

    const member = await CommunityLead.findById(req.params.id);

    if (!member || member.status !== 'APPROVED') {
      return res.status(404).json({ success: false, message: 'This Community Member profile is not currently available.' });
    }

    const publicMember = member.toObject ? member.toObject() : { ...member };
    delete publicMember.email;
    delete publicMember.phone;
    delete publicMember.pendingChanges;

    res.json({ success: true, data: publicMember });
  } catch (error) {
    next(error);
  }
});

export default router;
