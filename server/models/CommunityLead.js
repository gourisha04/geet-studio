import mongoose from 'mongoose';

const communityLeadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.Mixed, ref: 'User', required: false, index: true },
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
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'],
      default: 'PENDING',
      index: true,
    },
    isFeatured: { type: Boolean, default: false },
    pendingChanges: { type: Object, default: null }, // Stores major edits awaiting admin approval
  },
  { timestamps: true }
);

communityLeadSchema.index({ category: 1, status: 1 });

const CommunityLeadModel = mongoose.models.CommunityLead || mongoose.model('CommunityLead', communityLeadSchema);

// Auto-clean legacy duplicate userId_1 index if it exists without sparse option
if (mongoose.connection) {
  mongoose.connection.once('open', async () => {
    try {
      await CommunityLeadModel.collection.dropIndex('userId_1');
      console.log('Cleaned legacy userId_1 index on CommunityLead collection.');
    } catch (e) {
      // Index might not exist or already cleaned
    }
  });
}

export default CommunityLeadModel;
