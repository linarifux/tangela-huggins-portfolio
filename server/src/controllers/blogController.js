import asyncHandler from '../utils/asyncHandler.js';
import Post from '../models/Post.js';
import AppError from '../utils/AppError.js';

// @desc    Create a new blog post
// @route   POST /api/blog
// @access  Private/Admin
export const createPost = asyncHandler(async (req, res, next) => {
  const { title, content, category } = req.body;

  if (!title || !content) {
    return next(new AppError('Title and Content are required', 400));
  }

  let mediaData = null;

  // Check if file was uploaded via Multer/Cloudinary
  if (req.file) {
    mediaData = {
      url: req.file.path,
      public_id: req.file.filename,
      type: req.file.mimetype.startsWith('video') ? 'video' : 'image'
    };
  }

  const post = await Post.create({
    user: req.user._id, // Assumes authMiddleware attaches user
    title,
    content,
    category,
    media: mediaData,
  });

  res.status(201).json(post);
});

// @desc    Get all posts
// @route   GET /api/blog
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});


// ... existing imports
// Add this new function:

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  // Optional: You could add logic here to delete the image from Cloudinary too

  await post.deleteOne();

  res.json({ message: 'Post removed' });
});


// @desc    Get single blog post
// @route   GET /api/blog/:id
// @access  Public
export const getPostById = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    next(new AppError('Post not found', 404));
  }
});


// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
export const updatePost = asyncHandler(async (req, res, next) => {
  const { title, content, category } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  // Update fields
  post.title = title || post.title;
  post.content = content || post.content;
  post.category = category || post.category;

  // Handle new file upload if exists
  if (req.file) {
    post.media = {
      url: req.file.path,
      public_id: req.file.filename,
      type: req.file.mimetype.startsWith('video') ? 'video' : 'image'
    };
  }

  const updatedPost = await post.save();
  res.json(updatedPost);
});