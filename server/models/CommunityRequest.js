import mongoose from 'mongoose';

const communityRequestSchema = new mongoose.Schema(
  {
    leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityLead', required: true, index: true },
    requesterName: { type: String, required: true },
    requesterEmail: { type: String, required: true },
    requesterPhone: { type: String, required: true },
    serviceRequired: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'CLOSED'],
      default: 'NEW',
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.CommunityRequest || mongoose.model('CommunityRequest', communityRequestSchema);
