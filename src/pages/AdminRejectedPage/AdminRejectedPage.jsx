import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { toast } from 'sonner'
import axiosInstance from '../../api/axiosInstance'
import RejectedProduct from '../../components/RejectedProduct/RejectedProduct'

const AdminRejectedPage = () => {
    const menuList = [
        { name: 'Dashboard', path: '/adminHome' },
        { name: 'Products', path: '/adminProduct' },
        { name: 'User Management', path: '/adminUserManagement' },
        { name: 'Reports', path: '/adminReports' },
        { name: 'Rejected Products', path: '/adminRejectedProducts' },
        { name: 'Data Access', path: '/adminDataAccess' }
      ]
      const [data,setData] = useState([])
      const fetchData = async()=>{
        try{
          const response = await axiosInstance.get('/admin/get-rejected-products')
          setData(response.data.rejectedProductDetails)
        }catch(error){
          toast.error('Failed to fetch data')
        }
      }
      useEffect(()=>{
        fetchData()
      },[])
      return (
        <div>
          <Header menuList={menuList} menuContainerWidth='921px' role='Admin' defaultActiveMenu='/adminRejectedProducts'/>
          <div className="d-flex gap-3 flex-wrap" style={{ marginTop: "180px", maxHeight: "750px", maxWidth: "1500px", overflowY: "auto" ,marginLeft:'350px'}}>
            {data.length !== 0 ? (
              data.map((product) => <RejectedProduct key={product._id} data={product} />)
            ) : (
              <p className="text-light">No products available</p>
            )}
          </div>

        </div>
    
      )
}

export default AdminRejectedPage