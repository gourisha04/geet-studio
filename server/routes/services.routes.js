import express from 'express';
import Service from '../models/Service.js';

const router = express.Router();

// GET /api/services — Public service listing
router.get('/', async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
});

export default router;