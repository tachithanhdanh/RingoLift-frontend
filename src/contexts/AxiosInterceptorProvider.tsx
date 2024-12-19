import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import { AxiosResponse } from "axios";
import { toCamelCase } from "../utils/caseConverter";
import { useAuth } from "../hooks/useAuth";

const AxiosInterceptorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin về route hiện tại

  React.useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response): AxiosResponse => {
        if (response.data) {
          // Chuyển data từ snake_case sang camelCase
          response.data = toCamelCase(response.data);
        }
        return response;
      },
      (error) => {
        const status = error.response?.status;

        // Kiểm tra route hiện tại
        const currentPath = location.pathname;
        const isPrivateRoute = currentPath.startsWith("/private");
        const isAdminRoute = currentPath.startsWith("/admin");
        console.log(currentPath);

        if (status === 401) {
          if (isPrivateRoute || isAdminRoute) {
            logout(); // Gọi hàm logout từ AuthContext
            navigate("/login"); // Điều hướng về login nếu đang ở private hoặc admin
          }
        } else if (status === 403) {
          if (isAdminRoute) {
            navigate("/private/home"); // Điều hướng về private/home nếu đang ở private
          }
          // else if (isAdminRoute) {
          //   navigate("/admin/dashboard"); // Điều hướng về admin/dashboard nếu đang ở admin
          // }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [logout, navigate, location]);

  return <>{children}</>;
};

export default AxiosInterceptorProvider;
