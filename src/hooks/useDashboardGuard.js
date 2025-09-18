import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export const useDashboardGuard = () => {
  const { voter, admin, superAdmin, candidate } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = () => {
      // Prevent authenticated users from going to public pages via back button
      const publicPaths = ["/", "/about", "/contact", "/faqs"];
      const authPaths = ["/login", "/register"];

      if (
        voter?.isVerified &&
        (publicPaths.includes(location.pathname) ||
          authPaths.includes(location.pathname))
      ) {
        navigate("/dashboard", { replace: true });
      } else if (
        admin &&
        (publicPaths.includes(location.pathname) ||
          authPaths.includes(location.pathname))
      ) {
        navigate("/admin/dashboard", { replace: true });
      } else if (
        superAdmin &&
        (publicPaths.includes(location.pathname) ||
          authPaths.includes(location.pathname))
      ) {
        navigate("/super-admin/dashboard", { replace: true });
      } else if (
        candidate &&
        (publicPaths.includes(location.pathname) ||
          authPaths.includes(location.pathname))
      ) {
        navigate("/candidate/dashboard", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [voter, admin, superAdmin, candidate, navigate, location.pathname]);
};
