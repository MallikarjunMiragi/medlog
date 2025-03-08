import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/auth"; // Adjust based on your backend

// Async action to fetch user report details from DB
export const fetchReportData = createAsyncThunk("reports/fetchReportData", async (email, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch report data");
    }
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    userDetails: {},
    fromDate: new Date().toISOString().split("T")[0],
    toDate: new Date().toISOString().split("T")[0],
    reportFormat: "Summary report",
    reportFileType: "PDF (non-editable format)",
    categories: [],
    mainToggle: true,
    categoryToggles: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setFromDate: (state, action) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
    },
    toggleMain: (state) => {
      state.mainToggle = !state.mainToggle;
      Object.keys(state.categoryToggles).forEach((category) => {
        state.categoryToggles[category] = state.mainToggle;
      });
    },
    toggleCategory: (state, action) => {
      const category = action.payload;
      state.categoryToggles[category] = !state.categoryToggles[category];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReportData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload;
        state.categories = action.payload.categories || [];
        state.categoryToggles = action.payload.categories.reduce((acc, category) => {
          acc[category] = true;
          return acc;
        }, {});
      })
      .addCase(fetchReportData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error || "Failed to fetch report data";
      });
  },
});

export const { setFromDate, setToDate, toggleMain, toggleCategory } = reportsSlice.actions;
export default reportsSlice.reducer;
