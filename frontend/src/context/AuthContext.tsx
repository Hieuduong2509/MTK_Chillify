import React, { createContext, useContext, useState } from "react";
import { apiRequest } from "../api/api";

interface User {
  userId: string;
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signup: (data: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  // ===== LOGIN =====
  const login = async (data: { email: string; password: string }) => {
    setLoading(true);

    try {
      const res = await apiRequest("auth", "/login", {
        method: "POST",
        body: data,
      });
      // res = AuthResponseDto từ backend
      const { token, userId, fullName, email } = res;

      const userData = { userId, fullName, email };

      // lưu localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // update state
      setToken(token);
      setUser(userData);
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ===== SIGN UP =====
  const signup = async (data: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const res = await apiRequest("auth", "/signup", {
        method: "POST",
        body: data,
      });
      // res = AuthResponseDto từ backend
      const { token, userId, fullName, email } = res;

      const userData = { userId, fullName, email };

      // lưu localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // update state
      setToken(token);
      setUser(userData);
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ===== LOGOUT =====
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
