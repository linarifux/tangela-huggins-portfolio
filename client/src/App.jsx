import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/public/Home/Home";
import Contact from "./pages/public/Contact";
import PostView from "./pages/public/PostView";
import NotFound from "./pages/public/NotFound";

import Login from "./pages/admin/Login";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import CreatePost from "./pages/admin/CreatePost";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminInquiries from "./pages/admin/AdminInquiries";
import BlogList from "./pages/public/BlogList";
import EditPost from "./pages/admin/EditPost";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";

// 1. Protected Route Component
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Define explicit conditions
  const isLoginPage = location.pathname === "/login";
  const isAdminSection = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "serif",
          },
        }}
      />

      {/* Show Navbar everywhere EXCEPT the Login page */}
      {!isLoginPage && <Navbar />}

      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/:id" element={<PostView />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />

        {/* --- Admin Auth --- */}
        <Route path="/login" element={<Login />} />

        {/* --- Protected Admin Routes --- */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              {/* Ensure AdminLayout has padding-top if Navbar is fixed */}
              <div className="pt-32 min-h-screen bg-gray-50"> 
                <AdminLayout />
              </div>
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="edit-post/:id" element={<EditPost />} />
        </Route>

        {/* --- Catch All --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Hide Footer on ALL Admin pages AND Login page */}
      {!isAdminSection && !isLoginPage && <Footer />}
    </>
  );
}

export default App;