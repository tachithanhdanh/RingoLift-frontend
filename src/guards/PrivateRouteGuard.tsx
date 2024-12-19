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
      {/* Khoảng cách giữa NavBar và nội dung */}
      <div style={{ marginTop: "80px" }}></div>
      {children}
    </>
  );
};

export default PrivateRouteGuard;
