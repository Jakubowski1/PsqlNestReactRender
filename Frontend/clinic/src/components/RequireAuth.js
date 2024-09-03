import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("role");

  return allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default RequireAuth;
