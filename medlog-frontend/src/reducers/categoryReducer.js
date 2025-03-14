import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/category";

// ✅ Async action to add a new category
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add category");

      return data.category; // Ensure API returns category object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// ✅ Async action to fetch all categories
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/all`);
      const data = await response.json();
      console.log("API Data:", data); // ✅ Debugging
      if (!response.ok) throw new Error(data.error || "Failed to fetch categories");

      if (!Array.isArray(data)) {
        console.error("Unexpected API Response:", data);
        return []; // Prevent Redux from breaking if data is invalid
      }

      return data; // ✅ Ensure it's an array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [], // Stores all categories fetched from API
    loading: false,
    error: null,
  },
  reducers: {
    // ✅ Add local category dynamically
    addLocalCategory: (state, action) => {
      state.categories.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Handle adding category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Added Category:", action.payload); // ✅ Debugging
        state.categories.push(action.payload); // Add new category to state
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Add Category Error:", action.payload);
      })
      
      // ✅ Handle fetching categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log("Fetched Categories in Reducer:", action.payload); // ✅ Debugging
        state.loading = false;
        state.categories = action.payload || []; // Store fetched categories
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Fetch Categories Error:", action.payload);
      });
  },
});

export const { addLocalCategory } = categorySlice.actions;
export default categorySlice.reducer;
