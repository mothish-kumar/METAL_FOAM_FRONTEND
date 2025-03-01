import React from 'react'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import { IoSearchOutline } from "react-icons/io5";
import {toast} from 'sonner'
import axiosInstance from '../../api/axiosInstance';
import { useEffect,useState} from 'react';
import UploadCSVButton from '../../components/UploadCSVButton/UploadCSVButton';


const AdminProductPage = () => {
    const menuList = [
        { name: 'Dashboard', path: '/adminHome' },
        { name: 'Products', path: '/adminProduct' },
        { name: 'User Management', path: '/adminUserManagement' },
        { name: 'Reports', path: '/adminReports' },
        { name: 'Rejected Products', path: '/adminRejectedProducts' },
        { name: 'Data Access', path: '/adminDataAccess' }
      ]

      const [products,setProducts] = useState([])
      const [addModal,setAddModal] = useState(false)
      const [addData,setAddData]= useState({})
      const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false,
      });
      const [searchQuery, setSearchQuery] = useState("");
      const [filteredProducts, setFilteredProducts] = useState([]);

      const handleDeleteSingleProduct = (productId)=>{
        setProducts(prevProducts => prevProducts.filter(product=> product.productId !== productId))
      }

      const fetchProducts = async(page = 1, limit = 10)=>{
        try{
          const response  =  await axiosInstance.get(`/admin/get-products-data?limit=${limit}&page=${page}`)
          const products = response.data.products
          if(products.length === 0){
            toast.success('No Products Available')
          }else{
            setProducts(products)
            setPagination(response.data.pagination);
          }
        }catch(error){
          toast.error('Failed to fetch Product data')
          console.log(error.message)
          setProducts([])
        }
      }
      // Handle page change
      const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        fetchProducts(newPage, pagination.itemsPerPage);
      };

      // Handle limit change
      const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        fetchProducts(1, newLimit); 
      };

       //Handle input changes
        const handleChange = (e) => {
          setAddData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        };
        //save product data
        const save = async () => {
          try {
              const response = await axiosInstance.post('/admin/add-product', addData);
      
              if (response.status === 200) {
                  toast.success('Product Added Successfully');
                  setProducts(prevProducts => [...prevProducts, response.data.product]);
                  setAddModal(false)
              } else {
                  toast.error('Failed to add product');
              }
          } catch (error) {
              toast.error(error.response?.data?.error || 'Failed to add product');
          }
      };

      const deleteAllProducts = async()=>{
          toast('Are you sure to delete all the product!',{
            action:{
              label:'Confirm',
              onClick:async()=>{
                try{
                  await axiosInstance.delete('admin/delete-all-products')
                  toast.success('Products deleted successfully')
                  setProducts([])
                }catch(error){
                  toast.error('Failed to delete products')
                }
              }
            }
          })
       
      }

  
      
      
      useEffect(()=>{
        fetchProducts()
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
          <Header menuList={menuList} menuContainerWidth='921px' role='Admin' defaultActiveMenu='/adminProduct'/>
          <div style={{marginTop:'150px'}}>
            <div className='d-flex flex-row justify-content-center gap-5' >
              <div >
                <div style={{ display: "flex", alignItems: "center", height: "45px", borderRadius: "40px", border: "1px solid #ccc", padding: "5px 15px", background: "#fff" }}>
                  <input type="text" className="border-0" placeholder="Search by product id....." style={{ outline: "none", boxShadow: "none", flex: 1 }}  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                  <IoSearchOutline size={30} style={{  color: "#666" }}  />
                </div>
              </div>
              <div>
                <UploadCSVButton onUploadSuccess={fetchProducts}/>
              </div>
              <div>
                <button  className='px-3' style={{backgroundColor:'#02542D',color:'white',borderRadius:'40px',padding:'10px'}} onClick={()=>setAddModal(true)}>Add Product</button>
              </div>
              <div>
                <button  className='px-3' style={{backgroundColor:'#FB0505',color:'white',borderRadius:'40px',padding:'10px'}} onClick={deleteAllProducts}>Delete All</button>
              </div>
            </div>

            {/* Product UI */}

            <div
                className="d-flex flex-wrap gap-4 mt-5  justify-content-start "
                style={{ maxHeight: "550px",maxWidth:'1500px', overflowY: "auto", paddingRight: "10px" ,marginLeft:'350px' }}
              >
              {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    product && <Product key={product.productId} initialData={product} onDelete={handleDeleteSingleProduct} />
                  ))
                ) : (
                  <div className='text-center'>
                    <p className='text-light text-center'>No products available in this page </p>
                  </div>
                )}

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
           {/* AddProductModal */}
      {addModal &&(
        <div key="addProductModal" className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>
              <button className="btn-close" onClick={() => setAddModal(false)}></button>
            </div>
            <div className="modal-body">
              <div>
                  <label>Product Name:</label>
                  <input type="text" className="form-control mb-2" name="productName" value={addData.productName|| ""} onChange={handleChange} />
                  <label>Material Type:</label>
                  <input type="text" className="form-control mb-2" name="materialType" value={addData.materialType|| ""} onChange={handleChange} />
                  <label>Quantity:</label>
                  <input type="number" className="form-control mb-2" name="quantity" value={addData.quantity|| ""} onChange={handleChange} />
                  <label>Thickness:</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="thickness" value={addData.thickness|| ""} onChange={handleChange} />
                    <span className="input-group-text">mm</span>
                  </div>
                  <label>Volume:</label>
                  <div className="input-group">
                    <input type="number" className="form-control mb-2" name="volume" value={addData.volume|| ""} onChange={handleChange} />
                        <span className="input-group-text">cm³</span>
                  </div>
                  <label>Temperature:</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="temperature" value={addData.temperature|| ""} onChange={handleChange} />
                    <span className="input-group-text">°C</span>
                  </div>
                  <label>Processing Time</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="processingTime" value={addData.processingTime|| ""} onChange={handleChange} />
                    <span className="input-group-text">hrs</span>
                  </div>
                  <label>Density</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="density" value={addData.density|| ""} onChange={handleChange} />
                    <span className="input-group-text">g/cm³</span>
                  </div>
                  <label>Thermal Conductivity</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="thermalConductivity" value={addData.thermalConductivity|| ""} onChange={handleChange} />
                    <span className="input-group-text">W/mK</span>
                  </div>
                  <label >Flexural Strength</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="flexuralStrength" value={addData.flexuralStrength|| ""} onChange={handleChange} />
                    <span className="input-group-text">MPa</span>
                  </div>
                  <label >Tensile Strength</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="tensileStrength" value={addData.tensileStrength|| ""} onChange={handleChange} />
                    <span className="input-group-text">MPa</span>
                  </div>
                  <label>Porosity</label>
                  <input type="number" className="form-control mb-2" name="porosity" value={addData.porosity|| ""}  onChange={handleChange}/>
                  <label>Quality</label>
                  <input type="text" className="form-control mb-2" name="qualityString" value={addData.qualityString|| ""}  onChange={handleChange}/>
                </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setAddModal(false)}>Close</button>
              <button className="btn btn-success" onClick={save}>Save </button>
            </div>
          </div>
        </div>
      </div>
      )}

        </div>
    
      )
}

export default AdminProductPage