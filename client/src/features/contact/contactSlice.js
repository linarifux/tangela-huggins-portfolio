import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  inquiries: [], // <--- Added to store the list
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// 1. Submit Inquiry (Public)
export const submitInquiry = createAsyncThunk(
  'contact/submit',
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2. Get All Inquiries (Admin)
export const getInquiries = createAsyncThunk(
  'contact/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/contact');
      return response.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3. Delete Inquiry (Admin)
export const deleteInquiry = createAsyncThunk(
  'contact/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/contact/${id}`);
      return id; // Return the ID so we can remove it from the state
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContact: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Submit Cases ---
      .addCase(submitInquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitInquiry.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Message sent successfully!';
      })
      .addCase(submitInquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // --- Get All Cases ---
      .addCase(getInquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.inquiries = action.payload; // Populate list
      })
      .addCase(getInquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // --- Delete Cases ---
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        // Filter out the deleted inquiry from the Redux state immediately
        state.inquiries = state.inquiries.filter(
          (inquiry) => inquiry._id !== action.payload
        );
      });
  },
});

export const { resetContact } = contactSlice.actions;
export default contactSlice.reducer;