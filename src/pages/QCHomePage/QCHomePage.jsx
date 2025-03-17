import React ,{useEffect,useState}from 'react'
import Header from '../../components/Header/Header'
import axiosInstance from '../../api/axiosInstance'
import DataTable from '../../components/DataTable/DataTable'
import { toast } from 'sonner'

const QCHomePage = () => {
    const menuList = [
        {name:'Home',path:'/qcHome'},
        {name:'Quality Check',path:'/qcQualityCheck'},
        {name:'Progress',path:'/qcProgress'},
        {name:'Reports',path:'/qcReport'}
    ]
    const [data,setData] = useState([])
    const columns = [
        { accessorKey: "productName", header: "Product Name" },
        { accessorKey: "productId", header: "Product ID" },
        { accessorKey: "designSupportApprovalStatus", header: "Design Support Approval Status" },
        { 
          header: "Data Access", 
          cell: ({ row }) => {
            const product = row.original;
            
            if (product.accessStatus === "Make a request") {
              return (
                <div className="text-center">
                  <button className='btn ' style={{backgroundColor:'#CD7903'}} onClick={() => makeARequest(product.productId, product.productName, product.transactionHash)}>Make a request</button>
                </div>
              );
            }
            if (product.accessStatus === "active") {
                return <p className="badge bg-success">Approved</p>;
              }
              if (product.accessStatus === "pending") {
                return <p className="badge bg-warning text-dark">Pending...</p>;
              }
              if (product.accessStatus === "denied") {
                return <p className="badge bg-danger">Denied</p>;
              }
            
            return <span className="text-gray-400">Nil</span>;
          } 
        }
      ]

      const makeARequest = async(productId,productName,transactionHash)=>{
        try{
            await axiosInstance.post('/quality/make-request',{productId,productName,transactionHash})
            toast.success('Please wait once approved mail has beed sended...')
            fetchData()
        }catch(error){
            toast.error('Failed to make a request')
        }
      }

      const fetchData = async()=>{
        try{
            const response = await axiosInstance.get('/quality/get-request-data')
            setData(response.data.products)
        }catch(error){
            toast.error('Failed to fetch requests data')
        }
      }

      useEffect(()=>{
        fetchData()
      },[])
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='521px' role='Quality Check' defaultActiveMenu='/qcHome'/>
        <div className='bg-light mx-auto' style={{marginTop:'180px', maxWidth:'1500px',borderRadius:'30px',padding:'20px'}}>
            {data.length !== 0 ? (
              <DataTable data = {data} columns={columns}/>
            ):(
              <div className='text-center'>
                <h4>No Products Available in design support</h4>
              </div>
            )}
              
          </div>
    </div>
  )
}

export default QCHomePage