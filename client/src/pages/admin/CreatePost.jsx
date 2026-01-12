import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiUploadCloud, FiX, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill-new'; 
import 'react-quill-new/dist/quill.snow.css'; 
import { createPost, resetBlog } from '../../features/blog/blogSlice';

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.blog
  );

  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Mindset',
    content: '',
    file: null
  });

  // --- Quill Toolbar Config ---
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['clean']
    ],
  };

  useEffect(() => {
    if (isError) {
      toast.error(message || "Failed to create post.");
    }

    if (isSuccess) {
      toast.success("Post published successfully!");
      navigate('/admin/posts');
    }

    return () => {
      dispatch(resetBlog());
    };
  }, [isError, isSuccess, message, navigate, dispatch]);

  // Handle standard inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Editor Change (Quill returns just the HTML string)
  const handleEditorChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('content', formData.content);
    if (formData.file) {
      data.append('file', formData.file);
    }

    dispatch(createPost(data));
  };

  return (
    <div className="max-w-4xl mx-auto pb-24"> 
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold">Write New Post</h1>
        <button 
          onClick={() => navigate('/admin/posts')}
          className="text-gray-500 hover:text-black text-sm uppercase tracking-widest"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* Title Input */}
        <div>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title..."
            className="w-full text-4xl font-serif font-bold placeholder-gray-300 border-none focus:ring-0 focus:outline-none bg-transparent"
            required
          />
        </div>

        {/* Category & File Upload Row */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Category Select */}
          <div className="w-full md:w-1/3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black bg-white"
            >
              <option value="Mindset">Mindset</option>
              <option value="Leadership">Leadership</option>
              <option value="Transformation">Transformation</option>
              <option value="Events">Events</option>
            </select>
          </div>

          {/* Image Upload Area */}
          <div className="w-full md:w-2/3">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cover Image</label>
              
              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUploadCloud size={24} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload cover image</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              ) : (
                <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => { setPreview(null); setFormData({...formData, file: null}) }}
                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-red-500 hover:bg-white transition-colors"
                  >
                    <FiX />
                  </button>
                </div>
              )}
          </div>

        </div>

        {/* Rich Text Editor Area */}
        <div className="bg-white">
           <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Content</label>
           <ReactQuill 
             theme="snow"
             value={formData.content}
             onChange={handleEditorChange}
             modules={modules}
             className="h-80 mb-12" // mb-12 to handle the toolbar height
             placeholder="Start writing your story here..."
           />
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t border-gray-100 p-4 flex justify-end px-8 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-black text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? 'Publishing...' : <><FiSave /> Publish Post</>}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreatePost;