// hooks/useSession.js
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetSessionStatusQuery,
  useExtendSessionMutation,
  useLogoutSessionMutation,
} from "../api/sessionApi";
import {
  setSessionData,
  updateActivity,
  setInactivityWarning,
  decrementTimeUntilExpiry,
  clearSession,
} from "../api/sessionApiSlice.js";

export const useSession = () => {
  const dispatch = useDispatch();
  const sessionState = useSelector((state) => state.session);

  // RTK Query hooks
  const {
    data: sessionStatus,
    error: sessionError,
    isLoading,
  } = useGetSessionStatusQuery(undefined, {
    // Skip if not active to avoid unnecessary calls
    skip: !sessionState.isActive,
    // Refetch on mount and focus
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const [extendSession] = useExtendSessionMutation();
  const [logoutSession] = useLogoutSessionMutation();

  // Activity tracking events
  const activityEvents = [
    "mousedown",
    "mousemove",
    "keypress",
    "scroll",
    "touchstart",
    "click",
  ];

  // Handle activity update
  const handleActivity = useCallback(() => {
    if (sessionState.isActive) {
      dispatch(updateActivity());
      // Optionally extend session on backend
      extendSession().catch(console.error);
    }
  }, [sessionState.isActive, dispatch, extendSession]);

  // Handle session extension (user clicks "Stay logged in")
  const handleExtendSession = useCallback(async () => {
    try {
      await extendSession().unwrap();
      dispatch(updateActivity());
      dispatch(setInactivityWarning(false));
    } catch (error) {
      console.error("Failed to extend session:", error);
    }
  }, [extendSession, dispatch]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      await logoutSession().unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(clearSession());
      // Redirect to login page
      window.location.href = "/login";
    }
  }, [logoutSession, dispatch]);

  // Update session data when query response changes
  useEffect(() => {
    if (sessionStatus) {
      dispatch(setSessionData(sessionStatus));
    } else if (sessionError?.status === 401) {
      dispatch(clearSession());
    }
  }, [sessionStatus, sessionError, dispatch]);

  // Set up activity listeners
  useEffect(() => {
    if (sessionState.isActive) {
      activityEvents.forEach((event) => {
        document.addEventListener(event, handleActivity, { passive: true });
      });

      return () => {
        activityEvents.forEach((event) => {
          document.removeEventListener(event, handleActivity);
        });
      };
    }
  }, [sessionState.isActive, handleActivity]);

  // Countdown timer for inactivity
  useEffect(() => {
    if (sessionState.isActive && sessionState.timeUntilExpiry > 0) {
      const timer = setInterval(() => {
        dispatch(decrementTimeUntilExpiry(1000)); // Decrement by 1 second
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [sessionState.isActive, sessionState.timeUntilExpiry, dispatch]);

  // Auto-logout when time expires
  useEffect(() => {
    if (sessionState.isActive && sessionState.timeUntilExpiry === 0) {
      handleLogout();
    }
  }, [sessionState.timeUntilExpiry, sessionState.isActive, handleLogout]);

  return {
    // Session state
    isActive: sessionState.isActive,
    user: sessionState.user,
    userType: sessionState.userType,
    timeUntilExpiry: sessionState.timeUntilExpiry,
    showWarning: sessionState.showInactivityWarning,
    isLoading,

    // Actions
    extendSession: handleExtendSession,
    logout: handleLogout,
    updateActivity: handleActivity,
    dismissWarning: () => dispatch(setInactivityWarning(false)),

    // Computed values
    formattedTimeRemaining: formatTime(sessionState.timeUntilExpiry),
    isNearExpiry: sessionState.timeUntilExpiry <= sessionState.warningThreshold,
  };
};

// Helper function to format time
const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
