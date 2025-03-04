import React, { useState, useEffect } from "react";
import axios from "axios";
import { PiStar,PiStarFill } from "react-icons/pi";
import { GrUpdate } from "react-icons/gr";
import { FaRegTrashCan } from "react-icons/fa6";
import axiosInstance from "../../api/axiosInstance";
import { toast } from 'sonner';
import { MdOutlineAccessTime } from "react-icons/md";

const fetchImg = async (query) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, per_page: 1 },
      headers: { Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}` },
    });
    return response.data.results[0]?.urls.small;
  } catch (error) {
    console.log(error);
    return null;
  }
};



const Product = ({initialData,onDelete}) => {
  
  const [imgUrl, setImgUrl] = useState("");
  const [data,setData] = useState(initialData)
  const [showModal, setShowModal] = useState(false)
  const [editModal,setEditModal]= useState(false)
  const [editData,setEditData] = useState(initialData)
  const [isFeatured,setIsFeatured] = useState(false)

  //featured Product status
  const featuredProductStatus = async(productId)=>{
    try{
        const response = await axiosInstance.get(`/admin/check-featured-material/${productId}`)
        setIsFeatured(response.data.isFeatured)
    }catch(error){
        console.log("Error ",error.message)
    }
}


  useEffect(() => {
    fetchImg(data.productName).then(setImgUrl);
    featuredProductStatus(data.productId)
  }, [data.productId,data.productName]);

  //Handle input changes
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save Edited Data
  const saveChanges = () => {
    setData(editData);
    setEditModal(false);
  };

  //handle feature toggle 
  const toggleFeature = async()=>{
    try{
        if(!isFeatured){
            await axiosInstance.post('/admin/set-featured-material',{
                productId:data.productId,
                productName:data.productName,
                materialType:data.materialType,
                materialSpecification:data.materialSpecification,
                qualityString:data.qualityString
            })
            setIsFeatured(true)
        }else{
            await axiosInstance.delete(`/admin/remove-featured-material/${data.productId}`)
            setIsFeatured(false)
        }
    }catch(error){
        console.log("error ",error.message)
        toast.error("Something wrong in featured material")
    }
  }

  //deleteProduct
  const deleteProduct = async()=>{
    toast("Are you sure want to delete this product ",{
        action:{
            label:"Delete",
            onClick: async()=>{
                try{

                    await axiosInstance.delete(`/admin/delete-product/${data.productId}`)
                    toast.success("Product deleted Successfully")
                    onDelete(data.productId) //Remove in  UI 
                }catch(error){
                    toast.error("Failed to delete Product")
                }
            }
        }
    })
  }

  return (
    <div className="card  p-1" style={{maxWidth:'300px',boxShadow: '0px 2px 10px', borderRadius:'10px',backgroundColor:'white'}}>
      <div className="mt-1  d-flex " style={{marginLeft:'150px', fontSize:'10px',color:'gray'}}>{new Date(data.timestamp *1000).toLocaleString()} <div><MdOutlineAccessTime /></div></div>
        <img src={imgUrl || "https://via.placeholder.com/280"} alt="Product Image" className="card-img-top p-3" style={{ width: "100%", height: "200px", objectFit: "cover",borderRadius: "10px" }}
 />
      <div className="card-body">
        <div className="pb-2" style={{color:'#2C3E50'}}>Product Name: <span style={{color:'#0073E6' ,fontSize:'20px'}}>{data.productName}</span></div>
        <div className="pb-2" style={{color:'#2C3E50'}}>Product ID:  <span style={{color:'#16A34A'}}>{data.productId}</span></div>
        <div className="d-flex flex-row align-items-center">

          <div style={{ color: "#e74c3c", cursor: "pointer" }} onClick={() => setShowModal(true)}>
            <u>More info...</u>
          </div>
          <div style={{ marginLeft: "74px", cursor: "pointer" }} onClick={toggleFeature}>
          {isFeatured ? <PiStarFill size={"25px"} color="gold" /> : <PiStar size={"25px"}  />}
          </div>
          <div style={{ marginLeft: "10px", cursor: "pointer" }} onClick={()=>setEditModal(true)}>
            <GrUpdate size={"20px"} />
          </div>
          <div style={{ marginLeft: "10px", cursor: "pointer" }} onClick={deleteProduct}>
            <FaRegTrashCan size={"20px"} style={{color:'red'}} />
          </div>
        </div>
        
      </div>

      {/*View  Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Product Details</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {/* Table with Product Data */}
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td><b>Product ID</b></td>
                      <td>{data.productId}</td>
                    </tr>
                    <tr>
                      <td><b>Product Name</b></td>
                      <td>{data.productName}</td>
                    </tr>
                    <tr>
                      <td><b>Material Type</b></td>
                      <td>{data.materialType}</td>
                    </tr>
                    <tr>
                      <td><b>Quantity</b></td>
                      <td>{data.quantity}</td>
                    </tr>
                    <tr>
                      <td><b>Thickness</b></td>
                      <td>{data.thickness} mm</td>
                    </tr>
                    <tr>
                      <td><b>Volume</b></td>
                      <td>{data.volume} cm³</td>
                    </tr>
                    <tr>
                      <td><b>Temperature</b></td>
                      <td>{data.temperature}°C</td>
                    </tr>
                    <tr>
                      <td><b>Processing Time</b></td>
                      <td>{data.processingTime} hrs</td>
                    </tr>
                    <tr>
                      <td><b>Density</b></td>
                      <td>{data.density} g/cm³</td>
                    </tr>
                    <tr>
                      <td><b>Thermal Conductivity</b></td>
                      <td>{data.thermalConductivity} W/mK</td>
                    </tr>
                    <tr>
                      <td><b>Flexural Strength</b></td>
                      <td>{data.flexuralStrength} MPa</td>
                    </tr>
                    <tr>
                      <td><b>Tensile Strength</b></td>
                      <td>{data.tensileStrength} MPa</td>
                    </tr>
                    <tr>
                      <td><b>Porosity</b></td>
                      <td>{data.porosity}</td>
                    </tr>
                    <tr>
                      <td><b>Quality</b></td>
                      <td>{data.qualityString}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* EditModal */}
      {editModal &&(
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Product Details</h5>
              <button className="btn-close" onClick={() => setEditModal(false)}></button>
            </div>
            <div className="modal-body">
              {/* Table with Product Data */}
              <div>
                  <label>Product Name:</label>
                  <input type="text" className="form-control mb-2" name="productName" value={editData.productName} onChange={handleChange} />
                  <label>Material Type:</label>
                  <input type="text" className="form-control mb-2" name="materialType" value={editData.materialType} onChange={handleChange} />
                  <label>Quantity:</label>
                  <input type="number" className="form-control mb-2" name="quantity" value={editData.quantity} onChange={handleChange} />
                  <label>Thickness:</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="thickness" value={editData.thickness} onChange={handleChange} />
                    <span className="input-group-text">mm</span>
                  </div>
                  <label>Volume:</label>
                  <div className="input-group">
                    <input type="number" className="form-control mb-2" name="volume" value={editData.volume} onChange={handleChange} />
                        <span className="input-group-text">cm³</span>
                  </div>
                  <label>Temperature:</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="temperature" value={editData.temperature} onChange={handleChange} />
                    <span className="input-group-text">°C</span>
                  </div>
                  <label>Processing Time</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="processingTime" value={editData.processingTime} onChange={handleChange} />
                    <span className="input-group-text">hrs</span>
                  </div>
                  <label>Density</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="density" value={editData.density} onChange={handleChange} />
                    <span className="input-group-text">g/cm³</span>
                  </div>
                  <label>Thermal Conductivity</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="thermalConductivity" value={editData.thermalConductivity} onChange={handleChange} />
                    <span className="input-group-text">W/mK</span>
                  </div>
                  <label >Flexural Strength</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="flexuralStrength" value={editData.flexuralStrength} onChange={handleChange} />
                    <span className="input-group-text">MPa</span>
                  </div>
                  <label >Tensile Strength</label>
                  <div className="input-group">
                  <input type="number" className="form-control mb-2" name="tensileStrength" value={editData.tensileStrength} onChange={handleChange} />
                    <span className="input-group-text">MPa</span>
                  </div>
                  <label>Porosity</label>
                  <input type="number" className="form-control mb-2" name="porosity" value={editData.porosity}  onChange={handleChange}/>
                  <label>Quality</label>
                  <input type="text" className="form-control mb-2" name="qualityString" value={editData.qualityString}  onChange={handleChange}/>
                </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEditModal(false)}>Close</button>
              <button className="btn btn-success" onClick={saveChanges}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Product;
