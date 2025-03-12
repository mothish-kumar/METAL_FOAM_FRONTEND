import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import axiosInstance from '../../api/axiosInstance'
import {toast} from 'sonner'
import DataTable from '../../components/DataTable/DataTable'

const RADataAccessPage = () => {
    const menuList = [
        {name:'Home',path:'/raHome'},
        {name:'Products',path:'/raProduct'},
        {name:'Analysis',path:'/raAnalysis'},
        {name:'Analysis Report',path:'/raAnalysisReport'},
        {name:'Data Access',path:'/raDataAccess'}
    ]
    const columns = [
      { accessorKey: "employeeId", header: "Employee ID" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "accessType", header: "Access Type" },
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
    const[data,setData] = useState([])

    const fetchData = async()=>{
        try{
          const response  = await axiosInstance.get('/resource-analyst/get-access-requests')
          setData(response.data.accessRequests)
          console.log(data)
        }catch(error){
          if(error.status === 404){
            setData([])
          }else{
            toast.error('Failed to fetch data')
          }
        }
    }


    const handleApprove = async(employeeId)=>{
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
                          try{
                            await axiosInstance.post(`/resource-analyst/approve-access-request/${employeeId}`, { duration: Number(duration) })
                            toast.success(`${employeeId} has been approved successfully`)
                            fetchData()
                            }catch(error){
                              toast.error('Failed to approve access')
                            }}}>Click</button>
                             </div>
            </div>
          ),
          { duration: Infinity }
        );
                          
      
    }

    const handleDeny = async(employeeId)=>{
      try{
        await axiosInstance.post(`/resource-analyst/deny-access-request/${employeeId}`)
        toast.success(`${employeeId} has been denied access successfully`)
        fetchData()
      }catch(error){
        toast.error('Failed to deny accss')
      }
    }
    useEffect(()=>{
      fetchData()
    },[])
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Resource Analyst' defaultActiveMenu='/raDataAccess'/>
        <div className='bg-light mx-auto' style={{marginTop:'180px', maxWidth:'1500px',borderRadius:'30px',padding:'20px'}}>
          {data.length !== 0  ?(<DataTable data = {data} columns={columns}/>):(<div className='text-center text-danger'>No Access request found...</div>)}
        </div>
    </div>
  )
}

export default RADataAccessPage 