import { createSlice } from "@reduxjs/toolkit";
import {
  setStoredToken,
  clearStorage,
  getStoredToken,
} from "../../../Services/Common/Base";

const initialState = {
  user: null,
  token: getStoredToken(), // Initialize with stored token
  isAuthenticated: !!getStoredToken(), // Check if token exists
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Debug log to check what's being stored
      console.log("Storing user in Redux:", action.payload.user);
      console.log("User role:", action.payload.user?.role?.name);

      // Ensure token is stored (redundant but safe)
      if (action.payload.token) {
        setStoredToken(action.payload.token);
      }
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    logoutStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      clearStorage();
    },
    logoutFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // Even on logout failure, clear local state
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      clearStorage();
    },
    clearError: (state) => {
      state.error = null;
    },
    // Action to restore auth state from storage
    restoreAuth: (state) => {
      const token = getStoredToken();
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Update sessionStorage
        sessionStorage.setItem("user_data", JSON.stringify(state.user));
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateUser,
  clearError,
  restoreAuth,
} = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
