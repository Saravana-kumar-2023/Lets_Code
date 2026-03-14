import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({
        email: email.trim().toLowerCase(),
        password,
      });

      const data = response.data;

      const loggedInUser = {
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      return loggedInUser;
    } catch (error) {
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Login failed";

      throw new Error(
        typeof backendMessage === "string" ? backendMessage : "Login failed"
      );
    }
  };

  const register = async (userData) => {
    try {
      const payload = {
        fullName: userData.fullName.trim(),
        username: userData.username.trim(),
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
      };

      const response = await authAPI.register(payload);
      const data = response.data;

      const newUser = {
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      return newUser;
    } catch (error) {
      if (error.response?.data) {
        throw error;
      }

      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAdmin = () => user?.role === "ROLE_ADMIN";
  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;