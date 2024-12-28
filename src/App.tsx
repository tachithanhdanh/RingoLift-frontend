// App.tsx

import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import AdminRouteGuard from "./guards/AdminRouteGuard";
import PrivateRouteGuard from "./guards/PrivateRouteGuard";
import PublicRouteGuard from "./guards/PublicRouteGuard";
import AxiosInterceptorProvider from "./contexts/AxiosInterceptorProvider";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AxiosInterceptorProvider>
          <Routes>
            {/* Private routes - yêu cầu người dùng đăng nhập */}
            <Route
              path="/private/*"
              element={
                <PrivateRouteGuard>
                  <PrivateRoutes />
                </PrivateRouteGuard>
              }
            />

            {/* Admin routes - yêu cầu người dùng là admin */}
            <Route
              path="/admin/*"
              element={
                <AdminRouteGuard>
                  <AdminRoutes />
                </AdminRouteGuard>
              }
            />

            {/* Public routes - không cần đăng nhập */}
            <Route
              path="/*"
              element={
                <PublicRouteGuard>
                  <PublicRoutes />
                </PublicRouteGuard>
              }
            />
          </Routes>
        </AxiosInterceptorProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;