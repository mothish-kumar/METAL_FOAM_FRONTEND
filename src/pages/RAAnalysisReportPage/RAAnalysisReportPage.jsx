import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import ProductAnalysis from '../../components/ProductAnalysis/ProductAnalysis'
import axiosInstance from '../../api/axiosInstance';

const RAAnalysisReportPage = () => {
    const menuList = [
        {name:'Home',path:'/raHome'},
        {name:'Products',path:'/raProduct'},
        {name:'Analysis',path:'/raAnalysis'},
        {name:'Analysis Report',path:'/raAnalysisReport'},
        {name:'Data Access',path:'/raDataAccess'}
    ]
    const [products,setProducts] = useState([])
    const fetchProductData = async()=>{
      try{
        const response = await axiosInstance.get('/resource-analyst/get-all-analysis-data')
        if (response.data.products.length === 0){
          return toast.error('No Products available')
        }
        setProducts(response.data.products)
      }catch(error){
        toast.error('Failed to fetch data')
      }
    }
    const handleSingleProductDelete = async(productId)=>{
      setProducts(prevProducts =>prevProducts.filter(product=>product.productId != productId))
    }
    useEffect(()=>{
      fetchProductData()
    },[])
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Resource Analyst' defaultActiveMenu='/raAnalysisReport'/>
        <div style={{marginTop:'150px'}}>
        <div className="d-flex flex-wrap gap-4 mt-5  justify-content-start "
                style={{ maxHeight: "550px",maxWidth:'1500px', overflowY: "auto", paddingRight: "10px" ,marginLeft:'350px' }}>
                  {products.length >0 ?
                  (products.map((product)=>(
                    product &&<ProductAnalysis key={product.productId} initialData={product} onDelete={handleSingleProductDelete}/>
                  ))):(<p className='text-light'>No products available</p>)}
                </div>
        </div>
    </div>
  )
}

export default RAAnalysisReportPage