import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch user details from backend
export const fetchUserDetails = createAsyncThunk("reports/fetchUserDetails", async (_, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
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
    mainToggle: true,
    categoryToggles: {},
    error: null,
  },
  reducers: {
    setFromDate: (state, action) => { state.fromDate = action.payload; },
    setToDate: (state, action) => { state.toDate = action.payload; },
    toggleMain: (state, action) => { state.mainToggle = action.payload; },
    toggleCategory: (state, action) => { state.categoryToggles[action.payload] = !state.categoryToggles[action.payload]; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.fulfilled, (state, action) => { state.userDetails = action.payload; })
      .addCase(fetchUserDetails.rejected, (state, action) => { state.error = action.payload; });
  },
});

export const { setFromDate, setToDate, toggleMain, toggleCategory } = reportsSlice.actions;
export default reportsSlice.reducer;
