import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // Rich text (HTML)
    category: { type: String, default: 'General' },
    media: {
      url: { type: String },      // Cloudinary URL
      public_id: { type: String }, // Used to delete image from Cloudinary later
      type: { type: String, enum: ['image', 'video'], default: 'image' }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;