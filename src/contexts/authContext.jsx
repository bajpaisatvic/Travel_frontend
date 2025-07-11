import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const backendURL = import.meta.env.VITE_PRODUCTION_URL_URL;
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const checkAuth = async () => {
    try {
      const res = await axios.get(
        `${backendURL}/users/check-auth`,

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
      `${backendURL}/users/logout`,
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
