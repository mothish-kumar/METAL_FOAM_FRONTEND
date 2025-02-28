import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { navigateToLogin } from "./navigation";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return user ? children : navigateToLogin();
};

export default ProtectedRoute;
