import "./App.css";
import AppRoutes from "./Router/AppRoutes";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const location = useLocation(); 

  const backgroundColors = {
    "/": "#232A58",
  };

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColors[location.pathname] || "#232A58";
    return () => {
      document.body.style.backgroundColor = "";
    };
  },[location.pathname]);
  return (
    <div >
      <AppRoutes />
    </div>
  );
}

export default App;
