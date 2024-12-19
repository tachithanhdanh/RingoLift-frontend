// utils/PublicGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PublicRouteGuardProps {
  children: React.ReactNode;
}

const PublicRouteGuard: React.FC<PublicRouteGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/private/home" />;
  }
  return <>{children}</>;
};

export default PublicRouteGuard;
