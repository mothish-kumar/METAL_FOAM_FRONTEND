import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import { toast } from 'sonner'
import axiosInstance from '../../api/axiosInstance'
import { AiFillWarning } from "react-icons/ai";
import DSProductComponent from '../../components/DSProductComponent/DSProductComponent';

const DSProduct = () => {
    const menuList = [
        {name:'Home',path:'/dsHome'},
        {name:'Products',path:'/dsProduct'},
        {name:'Analysis',path:'/dsAnalysis'},
        {name:'Analysis Report',path:'/dsAnalysisReport'},
        {name:'Data Access',path:'/dsDataAccess'}
    ]
    const [haveAccess,setHaveAccess] = useState(false)
    const[products,setProducts] = useState([])
    const [pagination, setPagination] = useState({
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: 10,
            hasNextPage: false,
            hasPrevPage: false,
          });
    const fetchProductsData = async()=>{
        try{
            const response = await axiosInstance.get('/design-support/get-data')
            setProducts(response.data.products)
            setPagination(response.data.pagination)
            setHaveAccess(true)
        }catch(error){
            if(error.response){
                if(error.response.status = 404){
                    setHaveAccess(false)
                }if(error.response.status = 403){
                    setHaveAccess(false)
                }
            }else{
                toast.error('Failed to fetch products data')
            }
        }
    }
    // Handle page change
const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    fetchData(newPage, pagination.itemsPerPage);
  };
  
  // Handle limit change
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    fetchData(1, newLimit); 
  };
    const handleMakeRequest= async()=>{
        try{
            await axiosInstance.post('/employee/request-access')
            toast.success('The request has been sent to admin plese wait for appoval,Approval updated in  registered email')
          }catch(error){
            toast.error("Failed to make a request")
          }
    }

    useEffect(()=>{
        fetchProductsData()
    },[])
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Design Support' defaultActiveMenu='/dsProduct'/>
        <div style={{marginTop:'150px'}}>
        <div className="d-flex flex-wrap gap-4 mt-5  justify-content-start "
                style={{ maxHeight: "550px",maxWidth:'1500px', overflowY: "auto", paddingRight: "10px" ,marginLeft:'350px' }}> 
                    {haveAccess ?
                        (products.length > 0 ?
                             (products.map((product)=><DSProductComponent  key={product.productId} data={product}/>)):(<div className='text-center'>
                                    < p className='text-light text-center'>No products available in this page </p>
                             </div>)):
                            (<div className='container  ' style={{height:'700px', marginLeft:'190px'}}>
                                      <div className=' flex items-center text-white mt-5' style={{fontSize:'30px'}}><AiFillWarning  className="mr-2"/>You don't have an Access to show products ? </div>
                                      <div className=' mt-5 ' style={{marginLeft:'300px'}}><button className='btn btn-danger px-4 ' onClick={handleMakeRequest}>Make a Request</button></div>
                                    </div>)}
             </div>
      </div>
      {/* Pagination UI */}
      <div className="d-flex justify-content-center align-items-center mt-3 gap-2 mb-3">
                {/* Previous Button */}
                <button
                  className="btn  btn-primary"
                  disabled={!pagination.hasPrevPage}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                >
                  ← Prev
                </button>

                {/* Page Numbers */}
                <ul className="pagination mb-0">
                  {Array.from({ length: pagination.totalPages }, (_, index) => (
                    <li key={index + 1} className={`page-item ${pagination.currentPage === index + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Next Button */}
                <button type='button'
                  className="btn btn-primary"
                  disabled={!pagination.hasNextPage}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                >
                  Next →
                </button>

                {/* Limit Selector */}
                <select className="form-select w-auto ms-3" value={pagination.itemsPerPage} onChange={handleLimitChange}>
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                </select>
              </div>
    </div>
  )
}

export default DSProduct