import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profileImage: {
      url: String,
      publicId: String,
    },
    bio: { type: String, required: true },
    specialization: [{ type: String }],
    experience: { type: String, default: '5+ Years' },
    socialLinks: {
      instagram: String,
      youtube: String,
      website: String,
    },
    portfolioMedia: [
      {
        url: String,
        publicId: String,
        type: { type: String, default: 'image' },
      },
    ],
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Instructor || mongoose.model('Instructor', instructorSchema);
