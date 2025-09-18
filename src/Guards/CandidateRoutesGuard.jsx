import { Outlet, Navigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

const CandidateRoutesGuard = () => {
  const { candidate } = useSelector((state) => state.auth);
  const context = useOutletContext(); // get context from parent

  return candidate ? <Outlet context={context} /> : <Navigate to="/" replace />;
};

export default CandidateRoutesGuard;
