import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import DataTable from '../../components/DataTable/DataTable'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'sonner'
import { useLoader } from '../../context/LoaderContext'
const DSDataAccess = () => {
    const menuList = [
        {name:'Home',path:'/dsHome'},
        {name:'Products',path:'/dsProduct'},
        {name:'Analysis',path:'/dsAnalysis'},
        {name:'Analysis Report',path:'/dsAnalysisReport'},
        {name:'Data Access',path:'/dsDataAccess'}
    ]
    const{setLoading} = useLoader()
      const [data,setData] = useState([])
      const columns = [
        { accessorKey: "employeeId", header: "Employee ID" },
        { accessorKey: "productId", header: "Product ID" },
        { accessorKey: "productName", header: "Product Name" },
        { accessorKey: "accessType", header: "Access Type" },
        { accessorKey: "requestStatus", header: "Status" },
        { 
          header: "Data Access", 
          cell: ({ row }) => {
            const employee = row.original;
            
            if (employee.requestStatus === "pending") {
              return (
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-success"
                    onClick={() => handleApprove(employee.employeeId,employee.transactionHash)}
                  >
                    Approve
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDeny(employee.employeeId,employee.transactionHash)}
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
      const handleApprove = (employeeId,transactionHash) => {
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
                      await axiosInstance.post(`/design-support/grant-access/${transactionHash}`, { duration: Number(duration),employeeId });
                      toast.success(`Employee: ${employeeId} approved for ${duration} days.`);
                      fetchRequests()
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

      const handleDeny =  async(employeeId,transactionHash)=>{
        toast(`Are you sure want to deny the  data access of employee : ${employeeId}`,{
          action:{
            label:'Confirm',
            onClick:async()=>{
              setLoading(true)
              try{
                await axiosInstance.post(`/design-support//deny-access-request/${transactionHash}`,{employeeID:employeeId})
                toast.success(`Employee : ${employeeId} has be denied to access data`)
                fetchRequests()
              }catch(error){
                toast.error('Error on deny employee')
              }finally{
                setLoading (false)
              }
            }
          }
        })
      }

      const fetchRequests = async()=>{
        try{
          const response = await axiosInstance.get('/design-support/get-all-requests')
          setData(response.data.AccessRequests)
        }catch(error){
          toast.error('Failed to fetch requests')
        }
      }

      useEffect(()=>{
        fetchRequests()
      },[])
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Design Support' defaultActiveMenu='/dsDataAccess'/> 
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

export default DSDataAccess