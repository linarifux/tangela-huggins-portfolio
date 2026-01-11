import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiTrash2, FiEye, FiEdit2 } from 'react-icons/fi';
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

  if (isLoading && posts.length === 0) return <div className="p-10">Loading posts...</div>;
  if (isError) return <div className="p-10 text-red-500">Error: {message}</div>;

  return (
    <div className="max-w-6xl mx-auto">
      
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">Blog Posts</h1>
          <p className="text-gray-500 text-sm">{posts.length} entries published</p>
        </div>
        <Link 
          to="/admin/create-post" 
          className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
        >
          <FiPlus /> Create New
        </Link>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Cover</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Title</th>
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
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-all">
                      {post.media && post.media.url ? (
                        <img src={post.media.url} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No Img</div>
                      )}
                    </div>
                  </td>
                  <td className="p-6 font-serif font-bold text-lg text-gray-800">
                    {post.title}
                  </td>
                  <td className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 uppercase tracking-wide">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-6 text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      
                      {/* View Button */}
                      <Link 
                        to={`/blog/${post._id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Post"
                      >
                        <FiEye size={18} />
                      </Link>

                      {/* Edit Button */}
                      <Link 
                        to={`/admin/edit-post/${post._id}`}
                        className="p-2 text-gray-400 hover:text-black transition-colors"
                        title="Edit Post"
                      >
                        <FiEdit2 size={18} />
                      </Link>
                      
                      {/* Delete Button */}
                      <button 
                        onClick={() => initiateDelete(post._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Post"
                      >
                        <FiTrash2 size={18} />
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

    </div>
  );
};

export default AdminPosts;