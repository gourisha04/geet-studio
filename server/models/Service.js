import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ['Dance', 'Music', 'Fitness', 'Events & Productions'],
      required: true,
      unique: true,
    },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    media: {
      url: String,
      publicId: String,
      type: { type: String, default: 'image' },
    },
    offerings: [
      {
        name: { type: String, required: true },
        description: String,
        active: { type: Boolean, default: true },
      },
    ],
    isSystemDefault: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);
