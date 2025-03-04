import React, { useEffect,useState } from 'react'
import Header from '../../components/Header/Header'
import { toast } from 'sonner'
import axiosInstance from '../../api/axiosInstance'
import DataTable from '../../components/DataTable/DataTable'
import { useLoader } from '../../context/LoaderContext'


const AdminUserManagement = () => {
    const menuList = [
        { name: 'Dashboard', path: '/adminHome' },
        { name: 'Products', path: '/adminProduct' },
        { name: 'User Management', path: '/adminUserManagement' },
        { name: 'Reports', path: '/adminReports' },
        { name: 'Rejected Products', path: '/adminRejectedProducts' },
        { name: 'Data Access', path: '/adminDataAccess' }
      ]

      const columns = [
        { accessorKey: "employeeId", header: "Employee ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "role", header: "Role" },
        { accessorKey: "status", header: "Status" },
        { 
          header: "Actions", 
          cell: ({ row }) => {
            const employee = row.original;
            
            if (employee.status === "pending") {
              return (
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-success"
                    onClick={() => handleApprove(employee.employeeId)}
                  >
                    Approve
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDeny(employee.employeeId)}
                  >
                    Deny
                  </button>
                </div>
              );
            }
            
            return <span className="text-gray-400">No Actions</span>;
          } 
        }
      ]
      const { setLoading } = useLoader();
      const handleDeny = (employeeId)=>{
          toast(`Are you sure to deny employee:${employeeId}`,{
            action:{
              label:'Confirm',
              onClick:async()=>{
                setLoading(true)
                try{
                await axiosInstance.put(`/admin/deny-employee/${employeeId}`)
                toast.success(`Employee : ${employeeId} has been denied`)
                fetchData()
      
              }catch(error){
                toast.error('Error on deny employee')
              }finally{
                setLoading(false)
              }
              }
            }
          })
          
      }
      const handleApprove = (employeeId)=>{
        toast(`Are you sure you want to approve employee : ${employeeId}`,{
          action:{
            label:'Confirm',
            onClick:async()=>{
              setLoading(true);
              try{
                await axiosInstance.put(`/admin/approve-employee/${employeeId}`)
                toast.success('Employe Approved successfully')
                fetchData()
              }catch(error){
                toast.error('Error on approve employee')
              }finally{
                setLoading(false);
              }
            }
          }
        })
      }
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("/admin/get-all-employee-data");
          setData(response.data.employees);
        } catch (error) {
          toast.error("Failed to fetch data");
        }
      };
      const [data,setData] = useState([])
      useEffect(()=>{
        fetchData()
      },[])
      return (
        <div>
          <Header menuList={menuList} menuContainerWidth='921px' role='Admin' defaultActiveMenu='/adminUserManagement'/>
          <div className='bg-light mx-auto' style={{marginTop:'180px', width:'1500px',borderRadius:'30px'}}>
          <DataTable data = {data} columns = {columns}/>
          </div>
        </div>
    
      )
}

export default AdminUserManagement