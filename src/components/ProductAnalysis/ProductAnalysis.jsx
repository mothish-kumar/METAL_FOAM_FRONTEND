import React,{useState,useEffect} from 'react'
import axios from "axios";
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
      return null;
    }
  };

const ProductAnalysis = ({initialData,onDelete}) => {
    const [imgUrl, setImgUrl] = useState("");
    const [data,setData] = useState(initialData)
    const [showModal, setShowModal] = useState(false)
    const [editModal,setEditModal]= useState(false)
    const [editData,setEditData] = useState(initialData)
    useEffect(() => {
        fetchImg(data.productName).then(setImgUrl);
      }, [data.productName]);
      //Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
      
        setEditData((prevData) => {
          if (["force", "stress", "strain", "youngsModulus"].includes(name)) {
            return {
              ...prevData,
              optimalForce: {
                ...prevData.optimalForce,
                [name]: value
              }
            };
          }
      
          if (["power", "weldingSpeed", "heatInput", "coolingTime", "weldingStrength"].includes(name)) {
            return {
              ...prevData,
              weldingParameters: {
                ...prevData.weldingParameters,
                [name]: value
              }
            };
          }
      
          return {
            ...prevData,
            [name]: value
          };
        });
      };
      
  

  // Save Edited Data
  const saveChanges =async () => {
    const formattedData = {
      ...editData,
      issues: editData.issues,
      optimalForce: {
        force: editData.optimalForce?.force ,
        stress: editData.optimalForce?.stress ,
        strain: editData.optimalForce?.strain ,
        youngsModulus: editData.optimalForce?.youngsModulus 
      },

      weldingParameters: {
        power: editData.weldingParameters?.power ,
        weldingSpeed: editData.weldingParameters?.weldingSpeed ,
        heatInput: editData.weldingParameters?.heatInput ,
        coolingTime: editData.weldingParameters?.coolingTime ,
        weldingStrength: editData.weldingParameters?.weldingStrength 
      },
      mass: editData.mass,
      density: editData.density,
      flexuralStrength: editData.flexuralStrength,
      tensileStrength: editData.tensileStrength,
      porosity: editData.porosity,
      transactionHash: editData.transactionHash,
      productId: editData.productId 
    };
    setData(formattedData);
    try{
      await axiosInstance.put(`/resource-analyst/update-analysis-data/${editData.transactionHash}`,{...formattedData})
      toast.success('Product details has been updated successfully')
    }catch(error){
      toast.error('Failed to update data')
    }
    setEditModal(false);
  };
  
  //deleteProduct
  const deleteProduct = async()=>{
    toast("Are you sure want to delete this product ",{
        action:{
            label:"Delete",
            onClick: async()=>{
                try{

                    await axiosInstance.delete(`/resource-analyst/delete-analysis-data/${data.transactionHash}`)
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
                <div className='table-responsive' style={{maxHeight: "600px", overflowY: "auto"}}>
                <table className="table table-bordered  ">
                  <tbody>
                  <tr>
                      <td><b>Transaction hash</b></td>
                      <td>{data.transactionHash}</td>
                    </tr>
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
                      <td><b>Material Specification</b></td>
                      <td>{data.materialSpecification}</td>
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
                    <tr>
                      <td><b>Mass</b></td>
                      <td>{data.mass}</td>
                    </tr>
                    <tr>
                      <td><b>Issue</b></td>
                      <td><ul className='m-0 p-0'>{data.issues.length >0 ?
                      (data.issues.map((issue,index)=>(<li key={index}>{issue}</li>))):(<li>No Issue in this product</li>)
                    }</ul></td>
                    </tr>
                    <tr>    
                      <td><b>Force</b></td>
                      <td>{data.optimalForce.force}</td>
                    </tr>
                    <tr>
                      <td><b>Stress</b></td>
                      <td>{data.optimalForce.stress}</td>
                    </tr>
                    <tr>
                      <td><b>Strain</b></td>
                      <td>{data.optimalForce.strain}</td>
                    </tr>
                    <tr>
                      <td><b>Youngs Modulus</b></td>
                      <td>{data.optimalForce.youngsModulus}</td>
                    </tr>
                    <tr>
                      <td><b>Power</b></td>
                      <td>{data.weldingParameters.power}</td>
                    </tr>
                    <tr>
                      <td><b>Welding Speed</b></td>
                      <td>{data.weldingParameters.weldingSpeed}</td>
                    </tr>
                    <tr>
                      <td><b>Heat input</b></td>
                      <td>{data.weldingParameters.heatInput}</td>
                    </tr>
                    <tr>
                      <td><b>Cooling Time</b></td>
                      <td>{data.weldingParameters.coolingTime}</td>
                    </tr>
                    <tr>
                      <td><b>Welding Strength</b></td>
                      <td>{data.weldingParameters.weldingStrength}</td>
                    </tr> 
                    <tr>
                      <td><b>Description</b></td>
                      <td>{data.resourceAnalystDescription}</td>
                    </tr>
                    <tr>
                      <td><b>Approval Status</b></td>
                      <td>{data.approvalStatus}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
               
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
              <label>Transaction Hash:</label>
              <input type="text" className="form-control mb-2" name="transactionHash" value={editData.transactionHash} onChange={handleChange} disabled/>
              <label>Product Id:</label>
              <input type="text" className="form-control mb-2" name="productId" value={editData.productId} onChange={handleChange} disabled />
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
                  <label>Mass</label>
                  <input type="text" className="form-control mb-2" name="mass" value={editData.mass}  onChange={handleChange}/>
                  <label>Issues</label>
                  <input type="text" className="form-control mb-2" name="issues" value={editData.issues}  onChange={handleChange}/>
                  <label>Force</label>
                  <input type="number" className="form-control mb-2" name="force" value={editData.optimalForce.force}  onChange={handleChange}/>
                  <label>Stress</label>
                  <input type="text" className='form-control mb-2' name='stress' value={editData.optimalForce.stress} onChange={handleChange}/>
                  <label>Strain</label>
                  <input type="text" className='form-control mb-2' name='strain' value={editData.optimalForce.strain} onChange={handleChange}/>
                  <label>Youngs Modulus</label>
                  <input type="text" className='form-control mb-2' name='youngsModulus' value={editData.optimalForce.youngsModulus} onChange={handleChange}/>
                  <label>Power</label>
                  <input type="text" className='form-control mb-2' name='power' value={editData.weldingParameters.power} onChange={handleChange}/>
                  <label>Welding Speed</label>
                  <input type="text" className='form-control mb-2' name='weldingSpeed' value={editData.weldingParameters.weldingSpeed} onChange={handleChange}/>
                  <label>Heat input</label>
                  <input type="text" className='form-control mb-2' name='heatInput' value={editData.weldingParameters.heatInput} onChange={handleChange}/>
                  <label>Cooling Time</label>
                  <input type="text" className='form-control mb-2' name='coolingTime' value={editData.weldingParameters.coolingTime} onChange={handleChange}/>
                  <label>Welding Strength</label>
                  <input type="text" className='form-control mb-2' name='weldingStrength' value={editData.weldingParameters.weldingStrength} onChange={handleChange}/>
                  <label>Description</label>
                  <input type="text" className='form-control mb-2' name='resourceAnalystDescription' value={editData.resourceAnalystDescription} onChange={handleChange}/>
                  <label>Approval Status</label>
                  <input type="text" className='form-control mb-2' name='approvalStatus' value={editData.approvalStatus} onChange={handleChange} disabled/>
                  <label>Resource Analyst ID </label>
                  <input type="text" className='form-control mb-2' name='resourceAnalystID' value={editData.resourceAnalystID} onChange={handleChange} disabled/>
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
  )
}

export default ProductAnalysis