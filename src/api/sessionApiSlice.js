// store/slices/sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  user: null,
  userType: "voter",
  lastActivity: null,
  timeUntilExpiry: 0,
  showInactivityWarning: false,
  inactivityTimeouts: {
    voter: 30 * 60 * 1000, // 30 minutes
    candidate: 30 * 60 * 1000, // 30 minutes
    admin: 15 * 60 * 1000, // 15 minutes
    "super-admin": 10 * 60 * 1000, // 10 minutes
  },
  warningThreshold: 5 * 60 * 1000, // Show warning 5 minutes before expiry
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionData: (state, action) => {
      const { user, isAuthenticated, timeUntilInactivityExpiry } =
        action.payload;
      state.isActive = isAuthenticated;
      state.user = user;
      state.userType = user?.role || user?.userType || "voter";
      state.lastActivity = Date.now();
      state.timeUntilExpiry = timeUntilInactivityExpiry || 0;
      state.showInactivityWarning = false;
    },

    updateActivity: (state) => {
      state.lastActivity = Date.now();
      state.showInactivityWarning = false;
      // Reset expiry time based on user type
      const timeout =
        state.inactivityTimeouts[state.userType] ||
        state.inactivityTimeouts.voter;
      state.timeUntilExpiry = timeout;
    },

    setInactivityWarning: (state, action) => {
      state.showInactivityWarning = action.payload;
    },

    decrementTimeUntilExpiry: (state, action) => {
      const decrement = action.payload || 1000; // Default 1 second
      state.timeUntilExpiry = Math.max(0, state.timeUntilExpiry - decrement);

      // Show warning if approaching expiry
      if (
        state.timeUntilExpiry <= state.warningThreshold &&
        state.timeUntilExpiry > 0
      ) {
        state.showInactivityWarning = true;
      }

      // Clear session if expired
      if (state.timeUntilExpiry <= 0) {
        state.isActive = false;
        state.user = null;
        state.showInactivityWarning = false;
      }
    },

    clearSession: (state) => {
      state.isActive = false;
      state.user = null;
      state.lastActivity = null;
      state.timeUntilExpiry = 0;
      state.showInactivityWarning = false;
    },

    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const {
  setSessionData,
  updateActivity,
  setInactivityWarning,
  decrementTimeUntilExpiry,
  clearSession,
  setUserType,
} = sessionSlice.actions;

export default sessionSlice.reducer;
