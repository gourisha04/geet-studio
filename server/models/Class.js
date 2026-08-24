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
      required: true,
      index: true,
    },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true, index: true },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true, index: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: [{ type: String }],
    classTiming: { type: String, required: true },
    classDuration: { type: String, required: true },
    courseDuration: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    location: { type: String, default: 'Geet Studio, Indore' },
    batches: [batchSchema],
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    fees: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalPayableAmount: { type: Number, required: true },
    registrationStatus: {
      type: String,
      enum: ['OPEN', 'FULL', 'CLOSED'],
      default: 'OPEN',
      index: true,
    },
    images: [{ url: String, publicId: String }],
    whatsAppGroupLink: { type: String },
    termsAndConditions: { type: String },
    cancellationPolicy: { type: String, default: 'Contact Geet Studio administration for refund policies.' },
  },
  { timestamps: true }
);

classSchema.index({ type: 1, registrationStatus: 1 });

export default mongoose.models.Class || mongoose.model('Class', classSchema);
