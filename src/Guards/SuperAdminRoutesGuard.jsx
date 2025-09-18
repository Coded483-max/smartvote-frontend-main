import { Outlet, Navigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

const SuperAdminRoutesGuard = () => {
  const { superAdmin } = useSelector((state) => state.auth);
  const context = useOutletContext();

  return superAdmin ? (
    <Outlet context={context} />
  ) : (
    <Navigate to="/super-admin/login" replace />
  );
};

export default SuperAdminRoutesGuard;
