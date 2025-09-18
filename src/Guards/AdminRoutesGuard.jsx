import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutesGuard = () => {
  const { admin } = useSelector((state) => state.auth);

  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoutesGuard;
