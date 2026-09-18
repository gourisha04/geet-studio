import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    enrollmentId: { type: String, required: true, unique: true, index: true },
    classId: { type: mongoose.Schema.Types.Mixed, ref: 'Class', required: true, index: true },
    className: { type: String, default: '' },
    studentName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, default: '' },
    requestStatus: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'CONFIRMED', 'CLOSED'],
      default: 'NEW',
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema);
