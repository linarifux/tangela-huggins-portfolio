import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { FiHome, FiFileText, FiMessageSquare, FiLogOut } from 'react-icons/fi';

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:flex flex-col">
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
          <span className="text-xl font-serif font-bold">Tangela Admin.</span>
        </div>

        <nav className="flex-1 p-6 flex flex-col gap-2">
          <NavLink to="/admin/dashboard" icon={<FiHome />} label="Overview" />
          <NavLink to="/admin/posts" icon={<FiFileText />} label="Blog Posts" />
          <NavLink to="/admin/inquiries" icon={<FiMessageSquare />} label="Inquiries" />
        </nav>

        <div className="p-6 border-t border-gray-100">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 text-red-500 hover:bg-red-50 p-3 rounded-lg w-full transition-colors font-medium text-sm"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-8">
        <Outlet /> 
      </main>

    </div>
  );
};

const NavLink = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-black rounded-lg transition-colors font-medium text-sm"
  >
    {icon} {label}
  </Link>
);

export default AdminLayout;