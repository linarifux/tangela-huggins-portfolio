import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet'; // Secure Headers
import morgan from 'morgan';

// Import Utils & Middleware
import globalErrorHandler from './src/middleware/errorMiddleware.js';
import AppError from './src/utils/AppError.js';
import connectDB from './src/config/db.js';

// Import Routes
import authRoutes from './src/routes/authRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. Security Headers ---
// Set security HTTP headers
app.use(helmet());


// --- 3. Standard Middleware ---
app.use(cors());
app.use(morgan('dev'));

// Body parser, reading data from body into req.body (limit data size)
app.use(express.json({ limit: '10kb' })); 

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- 404 Handler ---
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// --- Global Error Handler ---
app.use(globalErrorHandler);

// --- Server Startup ---
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
});