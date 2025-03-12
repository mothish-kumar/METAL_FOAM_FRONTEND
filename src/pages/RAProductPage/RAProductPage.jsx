import React, { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../components/Header/Header'
import { IoSearchOutline } from "react-icons/io5";
import { toast } from 'sonner';
import axiosInstance from '../../api/axiosInstance';
import ProductRA from '../../components/ProductRA/ProductRA';
import { AiFillWarning } from "react-icons/ai";

const RAProductPage = () => {
  const menuList = [
    {name:'Home',path:'/raHome'},
    {name:'Products',path:'/raProduct'},
    {name:'Analysis',path:'/raAnalysis'},
    {name:'Analysis Report',path:'/raAnalysisReport'},
    {name:'Data Access',path:'/raDataAccess'}
]
const [searchQuery,setSearchQuery] = useState("")
const [filteredProducts, setFilteredProducts] = useState([]);
const [products,setProducts] = useState([])
const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false,
      });
      const [haveAccess,setHaveAccess]=useState(false)


const fetchData = async(page = 1, limit = 10)=>{
  try{
    const response = await axiosInstance.get(`/resource-analyst/get-products-data?limit=${limit}&page=${page}`)
    const products = response.data.products;
    if(products .length === 0 ){
      toast.success('No products Available')
    }else{
      setProducts(products)
      setPagination(response.data.pagination)
      setHaveAccess(true)
    }
  }catch(error){
    if(error.response){
      if(error.response.status === 404){
        setHaveAccess(false)
      }
    }
    toast.error('Failed to fetch data')
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

const handleMakeRequest = async()=>{
  try{
    await axiosInstance.post('/employee/request-access')
    toast.success('The request has been sent to admin plese wait for appoval,Approval updated in  registered email')
  }catch(error){
    toast.error("Failed to make a request")
  }
}

useEffect(()=>{
  fetchData()
},[])

useEffect(() => {
        if (searchQuery.trim() === "") {
          setFilteredProducts(products); 
        } else {
          const filtered = products.filter((product) =>
            product.productId.toString().includes(searchQuery.trim())
          );
          setFilteredProducts(filtered);
        }
      }, [searchQuery, products]);
return (
<div>
    <Header menuList={menuList} menuContainerWidth='721px' role='Resource Analyst' defaultActiveMenu='/raProduct'/>
    <div style={{marginTop:'150px'}}>
      <div className='d-flex  flex-row justify-content-center'>
        <div  style={{ display: "flex", alignItems: "center", height: "45px", borderRadius: "40px", border: "1px solid #ccc", padding: "5px 15px", background: "#fff" }}>
        <input type="text" className="border-0 " placeholder="Search by product id....." style={{ outline: "none", boxShadow: "none", flex: 1 }}  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        <IoSearchOutline size={30} style={{  color: "#666" }}  />
        </div>
      </div>
      <div className="d-flex flex-wrap gap-4 mt-5  justify-content-start "
                style={{ maxHeight: "550px",maxWidth:'1500px', overflowY: "auto", paddingRight: "10px" ,marginLeft:'350px' }}>
                  {haveAccess?(filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    product && <ProductRA key={product.productId} data={product} />
                  ))
                ) : (
                  <div className='text-center'>
                    <p className='text-light text-center'>No products available in this page </p>
                  </div>
                )):(<div className='container ' style={{height:'700px'}}>
                  <div className=' flex items-center text-white mt-5' style={{fontSize:'30px'}}><AiFillWarning  className="mr-2"/>You don't have an Access to show products ? </div>
                  <div className=' mt-5 ' style={{marginLeft:'300px'}}><button className='btn btn-danger px-4 ' onClick={handleMakeRequest}>Make a Request</button></div>
                </div>)}
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
</div>
)
}

export default RAProductPage