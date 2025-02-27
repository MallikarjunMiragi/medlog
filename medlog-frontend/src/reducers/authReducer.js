import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/auth";

// Login User
export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    console.log(userData)
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.emailId,
        password: userData.password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Invalid email or password");
    }

    return { email: data.user };
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

// Signup User
export const signupUser = createAsyncThunk("auth/signup", async (userData, thunkAPI) => {
  console.log("Signup Data Sent:", userData); 
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("Signup Response Data:", data);
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("Signup Error:", error.message);
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error || "Login failed";
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error || "Signup failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;