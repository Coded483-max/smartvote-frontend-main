import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const { voter, superAdmin, admin, candidate } = useSelector(
    (state) => state.auth
  );

  console.log("AuthGuard - Voter:", voter);
  console.log("AuthGuard - SuperAdmin:", superAdmin);
  console.log("AuthGuard - Admin:", admin);

  // If verified voter tries to access auth pages, redirect to login
  if (voter && voter.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }
  // If verified superAdmin tries to access auth pages, redirect to dashboard
  if (superAdmin) {
    return <Navigate to="/super-admin/dashboard" replace />;
  }
  // If verified admin tries to access auth pages, redirect to dashboard
  if (admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (candidate) {
    return <Navigate to="/candidate" replace />;
  }
  // Allow access to auth pages
  return <Outlet />;
};

export default AuthGuard;
