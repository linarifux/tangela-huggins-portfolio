import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2, FiMail, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getInquiries, deleteInquiry } from '../../features/contact/contactSlice';
import ConfirmationModal from '../../components/ui/ConfirmationModal';

const AdminInquiries = () => {
  const dispatch = useDispatch();
  
  // Local state for managing the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { inquiries, isLoading, isError, message } = useSelector(
    (state) => state.contact
  );

  useEffect(() => {
    dispatch(getInquiries());
  }, [dispatch]);

  // 1. Open Modal instead of window.confirm
  const initiateDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  // 2. Handle the actual deletion with Toast Promise
  const confirmDelete = async () => {
    if (selectedId) {
      await toast.promise(
        dispatch(deleteInquiry(selectedId)).unwrap(), 
        {
          loading: 'Deleting message...',
          success: <b>Message deleted!</b>,
          error: <b>Failed to delete.</b>,
        }
      );
      
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  if (isLoading && inquiries.length === 0) return <div className="p-10">Loading inbox...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      {/* --- Confirmation Modal Component --- */}
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Message?"
        message="This action cannot be undone. Are you sure you want to remove this inquiry from your inbox?"
        isLoading={isLoading} 
      />

      <h1 className="text-3xl font-serif font-bold mb-8">Inbox ({inquiries.length})</h1>

      <div className="grid gap-6">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <div key={inquiry._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                    {inquiry.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{inquiry.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <FiMail size={12} /> {inquiry.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-wide mb-1">
                    {inquiry.service}
                  </span>
                  <p className="text-xs text-gray-400 flex items-center justify-end gap-1">
                    <FiCalendar size={10} /> {new Date(inquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 text-sm leading-relaxed mb-4">
                {inquiry.message}
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => initiateDelete(inquiry._id)} 
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 text-xs uppercase tracking-widest font-bold px-3 py-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiTrash2 /> Delete Message
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400">
            No new messages.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;