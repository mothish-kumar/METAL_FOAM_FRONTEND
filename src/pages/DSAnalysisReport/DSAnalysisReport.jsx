import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import axiosInstance from '../../api/axiosInstance'
import {toast} from 'sonner'
import DSAnalysisReportComponent from '../../components/DSAnalysisReportComponent/DSAnalysisReportComponent'
const DSAnalysisReport = () => {
    const menuList = [
        {name:'Home',path:'/dsHome'},
        {name:'Products',path:'/dsProduct'},
        {name:'Analysis',path:'/dsAnalysis'},
        {name:'Analysis Report',path:'/dsAnalysisReport'},
        {name:'Data Access',path:'/dsDataAccess'}
    ]
    const [products,setProducts] = useState([])
    const [pagination,setPagination] = useState({
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10,
      hasNextPage: false,
      hasPrevPage: false,
    })
    const fetchProducts = async()=>{
      try{
        const response = await axiosInstance.get('/design-support/get-all-data')
        setProducts(response.data.products)
        setPagination(response.data.pagination)
      }catch(error){
        toast.error('Failed to fetch design support reports')
      }
    }
    // Handle page change
const handlePageChange = (newPage) => {
  if (newPage < 1 || newPage > pagination.totalPages) return;
  fetchData(newPage, pagination.itemsPerPage);
};
const handleDeleteProduct = (productId)=>{
  setProducts(prevProducts =>prevProducts.filter(product=>product.productId != productId))

}

// Handle limit change
const handleLimitChange = (e) => {
  const newLimit = parseInt(e.target.value);
  fetchData(1, newLimit); 
};
    useEffect(()=>{
      fetchProducts()
    },[])
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Design Support' defaultActiveMenu='/dsAnalysisReport'/>
        <div style={{marginTop:'150px'}}>
        <div className="d-flex flex-wrap gap-4 mt-5  justify-content-start "
                style={{ maxHeight: "550px",maxWidth:'1500px', overflowY: "auto", paddingRight: "10px" ,marginLeft:'350px' }}>
                  {products.length > 0 ?
                             (products.map((product)=><DSAnalysisReportComponent  key={product.productId} data={product} onDelete = {handleDeleteProduct}/> )):(<div className='text-center'>
                                    < p className='text-light text-center'>No products available in this page </p>
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

export default DSAnalysisReport