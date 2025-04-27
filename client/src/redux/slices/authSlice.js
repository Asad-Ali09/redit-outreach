import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for Reddit OAuth authentication
export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For now, we'll simulate a successful authentication
      const mockResponse = {
        username: "Dear-Challenge2076",
        avatar:
          "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png",
      };

      return mockResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", false);
    },
    clearError: (state) => {
      state.error = null;
    },
    updateAuth: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          username: action.payload.username,
          avatar: action.payload.avatar,
        };
        state.isAuthenticated = true;

        // set flag in local storage
        localStorage.setItem("isAuthenticated", true);
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Authentication failed";
      });
  },
});

export const { logout, clearError, updateAuth } = authSlice.actions;
export default authSlice.reducer;
