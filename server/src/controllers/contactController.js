import asyncHandler from '../utils/asyncHandler.js';
import Inquiry from '../models/Inquiry.js';
import AppError from '../utils/AppError.js';

// @desc    Submit a new contact inquiry
// @route   POST /api/contact
// @access  Public
export const createInquiry = asyncHandler(async (req, res, next) => {
  const { name, email, service, message } = req.body;

  if (!name || !email || !message) {
    return next(new AppError('Please fill in all required fields', 400));
  }

  const inquiry = await Inquiry.create({
    name,
    email,
    service,
    message,
  });

  res.status(201).json({
    success: true,
    data: inquiry,
    message: "Message received! Tangela's team will get back to you soon.",
  });
});

// @desc    Delete an inquiry
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteInquiry = asyncHandler(async (req, res, next) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return next(new AppError('Inquiry not found', 404));
  }

  await inquiry.deleteOne();
  res.json({ message: 'Inquiry removed' });
});

// @desc    Get all inquiries
// @route   GET /api/contact
// @access  Private/Admin
export const getInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json(inquiries);
});