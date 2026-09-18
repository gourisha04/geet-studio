import mongoose from 'mongoose';

const communityAccessRequestSchema = new mongoose.Schema(
  {
    communityLead: { type: mongoose.Schema.Types.Mixed, ref: 'CommunityLead', index: true },
    communityMemberName: { type: String, default: '' },
    visitorName: { type: String, required: true },
    visitorEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.CommunityAccessRequest || mongoose.model('CommunityAccessRequest', communityAccessRequestSchema);
