import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk for Reddit OAuth authentication
export const authenticateWithReddit = createAsyncThunk(
  "auth/authenticateWithReddit",
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would handle the OAuth flow
      // For now, we'll simulate a successful authentication
      const mockResponse = {
        username: "RedditUser123",
        avatar: "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png",
        token: "mock-auth-token",
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return mockResponse
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateWithReddit.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(authenticateWithReddit.fulfilled, (state, action) => {
        state.loading = false
        state.user = {
          username: action.payload.username,
          avatar: action.payload.avatar,
        }
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(authenticateWithReddit.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Authentication failed"
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
