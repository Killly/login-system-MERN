import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../axiosAPI.js";

export const registration = createAsyncThunk(
  "auth-registration",
  async (params) => {
    const { data } = await axios.post("/register", params);
    return data;
  }
);

export const login = createAsyncThunk("auth-login", async (params) => {
  const { data } = await axios.post("/login", params);
  return data;
});

export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
  const { data } = await axios.get("/me");
  return data;
});

const initialState = {
  userEmail: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userEmail = null;
      window.localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [registration.pending]: (state) => {
      state.userEmail = null;
      state.status = "loading";
    },
    [registration.fulfilled]: (state, action) => {
      state.userEmail = action.payload.email;
      state.status = "loaded";
    },
    [registration.rejected]: (state) => {
      state.userEmail = null;
      state.status = "error";
    },
    [login.pending]: (state) => {
      state.userEmail = null;
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.userEmail = action.payload.email;
      state.status = "loaded";
    },
    [login.rejected]: (state) => {
      state.userEmail = null;
      state.status = "error";
    },
    [fetchUserData.pending]: (state) => {
      state.userEmail = null;
      state.status = "loading";
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.userEmail = action.payload.email;
      state.status = "loaded";
    },
    [fetchUserData.rejected]: (state) => {
      state.userEmail = null;
      state.status = "error";
    },
  },
});

export const isAuthSelector = (state) => Boolean(state.auth.userEmail);
export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
