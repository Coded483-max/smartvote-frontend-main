import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import {
  logout,
  logoutVoter,
  logoutAdmin,
  logoutSuperAdmin,
  logoutCandidate,
} from "@/api/authSlice";
import { toast } from "react-toastify";

export const useRoleLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { voter, admin, superAdmin, candidate } = useSelector(
    (state) => state.auth
  );

  const getCurrentRole = useCallback(() => {
    if (voter) return "voter";
    if (admin) return "admin";
    if (superAdmin) return "superAdmin";
    if (candidate) return "candidate";
    return null;
  }, [voter, admin, superAdmin, candidate]);

  const getLogoutDestination = useCallback((role) => {
    const destinations = {
      voter: "/",
      admin: "/admin/login",
      superAdmin: "/super-admin/login",
      candidate: "/",
    };
    return destinations[role] || "/";
  }, []);

  // Wrap handleLogout in useCallback to prevent unnecessary re-renders
  const handleLogout = useCallback(
    (specificRole = null) => {
      const currentRole = specificRole || getCurrentRole();

      if (!currentRole) {
        console.warn("No active role found for logout");
        return;
      }

      // Dispatch appropriate logout action
      switch (currentRole) {
        case "voter":
          dispatch(logoutVoter());
          break;
        case "admin":
          dispatch(logoutAdmin());
          break;
        case "superAdmin":
          dispatch(logoutSuperAdmin());
          break;
        case "candidate":
          dispatch(logoutCandidate());
          break;
        default:
          dispatch(logout()); // Fallback to clear all
      }

      // Show success message
      toast.success("Logged out successfully!");

      // Navigate to appropriate page
      const destination = getLogoutDestination(currentRole);
      navigate(destination, { replace: true });
    },
    [dispatch, navigate, getCurrentRole, getLogoutDestination]
  );

  // Force logout all roles (emergency)
  const handleFullLogout = useCallback(() => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/", { replace: true });
  }, [dispatch, navigate]);

  return {
    handleLogout,
    handleFullLogout,
    getCurrentRole,
    currentRole: getCurrentRole(),
  };
};
