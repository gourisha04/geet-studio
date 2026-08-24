import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    media: {
      url: String,
      publicId: String,
      type: { type: String, default: 'image' },
    },
    type: {
      type: String,
      enum: ['Workshop', 'Showcase', 'Competition', 'Production'],
      default: 'Showcase',
    },
    registrationRequired: { type: Boolean, default: false },
    seats: { type: Number },
    status: {
      type: String,
      enum: ['UPCOMING', 'PAST', 'CANCELLED'],
      default: 'UPCOMING',
      index: true,
    },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

eventSchema.index({ date: 1, status: 1 });

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
