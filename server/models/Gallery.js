import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['All', 'Dance', 'Music', 'Fitness', 'Events', 'Workshops', 'Behind the Scenes'],
      default: 'Dance',
      index: true,
    },
    mediaUrl: { type: String, required: true },
    publicId: { type: String },
    mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
