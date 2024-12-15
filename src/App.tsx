// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import AdminRouteGuard from "./guards/AdminRouteGuard";
import PrivateRouteGuard from "./guards/PrivateRouteGuard";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes - không cần đăng nhập */}
          <Route path="/*" element={<PublicRoutes />} />

          {/* Private routes - yêu cầu người dùng đăng nhập */}
          <Route
            path="/*"
            element={
              <PrivateRouteGuard>
                <PrivateRoutes />
              </PrivateRouteGuard>
            }
          />

          {/* Admin routes - yêu cầu người dùng là admin */}
          <Route
            path="/*"
            element={
              <AdminRouteGuard>
                <AdminRoutes />
              </AdminRouteGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
