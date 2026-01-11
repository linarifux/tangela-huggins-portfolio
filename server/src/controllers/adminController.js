import asyncHandler from '../utils/asyncHandler.js';
import Post from '../models/Post.js';
import Inquiry from '../models/Inquiry.js';

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = asyncHandler(async (req, res) => {
  // Run queries in parallel for performance
  const [postCount, inquiryCount, latestInquiries] = await Promise.all([
    Post.countDocuments(),
    Inquiry.countDocuments(),
    Inquiry.find().sort({ createdAt: -1 }).limit(5)
  ]);

  res.json({
    posts: postCount,
    inquiries: inquiryCount,
    latestInquiries
  });
});