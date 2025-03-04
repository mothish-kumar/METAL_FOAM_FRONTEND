import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import axiosInstance from '../../api/axiosInstance'
import DataTable from '../../components/DataTable/DataTable'
import { toast } from 'sonner'
import { useLoader } from '../../context/LoaderContext'

const AdminDataAccessPage = () => {
    const menuList = [
        { name: 'Dashboard', path: '/adminHome' },
        { name: 'Products', path: '/adminProduct' },
        { name: 'User Management', path: '/adminUserManagement' },
        { name: 'Reports', path: '/adminReports' },
        { name: 'Rejected Products', path: '/adminRejectedProducts' },
        { name: 'Data Access', path: '/adminDataAccess' }
      ]
      const {setLoading} = useLoader()
      const [data,setData] = useState([])
      const columns = [
        { accessorKey: "employeeId", header: "Employee ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "role", header: "Role" },
        { accessorKey: "status", header: "Status" },
        { 
          header: "Data Access", 
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
      const fetchData = async()=>{
        try{
          const response = await axiosInstance.get('/admin/get-access-requests')
          setData(response.data.accessRequests)
          
        }catch(error){
          toast.error('Failed to fetch data')
        }
      }

      const handleApprove = (employeeId) => {
        let duration = "";
      
        toast(
          (t) => (
            <div>
              <p>Enter duration (in days) for employee {employeeId}:</p>
              <input
                type="number"
                className="form-control"
                placeholder="Enter duration"
                onChange={(e) => (duration = e.target.value)}
                min="1"
              />
              <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-secondary btn-sm me-2" onClick={() => {toast.dismiss(t); }} >
                  Cancel
                </button>
                <button
                  className="btn btn-success btn-sm"
                  onClick={async () => {
                    if (!duration || isNaN(duration) || duration <= 0) {
                      toast.error("Invalid duration. Enter a valid number.");
                      return;
                    }
                    
                    setLoading(true)
                    try {
                      await axiosInstance.put(`/admin/grant-access/${employeeId}`, { duration: Number(duration) });
                      toast.success(`Employee: ${employeeId} approved for ${duration} days.`);
                      fetchData(); 
                      toast.dismiss(t);

                    } catch (error) {
                      toast.error("Error on approval.");
                    }finally{
                      setLoading(false)
                    }
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          ),
          { duration: Infinity }
        );
      };

      const handleDeny =  async(employeeId)=>{
        toast(`Are you sure want to deny the  data access of employee : ${employeeId}`,{
          action:{
            label:'Confirm',
            onClick:async()=>{
              setLoading(true)
              try{
                await axiosInstance.put(`/admin/deny-access/${employeeId}`)
                toast.success(`Employee : ${employeeId} has be denied to access data`)
                fetchData()
              }catch(error){
                toast.error('Error on deny employee')
              }finally{
                setLoading (false)
              }
            }
          }
        })
      }
      useEffect(()=>{
        fetchData()
      },[])
      return (
        <div>
          <Header menuList={menuList} menuContainerWidth='921px' role='Admin' defaultActiveMenu='/adminDataAccess'/>
          <div className='bg-light mx-auto' style={{marginTop:'180px', maxWidth:'1500px',borderRadius:'30px',padding:'20px'}}>
            {data.length !== 0 ? (
              <DataTable data = {data} columns={columns}/>
            ):(
              <div className='text-center'>
                <h4>No Access Requests Available</h4>
              </div>
            )}
              
          </div>
        </div>
    
      )
}

export default AdminDataAccessPage