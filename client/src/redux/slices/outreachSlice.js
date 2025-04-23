import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock data for outreaches
const mockOutreaches = [
  {
    id: 1,
    subreddits: ["r/marketing", "r/smallbusiness"],
    productId: 1,
    productName: "Product 1",
    status: "active",
    dateRange: {
      startDate: "2023-05-01",
      endDate: "2023-05-15",
    },
    maxPosts: 100,
    replyType: "autoReplyOnce",
    createdAt: "2023-05-15",
  },
  {
    id: 2,
    subreddits: ["r/entrepreneur"],
    productId: 2,
    productName: "Product 2",
    status: "pending",
    dateRange: {
      startDate: "2023-05-10",
      endDate: "2023-05-20",
    },
    maxPosts: 50,
    replyType: "manualReplyOnce",
    replyMessage:
      "Hi, I think our product might help with your needs. Check it out!",
    createdAt: "2023-05-16",
  },
  {
    id: 3,
    subreddits: ["r/startups", "r/SaaS", "r/technology"],
    productId: 3,
    productName: "Product 3",
    status: "completed",
    dateRange: {
      startDate: "2023-04-15",
      endDate: "2023-05-10",
    },
    maxPosts: 200,
    replyType: "autoReplyComplete",
    createdAt: "2023-05-17",
  },
];

// Async thunks for outreach CRUD operations
export const fetchOutreaches = createAsyncThunk(
  "outreaches/fetchOutreaches",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return mockOutreaches;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOutreachById = createAsyncThunk(
  "outreaches/fetchOutreachById",
  async (id, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const outreach = mockOutreaches.find((o) => o.id === Number.parseInt(id));

      if (!outreach) {
        throw new Error("Outreach not found");
      }

      return outreach;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOutreach = createAsyncThunk(
  "outreaches/createOutreach",
  async (outreachData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a new outreach with a mock ID
      const newOutreach = {
        id: Date.now(),
        status: "pending",
        createdAt: new Date().toISOString().split("T")[0],
        ...outreachData,
      };

      return newOutreach;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOutreach = createAsyncThunk(
  "outreaches/updateOutreach",
  async (outreachData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return outreachData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOutreach = createAsyncThunk(
  "outreaches/deleteOutreach",
  async (id, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  outreaches: [],
  currentOutreach: null,
  loading: false,
  error: null,
  success: false,
};

const outreachSlice = createSlice({
  name: "outreaches",
  initialState,
  reducers: {
    clearOutreachError: (state) => {
      state.error = null;
    },
    clearOutreachSuccess: (state) => {
      state.success = false;
    },
    resetCurrentOutreach: (state) => {
      state.currentOutreach = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch outreaches
      .addCase(fetchOutreaches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutreaches.fulfilled, (state, action) => {
        state.loading = false;
        state.outreaches = action.payload;
      })
      .addCase(fetchOutreaches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch outreaches";
      })

      // Fetch outreach by ID
      .addCase(fetchOutreachById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutreachById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOutreach = action.payload;
      })
      .addCase(fetchOutreachById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch outreach";
      })

      // Create outreach
      .addCase(createOutreach.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOutreach.fulfilled, (state, action) => {
        state.loading = false;
        state.outreaches.push(action.payload);
        state.success = true;
      })
      .addCase(createOutreach.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create outreach";
      })

      // Update outreach
      .addCase(updateOutreach.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateOutreach.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.outreaches.findIndex(
          (o) => o.id === action.payload.id
        );
        if (index !== -1) {
          state.outreaches[index] = action.payload;
        }
        state.currentOutreach = action.payload;
        state.success = true;
      })
      .addCase(updateOutreach.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update outreach";
      })

      // Delete outreach
      .addCase(deleteOutreach.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOutreach.fulfilled, (state, action) => {
        state.loading = false;
        state.outreaches = state.outreaches.filter(
          (o) => o.id !== action.payload
        );
        state.success = true;
      })
      .addCase(deleteOutreach.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete outreach";
      });
  },
});

export const {
  clearOutreachError,
  clearOutreachSuccess,
  resetCurrentOutreach,
} = outreachSlice.actions;
export default outreachSlice.reducer;
