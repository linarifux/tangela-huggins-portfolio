import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  posts: [],
  post: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// 1. Create Post (Existing)
export const createPost = createAsyncThunk(
  'blog/create',
  async (postData, thunkAPI) => {
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const response = await api.post('/blog', postData, config);
      return response.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2. Get All Posts (NEW)
export const getPosts = createAsyncThunk(
  'blog/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/blog');
      return response.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3. Delete Post (NEW)
export const deletePost = createAsyncThunk(
  'blog/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/blog/${id}`);
      return id; // Return ID to filter it out of state
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4. Get Single Post (For Edit Page)
export const getPost = createAsyncThunk(
  'blog/getOne',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/blog/${id}`);
      return response.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 5. Update Post
export const updatePost = createAsyncThunk(
  'blog/update',
  async ({ id, postData }, thunkAPI) => {
    try {
      // Config for file upload
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const response = await api.put(`/blog/${id}`, postData, config);
      return response.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    resetBlog: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearCurrentPost: (state) => {
      state.post = null; // Helper to clear the edit form buffer
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Create Post ---
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // --- Get Posts (NEW) ---
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // --- Delete Post (NEW) ---
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      // --- Get Single Post ---
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload; // Populate form data
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // --- Update Post ---
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload; // Update the current view with new data
        state.message = 'Post updated successfully!';
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetBlog, clearCurrentPost } = blogSlice.actions;
export default blogSlice.reducer;