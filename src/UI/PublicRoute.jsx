import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { voter, superAdmin, admin, candidate } = useSelector(
    (state) => state.auth
  );

  // Normalize voter access
  const actualVoter = voter?.voter || voter?.newVoter || voter;
  const isVerified = actualVoter?.isVerified || voter?.isVerified;

  // If voter exists and is verified, redirect to dashboard
  // if (actualVoter && isVerified) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  // If voter exists but not verified, redirect to verify-email
  if (actualVoter && !isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (superAdmin) {
    return <Navigate to="/super-admin/dashboard" replace />;
  }

  // if (candidate) {
  //   return <Navigate to="/candidate" replace />;
  // }

  // If no voter, allow access to public routes
  return <Outlet />;
};

export default PublicRoute;
