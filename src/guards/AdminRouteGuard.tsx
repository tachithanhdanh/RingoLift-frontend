// utils/AdminGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "react-bootstrap";

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show spinner while loading
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // Check if user is not authenticated or does not have ADMIN role
  if (!isAuthenticated || user?.role !== "ADMIN") {
    return <Navigate to="/private/home" />;
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
