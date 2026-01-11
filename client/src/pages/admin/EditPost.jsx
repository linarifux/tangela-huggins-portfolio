import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // <--- Redux Hooks
import { FiUploadCloud, FiX, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getPost, updatePost, resetBlog, clearCurrentPost } from '../../features/blog/blogSlice'; // <--- Import Actions

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Select Global State
  const { post, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.blog
  );

  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    content: '',
    file: null
  });

  // 2. Fetch Post on Mount
  useEffect(() => {
    dispatch(clearCurrentPost()); // Clear old data first
    dispatch(getPost(id));
  }, [dispatch, id]);

  // 3. Populate Form when 'post' data arrives from Redux
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        category: post.category,
        content: post.content,
        file: null
      });
      if (post.media && post.media.url) {
        setPreview(post.media.url);
      }
    }
  }, [post]);

  // 4. Handle Success/Error Notifications
  useEffect(() => {
    if (isError) {
      toast.error(message || "Failed to load post.");
    }
    
    if (isSuccess) {
      toast.success("Post updated successfully!");
      navigate('/admin/posts');
      dispatch(resetBlog()); // Reset success flag so it doesn't trigger again
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('content', formData.content);
    
    // Only append file if user selected a NEW one
    if (formData.file) {
      data.append('file', formData.file);
    }

    // 5. Dispatch Update Action
    dispatch(updatePost({ id, postData: data }));
  };

  // While fetching initial data (and no post exists yet)
  if (isLoading && !post) return <div className="p-10">Loading editor...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold">Edit Post</h1>
        <button onClick={() => navigate('/admin/posts')} className="text-gray-500 hover:text-black text-sm uppercase tracking-widest">Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        <div>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full text-4xl font-serif font-bold border-none focus:ring-0 bg-transparent placeholder-gray-300"
            placeholder="Post Title"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white">
              <option value="Mindset">Mindset</option>
              <option value="Leadership">Leadership</option>
              <option value="Transformation">Transformation</option>
              <option value="Events">Events</option>
            </select>
          </div>

          <div className="w-full md:w-2/3">
             <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cover Image</label>
             {!preview ? (
               <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
                   <FiUploadCloud size={24} className="text-gray-400 mb-2" />
                   <p className="text-sm text-gray-500">Click to replace image</p>
                 </div>
                 <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
               </label>
             ) : (
               <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                 <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-80" />
                 <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white font-bold uppercase tracking-widest text-xs">
                    Change Image
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                 </label>
               </div>
             )}
          </div>
        </div>

        <div>
          <textarea 
            name="content" 
            value={formData.content} 
            onChange={handleChange} 
            className="w-full min-h-[400px] text-lg leading-relaxed border-none focus:ring-0 resize-none"
            placeholder="Post content..."
          ></textarea>
        </div>

        <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t border-gray-100 p-4 flex justify-end px-8 z-10">
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-black text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : <><FiSave /> Update Post</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;