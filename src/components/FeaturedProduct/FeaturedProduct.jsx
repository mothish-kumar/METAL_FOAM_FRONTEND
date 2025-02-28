import React from 'react'
import { MdVerified } from "react-icons/md";

const FeaturedProduct = ({productName,materialType,materialSpecification,qualityString}) => {
  return (
    <div className='container bg-light text-dark  p-2' style={{width:'371px',height:'256px',borderRadius:'30px'}}>
        <div className='mt-1 text-center' style={{backgroundColor:'#FF4500',color:'white'}}>{productName}    <MdVerified /></div>
        <hr style={{border:'2px solidrgba(0, 132, 255, 0.92)'}} />
        <div>
          <h5 style={{color:'#FF6600'}}>ProductDescription</h5>
          <div className="table-responsive"  style={{ borderRadius: '35px'}}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th style={{color:'#232A58'}}>Material Type</th>
              <td>{materialType}</td>
            </tr>
            <tr>
              <th style={{color:'#232A58'}}>Material Specification</th>
              <td>{materialSpecification}</td>
            </tr>
            <tr>
              <th style={{color:'#232A58'}}>Quality</th>
              <td>{qualityString}</td>
            </tr>
          </tbody>
        </table>
      </div>
           
        </div>
        
    </div>
  )
}

export default FeaturedProduct