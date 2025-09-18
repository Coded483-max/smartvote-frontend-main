import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SharedGuard = () => {
  const { voter, candidate } = useSelector((state) => state.auth);

  const isVerifiedVoter = voter && voter.isVerified;
  const isVerifiedCandidate = candidate && candidate.isVerified;

  if (!isVerifiedVoter && !isVerifiedCandidate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default SharedGuard;
