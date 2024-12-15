// utils/AdminGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
