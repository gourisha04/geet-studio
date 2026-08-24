import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, index: true },
    sessionId: { type: String, required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    eventType: {
      type: String,
      enum: ['page_enter', 'page_exit', 'route_change', 'click', 'visibility_change', 'enrollment_step'],
      required: true,
      index: true,
    },
    page: { type: String, required: true, index: true },
    target: { type: String },
    durationMs: { type: Number },
    metadata: { type: Object },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

analyticsEventSchema.index({ timestamp: -1 });
analyticsEventSchema.index({ visitorId: 1, sessionId: 1 });

export default mongoose.models.AnalyticsEvent || mongoose.model('AnalyticsEvent', analyticsEventSchema);
