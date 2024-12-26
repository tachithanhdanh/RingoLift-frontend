// contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { User } from "../interfaces/models/User";
import { LogoutRequest } from "../interfaces/requests/LogoutRequest";
import { logoutUser } from "../services/authService";

interface AuthProviderProps {
  children: React.ReactNode; // Xác định kiểu của children là React.ReactNode
}

// interface User {
//   id: string;
//   username: string;
//   role: string;
//   token: string;
// }

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Lấy dữ liệu người dùng từ localStorage nếu có
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false after initialization
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin vào localStorage
    localStorage.setItem("token", userData.accessToken || ""); // Lưu token vào localStorage
  };

  const logout = async () => {
    try {
      if (user) {
        const logoutRequest: LogoutRequest = {
          username: user.username,
          token: user.accessToken || "",
        };
        // Gọi API để logout
        await logoutUser(logoutRequest);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUser(null); // Cập nhật trạng thái user trong AuthContext
    localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    // window.location.href = "/login"; // Redirect về trang login
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
