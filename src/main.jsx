import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { LoaderProvider } from "./context/LoaderContext";
import GlobalLoader from "./components/GlobalLoader";
import "./index.css";

createRoot(document.getElementById('root')).render(
    <LoaderProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <GlobalLoader />
  </LoaderProvider>

)

