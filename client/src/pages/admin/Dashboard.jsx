import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import { 
  FiFileText, 
  FiMessageSquare, 
  FiActivity, 
  FiPlus, 
  FiExternalLink, 
  FiArrowRight 
} from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({ posts: 0, inquiries: 0, latestInquiries: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Calculate simple "Conversion Rate" (Inquiries per Post)
  const conversionRate = stats.posts > 0 
    ? ((stats.inquiries / stats.posts) * 100).toFixed(0) + '%' 
    : '0%';

  if (loading) return (
    <div className="flex h-96 items-center justify-center text-gray-400 animate-pulse">
      Loading Dashboard...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* 1. HEADER & GREETING */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back, <span className="font-bold text-black">{user?.name || 'Admin'}</span>. Here's what's happening today.
          </p>
        </div>
        
        <div className="flex gap-3">
          <a 
            href="/" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            Live Site <FiExternalLink />
          </a>
          <Link 
            to="/admin/create-post" 
            className="px-6 py-3 bg-black text-white rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
          >
            <FiPlus size={16} /> New Post
          </Link>
        </div>
      </div>

      {/* 2. ANIMATED STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard 
          icon={<FiFileText size={24} />} 
          label="Total Published" 
          value={stats.posts} 
          sublabel="Blog Posts"
          color="bg-blue-50 text-blue-600"
          delay={0}
        />
        <StatCard 
          icon={<FiMessageSquare size={24} />} 
          label="Total Received" 
          value={stats.inquiries} 
          sublabel="Inquiries"
          color="bg-purple-50 text-purple-600"
          delay={0.1}
        />
        <StatCard 
          icon={<FiActivity size={24} />} 
          label="Engagement Rate" 
          value={conversionRate} 
          sublabel="Inquiry / Post Ratio"
          color="bg-green-50 text-green-600"
          delay={0.2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. RECENT INQUIRIES LIST */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Recent Inquiries</h3>
            <Link to="/admin/inquiries" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
              View Inbox <FiArrowRight />
            </Link>
          </div>
          
          <div className="divide-y divide-gray-100">
            {stats.latestInquiries.length > 0 ? (
              stats.latestInquiries.map((inquiry) => (
                <div key={inquiry._id} className="px-6 py-4 hover:bg-gray-50 transition-colors flex justify-between items-center group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm group-hover:bg-white group-hover:shadow-md transition-all">
                      {inquiry.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 group-hover:text-black">{inquiry.name}</p>
                      <p className="text-xs text-gray-500">{inquiry.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-gray-400 mb-1">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-gray-300 border border-gray-200 px-2 py-0.5 rounded-full">
                      New
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <FiMessageSquare size={24} />
                </div>
                <p className="text-gray-500 text-sm">No inquiries yet.</p>
                <p className="text-gray-400 text-xs mt-1">Share your contact link to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* 4. QUICK ACTIONS CARD */}
        <div className="bg-brand-black text-white rounded-xl p-8 flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">Quick Actions</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Keep your content fresh. Regular updates improve SEO and engagement.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link 
              to="/admin/create-post" 
              className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold text-center transition-colors border border-white/10"
            >
              Write New Article
            </Link>
            <Link 
              to="/admin/posts" 
              className="w-full py-3 bg-transparent hover:bg-white/5 rounded-lg text-sm font-bold text-center transition-colors border border-white/20"
            >
              Manage Existing Posts
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Component for Stats with Animation
const StatCard = ({ icon, label, value, sublabel, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-sm`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
        {sublabel && <span className="text-xs text-gray-400 font-medium">{sublabel}</span>}
      </div>
    </div>
  </motion.div>
);

export default Dashboard;