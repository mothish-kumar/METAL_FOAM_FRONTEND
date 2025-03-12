import React, { useState, useEffect } from "react";
import axios from "axios";
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



const ProductRA = ({data}) => {
  
  const [imgUrl, setImgUrl] = useState("");
  const [showModal, setShowModal] = useState(false)

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
   
    </div>
  );
};

export default ProductRA;
