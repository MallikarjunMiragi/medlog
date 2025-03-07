import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/category";

// Async action to add category
export const addCategory = createAsyncThunk("category/addCategory", async (categoryData, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to add category");
    }

    return data.category;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Async action to fetch categories
export const fetchCategories = createAsyncThunk("category/fetchCategories", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/all`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch categories");
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
