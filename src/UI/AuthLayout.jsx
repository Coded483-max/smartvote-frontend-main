import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      {/* Auth Content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
