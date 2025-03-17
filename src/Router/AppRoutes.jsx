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
import DSHomePage from "../pages/DSHomePage/DSHomePage";
import DSProduct from "../pages/DSProduct/DSProduct";
import DSAnalysis from "../pages/DSAnalysis/DSAnalysis";
import DSDataAccess from "../pages/DSDataAccess/DSDataAccess";
import DSAnalysisReport from "../pages/DSAnalysisReport/DSAnalysisReport";
import PRHomePage from "../pages/PRHomePage/PRHomePage";
import PRProductionPage from "../pages/PRProductionPage/PRProductionPage";
import PRProgressPage from "../pages/PRProgressPage/PRProgressPage";
import PRQualityCheckPage from "../pages/PRQualityCheckPage/PRQualityCheckPage";
import PRReportPage from "../pages/PRReportPage/PRReportPage";
import QCHomePage from "../pages/QCHomePage/QCHomePage";
import QCQualityCheckPage from "../pages/QCQualityCheckPage/QCQualityCheckPage";
import QCProgressPage from "../pages/QCProgressPage/QCProgressPage";
import QCReportPage from "../pages/QCReportPage/QCReportPage";

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
            {/* Design Support */}
            <Route path="/dsHome" element={<ProtectedRoute><DSHomePage/></ProtectedRoute>}></Route>
            <Route path="/dsProduct" element={<ProtectedRoute><DSProduct/></ProtectedRoute>}></Route>
            <Route path="/dsAnalysis" element={<ProtectedRoute><DSAnalysis/></ProtectedRoute>}></Route>
            <Route path="/dsAnalysisReport" element={<ProtectedRoute><DSAnalysisReport/></ProtectedRoute>}></Route>
            <Route path="/dsDataAccess" element={<ProtectedRoute><DSDataAccess/></ProtectedRoute>}></Route>
            <Route path="/prHome" element={<ProtectedRoute><PRHomePage/></ProtectedRoute>}></Route>
            <Route path="/prProduction" element={<ProtectedRoute><PRProductionPage/></ProtectedRoute>}></Route>
            <Route path="/prProgress" element={<ProtectedRoute><PRProgressPage/></ProtectedRoute>}></Route>
            <Route path="/prQualityCheck" element={<ProtectedRoute><PRQualityCheckPage/></ProtectedRoute>}></Route>
            <Route path="/prReport" element={<ProtectedRoute><PRReportPage/></ProtectedRoute>}></Route>
            <Route path="/qcHome" element={<ProtectedRoute><QCHomePage/></ProtectedRoute>}></Route>
            <Route path="/qcQualityCheck" element={<ProtectedRoute><QCQualityCheckPage/></ProtectedRoute>}></Route>
            <Route path="/qcProgress" element={<ProtectedRoute><QCProgressPage/></ProtectedRoute>}></Route>
            <Route path="/qcReport" element={<ProtectedRoute><QCReportPage/></ProtectedRoute>}></Route>
        </Routes>
  )
}
export default AppRoutes