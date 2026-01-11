import mongoose from 'mongoose';

const inquirySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true }, // Dropdown selection
    message: { type: String, required: true },
    read: { type: Boolean, default: false }, // For admin dashboard later
  },
  { timestamps: true }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;