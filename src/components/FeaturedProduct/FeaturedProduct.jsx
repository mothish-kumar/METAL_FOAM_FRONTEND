import React from 'react'
import { MdVerified } from "react-icons/md";

const FeaturedProduct = ({productName,materialType,materialSpecification,qualityString}) => {
  return (
    <div className='card' style={{maxWidth:'400px'}}>
      <div className='card-header  d-flex  align-item-center' style={{backgroundColor:'#CD7903',color:'white'}}>{productName}<MdVerified size={'20px'}/> </div>
      <div className='card-body'>
        <div className='card-title text-success'>Product Description</div>
        <div className='card-text'>
        <table className="table " >
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