import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import contactReducer from '../features/contact/contactSlice';
import blogReducer from '../features/blog/blogSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    blog: blogReducer, 
  },
});

export default store;