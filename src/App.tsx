// App.tsx

import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import AdminRouteGuard from "./guards/AdminRouteGuard";
// import PrivateRouteGuard from "./guards/PrivateRouteGuard";
import PublicRouteGuard from "./guards/PublicRouteGuard";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Private routes - yêu cầu người dùng đăng nhập */}
          <Route
            path="/private/*"
            element={
              // <PrivateRouteGuard>
                <PrivateRoutes />
              // </PrivateRouteGuard>
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
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
