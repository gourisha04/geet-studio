import mongoose from 'mongoose';

const querySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    category: { type: String, default: 'General' },
    message: { type: String, required: true },
    source: { type: String, default: 'Website Form' },
    status: {
      type: String,
      enum: ['NEW', 'IN_PROGRESS', 'RESOLVED'],
      default: 'NEW',
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Query || mongoose.model('Query', querySchema);
