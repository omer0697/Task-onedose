import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for checking authentication
export const checkAuthentication = createAsyncThunk(
  'auth/checkAuthentication',
  async (_, { getState }) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return true; // Indicates that the user is authenticated
    }
    return false; // Indicates that the user is not authenticated
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    // Reducers for login and logout remain unchanged
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
      });
    // You can handle pending and rejected states as needed
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsAuthenticated = state => state.auth.isAuthenticated;

export default authSlice.reducer;
