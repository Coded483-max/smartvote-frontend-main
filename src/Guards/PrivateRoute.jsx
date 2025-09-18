import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { voter, candidate } = useSelector((state) => state.auth);

  // If not logged in or not a voter, redirect to home
  if (
    (!voter || (voter.role !== "voter" && voter.role !== "candidate")) &&
    (!candidate || candidate.role !== "candidate")
  ) {
    return <Navigate to="/" replace />;
  }

  // If not verified, redirect to verify email
  if ((voter && !voter.isVerified) || (candidate && !candidate.isVerified)) {
    return <Navigate to="/verify-email" replace />;
  }
  // Allow access to private routes
  return <Outlet />;
};

export default PrivateRoute;
