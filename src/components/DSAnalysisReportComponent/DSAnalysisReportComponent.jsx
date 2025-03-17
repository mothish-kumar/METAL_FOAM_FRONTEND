import React,{useState,useEffect} from 'react'
import { MdOutlineAccessTime } from "react-icons/md";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import { FaRegTrashCan } from "react-icons/fa6";
import axiosInstance from '../../api/axiosInstance';
import {toast} from 'sonner'

const DSAnalysisReportComponent = ({data,onDelete}) => {
  const [editData,setEditData] = useState(data)
    const [imgUrl, setImgUrl] = useState("");
      const [showModal, setShowModal] = useState(false)
      const[editModal,setEditModal] = useState(false)

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
      const deleteProduct = ()=>{
        try{
          toast('!Confirm the product has been deleted cannot be recover',{
            action:{
              label:'Confirm',
              onClick:async()=>{
                await axiosInstance.delete(`/design-support/delete-design-data/${data.transactionHash}`)
                onDelete(data.productId)
                toast.success('Product deleted successfully')
              }
            }
          })
        }catch(error){
          toast.error('Failed to delete data')
        }
      }
      const saveChanges = async()=>{
        try{
          await axiosInstance.put(`/design-support/update-design-data/${editData.transactionHash}`,{...editData})
          toast.success('Product details has been updated successfully')
          setEditModal(false)
          window.location.reload()
        }catch(error){
          toast.error('Failed to update product details')
        }
      }
        useEffect(() => {
          fetchImg(data.productName).then(setImgUrl);
        }, [data.productName]);
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
                      <td><b>Designer Support Id</b></td>
                      <td>{data.designerSupportId}</td>
                    </tr>
                    <tr>
                      <td><b>Yield Strength</b></td>
                      <td>{data.yieldStrength} </td>
                    </tr>
                    <tr>
                      <td><b>Hardness</b></td>
                      <td>{data.hardness} </td>
                    </tr>
                    <tr>
                      <td><b>Elasticity Verified</b></td>
                      <td>{data.elasticityVerified?"Verified":"Not Verified"}</td>
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
                      <td><b>Heat Input</b></td>
                      <td>{data.optimizedWeldingParameters.heatInput}</td>
                    </tr>
                    <tr>
                      <td><b>Cooling Time</b></td>
                      <td>{data.optimizedWeldingParameters.coolingTime}</td>
                    </tr>
                    <tr>    
                      <td><b>WeldingStrength</b></td>
                      <td>{data.optimizedWeldingParameters.weldingStrength}</td>
                    </tr>
                    <tr>
                      <td><b>Approval Status</b></td>
                      <td>{data.finalApprovalStatus}</td>
                    </tr>
                    <tr>
                      <td><b>Design Support Comments </b></td>
                      <td>{data.designSupportComments}</td>
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
      {/* Edit Modal */}
      {editModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product Details</h5>
                <button className="btn-close" onClick={() => setEditModal(false)}></button>
              </div>
              <div className="modal-body">
              <div className='table-responsive' style={{ maxHeight: "600px", overflowY: "auto" }}>
    <table className="table table-bordered">
        <tbody>
            <tr>
                <td><b>Transaction hash</b></td>
                <td><input type="text" value={editData.transactionHash} disabled className="form-control" /></td>
            </tr>
            <tr>
                <td><b>Product ID</b></td>
                <td><input type="text" value={editData.productId} disabled className="form-control" /></td>
            </tr>
            <tr>
                <td><b>Product Name</b></td>
                <td><input type="text" value={editData.productName} className="form-control" onChange={(e) => setEditData({ ...editData, productName: e.target.value })} /></td>
            </tr>
            <tr>
                <td><b>Material Type</b></td>
                <td><input type="text" value={editData.materialType} className="form-control" onChange={(e) => setEditData({ ...editData, materialType: e.target.value })} /></td>
            </tr>
            <tr>
                <td><b>Material Specification</b></td>
                <td><input type="text" value={editData.materialSpecification} className="form-control" onChange={(e) => setEditData({ ...editData, materialSpecification: e.target.value })} /></td>
            </tr>
            <tr>
                <td><b>Designer Support Id</b></td>
                <td><input type="text" value={editData.designerSupportId} onChange={(e) => setEditData({ ...editData, designerSupportId: e.target.value })} className="form-control" /></td>
            </tr>
            <tr>
                <td><b>Yield Strength</b></td>
                <td><input type="number" value={editData.yieldStrength} className="form-control" onChange={(e) => setEditData({ ...editData, yieldStrength: e.target.value })} /></td>
            </tr>
            <tr>
                <td><b>Hardness</b></td>
                <td><input type="number" value={editData.hardness} className="form-control" onChange={(e) => setEditData({ ...editData, hardness: e.target.value })} /></td>
            </tr>
            <tr>
                <td><b>Elasticity Verified</b></td>
                <td>
                    <select className="form-control" value={editData.elasticityVerified} onChange={(e) => setEditData({ ...editData, elasticityVerified: e.target.value === "true" })}>
                        <option value="true">Verified</option>
                        <option value="false">Not Verified</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><b>Density</b></td>
                <td><input type="number" value={editData.density} className="form-control" onChange={(e) => setEditData({ ...editData, density: e.target.value })} /> g/cm³</td>
            </tr>
            <tr>
                <td><b>Thermal Conductivity</b></td>
                <td><input type="number" value={editData.thermalConductivity} className="form-control" onChange={(e) => setEditData({ ...editData, thermalConductivity: e.target.value })} /> W/mK</td>
            </tr>
            <tr>
                <td><b>Flexural Strength</b></td>
                <td><input type="number" value={editData.flexuralStrength} className="form-control" onChange={(e) => setEditData({ ...editData, flexuralStrength: e.target.value })} /> MPa</td>
            </tr>
            <tr>
                <td><b>Tensile Strength</b></td>
                <td><input type="number" value={editData.tensileStrength} className="form-control" onChange={(e) => setEditData({ ...editData, tensileStrength: e.target.value })} /> MPa</td>
            </tr>
            <tr>
                <td><b>Porosity</b></td>
                <td><input type="text" value={editData.porosity} className="form-control" onChange={(e) => setEditData({ ...editData, porosity: e.target.value })} /></td>
            </tr>
            <tr>
                <td><b>Heat Input</b></td>
                <td><input type="number" value={editData.optimizedWeldingParameters.heatInput} className="form-control" onChange={(e) => setEditData({ ...editData, optimizedWeldingParameters: { ...data.optimizedWeldingParameters, heatInput: e.target.value } })} /></td>
            </tr>
            <tr>
                <td><b>Cooling Time</b></td>
                <td><input type="number" value={editData.optimizedWeldingParameters.coolingTime} className="form-control" onChange={(e) => setEditData({ ...editData, optimizedWeldingParameters: { ...data.optimizedWeldingParameters, coolingTime: e.target.value } })} /></td>
            </tr>
            <tr>
                <td><b>Welding Strength</b></td>
                <td><input type="number" value={editData.optimizedWeldingParameters.weldingStrength} className="form-control" onChange={(e) => setEditData({ ...editData, optimizedWeldingParameters: { ...data.optimizedWeldingParameters, weldingStrength: e.target.value } })} /></td>
            </tr>
            <tr>
                <td><b>Approval Status</b></td>
                <td>
                    <select className="form-control" value={editData.finalApprovalStatus} onChange={(e) => setEditData({ ...editData, finalApprovalStatus: e.target.value })}>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><b>Design Support Comments</b></td>
                <td><textarea value={editData.designSupportComments} className="form-control" onChange={(e) => setEditData({ ...editData, designSupportComments: e.target.value })}></textarea></td>
            </tr>
        </tbody>
    </table>
    <div className='mx-auto'>
      <button className='btn btn-primary' onClick={saveChanges}>Save Changes</button>
    </div>
</div>

              </div>
            </div>
          </div>
        </div>
      )}
       
        </div>
  )
}

export default DSAnalysisReportComponent