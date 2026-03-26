import React, { createContext, useContext, useState } from "react";
import { apiRequest } from "../api/api";

interface User {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
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
  getProfile: () => Promise<User>;
  updateProfile: (data: {
    fullName: string;
    phoneNumber: string;
  }) => Promise<void>;
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

  // ===== UPDATE PROFILE =====
  const updateProfile = async (data: {
    fullName: string;
    phoneNumber: string;
  }) => {
    setLoading(true);

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User not found in localStorage");

      const { userId } = JSON.parse(storedUser);

      const res = await apiRequest("user", `/${userId}/profile`, {
        method: "PUT",
        body: data,
      });

      const updatedUser = {
        userId: res.userId,
        fullName: res.fullName,
        email: res.email,
        phoneNumber: res.phoneNumber,
      };
      setUser(updatedUser);

      // update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ===== GET PROFILE =====
  const getProfile = async (): Promise<User> => {
    setLoading(true);

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User not found in localStorage");

      const { userId } = JSON.parse(storedUser);

      const res = await apiRequest("user", `/${userId}/profile`, {
        method: "GET",
      });

      const userData = {
        userId: res.userId,
        fullName: res.fullName,
        email: res.email,
        phoneNumber: res.phoneNumber,
      };
      setUser(userData);

      // update localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
    alert("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        loading,
        getProfile,
        updateProfile,
      }}
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
