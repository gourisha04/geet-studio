import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema(
  {
    registrationId: { type: String, required: true, unique: true, index: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    eventTitle: { type: String, required: true },
    attendeeName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    seats: { type: Number, default: 1, min: 1 },
    message: { type: String, default: '' },
    activeRegistrationKey: { type: String },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'CONFIRMED', 'CANCELLED'],
      default: 'NEW',
      index: true,
    },
  },
  { timestamps: true }
);

// Compound partial unique index: guarantees exactly ONE active registration per (event, email).
// When a registration is CANCELLED, activeRegistrationKey is unset/null, which allows re-registration.
eventRegistrationSchema.index(
  { activeRegistrationKey: 1 },
  {
    unique: true,
    partialFilterExpression: { activeRegistrationKey: { $type: 'string' } },
  }
);

export default mongoose.models.EventRegistration || mongoose.model('EventRegistration', eventRegistrationSchema);
