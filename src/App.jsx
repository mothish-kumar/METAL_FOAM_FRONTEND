import "./App.css";
import AppRoutes from "./Router/AppRoutes";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {AuthProvider} from './context/AuthContext';
import { Toaster } from "sonner";

function App() {
  const location = useLocation(); 

  const backgroundColors = {
    "/": "#232A58",
    "/register": "#232A58",
    "/adminHome": "#6286AA",
    "/adminProduct": "#6286AA",
    "/adminUserManagement": "#6286AA",
    "/adminReports": "#6286AA",
    "/adminRejectedProducts": "#6286AA",
    "/adminDataAccess": "#6286AA",
  };

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColors[location.pathname] || "#232A58";
    return () => {
      document.body.style.backgroundColor = "";
    };
  },[location.pathname]);
  return (
    <div >
      <Toaster position="top-right" />
      <AuthProvider>
         <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
