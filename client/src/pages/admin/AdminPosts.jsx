import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiTrash2, FiEye, FiEdit2, FiCalendar, FiTag } from 'react-icons/fi';
import toast from 'react-hot-toast'; 
import { getPosts, deletePost } from '../../features/blog/blogSlice';
import ConfirmationModal from '../../components/ui/ConfirmationModal';

const AdminPosts = () => {
  const dispatch = useDispatch();
  
  // Local state for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Select Global State
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.blog
  );

  // Fetch posts on load
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // 1. Open Modal
  const initiateDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  // 2. Confirm Delete with Toast
  const confirmDelete = async () => {
    if (selectedId) {
      await toast.promise(
        dispatch(deletePost(selectedId)).unwrap(),
        {
          loading: 'Deleting post...',
          success: <b>Post deleted successfully!</b>,
          error: <b>Failed to delete post.</b>,
        }
      );
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  if (isLoading && posts.length === 0) return <div className="p-10 text-center">Loading posts...</div>;
  if (isError) return <div className="p-10 text-red-500 text-center">Error: {message}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20 pt-6">
      
      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Post?"
        message="Are you sure you want to remove this post? This action cannot be undone."
        isLoading={isLoading}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold">Blog Posts</h1>
          <p className="text-gray-500 text-sm">{posts.length} entries published</p>
        </div>
        <Link 
          to="/admin/create-post" 
          className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
        >
          <FiPlus /> Create New
        </Link>
      </div>

      {/* --- DESKTOP VIEW (Table) --- */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Cover</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/3">Title</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4 pl-6 w-24">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-all border border-gray-100">
                      {post.media && post.media.url ? (
                        <img src={post.media.url} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No Img</div>
                      )}
                    </div>
                  </td>
                  <td className="p-6 font-serif font-bold text-lg text-gray-800">
                    <div className="line-clamp-2">{post.title}</div>
                  </td>
                  <td className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 uppercase tracking-wide whitespace-nowrap">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-6 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <Link 
                        to={`/blog/${post._id}`} 
                        target="_blank" 
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors bg-white border border-gray-200 rounded-md hover:border-blue-600"
                        title="View"
                      >
                        <FiEye size={16} />
                      </Link>
                      <Link 
                        to={`/admin/edit-post/${post._id}`}
                        className="p-2 text-gray-400 hover:text-black transition-colors bg-white border border-gray-200 rounded-md hover:border-black"
                        title="Edit"
                      >
                        <FiEdit2 size={16} />
                      </Link>
                      <button 
                        onClick={() => initiateDelete(post._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white border border-gray-200 rounded-md hover:border-red-600"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-400">
                  No posts found. Start writing!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW (Cards) --- */}
      <div className="md:hidden flex flex-col gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 items-start">
              
              {/* Image (Fixed Size & Prevent Shrinking) */}
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                 {post.media && post.media.url ? (
                    <img src={post.media.url} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No Img</div>
                  )}
              </div>

              {/* Content (Flex Grow & Min Width 0 to prevent overflow) */}
              <div className="flex-1 min-w-0 flex flex-col h-24 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wide">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-gray-800 text-base leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                {/* Actions Row */}
                <div className="flex justify-end gap-3 mt-1">
                  <Link 
                    to={`/blog/${post._id}`} 
                    className="p-1.5 text-gray-400 hover:text-blue-600 bg-gray-50 rounded"
                  >
                    <FiEye size={16} />
                  </Link>
                  <Link 
                    to={`/admin/edit-post/${post._id}`}
                    className="p-1.5 text-gray-400 hover:text-black bg-gray-50 rounded"
                  >
                    <FiEdit2 size={16} />
                  </Link>
                  <button 
                    onClick={() => initiateDelete(post._id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-400 bg-white rounded-xl border border-gray-100">
             No posts found.
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminPosts;