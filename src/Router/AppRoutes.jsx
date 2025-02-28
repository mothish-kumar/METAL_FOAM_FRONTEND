import { Routes, Route } from "react-router-dom";
import LandingPage from '../pages/LandingPage/LandingPage';
import AdminHomePage from '../pages/AdminHomePage/AdminHomePage';
import ProtectedRoute from '../utils/ProtectedRoute';
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import AdminProductPage from "../pages/AdminProductPage/AdminProductPage";
import AdminUserManagement from "../pages/AdminUserManagement/AdminUserManagement";
import AdminReportsPage from "../pages/AdminReportsPage/AdminReportsPage";
import AdminRejectedPage from "../pages/AdminRejectedPage/AdminRejectedPage";
import AdminDataAccessPage from "../pages/AdminDataAccessPage/AdminDataAccessPage";

const AppRoutes = () => {
  return (
        <Routes>
            <Route  path='/' element={<LandingPage/>} />
            <Route path='/register'element={<RegistrationPage/>}/>
            <Route path='/adminHome' element={<ProtectedRoute><AdminHomePage/></ProtectedRoute>} />
            <Route path="/adminProduct" element={<ProtectedRoute><AdminProductPage/></ProtectedRoute>} />
            <Route path="/adminUserManagement" element={<ProtectedRoute><AdminUserManagement/></ProtectedRoute>} />
            <Route path="/adminReports" element={<ProtectedRoute><AdminReportsPage/></ProtectedRoute>} />
            <Route path="/adminRejectedProducts" element={<ProtectedRoute><AdminRejectedPage/></ProtectedRoute>} />
            <Route path="/adminDataAccess" element={<ProtectedRoute><AdminDataAccessPage/></ProtectedRoute>} />
        </Routes>
  )
}
export default AppRoutes