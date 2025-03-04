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
import ChangePasswordPage from "../pages/ChangePasswordPage/ChangePasswordPage";
import RAHome from "../pages/RAHome/RAHome";
import RAProductPage from "../pages/RAProductPage/RAProductPage";
import RAAnalysisPage from "../pages/RAAnalysisPage/RAAnalysisPage";
import RAAnalysisReportPage from "../pages/RAAnalysisReportPage/RAAnalysisReportPage";
import RADataAccessPage from "../pages/RADataAccessPage/RADataAccessPage";

const AppRoutes = () => {
  return (
        <Routes>
            <Route  path='/' element={<LandingPage/>} />
            <Route path='/register'element={<RegistrationPage/>}/>
            <Route path = '/change-password' element={<ChangePasswordPage/>}/>
            {/* Admin Routes */}
            <Route path='/adminHome' element={<ProtectedRoute><AdminHomePage/></ProtectedRoute>} />
            <Route path="/adminProduct" element={<ProtectedRoute><AdminProductPage/></ProtectedRoute>} />
            <Route path="/adminUserManagement" element={<ProtectedRoute><AdminUserManagement/></ProtectedRoute>} />
            <Route path="/adminReports" element={<ProtectedRoute><AdminReportsPage/></ProtectedRoute>} />
            <Route path="/adminRejectedProducts" element={<ProtectedRoute><AdminRejectedPage/></ProtectedRoute>} />
            <Route path="/adminDataAccess" element={<ProtectedRoute><AdminDataAccessPage/></ProtectedRoute>} />
            {/* Resource Analyst Routes */}
            <Route path='/raHome' element={<ProtectedRoute><RAHome/></ProtectedRoute>}/>
            <Route path='/raProduct' element={<ProtectedRoute><RAProductPage/></ProtectedRoute>}/>
            <Route path='/raAnalysis' element={<ProtectedRoute><RAAnalysisPage/></ProtectedRoute>}/>
            <Route path='/raAnalysisReport' element={<ProtectedRoute><RAAnalysisReportPage/></ProtectedRoute>}/>
            <Route path='/raDataAccess' element={<ProtectedRoute><RADataAccessPage/></ProtectedRoute>}/>
        </Routes>
  )
}
export default AppRoutes