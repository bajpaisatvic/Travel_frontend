import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "https://travel-backend-1-s4yu.onrender.com/api/v1/users/check-auth",
        {
          withCredentials: true,
        }
      );
      setLoggedIn(res.data.isAuthenticated);
      setIsAdmin(res.data.isAdmin);
    } catch {
      setLoggedIn(false);
      setIsAdmin(false);
    }
  };

  const logout = async () => {
    await axios.post(
      "https://travel-backend-1-s4yu.onrender.com/api/v1/users/logout",
      {},
      { withCredentials: true }
    );
    setIsAdmin(false);
    setLoggedIn(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, logout, checkAuth, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
