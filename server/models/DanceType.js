import mongoose from 'mongoose';

const danceTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.DanceType || mongoose.model('DanceType', danceTypeSchema);
