// utils/PrivateGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateGuardProps {
  children: React.ReactNode;
}

const PrivateRouteGuard: React.FC<PrivateGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRouteGuard;
