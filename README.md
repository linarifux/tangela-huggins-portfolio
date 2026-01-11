# MERN Stack Portfolio & Content Management System

A robust, high-performance portfolio website built with the MERN stack (MongoDB, Express, React, Node.js). This application features a sleek public-facing interface for showcasing services and content, coupled with a secure Admin Dashboard for managing blog posts and inquiries.

![Project Banner](https://via.placeholder.com/1200x600?text=MERN+Portfolio+Preview)

## 🚀 Features

### Public Interface
* **Responsive Design:** Fully responsive UI built with Tailwind CSS.
* **Dynamic Blog:** Read articles with support for cover images and rich content.
* **Contact System:** Functional contact form that saves inquiries to the database.
* **SEO Optimized:** Dynamic meta tags for better search engine visibility.
* **Smooth Animations:** Page transitions and UI interactions powered by Framer Motion.

### Admin Dashboard
* **Secure Authentication:** JWT-based login system for administrators.
* **Dashboard Stats:** Real-time overview of total posts, inquiries, and engagement rates.
* **Content Management:** Create, Edit, and Delete blog posts with file uploads.
* **Inbox Management:** View and delete contact form inquiries.
* **Interactive UI:** Toast notifications (`react-hot-toast`) and confirmation modals for critical actions.

## 🛠️ Tech Stack

**Frontend (Client)**
* React 18 (Vite)
* Redux Toolkit (State Management)
* Tailwind CSS (Styling)
* Framer Motion (Animations)
* React Router DOM (Routing)
* Axios (API Requests)

**Backend (Server)**
* Node.js & Express
* MongoDB & Mongoose (Database)
* Multer (File Uploads)
* JSON Web Token (Authentication)
* Bcryptjs (Password Hashing)

## 📂 Project Structure

```bash
root/
├── client/              # React Frontend
│   ├── public/          # Static assets & _redirects
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── features/    # Redux Slices (Auth, Blog, Contact)
│   │   ├── pages/       # Public & Admin Views
│   │   └── utils/       # API configuration
│   └── package.json
│
├── server/              # Express Backend
│   ├── config/          # DB Connection
│   ├── controllers/     # Route Logic
│   ├── models/          # Mongoose Schemas
│   ├── routes/          # API Endpoints
│   ├── uploads/         # Image storage
│   └── server.js        # Entry point
│
└── package.json         # Root config (optional)

