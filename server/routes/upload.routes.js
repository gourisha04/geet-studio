import express from 'express';
import { uploadToCloudinary } from '../services/cloudinaryService.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/upload — Backend Cloudinary media upload handler
router.post('/upload', protect, async (req, res, next) => {
  try {
    const { file, folder } = req.body; // Base64 or URL

    if (!file) {
      return res.status(400).json({ success: false, message: 'No file payload provided.' });
    }

    const result = await uploadToCloudinary(file, folder || 'geet_studio');

    res.json({
      success: true,
      message: 'Media uploaded successfully to Cloudinary',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
