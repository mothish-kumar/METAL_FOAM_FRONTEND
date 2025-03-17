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
    "/change-password":"#232A58",
    "/adminHome": "#6286AA",
    "/adminProduct": "#6286AA",
    "/adminUserManagement": "#6286AA",
    "/adminReports": "#6286AA",
    "/adminRejectedProducts": "#6286AA",
    "/adminDataAccess": "#6286AA",
    '/raHome':'#CD7903',
     '/raProduct':'#CD7903',
      '/raAnalysis':'#CD7903',
       '/raAnalysisReport':'#CD7903',
        '/raDataAccess':'#CD7903',
        '/dsHome':'#09B478',
        '/dsProduct':'#09B478',
        '/dsAnalysis':'#09B478',
        '/dsAnalysisReport':'#09B478',
        '/dsDataAccess':'#09B478',
        '/prHome':'#6B6C6C',
        "/prProduction" :'#6B6C6C',
        "/prProgress":'#6B6C6C',
        "/prQualityCheck":'#6B6C6C',
        "/prReport":'#6B6C6C',
        "/qcHome":"#02542D",
        "/qcQualityCheck":"#02542D",
        "/qcProgress":"#02542D",
        "/qcReport":"#02542D"
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
