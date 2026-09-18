import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
  batchId: { type: String, required: true },
  name: { type: String, required: true },
  timing: { type: String, required: true },
  days: [{ type: String }],
  totalSeats: { type: Number, required: true },
  confirmedSeats: { type: Number, default: 0 },
  reservedSeats: { type: Number, default: 0 },
});

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['class', 'workshop'],
      default: 'class',
      index: true,
    },
    serviceId: { type: mongoose.Schema.Types.Mixed, ref: 'Service', required: false },
    instructorId: { type: mongoose.Schema.Types.Mixed, ref: 'Instructor', required: false },
    description: { type: String, default: 'Studio dance instruction at Geet Studio.' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    days: [{ type: String }],
    classTiming: { type: String, default: '6:00 PM - 7:00 PM' },
    classDuration: { type: String, default: '1 Hour' },
    courseDuration: { type: String, default: '1 Month' },
    isOnline: { type: Boolean, default: false },
    location: { type: String, default: 'Geet Studio, Indore' },
    batches: [batchSchema],
    totalSeats: { type: Number, default: 20 },
    availableSeats: { type: Number, default: 20 },
    fees: { type: Number, default: 3000 },
    discount: { type: Number, default: 0 },
    finalPayableAmount: { type: Number, default: 3000 },
    registrationStatus: {
      type: String,
      enum: ['OPEN', 'FULL', 'CLOSED'],
      default: 'OPEN',
      index: true,
    },
    images: [{ url: String, publicId: String }],
    whatsAppGroupLink: { type: String, default: 'https://chat.whatsapp.com/GeetStudioOfficialGroup' },
    termsAndConditions: { type: String, default: 'Standard studio rules apply.' },
    cancellationPolicy: { type: String, default: 'Contact Geet Studio administration for refund policies.' },
  },
  { timestamps: true }
);

classSchema.index({ type: 1, registrationStatus: 1 });

export default mongoose.models.Class || mongoose.model('Class', classSchema);
