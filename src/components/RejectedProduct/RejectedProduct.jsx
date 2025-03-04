import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";



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



const RejectedProduct = ({data}) => {
  
  const [imgUrl, setImgUrl] = useState("");
  const [showModal, setShowModal] = useState(false)



  useEffect(() => {
    fetchImg(data.productName).then(setImgUrl);
  }, [data.productName]);


  return (
    <div className="card p-1" style={{maxWidth:'300px',boxShadow: '0px 2px 10px', borderRadius:'10px',backgroundColor:'white'}}>
        <img src={imgUrl || "https://via.placeholder.com/280"} alt="Product Image" className="card-img-top p-3" style={{ width: "100%", height: "200px", objectFit: "cover",borderRadius: "10px" }}
 />
      <div className="card-body">
        <div className="pb-2">Product Name: {data.productName}</div>
        <div className="pb-2">Product ID: {data.productId}</div>
        <div className="d-flex flex-row align-items-center">
          <div style={{ color: "#ff3f04", cursor: "pointer" }} onClick={() => setShowModal(true)}>
            More info...
          </div>
        </div>
      </div>

      {/*View  Modal */}
      {showModal && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Rejection Details</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
    
              {/* Modal Body */}
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    {/* Left Column */}
                    <div className="col-md-6">
                      <p><strong className="text-primary">Product Name:</strong> {data.productName}</p>
                      <p><strong className="text-primary">Material Type:</strong> {data.materialType}</p>
                      <p><strong className="text-primary">Rejected By:</strong> {data.rejectedBy}</p>
                      <p><strong className="text-primary">Rejection Reason:</strong></p>
                      <p className="text-danger">{data.rejectionReason}</p>
                    </div>
    
                    {/* Right Column */}
                    <div className="col-md-6">
                      <p><strong className="text-primary">Improvement Suggestions:</strong></p>
                      <p className="text-success">{data.improvementSuggestions}</p>
                      <p><strong className="text-primary">Previous Feasibility Score:</strong> {data.previousFeasibilityScore}</p>
                      <p><strong className="text-primary">Additional Notes:</strong></p>
                      <p className="text-warning">{data.additionalNotes}</p>
                      <p><strong className="text-primary">Rejected At:</strong> {format(new Date(data.rejectedAt), "yyyy-MM-dd HH:mm:ss")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RejectedProduct;
