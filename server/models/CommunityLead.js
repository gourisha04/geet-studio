import mongoose from 'mongoose';

const communityLeadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    name: { type: String, required: true },
    profileImage: {
      url: String,
      publicId: String,
    },
    category: {
      type: String,
      enum: [
        'Artists', 'Dancers', 'Anchors', 'Singers', 'DJs', 'Musicians',
        'Event Planners', 'Sound Vendors', 'Light Vendors', 'LED Vendors',
        'Decor Vendors', 'Event Managers', 'Other'
      ],
      required: true,
      index: true,
    },
    profession: { type: String, required: true },
    bio: { type: String, required: true },
    experience: { type: String },
    services: [{ type: String }],
    location: { type: String, default: 'Indore' },
    city: { type: String, default: 'Indore' },
    area: { type: String, default: '' },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    socialLinks: {
      instagram: String,
      youtube: String,
    },
    portfolioPhotos: [{ url: String, publicId: String }],
    portfolioVideos: [{ url: String, publicId: String }],
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
      index: true,
    },
    isFeatured: { type: Boolean, default: false },
    pendingChanges: { type: Object, default: null }, // Stores major edits awaiting admin approval
  },
  { timestamps: true }
);

communityLeadSchema.index({ category: 1, status: 1 });

export default mongoose.models.CommunityLead || mongoose.model('CommunityLead', communityLeadSchema);
