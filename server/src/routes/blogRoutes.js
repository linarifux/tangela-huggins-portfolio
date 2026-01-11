import express from 'express';
import { createPost, getPosts, deletePost, getPostById, updatePost } from '../controllers/blogController.js'; // <--- Import deletePost
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, admin, upload.single('file'), createPost);

router.route('/:id')
  .delete(protect, admin, deletePost)
  .get(getPostById)
  .put(protect, admin, upload.single('file'), updatePost); 

export default router;