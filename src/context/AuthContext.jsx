import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { navigateToLogin } from "../utils/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setUser({ token });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !user && location.pathname !== "/" && location.pathname !== "/register") {
      navigateToLogin(); 
    }
  }, [loading, user, location.pathname]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
