// utils/PrivateGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "../components/common/NavBar";

interface PrivateGuardProps {
  children: React.ReactNode;
}

const PrivateRouteGuard: React.FC<PrivateGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default PrivateRouteGuard;
