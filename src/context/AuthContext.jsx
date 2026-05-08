import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("shopverse_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("shopverse_token");
  });

  const register = async (formData) => {
    const { data } = await api.post("/auth/register", formData);

    localStorage.setItem("shopverse_token", data.token);
    localStorage.setItem("shopverse_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    toast.success("Account created successfully");
    return data;
  };

  const login = async (formData) => {
    const { data } = await api.post("/auth/login", formData);

    localStorage.setItem("shopverse_token", data.token);
    localStorage.setItem("shopverse_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    toast.success("Login successful");
    return data;
  };

  const logout = () => {
    localStorage.removeItem("shopverse_token");
    localStorage.removeItem("shopverse_user");

    setToken(null);
    setUser(null);

    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}