import React from 'react'
import Header from '../../components/Header/Header'
import  {useEffect,useState} from 'react'
import axiosInstance from'../../api/axiosInstance'
import { Bar,Pie } from "react-chartjs-2";
import { toast } from 'sonner';
import {Chart as ChartJS,CategoryScale ,ArcElement,LinearScale,BarElement,Title,Tooltip,Legend} from "chart.js";
import UserTable from '../../components/LoggedUsersTable/LoggedUsersTable';
import BlockChainDashboard from '../../components/BlockChainDashBoard/BlockChainDashBoard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ArcElement);

const AdminHomePage = () => {
  const menuList = [
    { name: 'Dashboard', path: '/adminHome' },
    { name: 'Products', path: '/adminProduct' },
    { name: 'User Management', path: '/adminUserManagement' },
    { name: 'Reports', path: '/adminReports' },
    { name: 'Rejected Products', path: '/adminRejectedProducts' },
    { name: 'Data Access', path: '/adminDataAccess' }
  ]


  const [dashBoardData, setDashBoardData] = useState({})
  const [loggedInData,setLoggedInData] = useState({})

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/dashboard')
      if (response.status === 200) {
        setDashBoardData(response.data.dashboardData)
      } else {
        toast.error('Failed to fetch data')
      }
    } catch (error) {
      toast.error('Failed to fetch data')
    }
  }

  const fetchLoggedInData = async()=>{
      try{
        const response = await axiosInstance.get('/admin/logged-in-users')
      if(response.status === 200){
        setLoggedInData(response.data)
      }else {
        toast.error('Failed to fetch data')
      }
    }catch(error){
      toast.error('Failed to fetch data')
    }
    }

    useEffect(() => {
      fetchData();
      fetchLoggedInData();
    }, [axiosInstance]);
    

const productionChartData = {
    labels: dashBoardData.productionSummary?.statsByStatus?.map(item => item._id) || [],
    datasets: [
        {
            label: "Production Status",
            data: dashBoardData.productionSummary?.statsByStatus?.map(item => item.count) || [],
            backgroundColor: "rgba(75, 192, 192, 0.6)"
        }
    ]
}
const qualityChartData = {
  labels: dashBoardData?.qualitySummary?.statsByStatus?.map(item => item._id)||[],
  datasets: [
      {
          label: "Quality Status",
          data: dashBoardData?.qualitySummary?.statsByStatus.map(item => item.count)||[],
          backgroundColor: "rgba(255, 99, 132, 0.6)"
      }
  ]
};

const accessTypeCounts = (dashBoardData.accessRequests || []).reduce((acc, request) => {
  acc[request.accessType] = (acc[request.accessType] || 0) + 1;
  return acc;
}, {});

const accessPieChartData = {
  labels: Object.keys(accessTypeCounts),
  datasets: [
    {
      label: "Access Type Distribution",
      data: Object.values(accessTypeCounts),
      backgroundColor: ["#2196F3", "#FFEB3B"], 
    }
  ]
};



  return (
    <>
    <Header menuList={menuList} menuContainerWidth='921px' role='Admin' defaultActiveMenu='/adminHome'/>
    <div style={{marginTop:'170px'}}>
            <div className='container' >
              <div className='row' >
              <div className=" col-4">
                <div className="bg-white p-4 shadow rounded">
                    <h3 className="text-lg font-semibold mb-2">Production Summary</h3>
                    {dashBoardData.productionSummary && dashBoardData.productionSummary.statsByStatus ? (
                          <Bar data={productionChartData} />
                      ) : (
                          <p>Loading chart...</p>
                      )}

                </div>
              </div>
              <div className=" col-4 ">
                <div className="bg-white p-4 shadow rounded">
                    <h3 className="text-lg font-semibold mb-2">Quality Summary</h3>
                    {dashBoardData.qualitySummary && dashBoardData.qualitySummary.statsByStatus ? (
                          <Bar data={qualityChartData} />
                      ) : (
                          <p>Loading chart...</p>
                      )}

                </div>
              </div>
              <div className='col-4'>
              <div className="bg-white p-4 shadow rounded text-center" style={{height:'120px'}} >
                            <h3 className="text-lg font-semibold">Total Designs</h3>
                            <p className="text-3xl font-bold">{dashBoardData.designSummary?.totalDesigns || 0}</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded text-center mt-3" style={{height:'139px'}}>
                              <h3 className="text-lg font-semibold">Total Rejected Products</h3>
                              <p className="text-3xl font-bold">{dashBoardData.totalRejected || 0}</p>
                          </div>
              </div>
              </div>
              <div className='row mt-3'>
                      <div className='col-6'>
                      <div className="bg-white p-4 shadow rounded" style={{height:'510px'}}>
                              <h3 className="text-lg font-semibold mb-2">Access Requests</h3>
                              {dashBoardData.accessRequests?.length > 0 ? (
                                <Pie
                                 data={accessPieChartData}
                                 options={{
                                  responsive: true,
                                  maintainAspectRatio: false,
                                }}
                                style={{ maxWidth: "450px", maxHeight: "430px", margin: "0 auto" }}
                                 />
                              ) : (
                                <p>No access requests available</p>
                              )}
                          </div>
                      </div>
                        <div className='col-6' >
                            {
                              loggedInData?.users ? <UserTable users={loggedInData?.users} counts={loggedInData?.counts}/> : <p>Loading......</p>

                            }
                        </div>
              </div>
              <div className='row mt-3'>
                      <div className='col-6'>
                      
                      </div>
              </div>
              <div className='row mt-3'>
                <BlockChainDashboard/>
              </div>
            </div>
    </div>
    </>
   


  )
}

export default AdminHomePage