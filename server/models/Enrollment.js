import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    enrollmentId: { type: String, required: true, unique: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    batchId: { type: String, required: true },
    studentDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    amountPaid: { type: Number, required: true },
    enrollmentStatus: {
      type: String,
      enum: ['PAYMENT_PENDING', 'CONFIRMED', 'EXPIRED', 'FAILED', 'CANCELLED'],
      default: 'PAYMENT_PENDING',
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING_PAYMENT', 'PAID', 'FAILED', 'EXPIRED', 'REFUNDED'],
      default: 'PENDING_PAYMENT',
      index: true,
    },
    paymentProvider: { type: String, default: 'DEFERRED_SIMULATED' },
    transactionId: { type: String, index: true },
    paymentOrderId: { type: String, index: true },
    paymentExpiresAt: { type: Date, required: true, index: true },
    releasedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

enrollmentSchema.index({ enrollmentStatus: 1, paymentExpiresAt: 1 });

export default mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema);
