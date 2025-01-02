// utils/PrivateGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "react-bootstrap";

interface PrivateGuardProps {
  children: React.ReactNode;
}

const PrivateRouteGuard: React.FC<PrivateGuardProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // console.log("PrivateRouteGuard isAuthenticated: ", isAuthenticated);

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

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavBar />
      {/* Khoảng cách giữa NavBar và nội dung */}
      {/* <div style={{ marginTop: "200px" }}></div> */}
      {children}
    </>
  );
};

export default PrivateRouteGuard;
